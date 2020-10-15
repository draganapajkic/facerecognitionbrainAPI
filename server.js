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
      host : '127.0.0.1', //ovo je localhost
      user : 'postgres',
      password : 'gaga5545454',
      database : 'smartbrain'
    }
  });

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => { res.send(database.users) })
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)} )
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)}) //dependency injection
app.get('/profile/:id' , (req, res) => {profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => {image.handleImage(req, res, db)}) //ovaj deo se odnosi na rank, odnosno br slika koje smo uneli
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)}) //ovaj deo se odnosi na rank, odnosno br slika koje smo uneli

app.listen(3000, () =>{
    console.log('app is running on port 3000');
})

/* Plan for creating API

/ --> roor route: res = this is working
/signin --> POST = success/fail
/register --> POST = user
/profile/userId --> GET = user
/image --> PUT --> updated count

*/