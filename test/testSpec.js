let chai=require('chai');
let supertest=require('supertest')
let assert=chai.assert;
let should=chai.should();
let bodyParser=require('body-parser');
let url=supertest('127.0.0.1:3000');      //supertest for dummy server
let app=require('../app');
let sinon = require('sinon');             //for stubbing the schema
let model = require('../model/Schema');
let add=require('../routes/add')
let modelStubInsert = sinon.stub(model.prototype, 'save');  //stubbing for insertion
let modelStubUpdate = sinon.stub(model, 'update');          //stubbing for updation
let modelStubDelete = sinon.stub(model, 'delete');          //stubbing for deletion
//testing simple hello 
describe('checking hello',function(){
	it('Hello',function(done){
		url.get('/')
		.expect(200)
		.end(function(err,res)
		{
			if(err)
				console.log("Error found");
			
			else{
				res.text.should.be.eql('Hello');      //using chai.should for hello testing
				done();
			}
			
		});
});
});

//testing fetching of data
describe('Getting data', () => {
	beforeEach(() => {
		let modelStub = sinon.stub(model, 'find');
		modelStub.yields(null, [{ name: "Kuldeep", age: 21}]) //stubbing dummy data
	})
   it('it will return', (done) => {
       
       url
           .get('/getdata')
           .set('Accept', 'application/json')
           .expect('Content-Type',"application/json; charset=utf-8")
           .end((err, res) => {
               if (err) 
               console.log(err);
               else{
               	console.log(res.body);
              	assert.equal((res.body[0].name),'Kuldeep');
              	assert.equal((res.body[0].age),21);
             	}
              done();
           });
   });
});
//testing insertion of data
describe('Inserting data', () => {
	beforeEach((done) => {
		modelStubInsert.yields(null, [{ name: "Kuldeep", age: 21}]) 
		done();
	})
   it('it will return', (done) => {
       
       url
       .post('/add')
       .send({name:'Kuldeep',age:21})
       .expect('Content-Type','application/json; charset=utf-8')
			 .end((err, res) => {
               if (err) {
               console.log(err);
              }
              else{
              assert.equal((res.body[0].age),21);
              assert.equal((res.body[0].name),'Kuldeep');
              done();
             } 
           });
   });
});
//testing updation of data
describe('Updating data', () => {
	beforeEach(() => {		
		modelStubUpdate.yields(null, [{ ok: 1,nModified: 1,n: 1}]);
	})
   it('updating', (done) => {
       url
       .put('/updates/21')
           .send({name:'Rohit'})
          .expect('Content-Type',/json/)
           .end((err, res) => {
               if (err) {
               return done(err);
            }
            else{
            		  assert.equal((res.body[0].ok),1);
              		assert.equal((res.body[0].nModified),1);
              		assert.equal((res.body[0].n),1);
		              done();
            		}
               
           });
   });
});
//testing deletion of data
describe('Deleting data', () => {
	beforeEach(() => {		
		modelStubDelete.yields(null, [{ok: 1,n: 0}]);
	})
   it('deleting', (done) => {
       url
        .delete('/deletes/21')
        .expect('Content-Type','application/json; charset=utf-8')
        .end((err, res) => {
        if (err) {
               return done(err);
            }
            else{
              		assert.equal((res.body.ok),1);
              		assert.equal((res.body.n),0);
		              done();
             		}    
           	});
   });
});
