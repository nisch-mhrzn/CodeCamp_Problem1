const chai = require('chai');
const { assert } = chai;
const server = require('../server'); // Ensure this path points correctly to your server file

const chaiHttp = require('chai-http');
chai.use(chaiHttp);

suite('Functional Tests', function () {
  this.timeout(5000);

  suite('Integration tests with chai-http', function () {
    // #1 Test GET /hello with no name
    test('Test GET /hello with no name', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/hello')
        .end(function (err, res) {
          assert.equal(res.status, 200, 'Response status should be 200');
          assert.equal(res.text, 'hello Guest', 'Response should greet "Guest"');
          done();
        });
    });

    // #2 Test GET /hello with your name
    test('Test GET /hello with your name', function (done) {
      chai
        .request(server)
        .keepOpen()
        .get('/hello?name=xy_z')
        .end(function (err, res) {
          assert.equal(res.status, 200, 'Response status should be 200');
          assert.equal(res.text, 'hello xy_z', 'Response should greet "xy_z"');
          done();
        });
    });

    // #3 Test PUT /travellers with a surname
    test('Send {surname: "Colombo"}', function (done) {
      chai
        .request(server)
        .keepOpen()
        .put('/travellers')
        .send({ surname: 'Colombo' })
        .end(function (err, res) {
          assert.equal(res.status, 200, 'Response status should be 200');
          assert.equal(res.type, 'application/json', 'Response should be JSON');
          assert.equal(res.body.name, 'Cristoforo', 'Name should be Cristoforo');
          assert.equal(res.body.surname, 'Colombo', 'Surname should be Colombo');
          done();
        });
    });

    // #4 Test PUT /travellers with another surname
    test('Send {surname: "da Verrazzano"}', function (done) {
      chai
        .request(server)
        .keepOpen()
        .put('/travellers')
        .send({ surname: 'da Verrazzano' })
        .end(function (err, res) {
          assert.equal(res.status, 200, 'Response status should be 200');
          assert.equal(res.type, 'application/json', 'Response should be JSON');
          assert.equal(res.body.name, 'Giovanni', 'Name should be Giovanni');
          assert.equal(res.body.surname, 'da Verrazzano', 'Surname should be da Verrazzano');
          done();
        });
    });
  });
});
