import express from 'express';
import envConfig from './config/dotenv.js';
import db from './config/db.js';
import cookieParser from 'cookie-parser';
import router from './routes/index.js';

const app = express();

const PORT = envConfig.PORT || 3000;
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.static('public'));
app.use(router)

app.listen(PORT, () => {
   
    console.log(`http://localhost:${PORT}`);
});
 