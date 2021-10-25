const express=require('express');
const morgan=require('morgan');
const app=express();
const path=require('path');
const session = require('express-session');
app.use(morgan('dev'));
app.set('port',process.env.PORT || 3000);
app.use(express.static(path.join(__dirname,'public')));
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'vista'));

app.use(session({
 secret:'123',
 resave:true,
 saveUninitialized:true 

}));



app.use(express.urlencoded({extended:true}));
app.use(require('./Rutas/rutas'));
app.use((err,req,res,next)=>{
  res.send({err:err.message});

});


//Servidor



app.listen(app.get('port'),()=>{
console.log(`En el servidor ${app.get('port')}`);

});

