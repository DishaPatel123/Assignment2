/* 
    File name: user.js (For server side controller file)
    Student Name: Disha Patel
        StudentID: 301149367
*/
// Importing user model and passport
let userModel = require("../models/user");
let user = userModel.User;
let passport = require("passport");

// displaying login page if user is not already loged in.
module.exports.displayLoginPage = (req, res, next) => {
    if (!req.user) {
        res.render('user/login', { title: 'Login', messages: req.flash("loginMessage"), displayName: req.user ? req.user.displayName : "" })
    }
    else {
        return res.redirect("/");
    }
}
// Logout processing.
module.exports.logout = (req, res, next) => {
    req.logout();
    res.redirect('/')
}
// It will process login information and redirect to the contact page
module.exports.displayContactListPage = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err)
        }
        if (!user) {
            req.flash("loginMessage", "Authentication Error");
            return res.redirect('/login')
        }
        req.login(user, (err) => {
            if (err) {
                return next(err);
            }
            return res.redirect('/contact')
        })
    })(req, res, next)
}