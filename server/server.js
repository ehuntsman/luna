const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const config = require('./secrets.js');
const characters_controller = require('./controllers/characters_controller');
const Auth0Strategy = require('passport-auth0');
const passport = require('passport');

const app = module.exports = express();
app.use( bodyParser.json() );
app.use( cors() );

app.use(session({
    secret: config.sessionSecret
}))
app.use(passport.initialize());
app.use(passport.session());

passport.use(new Auth0Strategy({
    domain:         config.domain,
    clientID:       config.clientID,
    clientSecret:   config.clientSecret,
    callbackURL:    'http://localhost:3000/auth/callback'
}, function(accessToken, refreshToken, extraParams, profile, done) {
    //database stuff here
    //user profile.id to find id
        //if user -> done
        //else create user
        //done
    return done(null, profile);
}));


app.get('/auth', passport.authenticate('auth0'));
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: '/myteam',
    failureRedirect: '/'
}));

passport.serializeUser(function(user, done){
    done(null, user);
});
passport.deserializeUser(function(obj, done){
    done(null, obj);
});

app.get('/myteam', function(req,res){
    res.send(req.user)
})

massive( config.connectionString ).then( dbInstance => app.set('db', dbInstance));

app.get('/api/characters', characters_controller.getAll);


const port = 3000;
//this is the port that the site comes out in
app.listen( port, () => { console.log(`Server listening on port ${port}.`); } );