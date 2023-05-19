import { Schema, model } from 'mongoose';

const outletSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Outlet name is required.'],
    trim: true,
    match: [/^[A-Za-z ]+$/,  `Outlet name can only contain letters and spaces.`],
  },
  address: {
    type: String,
    required: [true, 'Outlet address is required.'],
    trim: true,
    match: [/^[a-zA-Z0-9\s,'-]*$/, `Please enter a valid address without special characters or symbols.`],
  },
  phoneNo: {
    type: String,
    required: [true, 'Outlet phone number is required.'],
    trim: true,
    match: [/^\d{10}$/, `Phone number must be 10 digits long.`]
  },
  email: {
    type: String,
    required: [true, 'Outlet email address is required.'],
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, `Please enter a valid email address.`]
  },
  password: {
    type: String,
    required: [true, 'Password is required.'],
    minlength: 8,
    message: 'Password must be at least 8 characters long.'
  },
});

const Outlet = model('Outlet', outletSchema);

export default Outlet;