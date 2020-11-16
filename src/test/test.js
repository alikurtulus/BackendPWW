// Import the dependencies for testing
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server') ;
// Configure chai
chai.should();
chai.use(chaiHttp);

describe("Products", () => {
    describe("GET /", () => {
        // Test to get all products record
        it("should get all products record", (done) => {
            chai.request(process.env.baseURL)
                .get('/products')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
         });
        // Test to get single product record
        it("should get a single product record", (done) => {
             const id = process.env.selectedId;
             chai.request(process.env.baseURL)
                .get(`/products/${id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
         });
         
          // Test to filtered products record
        it("should get  products record", (done) => {
            chai.request(process.env.baseURL)
                .get(`/search`)
                .query({type: 'Electrical', searchKeyWord:'a', price:'descending'}) 
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
        // Test to filtered products record
          it("should get  products record", (done) => {
            chai.request(process.env.baseURL)
                .get(`/search`)
                .query({department: 'Entertainment'}) 
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
          // Test to filtered products record
          it("should get  products record", (done) => {
            chai.request(process.env.baseURL)
                .get(`/search`)
                .query({searchKeyWord: 'as',price:'descending', department: 'Shoes'}) 
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
          // Test to get departments record
        it("should get all  departments record", (done) => {
            chai.request(process.env.baseURL)
                .get(`/departments`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
         // Test to get all types record
        it("should get all types record", (done) => {
            chai.request(process.env.baseURL)
                .get(`/types`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });
});