import Joi from "joi";
import { makeResponse } from "../lib/response/index.js";

export const validateUserSignUpPayload = async (req, res, next) => {

    const { error } = Joi.object({
        name: Joi.string().required().trim(),
        email: Joi.string().email().lowercase().required().trim(),
        password: Joi.string().min(8).required().trim(),
        confirmPassword: Joi.string().required().valid(Joi.ref('password'))
    })
        .required()
        .validate(req.body);

    if (error) {
        console.log(error);
        return makeResponse(res, 400, false, error.details[0].message.split('\"').join(""))
    }
    next();
}


export const validateUserLoginPayload = async (req, res, next) => {

    const { error } = Joi.object({
        email: Joi.string().email().lowercase().required().trim(),
        password: Joi.string().required().trim()
    })
        .required()
        .validate(req.body);

    if (error) {
        return makeResponse(res, 400, false, error.details[0].message.split('\"').join(""))
    }
    next();
}

export const validateUserPasswordChangePayload = async (req, res, next) => {

    const { error } = Joi.object({
        oldPassword: Joi.string().required().trim(),
        newPassword: Joi.string().required().trim(),
        confirmNewPassword: Joi.string().required().valid(Joi.ref('newPassword'))
    })
        .required()
        .validate(req.body);

    if (error) {
        return makeResponse(res, 400, false, error.details[0].message.split('\"').join(""))
    }
    next();
}