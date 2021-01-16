
import passport from 'passport'
import { Strategy } from 'passport-local'
import UserModel from '../models/userModel.js'

import JWT from 'passport-jwt'
const { Strategy: JWTstrategy, ExtractJwt } = JWT

passport.use(
    'signup',
    new Strategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    async (email, password, done) => {
        try {
            const user = await UserModel.create({ email, password })

            return done(null, user)
        } catch (error) {
            return done(error)
        }
    })
)

passport.use(
    'login',
    new Strategy(
        {
            usernameField: 'email',
            passwordField: 'password'
        },
        async (email, password, done) => {
            try {
                const user = await UserModel.findOne({ email })

                if (!user) {
                    return done(null, false, { message: 'Utilisateur non trouvé.'})
                }

                const validate = await user.isValidPassword(password)
                
                if (!validate) {
                    return done(null, false, { message: 'Erreur de connexion.'})
                }
                
                return done(null, user, { message: 'Connexion réussie.'})

            } catch (error) {
                return done(error)
            }
        }
    )
)

passport.use(
    new JWTstrategy(
        {
            secretOrKey: '0123456789',
            jwtFromRequest: ExtractJwt.fromUrlQueryParameter('token')
        },
        async (token, done) => {
            try {
                return done(null, token.user)
            } catch (error) {
                return done(error)
            }
        }
    )
)

export default passport