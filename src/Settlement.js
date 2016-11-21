"use strict";
import connectToStripe from 'stripe'
import connectToOauth2 from 'simple-oauth2'
import fs from 'fs'
import moment from 'moment'
import template from 'es6-template-strings'

import shell from "./shellHelper";
import Freee from "./freee/freee-api"

export default class Settlement {
  constructor() {
    console.log('Settlement#constructor is called')
  }

  chargeStripe(sk, params, callback = chargeStripeHandler) {
    console.log('Settlement#charge is called')
    // API毎にsercret keyが必要な模様
    const stripe = connectToStripe(sk)
    stripe.charges.create(params, callback);
  }
  chargeStripeHandler(err, charge) {
    if (err) console.log(err)
    console.log(charge)
  }

  customerListStripe(sk, params, callback) {
    console.log('Settlement#customerListStripe is called')
    // API毎にsercret keyが必要な模様
    const stripe = connectToStripe(sk)
    stripe.customers.list(params, callback)
  }

  freeeCreateDeal(credentials, tokenConfig, config, deal, done) {
    const oauth2 = connectToOauth2.create(credentials)
    oauth2.ownerPassword.getToken(tokenConfig, (error, result) => {
      Freee.configure(config)
      const freee = new Freee({ accessToken: result.access_token })
      freee.postDeal(deal, (err, deals) => {
        if (err) {
          console.log(err)
          console.log(err.errors[0].messages)
        }
        console.log(deals)
        if (done) done() // for mocha test
      })
    })
  }

  sendPdf(data) {
    console.log('Settlement#sendPdf is called')
    const datetime = moment().format('YYYYMMDDHHmmss')

    const rendered = template(fs.readFileSync('./template/invoice.html', 'utf8'), data)
    fs.writeFileSync(`./tmp/html/invoice_${datetime}.html`, rendered)
    shell.exec(`wkhtmltopdf ./tmp/html/invoice_${datetime}.html ./tmp/pdf/invoice_${datetime}.pdf`, function(err){
      console.log('executed test')
    })
  }
}
