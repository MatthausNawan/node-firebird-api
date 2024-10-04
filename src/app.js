const express = require("express");
const path = require('path');
const bodyParser = require("body-parser");

const app = express();

const PORT = process.env.PORT || 3000;


// Middleware para parsear JSON
app.use(bodyParser.json());
app.use('/public', express.static(path.join(__dirname,'../' ,'tmp','boletos')));

//#rotas
const userRoutes = require("./routes/userRoutes");
const billRoutes = require("./routes/billRoutes");
const historicRoutes = require('./routes/historicRoutes');

// app.use(userRoutes);
app.use(billRoutes);
app.use(userRoutes);
app.use(historicRoutes);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);  
});
