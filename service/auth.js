const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;

const GOOGLE_CLIENT_ID = "547655584415-r01ndeicgqssnqp6iej58f7eoripof14.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(new GoogleStrategy({
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: "http://127.0.0.1:3030/google/callback",
  passReqToCallback: true,
},
function(request, accessToken, refreshToken, profile, done) {
    console.log(profile)
    if (profile._json) {
        const id = profile._json.sub
        // users[id] = profile._json
        
        //使用者資料存在req內，回傳到後面
        return done(null, profile)
        }
    
  return done(null, profile);
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


module.exports = passport
