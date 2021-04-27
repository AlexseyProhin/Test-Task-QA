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
testCase('/GET posts', function () {
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
    // ТестКейс проходит при условии, статус страницы 404
    /*
     it("it should NOT GET all the posts", (done) => {
         chai.request('https://jsonplaceholder.typicode.com')
             .get('/posts')
             .end((err, res) => {
                 res.should.have.status(404);
                 done();
         });
     })*/
});

// test GET /posts/:id
testCase('/GET posts/:id', function () {
    it('it should GET a posts by id', (done) => {
        const postsId = 1;
        chai.request('https://jsonplaceholder.typicode.com')
            .get('/posts/' + postsId)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('userId');
                res.body.should.have.property('id');
                res.body.should.have.property('title');
                res.body.should.have.property('body');
                res.body.should.have.property('id').eq(1);

                done();
            });
    });
});

it('it should GET return array', (done) => {
    const userId = '?userid=1';
    chai.request('https://jsonplaceholder.typicode.com')
        .get('/posts/' + userId)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('array');
            done();
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
// получаем post от rest api placeholder и проверяем
testCase('/POST posts/', function () {
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
                res.should.have.status(201); //проверяем статус страницы
                res.body.should.be.a('object'); // получаем объект
                res.body.should.have.property('userId').eq(1);// userId = 1
                res.body.should.have.property('id').eq(101);
                res.body.should.have.property('title').eq("sunt aut facere repellat provident occaecati excepturi optio reprehenderit");
                res.body.should.have.property('body').eq("quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto");
                done();
            });
    });
    it('it should T POST and create new userId', (done) => {
        const posts = {
            "userId": 123,
            "id": 1,
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        };
        chai.request('https://jsonplaceholder.typicode.com')
            .post('/posts')
            .send(posts)
            .end((err, res) => {
                res.should.have.status(201);//проверяем статус страницы
                done();
            });
    });
});


//PUT	/posts/:id - please create few tests (3 tests or more)
// tests for PUT	/posts/:id

testCase('/PUT posts/:id', function () {
    it('it should PUT', (done) => {
        const putUrl = 1;
        const posts = {
            "userId": 1,
            "id": 1,
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "body": "quia et suscipit\\nsuscipit recusandae consequuntur expedita et cum\\nreprehenderit molestiae ut ut quas totam\\nnostrum rerum est autem sunt rem eveniet architecto"
        };
        chai.request('https://jsonplaceholder.typicode.com')
            .put('/posts/' + putUrl)
            .send(posts)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('userId').eq(1);
                res.body.should.have.property('id').eq(1);
                res.body.should.have.property('title').eq("sunt aut facere repellat provident occaecati excepturi optio reprehenderit");
                res.body.should.have.property('body').eq("quia et suscipit\\nsuscipit recusandae consequuntur expedita et cum\\nreprehenderit molestiae ut ut quas totam\\nnostrum rerum est autem sunt rem eveniet architecto");
                done();
            });
    });


})


//tests for GET	/posts/:id - please create several tests (7 tests or more)

//tests for POST	/posts - please create few tests (5 tests or more)




