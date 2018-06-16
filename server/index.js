require("dotenv").config();
const express = require("express"),
      session = require("express-session"),
      passport = require("passport"),
      Auth0Strategy = require("passport-auth0"),
      massive = require("massive"),
      ctlr = require("./controller"),
      bodyParser = require("body-parser");
  
const { SERVER_PORT, SESSION_SECRET, DOMAIN, CLIENT_ID, CLIENT_SECRET, CALLBACK_URL, CONNECTION_STRING } = process.env
      
const app = express()
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
  successRedirect: "http://localhost:3000/#/user" 
}))

app.get("/auth/logout", (req, res) => {
  req.logOut();
  res.redirect("http://localhost:3000")
})

//Endpoint to check if user is logged in.
app.get("/auth/user", (req, res) =>{
  if(req.user){
    res.status(200).send(req.user)
  } else {
    res.status(401).send("No, no")
  }
});


//Endpoint to get Clients
app.get("/api/:id/clients", ctlr.getClients);
app.put("/api/clients/:id", ctlr.updateClient);
app.post("/api/clients", ctlr.addClient);
app.delete(`/api/clients/:id`, ctlr.deleteClient);

app.listen(SERVER_PORT, ()=>console.log("Listening to port: " + SERVER_PORT ))