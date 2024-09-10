const pool = require("../config/fb");

class UserModel {
  static getUserByCPF(cpf, callback) {
    pool.get((err, db) => {
      if (err) throw err;

      db.query(
        "SELECT CLICODIGO,CLINOME,CLICPF FROM CLIENTES WHERE CLICPF = ?",
        [cpf],
        (err, result) => {
          if (err) throw err;

          callback(result);
          db.detach();
        }
      );
    });
  }
}

module.exports = UserModel;
