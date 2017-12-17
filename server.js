const express=require('express');
const hbs=require('hbs');
const fs=require('fs');
var app= express();

app.set('view engine','hbs');
hbs.registerPartials(__dirname+'/views/partials');
app.use(express.static(__dirname+'/public'));

const port=process.env.PORT || 3000;

app.use((req,res,next)=>{
  var now=new Date().toString();
  var log=`${now}: ${req.method} ${req.url}`;
  fs.appendFile('server.log',log+ '\n',(err)=>{
    if(err){
      console.log('Unable to write in the log file');
    }
  });
next();

});


hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear();
})
app.get('/',(req,res)=>{
  res.render('home.hbs',{
    pageTitle: 'Home page',
    welcomeMessage: 'Welcome to my website'
    });
});

hbs.registerHelper('screamIt',(text)=>{
  return text.toUpperCase();''
});

app.get('/about',(req,res)=>{
  res.render('about.hbs',{
    pageTitle: 'About Page'
  });
})

app.get('/project',(req,res)=>{
  res.render('project.hbs',{
    pageTitle: 'Portfolio',
    welcomeMessage: 'Welcome to portfolio page'
  });
})


app.get('/bad',(req,res)=>{
  res.send({
    status:'404',
    errorMessage :'Unable to load the page'
      });
})

app.listen(port,()=>{
console.log(`server is up on ${port}`);
});
