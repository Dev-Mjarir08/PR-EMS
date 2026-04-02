import jwt from 'jsonwebtoken';

const adminAuth = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/admin/login');
    }
    else {
        next();
    }
}

export default adminAuth;
