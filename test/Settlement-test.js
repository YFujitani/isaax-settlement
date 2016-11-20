"use strict";
import assert from 'power-assert'
import Settlement from "../src/Settlement";
import {textlint} from "textlint"
describe("Settlement-test", function () {

  // TODO 引数で渡すよう変更
  const stripe = {
    chargeApiSk: 'sk_test_XXX',
    customerListApiSk: 'sk_test_XXX'
  }
  const freee = {
    access_token: 'XXX',
    config: {
      appId: 'XXX',
      secret: 'XXX',
      callback: 'http://hogehoge.fuga'
    },
    companyId: 813452
  }

  afterEach(function () {
      textlint.resetRules()
  });

  // TODO テストの成否判定
  describe("#customerListStripe()", ()=> {
    it('customerListStripe return 2 customers', function(done) {
      let settlement = new Settlement()
      settlement.customerListStripe(stripe.customerListApiSk, {}, (err, customers) => {
        if (err) console.log(err)
        console.log(customers.data.length)
        done()
      })
    })
  });

  describe("#chargeStripe()", ()=> {
    it('chargeStripe is success', function(done) {
      let settlement = new Settlement()
      let params = {
        amount: 2000,
        currency: "usd",
        customer: "cus_9axc9sb1xynFXy",
        description: "Charge for william.thomas.64@example.com"
      }
      settlement.chargeStripe(stripe.chargeApiSk, params, (err, charge) => {
        if (err) console.log(err)
        console.log(charge)
        done()
      })
    })
  });

  describe("#freeeUsers()", ()=> {
    it('freeeUsers is success', function(done) {
      const settlement = new Settlement()
      settlement.freeeUsers(access_token, config, (err, me) => {
        console.log('#fetchMeHandler')
        if (err) console.log(err)
        console.log(me)
        done()
      })
    })
  });
  describe("#freeeDeals()", ()=> {
    it('freeeDeals is success', function(done) {
      let settlement = new Settlement()
      settlement.freeeDeals(access_token, config, companyId, (err, deals) => {
        console.log('#fetchDealsHandler')
        if (err) console.log(err)
        console.log(deals)
        done()
      })
    })
  });
  describe("#freeePostDeal()", ()=> {
    it('freeePostDeal is success', function(done) {
      let settlement = new Settlement()
      const deal = {
        "company_id" : freee.companyId,
        "issue_date" : "2016-11-21",
        "due_date" : "2016-11-30",
        "type" : "expense",
        "details" : [
          {
            "account_item_id" : 128318538,
            "tax_id" : 64925877,
            "tax_code" : 2,
            "amount" : 225250,
            "description" : "備考"
          }
        ]
        // "payments" : [
        //   {
        //     "date" : "2013-01-28",
        //     "from_walletable_type" : "bank_account",
        //     "from_walletable_id" : 103,
        //     "amount" : 5250
        //   }
        // ]
      }
      settlement.freeePostDeal(freee.access_token, freee.config, deal, (err, deals) => {
        console.log('#postDealHandler')
        if (err) {
          console.log('#postDealHandler error')
          console.log(err)
          console.log(err.errors[0].messages)
        }
        console.log(deals)
        done()
      })
    })
  });



});
