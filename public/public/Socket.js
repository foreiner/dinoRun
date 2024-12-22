import { CLIENT_VERSION } from './Constants.js';
import { setResponsedFromServer, setDataFromServer } from './index.js';
const socket = io('http://localhost:3000', {
  query: {
    clientVersion: CLIENT_VERSION,
  },
});

let userId = null;
socket.on('response', (data) => {
    setResponsedFromServer(data);
  console.log(data);
});

socket.on('connection', (data) => {
  console.log('connection: ', data);
  userId = data.uuid;
});

socket.on('data', (data) => {
  console.log('서버로부터 수신된 데이터:', data.data.toString());
  setDataFromServer(data);
});

const sendEvent = (handlerId, payload) => {
  socket.emit('event', {
    userId,
    clientVersion: CLIENT_VERSION,
    handlerId,
    payload,
  });
};

export { sendEvent };
