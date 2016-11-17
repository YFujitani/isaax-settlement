"use strict";
import connectToStripe from 'stripe'
import moment from 'moment'

import shell from "./shellHelper";

export default class Settlement {
  constructor() {
    console.log('Settlement#constructor is called')
  }
  generate() {
    console.log('Settlement#generate is called')
  }
  nativeCall() {
    console.log('Settlement#nativeCall is called')
    shell.exec('ls -la', function(err){
      console.log('executed test');
    });
  }
  createCardToken() {
    console.log('Settlement#createCardToken is called')
    const stripe = connectToStripe('SET_TOKEN');
    const t = stripe.tokens.create({
      card: {
        "number": '4242424242424242',
        "exp_month": 12,
        "exp_year": 2017,
        "cvc": '123'
      }
    }, function(err, token) {
      // asynchronously called
      if (token) return token;
    });
    console.log(t);
  }
  charge() {
    console.log('Settlement#charge is called')
    const stripe = connectToStripe('SET_TOKEN');
    stripe.charges.create({
      amount: 2000,
      currency: "usd",
      source: "tok_189fan2eZvKYlo2CaP40I543", // obtained with Stripe.js
      description: "Charge for natalie.wilson@example.com"
    }, function(err, charge) {
      // asynchronously called
      console.log(charge)
    });
  }
  wkhtmltopdf() {
    console.log('Settlement#wkhtmltopdf is called')
    // TODO ファイルの命名規則検討
    shell.exec(`wkhtmltopdf ./template/index.html ./tmp/pdf/invoice_${moment().format('YYYYMMDDHHmmss')}.pdf`, function(err){
      console.log('executed test');
    });
  }
}
