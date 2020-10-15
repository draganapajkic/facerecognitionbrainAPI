const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin'); 
const profile = require('./controllers/profile'); 
const image = require('./controllers/image'); 

const db = knex({
    client: 'pg',
    connection: {
      connectionString : process.env.DATABASE_URL,
      ssl: true
    }
  });

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => { res.send('It is working') })
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)} )
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)}) //dependency injection
app.get('/profile/:id' , (req, res) => {profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => {image.handleImage(req, res, db)}) //ovaj deo se odnosi na rank, odnosno br slika koje smo uneli
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)}) //ovaj deo se odnosi na rank, odnosno br slika koje smo uneli

app.listen(process.env.PORT || 3000, () =>{
    console.log(`app is running on port ${process.env.PORT}`);
})

/* Plan for creating API

/ --> roor route: res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/userId --> GET = user
/image --> PUT --> updated count

*/