import FeedbackItem from './FeedbackItem'
import Spinner from '../Spinner'
import ErrorMessage from '../ErrorMessage'
import { TFeedbackItem } from '../../lib/types'

const exampleFeedbackItems = [
  {
    upvoteCount: 5555,
    badgeLetter: 'B',
    companyName: 'Bulb',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim obcaecati sed consequatur necessitatibus dolor. Consectetur!',
    daysAgo: 4
  },
  {
    upvoteCount: 44,
    badgeLetter: 'S',
    companyName: 'Starbucks',
    text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim obcaecati sed consequatur necessitatibus dolor. Consectetur!',
    daysAgo: 7
  }
]

type FeedbackListProps = {
  feedbackItems: TFeedbackItem[]
  isLoading: boolean
  errorMessage: string
}

export default function FeedbackList ({
  feedbackItems,
  isLoading,
  errorMessage
}: FeedbackListProps) {
  return (
    <ol className='feedback-list'>
      {/* Conditional loading for loading spinner. */}
      {isLoading && <Spinner />}

      {errorMessage && <ErrorMessage message={errorMessage} />}

      {feedbackItems.map(feedbackItem => (
        <FeedbackItem key={feedbackItem.id} feedbackItem={feedbackItem} />
      ))}

      {/* <FeedbackItem feedbackItem={feedbackItem} />
      <FeedbackItem feedbackItem={feedbackItem1} />
      <FeedbackItem feedbackItem={feedbackItem} />
      <FeedbackItem feedbackItem={feedbackItem} /> */}
    </ol>
  )
}
