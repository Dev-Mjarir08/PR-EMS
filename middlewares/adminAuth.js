import jwt from 'jsonwebtoken';

const adminAuth = (req, res, next) => {
    try {
        const token = req.cookies.token;

        // Token nahi hai
        if (!token) {
            return res.redirect('/admin/login');
        }
        const decoded = jwt.verify(token, 'secret');

        req.admin = decoded;
        req.adminId = decoded.id;
        res.locals.admin = decoded;

        next();

    } catch (error) {
        console.log(error);
        return res.redirect('/admin/login');
    }
};

export default adminAuth;