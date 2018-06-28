require("dotenv").config();
const express = require("express"),
      session = require("express-session"),
      passport = require("passport"),
      Auth0Strategy = require("passport-auth0"),
      massive = require("massive"),
      ctlr = require("./controller"),
      bodyParser = require("body-parser"),
      nodemailer = require('nodemailer');
  
const { SERVER_PORT, SESSION_SECRET, DOMAIN, CLIENT_ID, CLIENT_SECRET, CALLBACK_URL, CONNECTION_STRING, USER, PASS, FRONTEND_URL } = process.env
      
const app = express()

app.use( express.static( `${__dirname}/../build` ) );

app.use(bodyParser.json())

massive(CONNECTION_STRING).then( db => {
  app.set("db", db);
})

//SETUP SESSION
app.use(session({
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

//INITALIZE PASSPORT AS MIDDLEWARE
app.use(passport.initialize());

//SET PASSPORT READY TO USE SESSIONS
app.use(passport.session())

//SETUP STRATEGY
passport.use(new Auth0Strategy({
  domain: DOMAIN,
  clientID: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  callbackURL: CALLBACK_URL,
  scope: "openid profile"
}, (accessToken, refreshToken, extraParams, profile, done) =>{
    const db = app.get("db") 
    let {id, displayName, picture} = profile;
    db.find_user([id]).then(user => {
      if(user[0]){
        done(null, user[0].id)
      } else{
        db.create_user([displayName, picture, id]).then( (created_user) => {
          done(null, created_user[0].id)
        })
      }
    })
}))


passport.serializeUser((primaryKeyID, done) => {
  done(null, primaryKeyID)
})


passport.deserializeUser((primaryKeyID, done) => {
  app.get("db").find_session_user([primaryKeyID]).then(user => done(null, user[0]))

})


app.get("/auth", passport.authenticate("auth0"));

app.get("/auth/callback", passport.authenticate("auth0", {
  successRedirect: `${FRONTEND_URL}#/user` 
}))

app.get("/auth/logout", (req, res) => {
  req.logOut();
  res.redirect(FRONTEND_URL)
})

//Endpoint to check if user is logged in.
app.get("/auth/user", (req, res) =>{
  if(req.user){
    res.status(200).send(req.user)
  } else {
    res.status(401).send("No, no")
  }
});


//Clients Endpoints
app.get("/api/clients/:id", ctlr.getClients);
app.put("/api/clients/:id", ctlr.updateClient);
app.post("/api/clients", ctlr.addClient);
app.delete(`/api/clients/:id`, ctlr.deleteClient);

//Projects Endpoints
app.get("/api/projects/:id", ctlr.getProjects);
app.put("/api/projects/:id", ctlr.updateProject);
app.post("/api/projects", ctlr.addProject);
app.delete(`/api/projects/:id`, ctlr.deleteProject);

//Tasks Endpoints
app.get("/api/tasks/:id", ctlr.getTask)
app.post("/api/tasks", ctlr.addTask);
app.put("/api/tasks/:id", ctlr.updateTask);
app.delete(`/api/tasks/:id`, ctlr.deleteTask);
app.get(`/api/tasks/:id`, ctlr.getTime);

//Dashboard Endpoints
app.get(`/api/tasks/:id`, ctlr.getProductivity);

//Notes Endpoints
app.post("/api/notes/", ctlr.addNote)

//Contact Endpoint
app.post('/send', function(req, res, next) {
  console.log(PASS)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: USER,
      pass: PASS
    }
  })
  const mailOptions = {
    from: USER,
    to: `${req.body.email}`,
    subject: `${req.body.subject}`,
    text: `${req.body.message}`,
    replyTo: USER
  }
  transporter.sendMail(mailOptions, function(err, res) {
    if (err) {
      console.error('there was an error: ', err);
    } else {
      console.log('here is the res: ', res)
    }
  })
})



app.listen(SERVER_PORT, ()=>console.log("Listening to port: " + SERVER_PORT ))