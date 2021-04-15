const supertest = require('supertest')
const server = require('./index.js')


test("GET / route should give status code 200", done => {
   supertest(server).get("/")
    .expect(200)
    .then((response) => {
      // Check data
      expect(response.body.message).toBe("App is working fine!");
      done();
    });
});

test('POST / route should give status code 200 and create the todo user', done => {
  supertest(server).post('/getir')
  .set('Accept', 'application/json')
  .send(
    {
        "startDate": "2012-02-12",
        "endDate": "2017-02-12",
        "minCount": 222,
        "maxCount": 99999,
        "pagination": {
            "pageNumber": 1,
            "pageSize": 20
        }
    }
   )
  .expect(200)
  .then((response) => {
    // Check data
    expect(response.body.msg).toBe("Success");
    done();
  });
   done();
}, 8000);

test('GET / Success - fetch single todo user details', done => {
  supertest(server).get('/getir/znxkySru')
  .expect(200)
  .then((response) => {
    // Check data
    expect(response.body.code).toBe(0);
    expect(response.body.message).toBe("Success");
    done();
  });
});    

