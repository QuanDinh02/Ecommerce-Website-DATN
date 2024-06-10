import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import configCors from './config/cors';
import ApiRoute from './routes/api';
import fileUpload from 'express-fileupload';
//import connection from './config/connectDB';

//For env File 
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// cors config
configCors(app);

//connection();

//config body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//config cookie parser
app.use(cookieParser());

app.use(fileUpload());

// Routes
ApiRoute(app);

app.get('/', (req, res) => {
  res.send('Welcome to Ecommerce Server');
});

app.listen(port, () => {
  console.log(`Ecommerce Server is running at http://localhost:${port}`);
});