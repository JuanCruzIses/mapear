const express = require('express');
const app = express();
const path = require('path');
const session = require('express-session')
const cookieParser = require('cookie-parser');
const notLoggedMiddlewares = require('./middlewares/notLoggedMiddlewares');


//Config for express
app.set('view engine', 'ejs');

//Config for process put and delete
const methodOverride = require('method-override')
app.use(methodOverride('_method'))

app.use(cookieParser());
app.use(express.urlencoded({extended : false}));
app.use(express.json());
app.use(session({
    secret: 'MapeAR  is the new app',
    resave: false,
    saveUninitialized: false
}));

///-----Requiriendo middlewares----///
const userLoggedMiddlewares = require('./middlewares/userLoggedMiddlewares')

// Uso de middlewares
app.use(userLoggedMiddlewares);

//Require the routes
const indexRoutes = require('./routes/indexRoutes.js');
const userRoutes = require('./routes/userRoutes.js')
const adminRoutes = require('./routes/adminRoutes.js');
const travellRoutes = require('./routes/travellRoutes.js');

//Declare the routes in the app
app.use('/', userRoutes);
app.use('/home', indexRoutes);
app.use('/admin', adminRoutes)
app.use('/travell', travellRoutes)

//Define the public directory and set it to the public folder
const publicPath = path.join(__dirname, 'public');
app.use(express.static(publicPath))

//Middleware a nivel de la app
app.use(notLoggedMiddlewares)



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));