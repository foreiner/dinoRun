import { moveStageHandler } from './stage.handler.js';
import { checkitem } from './item.handler.js';
import { userPosition } from './user.handler.js';
import { gameEnd } from './game.handler.js';
const handlerMappings = {
    3: gameEnd,
    4: checkitem,
    11: moveStageHandler,
    12: userPosition,
};

export default handlerMappings;
