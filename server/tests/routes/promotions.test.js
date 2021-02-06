const chai = require("chai");
const request = require("supertest");
const expect = chai.expect;
const HttpStatus = require("http-status-codes");
const app = require("../../src/app");

describe("GET /api/promotions", function () {
  it("should GET promotions array", function (done) {
    request(app)
      .get("/api/getPromotions")
      .end(function (err, res) {
        expect(res.status).to.eq(HttpStatus.OK);
        expect(res.body).to.be.an("array");
        done();
      });
  });
});

describe("GET to not existing path", function () {
  it("should response with 404", function (done) {
    request(app)
      .get("/api/notexisting")
      .end(function (err, res) {
        expect(res.status).to.eq(HttpStatus.NOT_FOUND);
        done();
      });
  });
});
