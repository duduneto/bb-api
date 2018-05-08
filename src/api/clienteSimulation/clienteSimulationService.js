const Cliente = require('./clienteSimulation.js');
const nodemailer = require('nodemailer');

Cliente.methods(['post', 'get']);

const addClienteSimulation = (req, resp, next) => {
    const nome = req.body.nome;
    const email = req.body.email;
    const telefone = req.body.telefone;
    const cep = req.body.cep;

    console.log(nome, email, telefone, cep);
    const newCliente = new Cliente({nome,email,telefone,cep});
    newCliente.save(err => {
        if(err){
            resp.status(400).send({ erro: ['Houve algum erro']});
        } else {
            resp.status(201).send({msg: ['Tudo Ok, Cadastro Feito']});

            
            var smtpConfig = {
                host:'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'gulizraizer@gmail.com',
                    pass: 'fetho.100203'
                }
            }
            var transporter = nodemailer.createTransport(smtpConfig);
            const mailOptions = {
                from: 'gulizraizer@gmail.com', // sender address
                to: 'dudumatosneto@gmail.com', // list of receivers
                subject: 'Pedido de Simulação', // Subject line
                html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                <html xmlns="http://www.w3.org/1999/xhtml">
                <head>
                <meta name="viewport" content="width=device-width" />
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                <title>Billing e.g. invoices and receipts</title>
                <link href="styles.css" media="all" rel="stylesheet" type="text/css" />
                </head>
                
                <body itemscope itemtype="http://schema.org/EmailMessage">
                
                <table class="body-wrap">
                    <tr>
                        <td></td>
                        <td class="container" width="600">
                            <div class="content">
                                <table class="main" width="100%" cellpadding="0" cellspacing="0">
                                    <tr>
                                        <td class="content-wrap aligncenter">
                                            <table width="100%" cellpadding="0" cellspacing="0">
                                                <tr>
                                                    <td class="content-block">
                                                        <h1 class="aligncenter">Pedido de Simulação</h1>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="content-block">
                                                        <h2 class="aligncenter">${nome}</h2>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="content-block aligncenter">
                                                        <table class="invoice">
                                                            <tr>
                                                                <td></td>
                                                            </tr>
                                                            <tr>
                                                                <td>
                                                                    <table class="invoice-items" cellpadding="0" cellspacing="0">
                                                                        <tr>
                                                                            <td>Email:</td>
                                                                            <td class="alignright">${email}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>Telefone</td>
                                                                            <td class="alignright">${telefone}</td>
                                                                        </tr>
                                                                        <tr>
                                                                            <td>CEP</td>
                                                                            <td class="alignright">${cep}</td>
                                                                        </tr>
                                                                        
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr>
                                                
                                            </table>
                                        </td>
                                    </tr>
                                </table>
                                <div class="footer">
                                    <table width="100%">
                                        <tr>
                                            <td class="aligncenter content-block">Duvidas? Email <a href="mailto:">dudumatosneto@gmail.com</a></td>
                                        </tr>
                                    </table>
                                </div></div>
                        </td>
                        <td></td>
                    </tr>
                </table>
                
                </body>
                </html>`// plain text body
            };

            transporter.sendMail(mailOptions, function(err, info){
                if(err){
                    console.log(err);
                    
                } else{
                    console.log(info)
                
                }
            });

            
        }
    })
}

const getClientes = (req, resp, next) => {

    Cliente.find({}, (err, clientes) => {
        var array = [];
        clientes.forEach(cliente => {
            
            array.push(cliente);
        });
        
    console.log(array);
    resp.send(array);
    });
}

const removeCliente = (req, resp, next) => {
    Cliente.remove({_id: req.params.id}, err => {
        if(!err){
            resp.status(200).send({msg:['Cliente Removido']});
        } else {
            resp.status(404).send({error:['Cliente Não Removido']});
        }
    })
}

module.exports = { addClienteSimulation, getClientes, removeCliente };