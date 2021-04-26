var chai = require('chai');
var testCase = require('mocha').describe;
var chaiHttp = require('chai-http');
var should = chai.should();

chai.use(chaiHttp);


/* 
testing https://jsonplaceholder.typicode.com
JSONPlaceholder is a free online REST service that you can use whenever you need some fake data.
You can refer to the website for the API documentation and examples.

Create test cases for 
GET	/posts/:id
POST	/posts
PUT	/posts/:id

For the tests that use specific postID - please output the post object to console
*/

// test for GET	/posts
testCase('/GET posts', function(){
      it('it should GET all the posts', (done) => {
        chai.request('https://jsonplaceholder.typicode.com')
            .get('/posts')
            .end((err, res) => {
                res.should.have.status(200);
                //do not output all posts but please make output of few first posts of the received array
                res.body.should.be.a('array');
                done();
            });
      });
  });

//tests for GET	/posts/:id - please create several tests (7 tests or more)

//tests for POST	/posts - please create few tests (5 tests or more)

//PUT	/posts/:id - please create few tests (3 tests or more)


