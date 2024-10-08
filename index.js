import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import cors from 'cors';
import { connectDB } from './src/db/dbConnection.js';
import { router } from './src/routes/index.js';

const app = express();
dotenv.config();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(cors({
  origin: "*" ,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}));

app.get("/" , (req,res)=>{
  res.status(200).send({
    success : true,
    message : "Blog App Server is running fine"
  })
})


connectDB()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Sever is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => console.log(error));

app.use('/api/v1', router);
