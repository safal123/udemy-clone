interface TitleProps {
  title: String
}

const Title
  = ({title = "Your Title"}: TitleProps) => {
  return (
    <h2 className={ 'text-xl' }>{title}</h2>
  )
}

export default Title
