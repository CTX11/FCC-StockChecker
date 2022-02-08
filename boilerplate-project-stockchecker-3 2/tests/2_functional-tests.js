const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  //  TEST #1
  test("Viewing one stock" ,  (done) => {
    chai.request(server)
      .get('/api/stock-prices?stock=tsla')
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.isObject(res.body)
        assert.isObject(res.body.stockData)
        assert.equal(res.body.stockData.stock, 'TSLA')
        done();
      })
  });
  //  TEST #2
  test("Viewing one stock and liking it" ,  (done) => {
    chai.request(server)
      .get('/api/stock-prices?stock=tsla&like=true')
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.isAtLeast(res.body.stockData.likes, 1)
        done();
      })
  });
  //  TEST #3
  test("Viewing the same stock and liking it again" ,  (done) => {
    chai.request(server)
      .get('/api/stock-prices?stock=goog&like=true')
      .end((err, res) => {
        assert.equal(res.status, 200)
        done();
      })
  });
  //  TEST #4
  test("Viewing two stocks" ,  (done) => {
    chai.request(server)
      .get('/api/stock-prices?stock=tsla&stock=goog')
      .end((err, res) => {
        assert.equal(res.status, 200)
        assert.isObject(res.body)
        assert.isArray(res.body.stockData)
        done();
      })
  });
  // TEST #5
  test("Viewing two stocks and liking them" ,  (done) => {
    chai.request(server)
      .get('/api/stock-prices?stock=goog&stock=tsla&like=true')
      .end((err, res) => {
        assert.equal(res.status, 200)
        done();
      })
  });
  
});