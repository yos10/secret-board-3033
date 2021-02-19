【2020年度】プログラミング入門 Webアプリ
第3章 第 34 講 Heroku への安全な公開

Heroku にデプロイ後、https://xxxxx-xxxxx-XXXXX.herokuapp.com/posts で Application error が表示され、
heroku logs コマンドで以下のエラーが表示された場合は

Unhandled rejection SequelizeConnectionError: no pg_hba.conf entry for host "xxxx", user "xxxx", database "xxxx", SSL off

lib/post.js の

```JavaScript
const sequelize = new Sequelize(
  process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost/secret_board',
  {
    logging: false
  });
```
を以下のように変更するといいらしい

```JavaScript
const sequelize = new Sequelize(
  process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost/secret_board',
  {
    logging: false,
    dialectOptions: {
      ssl: true
    }
  });
```

Can't use SSL with Postgres · Issue #956 · sequelize/sequelize · GitHub  
https://github.com/sequelize/sequelize/issues/956#issuecomment-147745033

それとは別に  
```
UnhandledPromiseRejectionWarning: SequelizeConnectionError: self signed certificate
```
というエラーが表示された場合は以下のようにする

```javascript
const sequelize = new Sequelize(
  process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost/secret_board',
  {
    logging: false,
    dialectOptions: {
      ssl: true,
      rejectUnauthorized: false,
    }
  });
```

https://github.com/hirunet/react-tutorial2-server/commit/c404a89d919382458a34d65e5c6b8665ae26cb5a
