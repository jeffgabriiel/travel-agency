var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import '../database/connection.js';
import Router from 'express';
const router = Router();
import express from 'express';
const app = express();
import User from '../models/User.js';
app.use(express.urlencoded({
    extended: true,
}));
app.use(express.json());
router.get('/passagens', (req, res) => {
    res.render('passagens');
});
router.get('/register', (req, res) => {
    res.render('register');
});
router.post('/register/insertRegister', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // com sequelize
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    yield User.create({ name, email, password });
    res.redirect('/users');
    /* // MySQL direto
    // usando queries
    const insert = `INSERT INTO users (??, ??) VALUES (?, ?)`; // ?? = coluna ; ? = dados
    const data = ['email', 'password', email, password];

    connection.query(insert, data, (err) => {
        if(err){
            console.log(err);
        }

        res.redirect('/users');
    })
    */
}));
router.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // com sequelize
    const users = yield User.findAll({ raw: true });
    res.render('users', { users: users });
    /*
    const read = `SELECT * FROM users`;
    connection.query(read, (err, data) => {
        if(err){
            console.log(err);
        }
        const users = data;
        res.render('users', { users })
    });
    */
}));
router.get('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // com sequelize
    const id = req.params.id;
    const users = yield User.findOne({ raw: true, where: { id: id } });
    res.render('usersID', { users });
    /*
    // usando queries
    const read = `SELECT * FROM users WHERE ?? = ?`;// ?? = coluna ; ? = dados
    const data = ['id', id];

    connection.query(read, data, (err, data) => {
        if(err){
            console.log(err);
        }
        const users = data[0];
        res.render('usersID', { users })
    });
    */
}));
router.get('/users/edit/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // com sequelize
    const id = req.params.id;
    const users = yield User.findOne({ raw: true, where: { id: id } });
    res.render('usersEdit', { users });
    /*
    // usando queries
    const edit = `SELECT * FROM users WHERE ?? = ?`;// ?? = coluna ; ? = dados
    const data = ['id', id];

    connection.query(edit, data, (err, data) => {
        if(err){
            console.log(err);
        }
        const users = data[0];
        res.render('usersEdit', { users })
    });
    */
}));
router.post('/users/edit', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // com sequelize
    const id = req.body.id;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const userData = {
        id,
        name,
        email,
        password,
    };
    yield User.update(userData, { where: { id: id } });
    res.redirect('/users');
    /*
    // usando queries
    const edit = `UPDATE users SET ?? = ?, ?? = ? WHERE ?? = ?`;// ?? = coluna ; ? = dados
    const data = ['email', email, 'password', password, 'id', id];

    connection.query(edit, data, (err) => {
        if(err){
            console.log(err);
        }
        res.redirect('/users')
    });
    */
}));
router.post('/users/delete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // com sequelize
    const id = req.params.id;
    yield User.destroy({ where: { id: id } });
    res.redirect('/users');
    /*
    // usando queries
    const sql = `DELETE FROM users WHERE ?? = ?`;// ?? = coluna ; ? = dados
    const data = ['id', id];

    connection.query(sql, data, (err) => {
        if(err){
            console.log(err);
        }
        res.redirect('/users')
    });
    */
}));
export default router; /// usar module.exports em vez de export {} pois precis exportar o módulo router
