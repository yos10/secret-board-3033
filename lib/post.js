'use strict';

// if (process.env.DATABASE_URL) {
//   const pg = require('pg');
//   pg.defaults.ssl = true;
// }

const Sequelize = require('sequelize');
const sequelize = new Sequelize(
  process.env.DATABASE_URL + '?ssl=true' || 'postgres://postgres:postgres@localhost/secret_board',
  {
    logging: false,
    // dialectOptions: {
    //   ssl: true
    // }
  });
const Post = sequelize.define('Post', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  content: {
    type: Sequelize.TEXT
  },
  postedBy: {
    type: Sequelize.STRING
  },
  trackingCookie: {
    type: Sequelize.STRING
  }
}, {
    freezeTableName: true,
    timestamps: true
  });

Post.sync();
module.exports = Post;