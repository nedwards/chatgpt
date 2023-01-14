import { useState } from 'react'
import axios from 'axios'

function HomePage() {
  const [inputText, setInputText] = useState('')
  const [response, setResponse] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const apiResponse = await axios.post(
        'https://api.openai.com/v1/text-davinci/generations',
        {
          prompt: inputText,
          model: 'text-davinci-002'
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
          }
        }
      )
      setResponse(apiResponse.data)
      console.log('response', apiResponse.data)
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
      <textarea value={response} readOnly />
    </div>
  )
}

export default HomePage
