const path = require('path');

module.exports = {
  development: {
    dialect: 'sqlite',
    storage: path.join(__dirname, '..', 'database.sqlite3'),
    logging: (e) => {
      console.log('');
    },
  },
  test: {
    dialect: 'sqlite',
    storage: path.join(__dirname, '..', 'database.sqlite3'),
    logging: (e) => {
      console.log(e);
    },
  },
};
