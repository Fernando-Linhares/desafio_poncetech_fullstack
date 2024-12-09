import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generate_auth_session from "../actions/generate_auth_session.js";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { app_key } from "../../config/app.js";

const authentication_controller = {
    login: async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const { email, password } = req.body;

        let user = await User.findFirst({
            where: {
                email
            }
        });

        const passwordValid = await bcrypt.compare(password, user.password)

        if(user && passwordValid) {
            let session = generate_auth_session(user);
            return res.status(200).json({data: session});
        }

        return res.status(401).send({
            authError: "Invalid email or password"
        })
    },

    register: async (req, res) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array()
            });
        }

        const { name, email, password } = req.body;

        let passwordHash = await bcrypt.hash(password, 10);

        const user = await User.create({
            data: {
                name,
                email,
                password: passwordHash
            }
        });

        let session = generate_auth_session(user);

        return res.status(200).json({data: session});
    },

    me: async (req, res) => {
        res.json({data: req.user})
    },

    refresh: async(req, res) => {
        jwt.verify(req.params['token'], app_key, async (err, decoded) => {
            if (err)
                return res.status(401).json({error: 'Invalid refresh token'});

            let user = await User.findFirst({
                where: {
                    email: req.user.email
                }
            })

            if (user && decoded.password === user.password) {
                let session = generate_auth_session(user);
                return res.status(201).json({data: session});
            }

            return res.status(401).json({error: 'Invalid refresh token'});
        })
    }
}

export default authentication_controller;