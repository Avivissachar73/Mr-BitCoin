import moveService from './service.js';



export const loadMoves = () => {
    return async (dispatch) => {
        return dispatch(setMoves(JSON.parse(JSON.stringify(await moveService.query()))));
    }
}
const setMoves = (moves) => {
    return {type: 'SET_MOVES', moves};
}



// export const loadCurrMove = (_id) => {
//     return async (dispatch) => {
//         return dispatch(setCurrMove(JSON.parse(JSON.stringify(await moveService.getMoveById(_id)))));
//     }
// }
// const setCurrMove = (currMove) => {
//     return {type: 'SET_CURR_MOVE', currMove};
// }





export const sendMoney = (fromUser, toUser, amount) => {
    return async (dispatch) => {
        return dispatch(setSaveMove(await moveService.sendMony(fromUser, toUser, amount)));
    }
}


export const saveMove = (move) => {
    return async (dispatch) => {
        return dispatch(setSaveMove(await moveService.saveMove(move)))
    }
}
const setSaveMove = (move) => {
    return {type: 'SAVE_MOVE', move};
}