const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const express = require('express');
const {promisify} = require('util');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

const isAuthenticated = async (req, res, next) => {
    console.log("req.headerbbbb:", req.headers['authorization']);
    try {
    const bearer = req.headers['authorization'];
    console.log("bearer 1:",bearer);
    if (!bearer || !bearer.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized', message: 'Authorization header missing' });
    }
    let token = bearer.split(' ')[1];

    console.log("Token1:", token);
   
        const verify = await promisify(jwt.verify)(token, SECRET_KEY);
        console.log("Verify1:", verify);
        const currentUser = await prisma.user.findUnique({where:{id:verify.userId}});
       if (!currentUser) {
         return next(
        res.status(401).json({
            status : "fail",
            message : "The user belonging to this token does no longer exist."
       }))
       }
       req.user = currentUser;
       console.log(req.user.id)
       console.log("currentUser1:",currentUser)
        next();
    } catch (error) {
        console.error("Error authenticating user:", error);
        res.status(401).json({ error: 'Unauthorized', message: 'Invalid token' });
    }
};

const isAuthorized = (...roles) => {
    return (req, res, next) => {
        if (!req.user || (req.user && !req.user.role) || !roles.includes(req.user.role)) {
            return res.status(403).json({
                status: "fail",
                message: "You are not allowed to perform this action"
            });
        }
        console.log("Authorization details:", req.user);
        next();
    };
};


const VerifyToken = async (req, res, next) => {
    //console.log(req.cookies);
    const token = req.cookies.token;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT);
            const user = await prisma.user.findById(decoded.userId);

            if (!user) {
                return res.status(400).json({ message: "user makanch" });
            }

            req.user = user;
            next();
        } catch (error) {
            return res.status(401).json({ message: error.message });
        }
    } else {
        res.status(401).json({ message: "token makaynch" });
    }
};

module.exports = { isAuthenticated, isAuthorized, VerifyToken };