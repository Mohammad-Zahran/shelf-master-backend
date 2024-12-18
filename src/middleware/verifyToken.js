import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(401).send({message: "unauthorized access"});
    }

}