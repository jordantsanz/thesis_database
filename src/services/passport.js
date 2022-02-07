/* eslint-disable consistent-return */
import passport from 'passport';
import LocalStrategy from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';
import User from '../models/user_model';

dotenv.config({ silent: true });

const localOptions = { usernameField: 'email' };

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('authorization'),
  secretOrKey: process.env.AUTH_SECRET,
};

const localLogin = new LocalStrategy(localOptions, (email, password, done) => {
  User.findOne({ email }, (err, user) => {
    if (err) { return done(err); }

    if (!user) { return done(null, false); }

    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        done(err);
      } else if (!isMatch) {
        console.log('not match');
        done(null, false);
      } else {
        console.log('good match');
        done(null, user);
      }
    });
  });
});

const jwtLogin = new JwtStrategy(jwtOptions, (payload, done) => {
  console.log('payload', payload);
  User.findById(payload.sub, (err, user) => {
    console.log(err, user);
    if (err) {
      done(err, false);
    } else if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  });
});

passport.use(jwtLogin);
passport.use(localLogin);

export const requireAuth = passport.authenticate('jwt', { session: false });

export const requireSignin = passport.authenticate('local', { session: false });
