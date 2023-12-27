type HashtagItemProps = {
  company: string
}

export default function HashtagItem ({ company }: HashtagItemProps) {
  return (
    <li key={company}>
      <button>#{company}</button>
    </li>
  )
}
