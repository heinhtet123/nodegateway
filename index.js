const debug= require('debug');
const config= require('config');
const helmet= require('helmet');
const morgan= require('morgan');
const Joi=require('joi');
const logger=require('./logger');
const express = require('express');
const app=express();


app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static('public'));
app.use(helmet());


console.log("application name : "+ config.get('name'));
if(app.get('env')=== 'development'){
    app.use(morgan('tiny'));
    console.log('morgan enable');
}


app.use(logger);


const courses=[
    {id:1,name:"courses1"},
    {id:2,name:"courses2"},
    {id:3,name:"courses3"}
        
];

app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.get('/api/courses',(req,res)=>{
    res.send(courses);
});

app.get('/api/courses/:id',(req,res)=>{
   const course=courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course id was not matched');

    res.send(course);
});

app.post('/api/courses',(req,res)=>{

    const {error} = validateCourse(req.body);
   
    if(error) return  res.status(400).send(error.details[0].message);
        
    

   const course={
       id:courses.length+1,
       name: req.body.name
   }; 
   courses.push(course);
   res.send(course);
});



app.put('/api/courses/:id',(req,res)=>{

    const course=courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course id was not matched');

    const {error} = validateCourse(req.body);
   
    if(error)
    {
        res.status(400).send(error.details[0].message);
        return;
    }

    course.name=req.body.name;
    res.send(course);


});

function validateCourse(course)
{
    console.log(course);
    const schema = {
        name:Joi.string().min(3).required() 
    };
    
    return Joi.validate(course,schema);
}


app.delete('/api/courses/:id',(req,res)=>{
    const course=courses.find(c => c.id === parseInt(req.params.id));
    if(!course) res.status(404).send('The course id was not matched');
    
    const index=courses.indexOf(course);
    courses.splice(index,1);
    res.send(course);

});




//port
const port=process.env.PORT || 3000;

app.listen(port,()=>console.log(`listening on port ${port}`));