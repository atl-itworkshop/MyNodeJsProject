const passport = require("passport");
const FacebookTokenStrategy = require("passport-facebook-token");
const FbUser = require("../model/FbUser");

let fbconfig = require("../config/fbconfig");

passport.use(
   "facebookToken",
   new FacebookTokenStrategy(
      {
         clientID: fbconfig.clientID,
         clientSecret: fbconfig.clientSecret,
      },
      async (accessToken, refreshToken, profile, done) => {
         try {
            console.log("accessToken", accessToken);
            console.log("refreshToken", refreshToken);
            console.log("profile", profile);

            const user = await FbUser.findOne({ id: profile.id });
            if (user) {
               return done(null, user);
            }

            // Create user
            user = await FbUser.create({
               id: profile.id,
               firstName: profile.name.givenName,
               lastName: profile.name.familyName,
               email: profile.emails[0].value,
            });

            done(null, user);
         } catch (error) {
            done(error, false, error.message);
         }
      }
   )
);
