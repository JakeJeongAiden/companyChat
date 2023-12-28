import FeedbackItem from './FeedbackItem'
import Spinner from '../Spinner'
import ErrorMessage from '../ErrorMessage'
import { useFeedbackItemsContext } from '../../lib/hooks'

export default function FeedbackList () {
  const { filteredFeedbackItems, isLoading, errorMessage } =
    useFeedbackItemsContext()
  return (
    <ol className='feedback-list'>
      {/* Conditional loading for loading spinner. */}
      {isLoading && <Spinner />}

      {errorMessage && <ErrorMessage message={errorMessage} />}

      {filteredFeedbackItems.map(feedbackItem => (
        <FeedbackItem key={feedbackItem.id} feedbackItem={feedbackItem} />
      ))}
    </ol>
  )
}
