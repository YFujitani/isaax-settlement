"use strict";
import connectToStripe from 'stripe'
import moment from 'moment'

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

  freeeUsers(access_token, config, callback = fetchMeHandler) {
    console.log('Settlement#freeeUsers is called')
    Freee.configure(config)
    const freee = new Freee({
      accessToken: access_token
    })
    console.log(freee)
    freee.me(callback)
  }
  fetchMeHandler(err, me) {
    if (err) return next(err)
    console.log('#fetchMeHandler')
    console.log(me)
  }

  freeeDeals(access_token, config, companyId, callback = fetchDealsHandler) {
    console.log('Settlement#freeeDeals is called')
    const freee = new Freee({
      accessToken: access_token
    })
    freee.deals(companyId, callback)
  }
  fetchDealsHandler(err, deals) {
    if (err) return next(err)
    console.log('#fetchDealsHandler')
    console.log(deals)
  }

  freeePostDeal(access_token, config, deal, callback = postDealHandler) {
    console.log('Settlement#freeePostDealUsers is called')
    Freee.configure(config)
    const freee = new Freee({
      accessToken: access_token
    })
    freee.postDeal(deal, callback)
  }
  postDealHandler(err, deals) {
    if (err) return next(err)
    console.log('#fetchPostDealHandler')
    console.log(deals)
  }

  wkhtmltopdf() {
    console.log('Settlement#wkhtmltopdf is called')
    // TODO ファイルの命名規則検討
    shell.exec(`wkhtmltopdf ./template/index.html ./tmp/pdf/invoice_${moment().format('YYYYMMDDHHmmss')}.pdf`, function(err){
      console.log('executed test')
    })
  }
}
