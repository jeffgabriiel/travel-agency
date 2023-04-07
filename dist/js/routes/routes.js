const router = require('express').Router();
const connectionPool = require('../database/connection');
require('express')().use(require('express').urlencoded({
    extended: true,
}));
require('express')().use(require('express').json());
router.get('/passagens', (req, res) => {
    res.render('passagens');
});
router.get('/register', (req, res) => {
    res.render('register');
});
router.post('/register/insertRegister', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const insert = `INSERT INTO users (email, password) VALUES ('${email}', '${password}')`;
    connectionPool.query(insert, (err) => {
        if (err) {
            console.log(err);
        }
        res.redirect('/users');
    });
});
router.get('/users', (req, res) => {
    const read = `SELECT * FROM users`;
    connectionPool.query(read, (err, data) => {
        if (err) {
            console.log(err);
        }
        const users = data;
        res.render('users', { users });
    });
});
router.get('/users/:id', (req, res) => {
    const id = req.params.id;
    const read = `SELECT * FROM users WHERE id = ${id}`;
    connectionPool.query(read, (err, data) => {
        if (err) {
            console.log(err);
        }
        const users = data[0];
        res.render('usersID', { users });
    });
});
router.get('/users/edit/:id', (req, res) => {
    const id = req.params.id;
    const edit = `SELECT * FROM users WHERE id = ${id}`;
    connectionPool.query(edit, (err, data) => {
        if (err) {
            console.log(err);
        }
        const users = data[0];
        res.render('usersEdit', { users });
    });
});
router.post('/users/edit', (req, res) => {
    const id = req.body.id;
    const email = req.body.email;
    const password = req.body.password;
    const edit = `UPDATE users SET email = '${email}', password = '${password}' WHERE id = ${id}`;
    connectionPool.query(edit, (err) => {
        if (err) {
            console.log(err);
        }
        res.redirect('/users');
    });
});
router.post('/users/delete/:id', (req, res) => {
    const id = req.params.id;
    const sql = `DELETE FROM users WHERE id = ${id}`;
    connectionPool.query(sql, (err) => {
        if (err) {
            console.log(err);
        }
        res.redirect('/users');
    });
});
module.exports = router;
