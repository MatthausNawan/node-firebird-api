require("dotenv").config();

const Firebird = require("node-firebird");

const options = {
  host: "206.42.57.236",
  port: 3050,
  database: "C:/Olimpus/Olimpus/OLIMPUS.fdb",
  user: "sysdba",
  password: "masterkey",
  role: null, // opcional
  pageSize: 4096, // opcional
};

Firebird.attach(options, (err, db) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    return;
  }

  console.log("Conexão bem-sucedida ao banco de dados!");
});

const pool = Firebird.pool(5, options);

module.exports = pool;
