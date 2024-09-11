const pool = require("../config/fb");

class BillModel {
  static getBillsFromCustomer(customerCod, callback) {
    const year = '2024';

    pool.get((err, db) => {
      if (err) throw err;

       db.query(
        `SELECT	NOSSONUMEROBOLETO,
        QRCODEPIXBOLETO,
        VALORBOLETO,
        JUROS,
        DATADOC,
        DATAVENC,
        DATAEMISSAO,
        NOSSONUMERO,
        DOCCODIGO,
        CODDOCBOLETO,
        DATABAIXA FROM DOCUMENTOSBOLETO DB
            WHERE DB.codcliente = ? AND EXTRACT (YEAR FROM db.datadoc) = ?`,
        [customerCod,year],
        (err, result) => {
          if (err) throw err;
          callback(result);
          db.detach();
        }
      );
    });
  }
}

module.exports = BillModel;
