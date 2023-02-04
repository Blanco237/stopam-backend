const   express=require('express');
const   app=express(); 
const   hbs=require('express-handlebars');
const   dotenv=require('dotenv').config();
const { Configuration, OpenAIApi } = require("openai");


app.use(express.json());
app.use(express.urlencoded());
app.get('/',(req,res)=>{
  res.send("Hello")
});

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function runCompletion (text) {
const completion = await openai.createCompletion({
  model: "text-davinci-003",
  prompt:text,
});
console.log(completion.data.choices[0].text);
return completion.data.choices[0].text
}

runCompletion("How are you");

app.get('/home',(req,res)=>{
  res.sendFile('test.html',{root:'./'})
})
app.post('/input',async (req,res)=>{
  /*res.parentMessageId=uuidv4()
  res.conversationId=uuidv4()*/
  //const response=await runCompletion(req.body.input)
  res.send(`${response}`);
})
app.post('/input2',(req,res)=>{

})


app.listen(4000,()=>{
  console.log(`Just hit port 4000....`)
})