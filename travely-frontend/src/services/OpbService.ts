/* eslint-disable prettier/prettier */
'use strict'
const https = require('https')
const axios = require('axios')
const fs = require('fs')

const certificado = fs.readFileSync('../certificates/homologacao-299337-TesteOPB.p12')

const credenciais = {
  client_id: 'Client_Id_ef9afe029a15771283f18f8bd50ff185815b86d0',
  client_secret: 'Client_Secret_9690384616d1f0d5f41c1c2c848191318aac350f',
}

const data = JSON.stringify({ grant_type: 'client_credentials' })
// eslint-disable-next-line @typescript-eslint/naming-convention
const data_credentials = credenciais.client_id + ':' + credenciais.client_secret

const auth = Buffer.from(data_credentials).toString('base64')

const agent = new https.Agent({
  pfx: certificado,
  passphrase: '',
})

const config = {
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
  .then(function (response: { data: any }) {
    console.log(JSON.stringify(response.data))
  })
  .catch(function (error: any) {
    console.log(error)
  })

const OpbService = {
    
}
