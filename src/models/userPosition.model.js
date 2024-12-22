const userPositions = {};

// 서버 메모리에 유저의 위치를 저장
// 이때 유저의 위치는 객체 형태로 저장
// { uuid: position; }; position을 `${x} ${y}` 형태로 저장 uuid로 조회를 빠르게
export const addUserPosition = (uuid, position) => {
    userPositions[uuid] = position;
};

// 전체 유저 위치치 조회
export const getUserPositions = () => {
  return userPositions;
};

// 유저 위치 조회
export const getUserPosition = (uuid) => {
  return userPositions[uuid];
};

// 배열에서 유저 위치 삭제
export const removeUserPosition = (uuid) => {
    
delete userPositions[uuid];
  };