import { useState, useEffect } from 'react'
import { TFeedbackItem } from '../lib/types'
import Footer from './Footer'
import Container from './Container'
import HashtagList from './HashtagList'
function App () {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const handleAddToList = (text: string) => {
    const companyName = text
      .split(' ')
      .find(word => word.includes('#'))!
      .substring(1)

    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      upvoteCount: 0,
      badgeLetter: companyName.substring(0, 1).toUpperCase(),
      companyName: companyName,
      text: text,
      daysAgo: 0
    }
    //spread operator to add new item to the list
    setFeedbackItems([...feedbackItems, newItem])
  }

  useEffect(() => {
    // Async Await method (Modern and more preferred way)
    const fetchFeedbacks = async () => {
      setIsLoading(true)
      try {
        setErrorMessage('')
        const response = await fetch(
          'https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks'
        )
        if (!response.ok) {
          throw new Error()
        }

        const data = await response.json()
        setFeedbackItems(data.feedbacks)
      } catch (error) {
        setErrorMessage('Something went wrong')
        setIsLoading(false)
      }

      setIsLoading(false)
    }
    fetchFeedbacks()
  }, [])
  return (
    <div className='app'>
      <Footer />
      <Container
        errorMessage={errorMessage}
        isLoading={isLoading}
        feedbackItems={feedbackItems}
        handleAddToList={handleAddToList}
      />
      <HashtagList />
    </div>
  )
}

export default App
