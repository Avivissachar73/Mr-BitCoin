import React from 'react';

export default function ContactPreview({contact}) {

    return (
        <section className="contact-preview flex align-center wrap">
            <img src={contact.img || `https://api.adorable.io/avatars/285/${contact.name}.png`} alt=""/>
            <h3>Name: {contact.name}</h3>
            {/* <h3>Email: {contact.email}</h3>
            <h3>Phone: {contact.phone}</h3> */}
        </section>)
}