const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

before(function(done) {
    this.timeout(10000);
    const db = "mongodb+srv://bluefist_admin:apple123@cluster0-z9kp4.mongodb.net/test?retryWrites=true&w=majority";
    mongoose.connect(db, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    });
    mongoose.connection.once('open', () => {
        done();
    });
});