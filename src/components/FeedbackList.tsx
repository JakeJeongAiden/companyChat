import { TriangleUpIcon } from '@radix-ui/react-icons'

export default function FeedbackList () {
  return (
    <ol className='feedback-list'>
      <li className='feedback'>
        <button>
          <TriangleUpIcon />
          <span>593</span>
        </button>
        <div>
          <p>A</p>
        </div>

        <div>
          <p>Aiden</p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim
            obcaecati sed consequatur necessitatibus dolor. Consectetur!
          </p>
        </div>

        <p>4d</p>
      </li>
    </ol>
  )
}
