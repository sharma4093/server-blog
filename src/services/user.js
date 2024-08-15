import { userModel } from "../models/userModel.js";


export const getUser = async (search) => new Promise(async (resolve, reject) => {

    userModel.findOne(search)
        .select('-status')
        .lean()
        .then(resolve)
        .catch(reject)
});

export const createUser = async (payload) => new Promise((resolve, reject) => {

    userModel.create(payload)
        .then(resolve)
        .catch(reject)
});

export const updateUser = async (search, payload, options = { new: true }) => new Promise((resolve, reject) => {

    userModel.findOneAndUpdate(search, payload, options)
        .lean()
        .then(resolve)
        .catch(reject)
});

export const deleteUser = async (search) => new Promise((resolve, reject) => {

    userModel.findOneAndUpdate(search, { status: 'DELETED' })
        .then(resolve)
        .lean()
        .catch(reject)
});