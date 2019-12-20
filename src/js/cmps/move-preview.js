import React from 'react';

export default function ContactPreview({move}) {

    return (
        <section className="move-preview flex column">
            <h3>from: {move.fromUser.name}</h3>
            <h3>to: {move.toUser.name}</h3>
            <h3>amount: {move.amount}</h3>
        </section>)
}