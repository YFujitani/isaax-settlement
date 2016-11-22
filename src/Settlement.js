"use strict";
import connectToStripe from 'stripe'
import connectToOauth2 from 'simple-oauth2'
import fs from 'fs'
import moment from 'moment'
import template from 'es6-template-strings'
import AWS from 'aws-sdk'

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

  sendPdf(data, s3config, done = null) {
    console.log('Settlement#sendPdf is called')
    const datetime = moment().format('YYYYMMDDHHmmss')

    const rendered = template(fs.readFileSync('./template/invoice.html', 'utf8'), data)
    fs.writeFileSync(`./tmp/html/invoice_${datetime}.html`, rendered)
    shell.exec(`wkhtmltopdf ./tmp/html/invoice_${datetime}.html ./tmp/pdf/invoice_${datetime}.pdf`, function(err){
      console.log('wkhtmltopdf is executed.')
      AWS.config.update({
      	accessKeyId: s3config.accessKeyId,
      	secretAccessKey: s3config.secretAccessKey,
      	region: s3config.region
      });
      const s3 = new AWS.S3()
      const params = {
        Bucket: s3config.bucket,
        Key: `invoice_${datetime}.pdf`,
        Body: fs.createReadStream(`./tmp/pdf/invoice_${datetime}.pdf`)
      }
      s3.putObject(params, function(err, data) {
        if (err) {
          console.log(err, err.stack) // an error occurred
          if (done) done() // for mocha test
        } else {
          console.log(data) // successful response
          if (done) done() // for mocha test
        }
      });
    })
  }

  // Promise test code
  // createPdf(data, s3config) {
  //   const datetime = moment().format('YYYYMMDDHHmmss')
  //   const rendered = template(fs.readFileSync('./template/invoice.html', 'utf8'), data)
  //   fs.writeFileSync(`./tmp/html/invoice_${datetime}.html`, rendered)
  //   return new Promise(function (resolve, reject) {
  //     shell.exec(`wkhtmltopdf ./tmp/html/invoice_${datetime}.html ./tmp/pdf/invoice_${datetime}.pdf`, function(err){
  //       if (err) {
  //         reject(err)
  //       } else {
  //         resolve({
  //           path: `./tmp/pdf/invoice_${datetime}.pdf`,
  //           key: `invoice_${datetime}.pdf`,
  //           s3config: s3config
  //         })
  //       }
  //     })
  //   })
  // }
  // uploadS3(args) {
  //   console.log('uploadS3 is called')
  //   console.log(args)
  //   AWS.config.update({
  //     accessKeyId: args.s3config.accessKeyId,
  //     secretAccessKey: args.s3config.secretAccessKey,
  //     region: args.s3config.region
  //   });
  //   const s3 = new AWS.S3()
  //   const params = {
  //     Bucket: args.s3config.bucket,
  //     Key: args.key,
  //     Body: fs.createReadStream(args.path)
  //   }
  //   return new Promise(function (resolve, reject) {
  //     s3.putObject(params, function(err, data) {
  //       if (err) {
  //         console.log(err, err.stack)
  //         reject(err)
  //       } else {
  //         console.log(data)
  //         resolve()
  //       }
  //     });
  //   })
  // }

}
