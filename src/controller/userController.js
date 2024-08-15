import {
    validateUserLoginPayload,
    validateUserPasswordChangePayload,
    validateUserSignUpPayload,
  } from '../validation/user.js';
  import bcrypt from 'bcrypt';
  import { Router } from 'express';
  import { getUser,createUser,updateUser } from '../services/user.js';
  import { generateAccessToken, verifyUser } from '../middlewares/jwt.js';
import { makeResponse } from '../lib/response/index.js';
  import { comparePassword } from '../utils/common/index.js';
  
  const router = Router();
  
  //signup controller
  router.post('/signup', validateUserSignUpPayload, async (req, res) => {
    try {
      const { name, email, password } = req.body;
  
      const user = await getUser({ email: email, status: 'ACTIVE' });
  
      if (user) {
        return makeResponse(res, 409, false, 'User Already Exists', user);
      }

      const hashedPassword = await bcrypt.hash(password, Number(process.env.SALT));
  
      const userCreate = await createUser({
        name,
        email,
        password: hashedPassword,
      });
  
      await makeResponse(res, 200, true, 'User Created Successfully', userCreate);
    } catch (error) {
      console.log(error)
      await makeResponse(res, 400, false, 'Error While Creating User', error);
    }
  });
  
  
  //login controller
  router.post('/login', validateUserLoginPayload, async (req, res) => {
    try {
      const user = await getUser({ email: req.body.email, status: 'ACTIVE' });
  
      if (!user) {
        return await makeResponse(res, 404, false, 'User Not Found', user);
      }
  
      const checkPassword = await comparePassword(req.body.password, user.password);
  
      if (!checkPassword) {
        return await makeResponse(res, 401, false, 'Incorrect Credentials', user);
      }
  
      const accessToken = await generateAccessToken(user._id);
  
      if (!accessToken) {
        throw new Error('Error While Generating Access Token');
      }

      console.log('use rlogged in')
      await makeResponse(res, 200, true, 'User logged in successfully', { ...user, token: accessToken });
  
    } catch (error) {
      console.log('error', error)
      await makeResponse(res, 400, false, 'Error While Logging In', error);
    }
  });
  
  //change-password controller
  router.post('/change-password', verifyUser, validateUserPasswordChangePayload, async (req, res) => {
  
    try {
  
      const { oldPassword, newPassword } = req.body
  
      const isPasswordCorrect = await comparePassword(oldPassword, req.user.password);
  
      if (!isPasswordCorrect) {
        await makeResponse(res, 400, false, 'Incorrect old password', user);
      }
  
      const hashedPassword = await bcrypt.hash(newPassword, Number(process.env.SALT));
  
      const userUpdate = await updateUser({ _id: req.user._id }, { password: hashedPassword });
  
      await makeResponse(res, 200, true, 'Password Changed Successfully', userUpdate);
    } catch (error) {
      await makeResponse(res, 400, false, 'Error While Changing Password', error);
    }
  });

  // Check is user is logged in or not
router.get("/is-logged-in", verifyUser, async (req, res) => {
  await makeResponse(res, 200, true, "User is logged in", req.user);
});

  
  export const userController = router;
  