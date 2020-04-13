const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    try{
        //send the request with token in header section under authorization header with bearer<space>token
        const token = req.header.authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.KEY);
        req.decodedToken = decoded;
        next();
    } catch(err){
        console.log(err);
        return res.status(401).json({
            message : 'Authentication Failed'
        });
    }
};