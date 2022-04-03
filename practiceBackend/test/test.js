//Testing libraries used
const { should } = require("chai");
const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../server.js");
 
 
//Assertion Style
chai.should();
 
//http protocol
chai.use(chaiHttp);

describe('API Test via Call', () => {
    describe("/api/ping", () => {
        it("Good Status and Response", (done) => {
            chai.request('http://localhost:8080')
            .get("/api/ping")
            .end((err, response) => {
                if (err) {
                        console.log(err);
                }
                
                //test for response body
                response.body.success.should.be.eq(true);

                //Test for status
                response.status.should.be.a('number');
                response.status.should.be.eq(200);

                done();
            })
        })
        it("Sending query param", (done) => {
            chai.request('http://localhost:8080')
            .get("/api/ping?testresponse=test")
            .end((err, response) => {
                    if (err) {
                            console.log(err);
                    }

                    //test for response body
                    response.body.success.should.be.eq(true);

                    //Test for status
                    response.status.should.be.a('number');
                    response.status.should.be.eq(200);

                    done();
            })
        })
   })

    describe("/api/posts", () => {
        it("Bad input - No tag param", (done) => {

            chai.request('http://localhost:8080')
            .get("/api/posts")
            .end((err, response) => {
                    if (err) {
                            console.log(err);
                    }
                    
                    //test for response body
                    response.body.error.should.be.eq('Tags parameter is required');

                    //Test for status
                    response.status.should.be.a('number');
                    response.status.should.be.eq(400);

                    done();
            })
        })
        it("Bad input - Good tag, Bad sortBy param", (done) => {

            chai.request('http://localhost:8080')
            .get("/api/posts?tag=history&sortBy=badsortBy")
            .end((err, response) => {
                if (err) {
                        console.log(err);
                }
                
                //test for response body
                response.body.error.should.be.eq('sortBy parameter is invalid');

                //Test for status
                response.status.should.be.a('number');
                response.status.should.be.eq(400);

                done();
            })
        })
        it("Bad input - Good tag, Bad direction param", (done) => {

            chai.request('http://localhost:8080')
            .get("/api/posts?tag=history&direction=baddirection")
            .end((err, response) => {
                if (err) {
                        console.log(err);
                }
                
                //test for response body
                response.body.error.should.be.eq('sortBy parameter is invalid');

                //Test for status
                response.status.should.be.a('number');
                response.status.should.be.eq(400);

                done();
            })
        })
        it("Good Input - Correct response wtih Good tag=history", (done) => {

            chai.request('http://localhost:8080')
            .get("/api/posts?tag=history")
            .end((err, response) => {
                if (err) {
                        console.log(err);
                }
                
                //Test body that we are getting correct JSON object with elements
                chai.should().exist(response.body.posts);
                response.body.posts.should.be.a('array')
                chai.should().exist(response.body.posts[0].author);
                chai.should().exist(response.body.posts[0].authorId);
                chai.should().exist(response.body.posts[0].id);
                chai.should().exist(response.body.posts[0].likes);
                chai.should().exist(response.body.posts[0].popularity);
                chai.should().exist(response.body.posts[0].reads);
                chai.should().exist(response.body.posts[0].tags);
                response.body.posts[0].tags.should.be.a('array')


                //Test for status
                response.status.should.be.a('number');
                response.status.should.be.eq(200);

                done();
            })
        })
        it("Good Input - Check ID asc order with tag=history sortBy=ID", (done) => {

            chai.request('http://localhost:8080')
            .get("/api/posts?tag=history&sortBy=id")
            .end((err, response) => {
                if (err) {
                        console.log(err);
                }
                
                //test for response body
                chai.should().exist(response.body.posts);
                response.body.posts.should.be.a('array')
                chai.should().exist(response.body.posts[0].id);
                for(let i = 0; i < response.body.posts.length-1; i++) //iterating and seeing id is in order 0(n) time
                {
                    //checking upto n-1 comparisons manually
                    let checkDiff = response.body.posts[i+1].id - response.body.posts[i].id;
                    checkDiff.should.be.above(0);
                }

                //Test for status
                response.status.should.be.a('number');
                response.status.should.be.eq(200);

                done();
            })
        })
        it("Good Input - Check ID asc order with tag=history sortBy=ID direction=asc", (done) => {

            chai.request('http://localhost:8080')
            .get("/api/posts?tag=history&sortBy=id&direction=asc")
            .end((err, response) => {
                if (err) {
                        console.log(err);
                }
                
                //test for response body
                chai.should().exist(response.body.posts);
                response.body.posts.should.be.a('array')
                chai.should().exist(response.body.posts[0].id);
                for(let i = 0; i < response.body.posts.length-1; i++) //iterating and seeing id is in order 0(n) time
                {
                    //checking upto n-1 comparisons manually
                    let checkDiff = response.body.posts[i+1].id - response.body.posts[i].id;
                    checkDiff.should.be.above(0);
                }

                //Test for status
                response.status.should.be.a('number');
                response.status.should.be.eq(200);

                done();
            })
        })
        it("Good Input - Check ID desc order with tag=history sortBy=ID direction=asc", (done) => {

            chai.request('http://localhost:8080')
            .get("/api/posts?tag=history&sortBy=id&direction=desc")
            .end((err, response) => {
                if (err) {
                        console.log(err);
                }
                
                //test for response body
                chai.should().exist(response.body.posts);
                response.body.posts.should.be.a('array')
                chai.should().exist(response.body.posts[0].id);
                for(let i = 0; i < response.body.posts.length-1; i++) //iterating and seeing id is in order 0(n) time
                {
                    //checking upto n-1 comparisons manually
                    let checkDiff = response.body.posts[i+1].id - response.body.posts[i].id;
                    checkDiff.should.be.below(0);
                }

                //Test for status
                response.status.should.be.a('number');
                response.status.should.be.eq(200);

                done();
            })
        })
        it("Good Input - Check reads asc order with tag=history sortBy=reads", (done) => {

            chai.request('http://localhost:8080')
            .get("/api/posts?tag=history&sortBy=reads")
            .end((err, response) => {
                if (err) {
                        console.log(err);
                }
                
                //test for response body
                chai.should().exist(response.body.posts);
                response.body.posts.should.be.a('array')
                chai.should().exist(response.body.posts[0].id);
                for(let i = 0; i < response.body.posts.length-1; i++) //iterating and seeing id is in order 0(n) time
                {
                    //checking upto n-1 comparisons manually
                    let checkDiff = response.body.posts[i+1].reads - response.body.posts[i].reads;
                    checkDiff.should.be.above(0);
                }

                //Test for status
                response.status.should.be.a('number');
                response.status.should.be.eq(200);

                done();
            })
        })
        it("Good Input - Check reads asc order with tag=history sortBy=reads direction=asc", (done) => {

            chai.request('http://localhost:8080')
            .get("/api/posts?tag=history&sortBy=reads&direction=asc")
            .end((err, response) => {
                if (err) {
                        console.log(err);
                }
                
                //test for response body
                chai.should().exist(response.body.posts);
                response.body.posts.should.be.a('array')
                chai.should().exist(response.body.posts[0].id);
                for(let i = 0; i < response.body.posts.length-1; i++) //iterating and seeing id is in order 0(n) time
                {
                    //checking upto n-1 comparisons manually
                    let checkDiff = response.body.posts[i+1].reads - response.body.posts[i].reads;
                    checkDiff.should.be.above(0);
                }

                //Test for status
                response.status.should.be.a('number');
                response.status.should.be.eq(200);

                done();
            })
        })
        it("Good Input - Check reads desc order with tag=history sortBy=reads direction=asc", (done) => {

            chai.request('http://localhost:8080')
            .get("/api/posts?tag=history&sortBy=reads&direction=desc")
            .end((err, response) => {
                if (err) {
                        console.log(err);
                }
                
                //test for response body
                chai.should().exist(response.body.posts);
                response.body.posts.should.be.a('array')
                chai.should().exist(response.body.posts[0].id);
                for(let i = 0; i < response.body.posts.length-1; i++) //iterating and seeing id is in order 0(n) time
                {
                    //checking upto n-1 comparisons manually
                    let checkDiff = response.body.posts[i+1].reads - response.body.posts[i].reads;
                    checkDiff.should.be.below(0);
                }

                //Test for status
                response.status.should.be.a('number');
                response.status.should.be.eq(200);

                done();
            })
        })
        it("Good Input - Check likes asc order with tag=history sortBy=likes", (done) => {

            chai.request('http://localhost:8080')
            .get("/api/posts?tag=history&sortBy=likes")
            .end((err, response) => {
                if (err) {
                        console.log(err);
                }
                
                //test for response body
                chai.should().exist(response.body.posts);
                response.body.posts.should.be.a('array')
                chai.should().exist(response.body.posts[0].id);
                for(let i = 0; i < response.body.posts.length-1; i++) //iterating and seeing id is in order 0(n) time
                {
                    //checking upto n-1 comparisons manually
                    let checkDiff = response.body.posts[i+1].likes - response.body.posts[i].likes;
                    checkDiff.should.be.above(0);
                }

                //Test for status
                response.status.should.be.a('number');
                response.status.should.be.eq(200);

                done();
            })
        })
        it("Good Input - Check likes asc order with tag=history sortBy=likes direction=asc", (done) => {

            chai.request('http://localhost:8080')
            .get("/api/posts?tag=history&sortBy=likes&direction=asc")
            .end((err, response) => {
                if (err) {
                        console.log(err);
                }
                
                //test for response body
                chai.should().exist(response.body.posts);
                response.body.posts.should.be.a('array')
                chai.should().exist(response.body.posts[0].id);
                for(let i = 0; i < response.body.posts.length-1; i++) //iterating and seeing id is in order 0(n) time
                {
                    //checking upto n-1 comparisons manually
                    let checkDiff = response.body.posts[i+1].likes - response.body.posts[i].likes;
                    checkDiff.should.be.above(0);
                }

                //Test for status
                response.status.should.be.a('number');
                response.status.should.be.eq(200);

                done();
            })
        })
        it("Good Input - Check likes desc order with tag=history sortBy=likes direction=asc", (done) => {

            chai.request('http://localhost:8080')
            .get("/api/posts?tag=history&sortBy=likes&direction=desc")
            .end((err, response) => {
                if (err) {
                        console.log(err);
                }
                
                //test for response body
                chai.should().exist(response.body.posts);
                response.body.posts.should.be.a('array')
                chai.should().exist(response.body.posts[0].id);
                for(let i = 0; i < response.body.posts.length-1; i++) //iterating and seeing id is in order 0(n) time
                {
                    //checking upto n-1 comparisons manually
                    let checkDiff = response.body.posts[i+1].likes - response.body.posts[i].likes;
                    checkDiff.should.be.below(0);
                }

                //Test for status
                response.status.should.be.a('number');
                response.status.should.be.eq(200);

                done();
            })
        })
        it("Good Input - Check popularity asc order with tag=history sortBy=popularity (popularity can be same)", (done) => {

            chai.request('http://localhost:8080')
            .get("/api/posts?tag=history&sortBy=popularity")
            .end((err, response) => {
                if (err) {
                        console.log(err);
                }
                
                //test for response body
                chai.should().exist(response.body.posts);
                response.body.posts.should.be.a('array')
                chai.should().exist(response.body.posts[0].id);
                for(let i = 0; i < response.body.posts.length-1; i++) //iterating and seeing id is in order 0(n) time
                {
                    //checking upto n-1 comparisons manually
                    let checkDiff = response.body.posts[i+1].popularity - response.body.posts[i].popularity;
                    checkDiff.should.be.greaterThanOrEqual(0);
                }

                //Test for status
                response.status.should.be.a('number');
                response.status.should.be.eq(200);

                done();
            })
        })
        it("Good Input - Check popularity asc order with tag=history sortBy=popularity direction=asc (popularity can be same)", (done) => {

            chai.request('http://localhost:8080')
            .get("/api/posts?tag=history&sortBy=popularity&direction=asc")
            .end((err, response) => {
                if (err) {
                        console.log(err);
                }
                
                //test for response body
                chai.should().exist(response.body.posts);
                response.body.posts.should.be.a('array')
                chai.should().exist(response.body.posts[0].id);
                for(let i = 0; i < response.body.posts.length-1; i++) //iterating and seeing id is in order 0(n) time
                {
                    //checking upto n-1 comparisons manually
                    let checkDiff = response.body.posts[i+1].popularity - response.body.posts[i].popularity;
                    checkDiff.should.be.greaterThanOrEqual(0);
                }

                //Test for status
                response.status.should.be.a('number');
                response.status.should.be.eq(200);

                done();
            })
        })
        it("Good Input - Check popularity desc order with tag=history sortBy=popularity direction=asc (popularity can be same)", (done) => {

            chai.request('http://localhost:8080')
            .get("/api/posts?tag=history&sortBy=popularity&direction=desc")
            .end((err, response) => {
                if (err) {
                        console.log(err);
                }
                
                //test for response body
                chai.should().exist(response.body.posts);
                response.body.posts.should.be.a('array')
                chai.should().exist(response.body.posts[0].id);
                for(let i = 0; i < response.body.posts.length-1; i++) //iterating and seeing id is in order 0(n) time
                {
                    //checking upto n-1 comparisons manually
                    let checkDiff = response.body.posts[i+1].popularity - response.body.posts[i].popularity;
                    checkDiff.should.be.lessThanOrEqual(0);
                }

                //Test for status
                response.status.should.be.a('number');
                response.status.should.be.eq(200);

                done();
            })
        })
        it("Good Input - check multiple tags are greater as merged tag=history,science ", (done) => {

            let histroy = 0;
            let science = 0;
            let sum = 0;
            chai.request('http://localhost:8080')
            .get("/api/posts?tag=history")
            .end((err, response1) => {
                if (err) {
                        console.log(err);
                }

                //get length
                history = response1.body.posts.length;
                sum += response1.body.posts.length;

                chai.request('http://localhost:8080')
                .get("/api/posts?tag=science")
                .end((err, response2) => {
                    if (err) {
                            console.log(err);
                    }

                    //get length
                    science = response2.body.posts.length;
                    sum += response2.body.posts.length;
                    
                    sum.should.be.above(histroy);
                    sum.should.be.above(science);
                    
                    done();
                })
            })
        })
        it("Good Input - ASC order using ID (as test) after merging", (done) => {

            chai.request('http://localhost:8080')
            .get("/api/posts?tag=history,science")
            .end((err, response) => {
                if (err) {
                        console.log(err);
                }
                
                //test for response body
                chai.should().exist(response.body.posts);
                response.body.posts.should.be.a('array')
                chai.should().exist(response.body.posts[0].id);
                for(let i = 0; i < response.body.posts.length-1; i++) //iterating and seeing id is in order 0(n) time
                {
                    //checking upto n-1 comparisons manually
                    let checkDiff = response.body.posts[i+1].id - response.body.posts[i].id;
                    checkDiff.should.be.above(0);
                }

                //Test for status
                response.status.should.be.a('number');
                response.status.should.be.eq(200);

                done();
            })
        })
        it("Good Input - No duplicates after merging tag=history,science. Checking ID that n != n+1", (done) => {

            chai.request('http://localhost:8080')
            .get("/api/posts?tag=history,science")
            .end((err, response) => {
                if (err) {
                        console.log(err);
                }
                
                //test for response body
                chai.should().exist(response.body.posts);
                response.body.posts.should.be.a('array')
                chai.should().exist(response.body.posts[0].id);
                for(let i = 0; i < response.body.posts.length-1; i++) //iterating and seeing id is in order 0(n) time
                {
                    //checking upto n-1 comparisons manually
                    let checkDiff = response.body.posts[i+1].id - response.body.posts[i].id;
                    checkDiff.should.not.equal(0); // if it has same ID it will be == 0
                }

                //Test for status
                response.status.should.be.a('number');
                response.status.should.be.eq(200);

                done();
            })
        })

    })

})


