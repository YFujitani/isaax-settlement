"use strict";
import shell from "./shellHelper";
import moment from 'moment'

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
  wkhtmltopdf() {
    console.log('Settlement#wkhtmltopdf is called')
    // TODO ファイルの命名規則検討
    shell.exec(`wkhtmltopdf ./template/index.html ./tmp/pdf/invoice_${moment().format('YYYYMMDDHHmmss')}.pdf`, function(err){
      console.log('executed test');
    });
  }
}
