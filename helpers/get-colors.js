require('dotenv').config()

const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config()

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

async function getColors(query) {

    const messages = [
        {"role": "system", "content": "You are a color palette generating assistant that responds to text prompts for color palettes. You should generate color palettes that fit the theme, mood, and instructions in the prompt. The palettes should be between 2 and 8 colors."},
        {"role": "user", "content": "Convert the following verbal description of a color palette into a list of colors: The Mediterranean Sea."},
        {"role": "assistant", "content": '["#006699", "#9DC08B", "#F0E68C", "#008000", "#99CCFF", "#F08080"]'},
        {"role": "user", "content": "Convert the following verbal description of a color palette into a list of colors: sage, nature, earth"},
        {"role": "assistant", "content": '["EDF1D6", "#9DC08B", "#609966", "#40513B"]'},
        {"role": "user", "content": `Convert the following verbal description of a color palette into a list of colors: ${query}.`},
    ]

    const gptResponse = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: messages,
        max_tokens: 200,
    })
    return gptResponse.data.choices[0].message.content
}

module.exports = getColors;