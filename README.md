【2020年度】プログラミング入門 Webアプリ
第3章 第 34 講 Heroku への安全な公開

Heroku にデプロイ後、https://xxxxx-xxxxx-XXXXX.herokuapp.com/posts で Application error が表示され、
heroku logs --tail コマンドで以下のエラーが表示された場合は

Unhandled rejection SequelizeConnectionError: no pg_hba.conf entry for host "xxxx", user "xxxx", database "xxxx", SSL off

lib/post.js の

```JavaScript
const sequelize = new Sequelize(
  process.env.DATABASE_URL || 'postgres://postgres:postgres@localhost/secret_board',
```
を以下のように変更するといいらしい

```JavaScript
const sequelize = new Sequelize(
  process.env.DATABASE_URL + '?ssl=true' || 'postgres://postgres:postgres@localhost/secret_board',
```

Add ssl option to uri for postgres by justinkalland · Pull Request #10025 · sequelize/sequelize · GitHub

https://github.com/sequelize/sequelize/pull/10025

Can't use SSL with Postgres · Issue #956 · sequelize/sequelize · GitHub

https://github.com/sequelize/sequelize/issues/956#issuecomment-147745033

---

Heroku のヘルプに 

> Postgres 接続で ​sslmode=require​ パラメータを設定する必要がある場合もあります。

と書いてあるので、その設定ができる方法であれば何でもいいんでしょうね。

Heroku Postgres | Heroku Dev Center
https://devcenter.heroku.com/ja/articles/heroku-postgresql#heroku-postgres-ssl


フォーラムにあった方法
https://www.nnn.ed.nico/questions/21540

https://www.postgresql.jp/document/8.1/html/libpq-envars.html
