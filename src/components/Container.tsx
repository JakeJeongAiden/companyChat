import Header from './Header'
import FeedbackList from './FeedbackList'
import { TFeedbackItem } from '../types'

type ContainerProps = {
  isLoading: boolean
  feedbackItems: TFeedbackItem[]
  errorMessage: string
  handleAddToList: (text: string) => void
}

export default function Container ({
  isLoading,
  feedbackItems,
  errorMessage,
  handleAddToList
}: ContainerProps) {
  return (
    <main className='container'>
      <Header handleAddToList={handleAddToList} />
      <FeedbackList
        errorMessage={errorMessage}
        isLoading={isLoading}
        feedbackItems={feedbackItems}
      />
    </main>
  )
}
