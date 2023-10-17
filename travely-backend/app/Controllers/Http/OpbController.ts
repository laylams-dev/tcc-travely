import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
/* eslint-disable prettier/prettier */
'use strict'
const https = require('https')
var axios = require('axios')
var fs = require('fs')

var certificado = fs.readFileSync("../certificates/homologacao-299337-TesteOPB.p12")

var credenciais = {
  client_id: 'Client_Id_ef9afe029a15771283f18f8bd50ff185815b86d0',
  client_secret: 'Client_Secret_9690384616d1f0d5f41c1c2c848191318aac350f',
}

var data = JSON.stringify({ grant_type: 'client_credentials' })
// eslint-disable-next-line @typescript-eslint/naming-convention
var data_credentials = credenciais.client_id + ':' + credenciais.client_secret

var auth = Buffer.from(data_credentials).toString('base64')

const baseInstance = axios.create({
    baseURL: 'https://openfinance-h.api.efipay.com.br',
    timeout: 1000,
    headers: {
        'Authorization': 'Basic ' + auth,
        'Content-Type': 'application/json',
    },
});

const agent = new https.Agent({
  pfx: certificado,
  passphrase: '',
})

var config = {
  method: 'POST',
  url: 'https://openfinance-h.api.efipay.com.br/v1/oauth/token',
  headers: {
    'Authorization': 'Basic ' + auth,
    'Content-Type': 'application/json',
  },
  httpsAgent: agent,
  data: data,
}

axios(config)
  .then(function (response) {
    console.log(JSON.stringify(response.data))
  })
  .catch(function (error) {
    console.log(error)
  })

export default class OpbController {
  public async auth({}: HttpContextContract) {
    const response = await baseInstance.post('/v1/oauth/token', data);
    return response.ok();
}
  public async getParticipants({params, response}: HttpContextContract) {
    const participants = await baseInstance.get('/v1/participantes', params);
    return response.ok(participants);
}

  public async requestPayment({params, response}: HttpContextContract) {
    const payment = await baseInstance.post('/v1/pagamentos/pix', params);
    return response.ok(payment);
}

  public async getPayment({params, response}: HttpContextContract) {
    const payment = await baseInstance.get('/v1/pagamentos/pix', params);
    return response.ok(payment);
}
}

