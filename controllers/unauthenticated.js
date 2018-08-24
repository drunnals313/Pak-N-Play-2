var passport = require("passport"),
    User = require("../models/users");


module.exports = function (app, jwt) {
    app.get("/login", function(req, res){
        res.render("login");
    });

    app.post('/login', 
        passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        })
    );

    app.post('/register', function (req, res) {
        User.createAccount(req.body, function (err, account) {
            if (err) throw (err);
            res.redirect("/");
        });
    });

    app.get('/logout', function (req, res) {
        req.logout();
        req.flash('success message', "You are now logged out")
        res.redirect('/');
    });
}

/* var connection = mysql.createConnection({

    host: process.env.DB_HOST || "localhost",
    port: 3306,
    user: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "root",
    database: process.env.DB_DATABASE || "paknplay_db"
}); */