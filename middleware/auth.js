import jwt from "jsonwebtoken";
import "dotenv/config"

const authToken = (req, res, next) => {
    console.log("authToken middleware called");
    const token = req.headers['authorization'];
    
    if(token === null) {
        return res.status('401').json('No token');
    }
    
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err) {
            return res.status(403).json('Token not valid');
        }

        req.user = user;
        next();
    });   
}

export default authToken;