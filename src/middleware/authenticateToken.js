const jwt = require("jsonwebtoken");

const authenticateToken = async(req,res,next) => {
    // console.log(req.headers)
    const authHeaders = req.headers['authorization'];
    const token = authHeaders && authHeaders.split(' ')[1];

    if (token == null){
        return res.sendStatus(401) //unauthorized
    };

    jwt.verify(token, process.env.JWT_SECRET, (err, user, movie) => {
        if(err){
            res.sendStatus(403) //forbidden
        }

        req.user = user;
        next();
    })
};

module.exports = authenticateToken;

