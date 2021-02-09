import mongoose from 'mongoose';
import * as contactModel from '../models/Contact.js';

const Contact = mongoose.model('contacts');

async function createContact(newContact) {
	const contact = new Contact(newContact);
	contact.save();

    return contact;
}

export { createContact };
