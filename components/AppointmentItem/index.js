import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleActiveStatus} = props
  const {id, titleInput, dateInput, isActive} = appointmentDetails
  const starImageURL = isActive
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    toggleActiveStatus(id)
  }

  return (
    <li className="list">
      <div>
        <p>{titleInput}</p>
        <p>Date: {dateInput}</p>
      </div>

      <button type="button" testid="star" onClick={onClickStar}>
        <img src={starImageURL} alt="star" />
      </button>
    </li>
  )
}

export default AppointmentItem
