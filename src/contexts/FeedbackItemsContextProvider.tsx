import { createContext, useMemo, useState } from 'react'
import { TFeedbackItem } from '../lib/types'
import { useFeedbackItems } from '../lib/hooks'

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
  const { feedbackItems, isLoading, errorMessage, setFeedbackItems } =
    useFeedbackItems()
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
