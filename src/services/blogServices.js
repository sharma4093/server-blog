import { blogModel } from "../models/blogModel.js";

export const createBlog = async (payload) =>
  new Promise((resolve, reject) => {
    blogModel.create(payload).then(resolve).catch(reject);
  });

export const updateBlog = async (search, payload, options = { new: true }) =>
  new Promise((resolve, reject) => {
    blogModel.findOneAndUpdate(search, payload, options).lean().then(resolve).catch(reject);
  });

export const getBlog = async (search) =>
  new Promise(async (resolve, reject) => {
    blogModel.find(search).populate("_user", "name email").lean().sort({ createdAt: -1 }).then(resolve).catch(reject);
  });

// export const getBlogs = async (search) =>
//   new Promise(async (resolve, reject) => {
//     blogModel.find(search).populate("_user", "name email").lean().then(resolve).catch(reject);
//   });
export const getBlogs = async (search) => new Promise(async (resolve, reject) => {
    blogModel.find(search)
        .populate('_user', 'name email')
        .lean()
        .then(resolve)
        .catch(reject)
});

export const deleteBlog = async (search) =>
  new Promise((resolve, reject) => {
    blogModel.findOneAndUpdate(search, { status: "DELETED" }).then(resolve).catch(reject);
  });
