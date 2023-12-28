import { createContext, useEffect, useMemo, useState, useContext } from 'react'
import { TFeedbackItem } from '../lib/types'

type FeedbackItemsContextProviderProps = {
  children: React.ReactNode
}

//type of the context. This is what we are passing to the context
type TFeedbackItemsContext = {
  filteredFeedbackItems: TFeedbackItem[]
  isLoading: boolean
  errorMessage: string
  companyList: string[]
  handleAddToList: (text: string) => void
  handleSelectCompany: (company: string) => void
}

export const FeedbackItemsContext = createContext<TFeedbackItemsContext | null>(
  null
)

export default function FeedbackItemsContextProvider ({
  children
}: FeedbackItemsContextProviderProps) {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [selectedCompany, setSelectedCompany] = useState('')

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

  const filteredFeedbackItems = useMemo(
    () =>
      selectedCompany
        ? feedbackItems.filter(item => item.company === selectedCompany)
        : feedbackItems,
    [feedbackItems, selectedCompany]
  )

  const handleSelectCompany = (company: string) => {
    setSelectedCompany(company)
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
    <FeedbackItemsContext.Provider
      value={{
        //value can be anything we are passing to the context from this component

        isLoading,
        errorMessage,
        companyList,
        handleAddToList,
        filteredFeedbackItems,
        handleSelectCompany
      }}
    >
      {children}
    </FeedbackItemsContext.Provider>
  )
}
