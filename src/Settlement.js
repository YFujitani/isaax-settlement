"use strict";
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
}
