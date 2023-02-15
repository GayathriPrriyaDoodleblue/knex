const knex = require('knex')(require('./knexfile').development);
const users = () => knex('users1');
const newUser = { name: 'John', email: 'john@example.com' };

users().insert(newUser)
  .then(() => {
    console.log('User created successfully');
  })
  .catch((error) => {
    console.error(error);
  });
