require('dotenv').config()

//Requests
const express =require('express')
const mongoose = require('mongoose')
const { createServer } = require('http')

const port=3000;

/* for to validate and authentication*/
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const User = require('./modules/User')

const bcrypt = require('bcrypt')

const {
    checkAuthenticated,
    checkNotAuthenticated
} = require('./middlewares/auth')
/*------------------------------------------*/

const app = express()

app.use(session({ secret: 'somevalue' }));

//Find users
const initializePassport = require('./passport-config')
const {check} = require("express-validator");
initializePassport(
    passport,
    async(email)=>{
        const userFound = await User.findOne({email})
        return userFound
    },
    async(id) =>{
        const userFound = await User.findOne({_id: id})
        return userFound
    }
)



///for css in ejs
app.set('view-engine', 'ejs')
app.use(express.urlencoded({extended: true}))

app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))


app.use(express.static(__dirname + '/public'));



app.set('view-engine', 'ejs')
app.get('/', function(req, res) {
    res.render('index.ejs');
});
app.get('/aff', function(req, res) {
    res.render('Affirmation.ejs');
});
app.get('/pod', function(req, res) {
    res.render('Podcasts.ejs');
});
app.get('/med', function(req, res) {
    res.render('meditations.ejs');
});
app.get('/logout', checkAuthenticated, (req,res)=>{
    res.render("profile.ejs", { name: req.user.name })//GO TO PROFILE!!!! NOT MAIN
})
app.get('/log',checkNotAuthenticated, (req,res)=>{
    res.render('signin.ejs')
})
app.get('/reg',checkNotAuthenticated, (req,res)=>{
    res.render('signup.ejs')
})






//---Login case---//
app.post('/log',checkNotAuthenticated, passport.authenticate('local',{
        successRedirect: '/logout',
        failureRedirect: '/log',
        failureFlash: true,
    })
)


//---Register case---//
app.post('/reg', checkNotAuthenticated, async (req,res)=>{
    const userFound = await User.findOne({email: req.body.email})

    if(userFound){
        req.flash('error', 'User already exist (¬-¬)')
        res.redirect('/reg')
    }
    else{
        try{
            const hashedPassword = await bcrypt.hash(req.body.password, 10)
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hashedPassword
            })

            await user.save() //Add to DB
            res.redirect('/log')

        }catch (e){
            console.log(e)
            res.redirect('reg')
        }
    }
})

//---Log out---//
app.delete('/logout', (req,res)=>{
    req.logOut()
    res.redirect('/log')
} )

///---MongoDB connect---///
mongoose.connect('mongodb+srv://jaypark:jaypark18@cluster0.kj7nh.mongodb.net/Jaybaraqat?retryWrites=true&w=majority', {
    useNewUrlParser: true,
}).then(()=>console.log('MongoDb connected'))
    .catch(e => console.log(e))

const server = createServer(app)
server.listen(port, ()=>console.log('server is up.'))
// Load CSS




