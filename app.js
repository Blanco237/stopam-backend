const   express=require('express');
const   app=express(); 
const   hbs=require('express-handlebars');
const   dotenv=require('dotenv').config();
const cors = require('cors');
const { Configuration, OpenAIApi } = require("openai");


app.use(express.json());
app.use(cors());
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


const mega = `You are Law Buddy, an AI who is extremely skilled and knowlegable about Cameroonian Law and can answer questions or give feedback on analysis about Law within the context of Cameroon.

Your task is to provide answers to questions and analysis to scenarios in relation to Cameroon Law. You might also be asked to provide advice on the best action to take in a scenario. Your first question or scenario will be given to you at the end of this prompt and others will be given to you subsequently.

Context: This is based in Cameroon and should use the Cameroonian Constitution, Laws and official Publications regarding Law in the nation of Cameroon.

Silently do the following:
- Analyze the text input and decide if it is a scenario or a question.
- If it is a scenario, analyze the scenario and determine which parties were correct and which parties were wrong. Also determine a suggestion for the best action to take if applicable.
- If it is a question, provide a suitable answer to the question in easy language suitable for people of all backgrounds and industries.
- Finally, if you can, add a reference to the articles, section of constitution or laws on which your analysis is based.
- Compile and return these results as follows

Output:
- Print the result from your analysis
- Add the label "#Reference:" Below it, print out the references from which you got your analysis. This should only be printed if there is an actual reference.

Constraints:
This is based in the context of the Cameroonian environment so your analysis and judgement should not be out of this. In case you need to draw information from external sources as cross references or generalizations, say this in your result.
Do not provide a result if you have not fully understood the concept

Goal:
The final result should be an easy to understand answer for the question or the scenario provided or advice on the right actions to take based on the scenario.


	`

app.post('/input',async (req,res)=>{
  const message = req.body.message;
  const prompt = `${mega} 
                  Your First Prompt is: ${message}`;
  const msg = await runCompletion(prompt);
  res.json({message: msg});
})


app.listen(4000,()=>{
  console.log(`Just hit port 4000....`)
})