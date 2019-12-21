import React from 'react';

import {Link} from 'react-router-dom';

export default function ContactPreview({move}) {

    return (
        <section className="move-preview flex column space-between">
            <h3>from: {move.fromUser.name}</h3>
            <h3>to: <Link to={'/contact/'+move.toUser._id}>{move.toUser.name}</Link></h3>
            <h3>amount: {move.amount}$</h3>
        </section>)
}