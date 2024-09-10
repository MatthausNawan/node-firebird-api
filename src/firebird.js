const Firebird = require("node-firebird");

// Configurações da conexão com o banco de dados
const options = {
  host: "206.42.57.236",
  port: 3050,
  database: "C:/Olimpus/Olimpus/OLIMPUS.fdb",
  user: "sysdba",
  password: "masterkey",
  role: null, // opcional
  pageSize: 4096, // opcional
};

// Função para conectar ao banco de dados
Firebird.attach(options, (err, db) => {
  if (err) {
    console.error("Erro ao conectar ao banco de dados:", err);
    return;
  }

  console.log("Conexão bem-sucedida ao banco de dados!");

  // Exemplo de uma query simples
  db.query(
    "SELECT CLICODIGO,CLINOME,CLICPF FROM CLIENTES WHERE CLICODIGO=1",
    (err, result) => {
      if (err) {
        console.error("Erro ao executar a query:", err);
      } else {
        console.log("Resultado da query:", result);
      }

      // Fecha a conexão após a consulta
      db.detach();
    }
  );
});
