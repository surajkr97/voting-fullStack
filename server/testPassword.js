const bcrypt = require('bcrypt');

const plaintextPassword = 'b'; // The password you think is correct
const hashedPassword = '$2b$10$LAzgIB.6WymvdjYHrTc7juUOJBPe4Wda7hthdtp.wipT/KEdGv6c.'; // The hashed password from your database

bcrypt.compare(plaintextPassword, hashedPassword, (err, result) => {
  if (err) {
    console.error('Comparison error:', err);
  } else if (result) {
    console.log('Success! Passwords match.');
  } else {
    console.log('Failure! Passwords DO NOT match.');
  }
});