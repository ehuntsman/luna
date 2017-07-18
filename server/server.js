
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const config = require('./secrets.js');
const characters_controller = require('./controllers/characters_controller');

const app = module.exports = express();
app.use(bodyParser.json());
app.use(session({
    secret: config.sessionSecret
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

// app.use(express.static(__dirname + '/../build'));

massive(config.connectionString).then((dbInstance) => {
    app.set('db', dbInstance);

    dbInstance.set_schema()
        .then(() => console.log('reset tables'))
        .catch((err) => console.log('not working', err));

    passport.use(new Auth0Strategy({
        domain: config.domain,
        clientID: config.clientID,
        clientSecret: config.clientSecret,
        callbackURL: 'http://localhost:3000/auth/callback'
    }, function (accessToken, refreshToken, extraParams, profile, done) {
        // console.log(profile, "profile!");
        dbInstance.getUserByAuthId([profile.identities[0].user_id]).then((user) => {
            if (user[0]) {
                console.log("WORKS", user[0]);
            } else {
                dbInstance.create_user(profile.identities[0].user_id, profile.displayName).then((err, user) => {
                    dbInstance.getUserByAuthId(profile.identities[0].user_id).then((cake) => {
                        return done(null, cake[0]);
                    })
                })
            }
        })
    }));

    app.get('/auth', passport.authenticate('auth0'));

    app.get('/auth/callback', passport.authenticate('auth0', {
        successRedirect: '/#/myteam',
        failureRedirect: '/'
    }));

    passport.serializeUser(function (user, done) {
        console.log('serializing', user);
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        console.log('de-serializing', user);
        done(null, user);
    });

    // app.get('/myteam', function(req,res){
    //     if(!req.user){
    //         return res.status(200).send(null);
    //     }
    //     console.log(req.user, "this is the req user in myteam");
    //     res.status(200).send(req.user);
    // });
    const userCtrl = require('./controllers/users_controller')
    app.get('/api/myteam', userCtrl.me)

    app.get('/api/characters', characters_controller.getAllCharacters);
    app.get('/api/characters/:id', characters_controller.getOneCharacter);

    app.get('/auth/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    })
})

const port = 3000;
//this is the port that the site comes out in
app.listen(port, () => { console.log(`Server listening on port ${port}.`); });