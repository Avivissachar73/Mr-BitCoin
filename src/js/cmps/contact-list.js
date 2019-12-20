import React from 'react';

import {Link} from 'react-router-dom';

import ContactPreview from './contact-preview.js';

export default function ContactDetails({contacts, removeContact}) {

    return contacts &&
            <ul className="contact-list flex column clean-list">
                {contacts.map(contact => {
                    return <li key={contact._id} className="width-content flex wrap">
                            <Link to={`/contact/${contact._id}`}>
                                <ContactPreview contact={contact}/>
                            </Link>
                            <div className="flex column space-between btn-container">
                                <Link to={`/contact/edit/${contact._id}`}>Edit</Link>
                                <button onClick={() => removeContact(contact._id)}>Remove</button>
                            </div>
                        </li>
                })}
            </ul>
}