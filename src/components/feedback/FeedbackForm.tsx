import { useState } from 'react'
import { MAX_CHARACTERS } from '../../lib/constants'

type FeedbackFormProps = {
  onAddToList: (text: string) => void
}
export default function FeedbackForm ({ onAddToList }: FeedbackFormProps) {
  const [text, setText] = useState('')
  const charCount = MAX_CHARACTERS - text.length //150 - 0 = 150
  const [showValidation, setShowValidation] = useState(false) //basic validation green
  const [showInvalidation, setShowInvalidation] = useState(false) //basic validation red

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value
    //guard statement to prevent user from typing more than 150 characters
    if (newText.length > MAX_CHARACTERS) {
      return
    }
    setText(e.target.value)
  }
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    //basic validation
    if (text.includes('#') && text.length >= 5) {
      setShowValidation(true)
      //hide validation message after 2 seconds
      setTimeout(() => setShowValidation(false), 2000)
    } else {
      setShowInvalidation(true)
      setTimeout(() => setShowInvalidation(false), 2000)
      return
    }

    onAddToList(text)
    setText('')
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`form ${showValidation ? 'form--valid' : ''} ${
        showInvalidation ? 'form--invalid' : ''
      }`}
    >
      <textarea
        value={text}
        onChange={handleChange}
        id='feedback-textarea'
        placeholder='as'
        spellCheck={false}
      />
      <label htmlFor='feedback-textarea'>Enter your feedback here</label>
      <div>
        <p className='u-italic'>{charCount}</p>
        <button>
          <span>Submit</span>
        </button>
      </div>
    </form>
  )
}
