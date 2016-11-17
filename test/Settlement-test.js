"use strict";
import assert from 'power-assert'
import Settlement from "../src/Settlement";
import {textlint} from "textlint"
describe("Settlement-test", function () {
  afterEach(function () {
      textlint.resetRules()
  });
  describe("#createCardToken()", ()=> {
    let settlement = new Settlement()
    settlement.createCardToken()
  });
  // describe("#wkhtmltopdf()", ()=> {
  //   let settlement = new Settlement()
  //   settlement.wkhtmltopdf()
  // });
});
