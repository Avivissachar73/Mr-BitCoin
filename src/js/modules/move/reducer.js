// import {combineReducers} from 'redux';

const INITIAL_STATE = {
    currMove: null,
    moves: []
}

export default function moveReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_CURR_MOVE':
            return {
                ...state,
                currMove: action.currMove
            }
        case 'SET_MOVES':
            return {
                ...state,
                moves: action.moves
            }
        case 'SAVE_MOVE':
            var moves = state.moves;
            var idx = moves.find(currMove => currMove._id === action.move._id);
            if (idx !== -1) moves.splice(idx, 1, action.move); 
            else moves.unshift(action.move);
            return {
                ...state,
                moves: [...moves]
            }
        default: 
            return state
    }
}