import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { getUserByRefreshToken, updateUserRefreshToken } from '../services/refreshTokenServices';
import { v4 as uuidv4 } from 'uuid';
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
        if (error instanceof jwt.TokenExpiredError) {
            return "TokenExpiredError";
        }
    }
    return data;
}

const checkUserJWT = async (req, res, next) => {
    try {
        if (nonSecurePaths.includes(req.path)) {
            return next();
        }
        let cookies = req.cookies;
        if (cookies && cookies.jwt) {
            let decoded = verifyToken(cookies.jwt);
            if (decoded && decoded !== "TokenExpiredError") {
                req.user = decoded;
                next();
            }
            else if (decoded && decoded === "TokenExpiredError") {
                // handle refresh token
                if (cookies && cookies.rjwt) {

                    let { newAccessToken, newRefreshToken } = await handleRefreshToken(cookies.rjwt);

                    if (newAccessToken && newRefreshToken) {
                        res.cookie("jwt", newAccessToken, { httpOnly: true, maxAge: +process.env.MAX_AGE_ACCESS_TOKEN })
                        res.cookie("rjwt", newRefreshToken, { httpOnly: true, maxAge: +process.env.MAX_AGE_REFRESH_TOKEN })
                    }

                    return res.status(405).json({
                        EC: -1,
                        DT: {},
                        EM: "Need to retry with token !"
                    })

                } else {
                    return res.status(401).json({
                        EC: -1,
                        DT: {},
                        EM: "The user is unauthenticated !"
                    })
                }
            }
            else {
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
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EC: -1,
            DT: '',
            EM: "error from server !"
        })
    }

}

const checkSysUserJWT = async (req, res, next) => {
    if (nonSecurePaths.includes(req.path)) {
        return next();
    }
    let cookies = req.cookies;
    if (cookies && cookies.jwtsys) {
        let decoded = verifyToken(cookies.jwtsys);
        if (decoded && decoded !== "TokenExpiredError") {
            req.user = decoded;
            next();
        }
        else if (decoded && decoded === "TokenExpiredError") {
            // handle refresh token
            if (cookies && cookies.rjwtsys) {

                let { newAccessToken, newRefreshToken } = await handleRefreshToken(cookies.rjwtsys);

                if (newAccessToken && newRefreshToken) {
                    res.cookie("jwtsys", newAccessToken, { httpOnly: true, maxAge: +process.env.MAX_AGE_ACCESS_TOKEN })
                    res.cookie("rjwtsys", newRefreshToken, { httpOnly: true, maxAge: +process.env.MAX_AGE_REFRESH_TOKEN })
                }

                return res.status(405).json({
                    EC: -1,
                    DT: {},
                    EM: "Need to retry with token !"
                })

            } else {
                return res.status(401).json({
                    EC: -1,
                    DT: {},
                    EM: "The user is unauthenticated !"
                })
            }
        }
        else {
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

const handleRefreshToken = async (refresh_token) => {
    try {
        let newAccessToken = "";
        let newRefreshToken = "";

        // get user by refresh token
        let user = await getUserByRefreshToken(refresh_token);

        if (user) {
            if (user.role === "customer") {

                // create access token
                let payloadAccessToken = {
                    customer_id: user.customer_id,
                    username: user.username,
                    role: user.role,
                    session: user.session_info,
                    isAuthenticated: true
                }

                //update user refresh token

                newAccessToken = createToken(payloadAccessToken);
                newRefreshToken = uuidv4();

                await updateUserRefreshToken(user.username, newRefreshToken);
            }

            if (user.role === "seller") {

                // create access token
                let payloadAccessToken = {
                    seller_id: user.seller_id,
                    username: user.username,
                    role: user.role,
                    isAuthenticated: true
                }

                //update user refresh token

                newAccessToken = createToken(payloadAccessToken);
                newRefreshToken = uuidv4();

                await updateUserRefreshToken(user.username, newRefreshToken);
            }

            if (user.role === "shipping_unit") {

                // create access token
                let payloadAccessToken = {
                    shipping_unit_id: user.shipping_unit_id,
                    username: user.username,
                    role: user.role,
                    isAuthenticated: true
                }

                //update user refresh token

                newAccessToken = createToken(payloadAccessToken);
                newRefreshToken = uuidv4();

                await updateUserRefreshToken(user.username, newRefreshToken);
            }

            if (user.role === "admin") {

                // create access token
                let payloadAccessToken = {
                    asid: user.asid,
                    username: user.username,
                    role: user.role,
                    isAuthenticated: true
                }

                //update user refresh token

                newAccessToken = createToken(payloadAccessToken);
                newRefreshToken = uuidv4();

                await updateUserRefreshToken(user.username, newRefreshToken);
            }
        }

        return {
            newAccessToken: newAccessToken,
            newRefreshToken: newRefreshToken
        }
    } catch (error) {
        console.log(error);
        return null;
    }

}

module.exports = { createToken, verifyToken, checkUserJWT, checkSysUserJWT }