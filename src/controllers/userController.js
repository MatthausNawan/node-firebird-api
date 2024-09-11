const UserModel = require("../model/userModel");

module.exports = {
  login: async (req, res) => {
    const cpf = req.query.cpf;

    if (!cpf) {
      res.status(400).json({ error: "CPF é obrigatório" });
    }

    await UserModel.getUserByCPF(cpf, (data) => {
      
      if (!data || data.length === 0) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }

      return res.json(data);
    });
  },
};
