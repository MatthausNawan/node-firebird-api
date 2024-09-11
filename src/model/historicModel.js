const pool = require("../config/fb");

class HistoricModel {
  static getHistoricByCustomer(cpf, customerCod, callback) {
    const year = '2024';

    pool.get((err, db) => {
      if (err) throw err;
       db.query(
        `SELECT
        C2.ENVELOPE,
        C2.CLIRAZAOSOCIAL,
        C2.CLINOME,
        C2.CLICPF,
        LEITURAANTERIOR,
        LEITURAATUAL,
        CONSUMOM3,
        CONSUMOKG,
        VALORGLP AS PRECOKG,
        TAXAOPERACIONAL,
        IIF(ATINGIUQTDEMINIMA = 'S', VALORTOTALGLP, 0) AS VALORGLP,
        IIF(ATINGIUQTDEMINIMA = 'S', VALORTOTALGLP + TAXAOPERACIONAL, 0) AS VALORTOTALGLP,
        ATINGIUQTDEMINIMA,
        DATAPEDIDO AS DTLEITURAATUAL,
	(
	SELECT
		MAX(DATAPEDIDO)
	FROM
		PEDIDOSVENDA
	WHERE
		DATAPEDIDO < PV.DATAPEDIDO
		AND CODTABELAPRECO = CON.CONV_CODTABELAPRECO) AS DTLEITURAANTERIOR,
	(
	SELECT
		DOCVCTO
	FROM
		DOCUMENTOS
	INNER JOIN REL_DOCS_DOCS RDD ON
		RDDCODDOC2 = DOCCODIGO
	WHERE
		RDDCODDOC1 = PV.CODDOCUMENTO) AS VCTO
FROM
	CLIENTES C
INNER JOIN CONVENIOS CON ON
	CON.CONV_CODCLIENTE = CLICODIGO
INNER JOIN PEDIDOSVENDA PV ON
	PV.CODTABELAPRECO = CON.CONV_CODTABELAPRECO
INNER JOIN CLIENTES C2 ON
	C2.CLICODIGO = PV.codcliente
WHERE
	PV.CANCELADO <> 'S'
	AND
  PV.BLOQUEAR = 'S'
	AND
	--CONV_CODIGO = :CONV_CODIGO AND
	CONV_STATUS = 'A'
	AND
  C2.clicodigo = ?
	AND
	        C2.clicpf = ? ORDER BY 1`,                
        [customerCod,cpf],
        (err, result) => {
          if (err) throw err;
          callback(result);
          db.detach();
        }
      );
    });
  }
}

module.exports = HistoricModel;
