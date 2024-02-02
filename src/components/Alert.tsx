type content = {
  content: string
}

const Alert = ({ content }: content) => {
  return (
    <>
      <div
        className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 "
        role="alert"
      >
        <span className="font-medium">{content}</span>
      </div>
    </>
  )
}

export default Alert
