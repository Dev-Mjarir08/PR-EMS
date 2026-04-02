import bcrypt from 'bcrypt';
import Admin from '../models/admin.model.js';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
const adminController = {
    dashboard(req, res) {
        res.render('pages/admin/dashboard')
    },
    async signin(req, res) {
        try {

            const { password } = req.body
            req.body.password = await bcrypt.hash(password, 10)
            const admin = await Admin.create(req.body)
            return res.json(admin)
        } catch (error) {
            console.error(error);
            res.status(500).send('Error creating admin');
        }
    },
    loginPage(req, res) {
        res.render('./pages/admin/login.ejs')
    },
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const admin = await Admin.findOne({ email });
            if (!admin) {
                return res.redirect(req.get('Referrer') || '/admin/login');
            }
            else {
                const isMatch = await bcrypt.compare(password, admin.password);
                if (isMatch) {
                    const payload = {
                        id: admin._id,
                        name: admin.name,
                        role: admin.role
                    }
                    const token = jwt.sign(payload, 'secret', { expiresIn: '1h' });
                    res.cookie('token', token);
                    return res.redirect('/');
                }
            }
        }
        catch (error) {
            console.error(error);
            return res.redirect(req.get('Referrer') || '/admin/login');
        }
    }
}

export default adminController;