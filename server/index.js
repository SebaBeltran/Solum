require("dotenv").config();
const express = require("express"),
      session = require("express-session"),
      passport = require("passport"),
      Auth0Strategy = require("passport-auth0"),
      massive = require("massive"),
      ctlr = require("./controller"),
      bodyParser = require("body-parser"),
      nodemailer = require('nodemailer'),
      xoauth2 = require("xoauth2")
  
const { SERVER_PORT, SESSION_SECRET, DOMAIN, CLIENT_ID, CLIENT_SECRET, CALLBACK_URL, CONNECTION_STRING,  FRONTEND_URL } = process.env
      
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
          db.add_settings([created_user[0].id, created_user[0].profile_pic, created_user[0].user_name, 0 ])
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
    //console.log(req.user)
    const db =  req.app.get("db");

    db.find_user([req.user.auth_id])
    .then(user => {res.status(200).send(user[0])})
    .catch(error => res.status(500).send(error))
    //res.status(200).send(req.user)
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

//Settings Endpoints
app.put("/api/settings/:id", ctlr.updateSettings)

//Contact Endpoint
app.post('/send', function(req, res, next) {
  const output = 
    `<h3 style="font-family: Arial" >Hey, ${req.body.user_name} sent you an email</h3>
    <p style="font-family: Arial; font-size:14px; color: #41403F">${req.body.message}</p>
    <div style="font-family: Arial; padding: 20px 20px 40px; width: 400px; background: #F0F0F0">
    <p style="font-family: Arial; color: #41403F">Email sent using: UFO - project manager</p>
    <a href="https://ufo.trip.com.uy" style="font-family: Arial; text-decoration: none; color: #41403F; margin-bottom:25px;">ufo.trip.com.uy</a>
    </div>
    `
  
    let transporter = nodemailer.createTransport({
      host: 'box540.bluehost.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
          user: `${process.env.TEST_USER}`, // generated ethereal user
          pass: `${process.env.TEST_PASS}` // generated ethereal password
      }
  });
  const mailOptions = {
    from: `${process.env.TEST_USER}`,
    to: `${req.body.email}`,
    subject: `${req.body.subject}`,
    html: output,
    replyTo: `${process.env.TEST_USER}`
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