"use strict";
import assert from 'power-assert'
import Settlement from "../src/Settlement";
import {textlint} from "textlint"
describe("Settlement-test", function () {
  afterEach(function () {
      textlint.resetRules()
  });
  describe("#generate()", ()=> {
    let settlement = new Settlement()
    settlement.generate()
  });
  describe("#nativeCall()", ()=> {
    let settlement = new Settlement()
    settlement.nativeCall()
  });
  describe("#wkhtmltopdf()", ()=> {
    let settlement = new Settlement()
    settlement.wkhtmltopdf()
  });
});
