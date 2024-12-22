import { getStage, clearStage, setStage } from "../models/stage.model.js";
import { getGameAssets } from "../init/assets.js";
import { getitmesum } from "../app.js";
let timestamp;


export const gameStart = (userUUID, payload) => {
    
  // 서버 메모리에 있는 게임 에셋에서 stage 정보를 가지고 온다.
  const { stages } = getGameAssets();
  // 로그를 찍어 확인.
  console.log('Stage:', getStage(userUUID));

  return { status: 'success' };
};

export const gameEnd = (uuid, payload) => {
    // 클라이언트에서 받은 게임 종료 시 타임스탬프와 총 점수
    const { score } = payload;
    const itemsum = getitmesum();
  
    // 각 스테이지의 지속 시간을 계산하여 총 점수 계산
    let totalScore = 60 + itemsum;
  
    if (score > totalScore) {
      return { status: 'fail', message: 'Score verification failed' };
    }
  
    // 모든 검증이 통과된 후, 클라이언트에서 제공한 점수 저장하는 로직
    // saveGameResult(userId, clientScore, gameEndTime);
    // 검증이 통과되면 게임 종료 처리
    return { status: 'success', message: 'Game ended successfully', score };
  };
