import express from 'express';
import envConfig from './config/dotenv.js';
import db from './config/db.js';
import router from './routes/index.js';
import cookieParser from 'cookie-parser';

const app = express();

const PORT = envConfig.PORT || 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
    if (!res.locals.user) {
        res.locals.user = null;
    }
    next();
});
app.use(router)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});