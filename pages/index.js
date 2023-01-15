import { useState } from 'react'
import axios from 'axios'

function HomePage() {
  const [inputText, setInputText] = useState('')
  const [response, setResponse] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const apiResponse = await axios.post(
        'https://api.openai.com/v1/completions',
        {
          prompt: inputText,
          model: 'text-davinci-003',
          temperature: 0,
          max_tokens: 200
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
          }
        }
      )
      setResponse(apiResponse.data.choices[0].text)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button type="submit">Generate Text</button>
      </form>
      <div>{response}</div>
    </div>
  )
}

export default HomePage
