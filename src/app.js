const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(bodyParser.json());

//#rotas
// const userRoutes = require("./routes/userRoutes");
const billRoutes = require("./routes/billRoutes");

// app.use(userRoutes);
app.use(billRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
