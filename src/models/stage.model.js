// 모두가 동일한 스테이지를 플레이이
let stages = 1;

export const getStage = () => {
  return stages;
};

export const setStage = (id) => {
    console.log(`setStage ${id}`);
  return stages = id;
};

export const clearStage = (uuid) => {
  return stages = 0;
};
