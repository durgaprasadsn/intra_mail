const expect = require('chai').expect;
const mongoose = require('mongoose');
const userUnit = require('../backend/api/units/users');
const mailUnit = require('../backend/api/units/mails');
require('dotenv').config;

const db = process.env.DB_CONNECTION;

// connecting to mongoDB
mongoose.connect(mongo_uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

// checking if connection established
connection.once('open', () => {
    console.log('Connection Established with Mongo Atlas');
    describe('Backend Unit test', () => {
        describe('User unit test', () => {
            describe('SignUp unit', () => {
                it('Should return 201(User created)', () => {
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
                    const result = userUnit.userSignUp(request);
                    expect(result).to.equal(201);
                });
                it('Should return 500(User exists/error)', () => {
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
                    const result = userUnit.userSignUp(request);
                    expect(result).to.equal(500);
                });
            });
            describe('Check User Unit', () => {
                it('Should return 200(User exists)', async () => {
                    let request = {
                        query : {
                            user : 'newUser01'
                        }
                    }
                    const result = await userUnit.checkUser(request);
                    expect(result).to.equal(200);
                });
                it('Should return 404(User not found)', async () => {
                    let request = {
                        query : {
                            user : 'newUser02'
                        }
                    }
                    const result = await userUnit.checkUser(request);
                    expect(result).to.equal(404);
                });
            });
        });


    });
});


