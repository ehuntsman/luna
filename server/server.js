
const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');
const config = require('./secrets.js');
const characters_controller = require('./controllers/characters_controller');
const users_controller = require('./controllers/users_controller');
const attacks_controller = require('./controllers/attacks_controller');
const cookieParser = require('cookie-parser');

const app = module.exports = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: config.sessionSecret,
    saveUninitialized: true,
    resave: true
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(cors());

app.use(express.static(__dirname + '/../build'));

massive(config.connectionString).then((dbInstance) => {
    app.set('db', dbInstance);

    passport.use(new Auth0Strategy({
        domain: config.domain,
        clientID: config.clientID,
        clientSecret: config.clientSecret,
        callbackURL: config.auth0Callback,
        options: {
            theme: {
                logo: 'https://s3-us-west-2.amazonaws.com/devschoolluna/logo-01.png',
                primaryColor: '#3DA9B5',
                authButtons: {
                    primaryColor: '#000000'
                }
            }
        }
    }, function (accessToken, refreshToken, extraParams, profile, done) {

        dbInstance.getUserByAuthId([profile.identities[0].user_id]).then((user) => {
            if (user[0]) {
                return done(null, user[0]);
            } else {
                dbInstance.create_user(profile.identities[0].user_id, profile.displayName).then((user) => {
                    return done(null, user[0])
                })
            }
        })
    }));

    app.get('/auth', passport.authenticate('auth0'));

    app.get('/auth/callback', passport.authenticate('auth0', {
        successRedirect: config.authRedirect,
        failureRedirect: '/'
    }));

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        console.log("des-start", user)
        dbInstance.getUser(user.id).then(dbuser => {
            let newUser =  dbuser.length > 0 ? dbuser[0] : {};
            console.log("des-done",newUser)
            done(null, newUser)
        })
    });

    //users 
    app.get('/api/loggeduser', users_controller.me)
    app.get('/api/users', users_controller.getAll)
    app.get('/api/user/:id', users_controller.getOneUser)
    app.get('/api/progress/:id', users_controller.checkProgress)

    app.put('/api/user/:id', users_controller.update);
    app.put('/api/user/teamname/:id/', users_controller.updateTeamName)

    app.post('/api/progress', users_controller.postProgress)

    //characters
    app.get('/api/characters', characters_controller.getAllCharacters);
    app.get('/api/characters/:id', characters_controller.getOneCharacter);

    //specialattacks
    app.get('/api/specialattacks', attacks_controller.getAllAttacks);


    app.get('/auth/logout', function (req, res) {
        req.logout();
        res.redirect('http://localhost:3001/');
    })
})

const port = 3000;
//this is the port that the site comes out in
app.listen(port, () => { console.log(`Server listening on port ${port}.`); });