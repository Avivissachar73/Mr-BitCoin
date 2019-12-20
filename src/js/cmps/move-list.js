import React from 'react';

import {Link} from 'react-router-dom';

import MovePreview from './move-preview.js';

export default function MoveDetails({moves, removeMove}) {

    return moves &&
            <ul className="move-list flex column clean-list">
                <hr/>
                {moves.map(move => {
                    return <li key={move._id} className="width-content">
                            <MovePreview move={move}/>
                            <hr/>
                        </li>
                })}
            </ul>
}