import { useState, useEffect, useMemo } from 'react'
import { TFeedbackItem } from '../lib/types'
import Footer from './layout/Footer'
import Container from './layout/Container'
import HashtagList from './hashtag/HashtagList'
function App () {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [selectedCompany, setSelectedCompany] = useState('')

  const filteredFeedbackItems = useMemo(
    () =>
      selectedCompany
        ? feedbackItems.filter(item => item.company === selectedCompany)
        : feedbackItems,
    [feedbackItems, selectedCompany]
  )

  const companyList = useMemo(
    () =>
      feedbackItems
        .map(item => item.company)
        .filter((company, index, array) => {
          //filter out duplicates
          return array.indexOf(company) === index
        }),
    [feedbackItems]
  )

  const handleSelectCompany = (company: string) => {
    setSelectedCompany(company)
  }

  const handleAddToList = async (text: string) => {
    const companyName = text
      .split(' ')
      .find(word => word.includes('#'))!
      .substring(1)

    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      upvoteCount: 0,
      badgeLetter: companyName.substring(0, 1).toUpperCase(),
      company: companyName,
      text: text,
      daysAgo: 0
    }
    //spread operator to add new item to the list
    setFeedbackItems([...feedbackItems, newItem])
    await fetch(
      'https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newItem)
      }
    )
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
        feedbackItems={filteredFeedbackItems}
        handleAddToList={handleAddToList}
      />
      <HashtagList
        companyList={companyList}
        handleSelectCompany={handleSelectCompany}
      />
    </div>
  )
}

export default App
