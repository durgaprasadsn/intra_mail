const expect = require('chai').expect;
const userUnit = require('../backend/api/units/users');
const mailUnit = require('../backend/api/units/mails');
require('dotenv').config;

describe('Backend Units test', function () {
    describe('User units test', function(){
        describe('SignUp unit', function() {
            it('Should return 201(User created)', function() {
                let request = {
                    body: {
                        user: 'newUser01',
                        fname: 'Gaurav',
                        lname: 'CG',
                        password: '12345678',
                        dob: '05/28/2020',
                        no: 9486969500,
                        tfa: 'false'
                    }
                };
                userUnit.userSignUp(request).then((result) => {
                    console.log(result);
                    expect(result).to.equal(201);
                });                
                
            });
            it('Should return 201(User created)', function() {
                let request = {
                    body: {
                        user: 'newUser03',
                        fname: 'Gaurav',
                        lname: 'CG',
                        password: '12345678',
                        dob: '05/28/2020',
                        no: 9486969500,
                        tfa: 'false'
                    }
                };
                userUnit.userSignUp(request).then((result) => {
                    expect(result).to.equal(201);
                });                
            });
            it('Should return 500(User exists/error)', function() {
                // sending same credentials to check error
                let request = {
                    body: {
                        user: 'newUser01',
                        fname: 'Gaurav',
                        lname: 'CG',
                        password: '12345678',
                        dob: '05/28/2020',
                        no: 9486969500,
                        tfa: 'false'
                    }
                };
                userUnit.userSignUp(request).then((result) => {
                    expect(result).to.equal(500);
                });                
            });
        });
        describe('Check User Unit', function() {
            it('Should return 200(User exists)', async function() {
                let request = {
                    query: {
                        user: 'newUser01'
                    }
                }
                //let result = await userUnit.checkUser(request);
                //expect(result).to.equal(200);
                userUnit.checkUser(request).then((result) => {
                    console.log(result);
                    expect(result).to.equal(200);
                });
            });
            it('Should return 404(User not found)', async function() {
                let request = {
                    query: {
                        user: 'newUser02'
                    }
                }
                userUnit.checkUser(request).then((result) => {
                    expect(result).to.equal(404);
                });                
            });
        });
        describe('Check Login Unit', function() {
            it('Should return 200(User logged in)', async function() {
                let request = {
                    body: {
                        user: 'newUser01',
                        password: '12345678'
                    }
                }
                userUnit.userLogin(request).then((result) => {
                    expect(result.status).to.equal(200);
                });                
            });
            it('Should return 401(Authentication Failure)', async function() {
                let request = {
                    body: {
                        user: 'newUser01',
                        password: '1234567'
                    }
                }
                userUnit.userLogin(request).then((result) => {
                    expect(result.status).to.equal(401);
                });                
            });
            it('Should return 500(Internel Error)', async function() {
                let request = {
                    body: {
                        user: 'newUser01'
                    }
                }
                userUnit.userLogin(request).then((result) => {
                    expect(result.status).to.equal(500);
                });                
            });
        });
        describe('Check delete unit', function() {
            it('Should return 200(User deleted)', async function() {
                let request = {
                    decodedToken: {
                        user: 'newUser01'
                    }
                }
                userUnit.deleteUser(request).then((result) => {
                    expect(result).to.equal(200);
                });                
            });
            it('Should return 200(User deleted/not)', async function() {
                let request = {
                    decodedToken: {
                        user: 'newUser01'
                    }
                }
                userUnit.deleteUser(request).then((result) => {
                    expect(result).to.equal(404);
                });                
            });
        });
    });

    describe('Mail units test', function() {
        describe('Postmail unit', function() {
            it('Should return 201', async function(done) {
                this.timeout(5000);
                //setTimeout(done, 12000);
                let request = {
                    decodedToken: {
                        user: 'newUser03'
                    },
                    body: {
                        receiver: 'someone1',
                        subject: 'Subject 1',
                        body: 'Email body'
                    }
                }
                mailUnit.postMail(request).then((result) => {
                    expect(result).to.equal(201);
                });                
                //done();
            });
            it('Should return 405', async function(done) {
                this.timeout(5000);
                //setTimeout(done, 12000);
                let request = {
                    decodedToken: {
                        user: 'newUser04'
                    },
                    body: {
                        receiver: 'someone4',
                        subject: 'Subject 1',
                        body: 'Email body'
                    }
                }
                mailUnit.postMail(request).then((result) => {
                    expect(result).to.equal(405);
                });
                //done();
            });
        });
        describe('Get sent mails unit', function() {
            it('Should return 200(Fetched Successfully)', async function() {
                let request = {
                    decodedToken: {
                        user: 'newUser03'
                    }
                }
                mailUnit.getSentMail(request).then((result) => {
                    expect(result).to.equal(200);
                });
            });
            it('Should return 404(Sender not found)', async function() {
                let request = {
                    decodedToken: {
                        user: 'newUser04'
                    }
                }
                mailUnit.getSentMail(request).then((result) => {
                    expect(result).to.equal(404);
                });
            });
        });
        describe('Get received mails unit', function() {
            it('Should return 200(Fetched Successfully)', async function() {
                let request = {
                    query: {
                        category: 'assignment'
                    },
                    decodedToken: {
                        user: 'someone1'
                    }
                }
                mailUnit.getReceivedMails(request).then((result) => {
                    expect(result).to.equal(200);
                });
            });
            it('Should return 404(Receiver not found)', async function() {
                let request = {
                    query: {
                        category: 'assignment'
                    },
                    decodedToken: {
                        user: 'someone4'
                    }
                }
                mailUnit.getReceivedMails(request).then((result) => {
                    expect(result).to.equal(404);
                });
            });
        });
    });
});



