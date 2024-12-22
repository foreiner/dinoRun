import { addUserPosition } from "../models/userPosition.model.js";

export const userPosition = (userId, payload) => {
  if(userId === null) return { status: 'success'}
    // 유저 정보 저장
    addUserPosition(userId,payload);

  return { status: 'success' };
};

