import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const nonSecurePaths = ['/', '/login', '/register', '/logout'];

const createToken = (payload) => {
    let token = null;
    try {
        let key = process.env.JWT_SECRET;
        token = jwt.sign(payload, key, { expiresIn: process.env.JWT_EXPIRE });
    } catch (error) {
        console.log(error)
        return null;
    }
    return token;
}

const verifyToken = (token) => {
    let data = null;
    let key = process.env.JWT_SECRET;
    try {
        let decoded = jwt.verify(token, key);
        data = decoded;
    } catch (error) {
        //console.log(error)
    }
    return data;
}

const checkUserJWT = (req, res, next) => {
    if (nonSecurePaths.includes(req.path)) {
        return next();
    }
    let cookies = req.cookies;
    if (cookies && cookies.jwt) {
        let decoded = verifyToken(cookies.jwt);
        if (decoded) {
            req.user = decoded;
            next();
        } else {
            return res.status(401).json({
                EC: -1,
                DT: {},
                EM: "The user is unauthenticated !"
            })
        }
    } else {
        return res.status(401).json({
            EC: -1,
            DT: {},
            EM: "The user is unauthenticated !"
        })
    }
}

const checkSysUserJWT = (req, res, next) => {
    if (nonSecurePaths.includes(req.path)) {
        return next();
    }
    let cookies = req.cookies;
    if (cookies && cookies.jwtsys) {
        let decoded = verifyToken(cookies.jwtsys);
        if (decoded) {
            req.user = decoded;
            next();
        } else {
            return res.status(401).json({
                EC: -1,
                DT: {},
                EM: "The user is unauthenticated !"
            })
        }
    } else {
        return res.status(401).json({
            EC: -1,
            DT: {},
            EM: "The user is unauthenticated !"
        })
    }
}

module.exports = { createToken, verifyToken, checkUserJWT, checkSysUserJWT }