MEAN Stack Application (MongoDB, ExpressJS, AngularJS, NodeJS)MEAN Stack Application (MongoDB, ExpressJS, AngularJS, NodeJS)
By David Acosta

PREREQUISITE
 - NodeJS
 - MongoDB


PART 1
MEAN Stack App Part 1: Setting up Server with NodeJS & ExpressJS and MongoDB w/Mongoose


1. Create Project Folder, Anyname will do.
   Create file, server.js

2. Right Click Project Folder>npm init
   npm i express
   npm i nodemon

3. in server.js


const express = require ("express");
const app =  express();


const port = process.env.PORT || 3000;

app.listen (port, ()=>{
  console.log(`Listening to Port ${port}. Server Connected.`);
});


4. Run Terminal
   Right Click Project Folder>Gitbash
   nodemon app
   or
   node app
   or
   npm start
   or
   npm start server.js

5. Let's Create a Simple Route

   app.get ("/", (req, res)=>{
     res.send("Hello World");
   })

6. Run the Terminal, go to Browser localhost:3000
   If it works properly, delete the route again.
   We actually don't need it.

7. npm i morgan

   Remarks: Every request you make is being logged by morgan in the Terminal.

6. const morgan = require ("morgan");
   app.use(morgan("dev"));

7. Create a Home Route

app.get ("/home", (req, res)=>{
  res.send("Hello from Home");
});


8. Run the Terminal, Go to Browser
   http://localhost:3000/home

9. npm i mongoose

10 in server.js

mongoose.connect("mongodb://localhost/tutorial")
.then(()=>{console.log("Connected to Database")} )
.catch( (err)=>{console.log (err.message + "Unable to Connect to Database")})


  Remarks:

  Below is your connection string.
  "mongodb://localhost/tutorial"

  tutorial is the name of your database.

11. Open your Terminal, type in mongod
    Get the port number
    27017

    Update your connection string from this

    mongoose.connect("mongodb://localhost/tutorial")

    to this

    mongoose.connect("mongodb://localhost:27017/tutorial")


12. Run you Terminal, nodemon app


PART 2

MEAN Stack App Part 2: User Model & Routes

13. Create models Folder
        Inside create user.js

14. Create a userSchema in user.js

const mongoose = require("mongoose");
const express = require('express');
const router = express.Router();

const userSchema = new mongoose.Schema ({
 username:{
   type:String,
   lowercase:true,
   required:true,
   unique:true
 },
 password:{
   type:String,
   required:true
 },
 email:{
   type:String,
   lowercase:true,
   required:true,
   unique:true
 }
})

const User = new mongoose.model ("User", userSchema);

module.exports.User = User;


15. Create routes Folder
     Inside create users.js

     const {User} = require("../models/user.js")


     const mongoose = require("mongoose");
     const express = require('express');
     const router = express.Router();



     router.get('/', (req, res) => {
        res.send("Hello World")
     });



     module.exports = router;

  16.  In server.js

      const users = require('./routes/users.js');
      app.use('/api/users', users);


17. Delete the route on your main Module which is in sever.js
    All routes should be in routes Folder

18. Run the Terminal and then
    Go to Browser

    http://localhost:3000/api/users

19. In routes Folder, users.js file

    Delete teh below Routes

    router.get('/', (req, res) => {
       res.send("Hello World")
    });


    Let's create a new route - USING POST METHOD

    router.post('/',  (req, res) => {
       res.send("Testing Users Route...")
    });


20. Go to Postman
    Choose POST method
    Type in,   http://localhost:3000/api/users


21.  Let update our post route

From this

router.post('/',  (req, res) => {
   res.send("Testing Users Route...")
});


To this

router.post('/',  (req, res) => {
  const user = new User ();
  user.username = req.body.username;
  user.password = req.body.password;
  user.email = req.body.email;
  user.save();
  res.send("User Created");
});


23. Go to server.js

    add express.json middleware in the Main Module.

    app.use(express.json());

22. Go to Postman

       POST http://localhost:3000/api/users
       Body>raw>JSON(application/json)

       {
       	"username": "valerosojayr",
       	"password": "12345",
       	"email": "valeroso.jayr@gmail.com"
       }

Remarks:
  Go to main module. server.js and add the below middleware
  after express.json() middleware.

  //BODY PARSER
  //For parsing application/x-www-form-urlencoded.
  app.use(express.urlencoded({extended: false}));


  you can also go Postman.
  POST    POST http://localhost:3000/api/users
  Body>raw>x-www-form-urlencoded
  Fil in the key value pairs
  username
  password
  email

23.Open MongoDB Compass Community Icon on your Desktop
   If not installed install it.
   The click, connect

   You'll se your tutorial Database
   and users collection


24. Let's Hash the PW
    Go to routes folder, users.js
    Before that let's install bcryptjs
    npm i bcryptjs

    Then require the module.
    const bcrypt = require("bcryptjs");

Inside of below route, add teh below HASH PASSWORD CODE.

router.post('/',  (req, res) => {
  const user = new User ();
  user.username = req.body.username;
  user.password = req.body.password;
  user.email = req.body.email;
  user.save();
  res.send("User Created");
});


//HASH PASSWORD CODE
bcrypt.genSalt(10,(err, salt)=>{bcrypt.hash(newUser.password,salt, (err, hash)=>{
 if (err)throw err;
 //SET PASWWORD TO HASH
 newUser.password = hash;
 //SAVE USER
 newUser.save()
 .then(user=>{
   res.redirect("/users/login");
 })
 .catch(err=>console.log(err));
})})// ******** End Here - HASH PASSWORD


FINAL CODE...

router.post('/',  (req, res) => {
  const user = new User ();
  user.username = req.body.username;
  user.password = req.body.password;
  user.email = req.body.email;

  //HASH PASSWORD
  bcrypt.genSalt(10,(err, salt)=>{bcrypt.hash(user.password,salt, (err, hash)=>{
   if (err)throw err;
   //SET PASWWORD TO HASH
   user.password = hash;
   //SAVE USER
   user.save()
   .then(user=>{
     res.send("User Created");
   })
   .catch(err=>console.log(err));
 })})// ******** End Here - HASH PASSWORD


});



26. Go to Postman

       POST http://localhost:3000/api/users
       Body>raw>JSON(application/json)

       {
       	"username": "vineyard",
       	"password": "12345",
       	"email": "vineyard@gmail.com"
       }


27. Go to MongoDB Compass and see if new user has been created.
    Check if password has been hashed.


28. in Models Folder, user.js Module
    Let's create a validateUser function
    then, let export it.
    then install, npm i joi


const Joi = require('joi');


function validateUser(user) {
  const schema = {
    username: Joi.string().min(3).require(),
    password: Joi.string().min(3).require(),
    email: Joi.string().min(20).require(),
  };

  return Joi.validate(user, schema);
}

module.exports.validateUser = validateUser;


REMARKS:
to use our validateCustomer function.

const { error } = validateCustomer(req.body);
if (error) return res.status(400).send(error.details[0].message);

also require Joi on your main module, in server.js

const Joi = require('joi');

29. Let's try to check if our Joi Validation is working.
    Play aroound, do not put username or email and see the result.

Go to Postman

       POST http://localhost:3000/api/users
       Body>raw>JSON(application/json)

       {
       	"username": "vineyard",
       	"password": "12345",
       	"email": "vineyard@gmail.com"
       }


MEAN Stack App Part 3: Static Layout (Index) Using ExpressJS

30. Create public folder
     Inside create app folder
       Inside create views folder
           Inside views create index.html
               index.html will be our home route.



31.  In Main Module, server.js

    const path = require ("path");

    Add the below code after express.json() middleware.

    app.use ("/public", express.static(path.join(__dirname,"public")));



33. In the main Module server.js add this route.

    Create a Home Route

    //Home Route
    app.get("*", (req, res)=>{
    res.sendFile(path.join(__dirname + "/public/app/views/index.html"))
    });

Remarks:
Go to Browser: http://localhost:3000


MEAN Stack App Part 4: Mapping Bootstrap and Angular Libraries

34. In public Folder
     Create assets Folder
      Inside create the ff Folders
      Create css Folder, js Folder, Folder

35. Go to https://getbootstrap.com/
    Click Examples link
   Click, Starter Templalte
or
https://getbootstrap.com/docs/4.3/examples/starter-template/
then, ctrl + u

    paste the code on the index.html that we created.
    it's in our public>app>views folder
    Then save it.

    Then cut some CODES
    from <div class="page-header"> to  </div> <!-- /container -->
    Then save it again.


36. How to use bootstrap
    You can user Bootsrap CDN from https://getbootstrap.com/docs/4.3/getting-started/download/#bootstrapcdn
    or
    Download Bootstrap
    https://getbootstrap.com/docs/4.3/getting-started/download/
    or
    npm install bootstrap

    We are going to download it. then
    Copy the downloaded js and css folder inside of our assets folder.

37. Go to https://angularjs.org/
    Click Download Angular JS
    Click uncompress
    Click download

    From Angular Downloded Files
    Copy the below Files, and pase in public>assets>js Folder.

angular
angular.min
angular.min.js.map
angular-animate
angular-animate.min
angular-animate.min.js.map
angular-route
angular-route.min
angular-route.min.js.map


38.  Go to https://jquery.com
     Click Downlod JQuery
     Click Download the compressed, production jQuery 3.4.1
     Make a new js file named, jquery-3.4.1.min.js
     paste all the coe from the compress, production jquery.
     Attached the file in public>assets>js Folder.


39.  In your index.html file, delete all the link and script on the head tag.

40.  Also delete all the script above the end of body tag.

42. In public>app>views>index.html
    Add your link bootstrap.css link in head tag.

    <link rel="stylesheet" href="public/assets/css/bootstrap.css">
    <script type="text/javascript" src="public/assets/js/angular.js"></script>
    <script type="text/javascript" src="public/assets/js/angular-route.js"></script>


    Then before the end body tag add the below script.
    <script type="text/javascript" src="public/assets/js/jquery-3.4.1.min.js.js"></script>
    <script type="text/javascript" src="public/assets/js/bootstrap.js"></script>


  MEAN Stack App Part 5: Angular Routes (ngRoute)

  43. Go Browser>http://localhost:3000/
      Then, Ctrl + Shift + i
      Click, console

  44. From this folder public>app>views>
      Create new folder with the name, pages
      Inside this pages Folder, create about.html and home.html

  45. From about.html
      Do this code...


      <div class="page-header">
        <h1>Hello from About Route</h1>
      </div>

46. From home.html

<div class="page-header">
  <h1>Hello from Home Route</h1>
</div>


47. From public>app>
    Create another folder with the name controllers

48. From public>app>
    Create a file.
    app.js
    routes.js

49. In public>app>views>index.html
    Add the below scipt tag in head tag.

    <script type="text/javascript" src="public/app/app.js"></script>
    <script type="text/javascript" src="public/app/routes.js"></script>

50. In app.js
    console.log("Testing Main Configuration.");

51. In routes.js
   console.log("Testing Route File");

52. Go to Browser: http://localhost:3000/
    Ctrl + shift + i, then click console

    You'll the below logs on the console.
        Testing Main Configuration
        Testing Route File


53. Let's create an Angular Module.
    From public>app>app.js
    Delete whatever in there...

    angular.module("userApp", [])

    .config(()=>{
        console.log ("Testing User Application");
    });

54. Go to index.html, we have to insert our userApp
    to tell our index.html to use this userApp angular application.

    inisde of the <body> tag

    do this.

    <body ng-app="userApp">

Remarks: Script should follow this order or else it will not work...

<script type="text/javascript" src="public/assets/js/angular.js"></script>
<script type="text/javascript" src="public/assets/js/angular-route.js"></script>
<script type="text/javascript" src="public/app/app.js"></script>

<script type="text/javascript" src="public/app/routes.js"></script>
