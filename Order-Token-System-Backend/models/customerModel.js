import { Schema, model } from 'mongoose';

const customerSchema = new Schema({
  firstName: {
    type: String,
    required: [true, 'Please enter your first name.'],
    trim: true,
    match: [/^[A-Za-z]+$/, 'Please enter a first name containing only English letters.']
  },
  lastName: {
    type: String,
    required: [true, 'Please enter your last name.'],
    trim: true,
    match: [/^[A-Za-z]+$/, 'Please enter a last name containing only English letters.']
  },
  email: {
    type: String,
    required: [true, 'Please enter your email address.'],
    trim: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Please enter a valid email address.']
  },
  password: {
    type: String,
    required: [true, 'Please enter a new password.'],
    minlength: [8, 'Password must be at least 8 characters long.'],
  }
});

const Customer = model('Customer', customerSchema);
export default Customer;