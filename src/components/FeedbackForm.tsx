export default function FeedbackForm () {
  return (
    <form className='form'>
      <textarea
        value='test'
        id='feedback-textarea'
        placeholder='as'
        spellCheck={false}
      />
      <label htmlFor='feedback-textarea'>Enter your feedback here</label>
      <div>
        <p className='u-italic'>150</p>
        <button>
          <span>Submit</span>
        </button>
      </div>
    </form>
  )
}
