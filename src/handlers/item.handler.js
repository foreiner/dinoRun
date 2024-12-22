import { getGameAssets } from '../init/assets.js';
import { getStage } from '../models/stage.model.js';
export const checkitem = (userId, payload) => {
    const {itemId} = payload;
    const stage = getStage();
    if((stage === 1 && itemId > 1)||
stage === 2 && (itemId<2 || itemId>7)||
stage === 3 && itemId<8){
    return { status: 'ELIMINATED' };
}
  return { status: 'success' };
};

