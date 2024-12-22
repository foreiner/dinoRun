import express from 'express';
import { createServer } from 'http';
import initSocket from './init/socket.js';
import { getGameAssets, loadGameAssets } from './init/assets.js';
import { getUsers } from './models/user.model.js';
import { getUserPositions } from './models/userPosition.model.js';
import { getStage, setStage } from './models/stage.model.js';

const app = express();
const server = createServer(app);

const PORT = 3000;

app.use(express.static('public/public'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
initSocket(server);

app.get('/', (req, res) => {
  res.send('<h1>Hello World</h1>');
});

server.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  try {
    const assets = await loadGameAssets();
    console.log(assets);
    console.log('Assets loaded successfully');
  } catch (error) {
    console.error('Failed to load game assets:', error);
  }
  try {
    serverLoop().catch((error) => {
      console.error('Server loop failure occurred:', error);
    });
  } catch (error) {
    console.error('server Failure occured:', error);
  }
});

let currentTime = Date.now();
let previousTime = currentTime;
let readytime = currentTime;
let gametime = currentTime;
let gameOn = false;
let itemtime = 0;
let itemsum = 0;
let cactustime = 0;

export function getitmesum(){
  return itemsum;
}

async function serverLoop() {
  while (true) {
    const stage = getStage();
    const users = getUsers();
    currentTime = Date.now();
    const deltaTime = currentTime - previousTime;
    previousTime = currentTime;

    await sleep(100);

    if (users.length === 0) {
      gameOn = false;
      readytime = currentTime;
      itemsum = 0;
      gameOn = false;
      continue;
    }

    if (users.length > 2) {
      users.forEach((element) => {
        const serPositions = getUserPositions();
        Object.keys(serPositions).forEach((singleposition) => {
          let data = {
            status: `success`,
            type: 'otherPlayers',
            uuid: singleposition,
            data: [serPositions[singleposition].x, serPositions[singleposition].y],
          };
          element.socket.emit('data', data);
        });
      });
    }
    if (gameOn === false) {
      // 한 게임을 1분씩 진행 예정으로 준비 시간 리셋기준준으로 잡음
      if (readytime + 1000 * 60 < currentTime) readytime = currentTime;

      if (readytime + 1000 * 30 < currentTime) {
        //아이템 개수 초기화
        itemsum = 0;
        //게임 시작 시간 초기화
        gametime = currentTime;
        //랜덤 스테이지 설정
        setStage(getRandomNumber(1, 3));

        gameOn = true;
      }
      //다음 시작 타이머
      users.forEach((element) => {
        let data = { status: `success`, type: 'readytime', data: currentTime - readytime };
        element.socket.emit('data', data);
      });
    } else {
      //스테이지 관련 정보 전송 필요.
      users.forEach((element) => {
        let data = { status: `success`, type: 'startFlag', data: stage };
        element.socket.emit('data', data);
      });
      let density;
      const assets = getGameAssets();
      for (let i = 0; i < assets.stages.data.length; i++) {
        if (assets.stages.data[i].id === stage) {
          density = assets.stages.data[i].density;
          break;
        }
      }

      if (currentTime - itemtime > 100 * density) {
        itemtime = currentTime;
        const randItem = stage === 1 ? 1 : stage === 2 ? getRandomNumber(2, 7) : 8;
        const randheight = getRandomNumber(1, 5);
        itemsum+= randItem.id*10;
        users.forEach((element) => {
          let data = {
            status: `success`,
            type: 'itemtime',
            data: randItem,
            height: randheight,
          };
          element.socket.emit('data', data);
        });
      }

      if (currentTime - cactustime > 100000 / density) {
        cactustime = currentTime;
        const cactusheight = getRandomNumber(1, 5);
        users.forEach((element) => {
          let data = {
            status: `success`,
            type: 'cactustime',
            data: 1,
            height: cactusheight,
          };
          element.socket.emit('data', data);
        });
      }

      //게임 종료 로직.
      if (gametime + 1000 * 60 < currentTime) {
        //게임 종료 브로드캐스팅
        users.forEach((element) => {
          let data = { status: `success`, type: 'endOfTime', data: true };
          element.socket.emit('data', data);
        });
        gameOn = false;
      }
    }
  }
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
