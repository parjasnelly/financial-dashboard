const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const database = require('./src/database')
const routes = require('./src/routes')

const session = require('express-session')
const cookieParser = require('cookie-parser')

const flash = require('connect-flash')

const passport = require('passport')
const LocalStrategy = require('passport-local')

const AccountRepository = require('./src/database/repository/account')
const bcrypt = require('bcrypt')

passport.use(new LocalStrategy(
    async(username, password, done) => {

        let aRepo = new AccountRepository()
        let account = await aRepo.findByUsername(username)
        if(account.length==0) return done(null, false, {message:'Usuário e/ou senha inválidos'})

        bcrypt.compare(password, account[0].password, (err, result)=>{
            if(err){
                return done(err)
            }
            if(!result){
                return done(null, false, {message:'Usuário e/ou senha inválidos'})
            }

            return done(null, account[0])
        })
    }
))

passport.serializeUser((account, done)=>{
    done(null,{id: account.id})
})

passport.deserializeUser(async (obj, done)=>{
    let aRepo = new AccountRepository()
    let account = await aRepo.findByID(obj.id)
    done(null, account[0])
})

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.static(__dirname + '/public'))
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}))

app.use(cookieParser())
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
app.use('/', routes)

app.listen(port, async() => {
    //await database.sync({ force: true })
    await database.sync()
    console.log(`Blog app listening at http://localhost:${port}`)
})
