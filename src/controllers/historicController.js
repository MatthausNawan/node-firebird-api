const HistoricModel = require("../model/historicModel");

module.exports = {
  getHistoric: async (req, res) => {
    const cpf = req.query.cpf;
    const customerCod = req.query.customerCod;

    if (!cpf || !customerCod){
      res.status(400).json({ error: "CPF e Código Cliente são obrigatórios" });
    }

    await HistoricModel.getHistoricByCustomer(cpf,customerCod, (data) => {
      
      if (!data || data.length === 0) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      return res.json(data);
    });
  },
};
