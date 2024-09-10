const UserModel = require("../model/userModel");

module.exports = {
  login: (req, res) => {
    const cpf = req.query.cli_cpf;

    if (!cpf) {
      res.status(400).json({ error: "CPF é obrigatório" });
    }

    UserModel.getUserByCPF(cpf, (data) => {
      if (!data || data.length === 0) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      res.json(data);
    });
  },
};
