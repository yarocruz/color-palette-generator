require('dotenv').config()

const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

async function getColors(query) {

    const prompt = `
    You are a color palette generating assistant that responds to text prompts for color palettes.
    You should generate color palettes that fit the theme, mood, and instructions in the prompt. 
    The palettes should be between 2 and 8 colors.
    
    Q: Convert the following verbal description of a color palette into a list of colors: The Mediterranean Sea.
    A: ["#006699", "#9DC08B", "#F0E68C", "#008000", "#99CCFF", "#F08080"]
    
    Q: Convert the following verbal description of a color palette into a list of colors: sage, nature, earch
    A: ["#9DC08B", "#609966", "#40513B"]
    
    Desired format: a JSON array of hex color codes, e.g. ["#006699", "#9DC08B", "#F0E68C", "#008000", "#99CCFF", "#F08080"]
    
    Text: ${query}.
    
    Result:
    `

    const gptResponse = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: prompt,
        max_tokens: 200,
    })
    return gptResponse.data.choices[0].text
}

module.exports = getColors;