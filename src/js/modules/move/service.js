import contactService from '../contact/ContactService.js';


export default {
    sendMony,
    query,
    save,
    remove,
}

const MOVES_KEY = 'moves';

var gMoves = _createMoves();

function _createMoves() {
  var moves = localStorage[MOVES_KEY];
  if (moves) moves = JSON.parse(moves);
  else moves = [];
  return moves;
}


function saveToStorage() {
    console.log('saving', gMoves);
    localStorage[MOVES_KEY] = JSON.stringify(gMoves);
}


async function query() {
    console.log('getting:', gMoves);
    return Promise.resolve(gMoves);
}

async function save(move) {
    if (move._id) {
        var idx = gMoves.find(curr => curr._id === move._id);
        if (idx !== -1) {
            gMoves.splice(idx, 1, move);
            return Promise.resolve(move);
        }
    } else {
        move._id = _makeId();
        gMoves.unshift(move);
    }
    saveToStorage();
    return Promise.resolve(move);
}

async function remove(move) {
    var idx = gMoves.find(curr => curr._id === move._id);
    if (idx !== -1) {
        gMoves.splice(idx, 1);
        saveToStorage();
        return Promise.resolve(move);
    } else {
        return Promise.reject('something went wrong, cant remove');
    }
}


async function sendMony(fromUser, toUser, amount) {
    if (amount > fromUser.coins) return Promise.reject('Not enough money');

    fromUser.coins -= amount;
    toUser.coins += amount;

    await contactService.saveUser(fromUser);
    await contactService.saveContact(toUser);

    var newMove = creatNewMove(fromUser, toUser, amount);

    return save(newMove);
}


function creatNewMove(fromUser, toUser, amount) {
    return {
        createdAt: Date.now(),
        fromUser: {name: fromUser.username, _id: fromUser._id},
        toUser: {name: toUser.name, _id: toUser._id},
        amount
    }
}


function _makeId(length = 10) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
      txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
  }