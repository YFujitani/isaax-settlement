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
    companyId: 813452,
    credentials: {
      client: { // https://secure.freee.co.jp/oauth/applications/
        id: 'XXX', // App ID
        secret: 'XXX' // Secret
      },
      auth: {
        tokenHost: 'https://secure.freee.co.jp' // ここはこのまま
      }
    },
    tokenConfig: {
      username: 'aaaaa@test.com', // freee login mail
      password: 'password' // freee login password
    }
  }

  afterEach(function () {
      textlint.resetRules()
  });

  // // TODO テストの成否判定
  // describe("#customerListStripe()", ()=> {
  //   it('customerListStripe return 2 customers', function(done) {
  //     let settlement = new Settlement()
  //     settlement.customerListStripe(stripe.customerListApiSk, {}, (err, customers) => {
  //       if (err) console.log(err)
  //       console.log(customers.data.length)
  //       done()
  //     })
  //   })
  // });
  //
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


  // describe("#freeeDeals()", ()=> {
  //   it('freeeDeals is success', function(done) {
  //     let settlement = new Settlement()
  //     settlement.freeeDeals(access_token, config, companyId, (err, deals) => {
  //       console.log('#fetchDealsHandler')
  //       if (err) console.log(err)
  //       console.log(deals)
  //       done()
  //     })
  //   })
  // });
  // describe("#freeeOauth()", ()=> {
  //   it('freeeOauth is success', function(done) {
  //     let settlement = new Settlement()
  //     // const tokenConfig = {
  //     //   username: 'tiny00062000+free_api_test@gmail.com',
  //     //   password: 'kingkaji21'
  //     // }
  //     const tokenConfig = {}
  //     settlement.freeeOauth(freee.credentials, tokenConfig, (err, result) => {
  //       console.log('#freeeOauthHandler')
  //       if (err) console.log(err)
  //       console.log(result)
  //       done()
  //     })
  //   })
  // });
  // describe("#freeePostDeal()", ()=> {
  //   it('freeePostDeal is success', function(done) {
  //     let settlement = new Settlement()
  //     const deal = {
  //       "company_id" : freee.companyId,
  //       "issue_date" : "2016-11-21",
  //       "due_date" : "2016-11-30",
  //       "type" : "expense",
  //       "details" : [
  //         {
  //           "account_item_id" : 128318538,
  //           "tax_id" : 64925877,
  //           "tax_code" : 2,
  //           "amount" : 225250,
  //           "description" : "備考"
  //         }
  //       ]
  //       // "payments" : [
  //       //   {
  //       //     "date" : "2013-01-28",
  //       //     "from_walletable_type" : "bank_account",
  //       //     "from_walletable_id" : 103,
  //       //     "amount" : 5250
  //       //   }
  //       // ]
  //     }
  //     settlement.freeePostDeal(freee.access_token, freee.config, deal, (err, deals) => {
  //       console.log('#postDealHandler')
  //       if (err) {
  //         console.log('#postDealHandler error')
  //         console.log(err)
  //         console.log(err.errors[0].messages)
  //       }
  //       console.log(deals)
  //       done()
  //     })
  //   })
  // });

  describe("#freeeCreateDeal()", ()=> {
    it('freeeCreateDeal is success', function(done) {
      let settlement = new Settlement()
      const deal = {
        "company_id" : freee.companyId,
        "issue_date" : "2016-11-21",
        "due_date" : "2016-12-30",
        "type" : "expense",
        "details" : [
          {
            "account_item_id" : 128318538,
            "tax_id" : 64925877,
            "tax_code" : 2,
            "amount" : 9999,
            "description" : "備考備考備考備考備考備考備考"
          }
        ]
      }
      settlement.freeeCreateDeal(freee.credentials, freee.tokenConfig, freee.config, deal, done)
    })
  });

  describe("#sendPdf()", ()=> {
    it('sendPdf is success', function(done) {
      const settlement = new Settlement()
      const data = {
        invoiceNo: '7777',
        createDate: '2016年1月1日',
        user: {
          name: 'てすと',
          tel: '1234-56-7890',
          mail: 'aaaaaaaaaa@bbbbbbb.com',
          paymentMethod: '銀行振込',
          paymentDetail: 'hogehoge支店　普通　12345−678901'
        },
        amount: '¥ 10,000',
        option: '¥ 10,000',
        tax: '¥ 1,600',
        total: '¥ 21,600'
      }
      settlement.sendPdf(data)
    })
  });


});
