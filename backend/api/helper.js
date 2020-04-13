const bcrypt = require('bcrypt');

exports.getPassHash = (password) => {
    bcrypt.hash(password,10, (err,hash) => {
        if(err){
            console.log(err);
            return "";
        }
        else{
            return hash;
        }
    });
}

exports.checkPass = (pass, hashPass) => {
    bcrypt.compare(pass, hashPass, (err,result) => {
        if(err){
            return false;
        }
        return result;
    });
}