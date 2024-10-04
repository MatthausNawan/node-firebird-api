const { Bancos, Boletos, streamToPromise } = require("gerar-boletos");
const BillModel = require("../model/billModel");
const path = require('path');

module.exports = {
  getBoleto: (req, res) => {
    const boleto = {
      banco: new Bancos.BancoBrasil(),
      pagador: {
        nome: "José Bonifácio de Andrada",
        registroNacional: "12345678",
        endereco: {
          logradouro: "Rua Pedro Lessa, 15",
          bairro: "Centro",
          cidade: "Rio de Janeiro",
          estadoUF: "RJ",
          cep: "20030-030",
        },
      },
      instrucoes: [
        "Após o vencimento Mora dia R$ 1,59",
        "Após o vencimento, multa de 2%",
      ],
      beneficiario: {
        nome: "Empresa Fictícia LTDA",
        cnpj: "43576788000191",
        dadosBancarios: {
          carteira: "09",
          agencia: "18455",
          agenciaDigito: "4",
          conta: "1277165",
          contaDigito: "1",
          nossoNumero: "00000000061",
          nossoNumeroDigito: "8",
        },
        endereco: {
          logradouro: "Rua Pedro Lessa, 15",
          bairro: "Centro",
          cidade: "Rio de Janeiro",
          estadoUF: "RJ",
          cep: "20030-030",
        },
      },
      boleto: {
        numeroDocumento: "1001",
        especieDocumento: "DM",
        valor: 110.0,
        datas: {
          vencimento: "02-04-2020",
          processamento: "02-04-2019",
          documentos: "02-04-2019",
        },
      },
    };

    const filename = boleto.beneficiario.nossoNumero;

    const novoBoleto = new Boletos(boleto);
    novoBoleto.gerarBoleto();

    novoBoleto      
      .pdfFile(filename)
      .then(async ({ stream }) => {
        // ctx.res.set('Content-type', 'application/pdf');
        await streamToPromise(stream);
      })
      .catch((error) => {
        return error;
      });

    res.json({ success: true, url: `./tmp/boletos/"${filename}.pdf` });
  },
  getBills:async(req,res) => {
    const customerCod = req.query.customerCod;

    if (!customerCod) {
      res.status(400).json({ error: "CPF é obrigatório" });
    }

    await BillModel.getBillsFromCustomer(customerCod, (data) => {

      if (!data || data.length === 0) {
        return res.status(404).json({ message: "Nenhum registro" });
      }

      return res.json(data);
    });
  },
  download:async(req,res) => {

    
    const filePath = path.join(__dirname, '../','public', 'boleto_pdf.pdf');
  
    // Enviar o arquivo para downloads
    res.download(filePath, (err) => {
      if (err) {
        // Se ocorrer algum erro durante o download
        console.error('Erro ao tentar baixar o arquivo:', err);
        res.status(500).send('Erro ao tentar baixar o arquivo.');
      }
    });
  }
};
