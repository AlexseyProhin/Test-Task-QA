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

// test GET /posts/:id
testCase('/GET posts/:id', function(){
    it('it should GET one the posts', (done) => {
        const postsId = 1;
        chai.request('https://jsonplaceholder.typicode.com')
            .get('/posts/' + postsId)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('userId');
                res.body.should.have.property('id');
                res.body.should.have.property('title');
                res.body.should.have.property('body');
                res.body.should.have.property('id').eq(1);
                done();
            });
    });
  });

    it('it should NOT GET one the posts', (done) => {
        const postsId = 123;
        chai.request('https://jsonplaceholder.typicode.com')
            .get('/posts/' + postsId)
            .end((err, res) => {
                res.should.have.status(404);
                res.text.should.be.eq("{}");
                done();
                });
    });

    // tests for POST	/posts
testCase('/POST posts/', function(){
    it('it should POST', (done) => {
        const posts = {
            "userId": 1,
            "id": 1,
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        };
        chai.request('https://jsonplaceholder.typicode.com')
            .post('/posts')
            .send(posts)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.have.property('userId').eq(1);
                res.body.should.have.property('id').eq(101);
                res.body.should.have.property('title').eq("sunt aut facere repellat provident occaecati excepturi optio reprehenderit");
                res.body.should.have.property('body').eq("quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto");
                done();
            });
    });
});

// tests for PUT	/posts/:id

testCase('/PUT posts/:id', function(){
    it('it should PUT', (done) => {
        const putId = 2
        const posts = {
            "userId": 1,
            "id": 2,
            "title": "qui est esse",
            "body": "est rerum tempore vitae\\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\\nqui aperiam non debitis possimus qui neque nisi nulla"
        };
        chai.request('https://jsonplaceholder.typicode.com')
            .put('/posts/' + putId)
            .send(posts)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.have.property('userId').eq(1);
                res.body.should.have.property('id').eq(2);
                res.body.should.have.property('title').eq("qui est esse");
                res.body.should.have.property('body').eq("est rerum tempore vitae\\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\\nqui aperiam non debitis possimus qui neque nisi nulla");
                done();
            });
    });
});





//tests for GET	/posts/:id - please create several tests (7 tests or more)

//tests for POST	/posts - please create few tests (5 tests or more)

//PUT	/posts/:id - please create few tests (3 tests or more)


