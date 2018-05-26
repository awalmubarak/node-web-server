const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;


var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
hbs.registerHelper('getCurrentYear', ()=>new Date().getFullYear());
hbs.registerHelper('screamIt', (text)=>text.toUpperCase());

app.use((req,res,next)=>{
  var now  = new Date().toString();
  var log = `${now}: Method:${req.method} ${req.url}`;
  fs.appendFileSync('server.log', log + '\n');
  console.log(log);
  next();
});

// app.use((req,res,next)=>{
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));


app.get('/', (req, res)=>{
  var user = {
    name: 'Awal',
    age: 21,
    networth: 'timeout',
    company: 'anditer'
  };
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my node app',
    user
  })
});

app.get('/about', (req, res)=>{
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});


app.get('/bad', (req, res)=>{
  res.send({
    errorMessage: 'Something went wrong'
  });
});


app.listen(port, ()=>{
  console.log('Server running on port ' + port);
});
