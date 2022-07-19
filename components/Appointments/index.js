import {Component} from 'react'
import {format} from 'date-fns'
import {v4} from 'uuid'
import './index.css'
import AppointmentItem from '../AppointmentItem'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    titleInput: '',
    dateInput: '',
    filterAdded: false,
    isActive: false,
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  AddAppointmentItem = event => {
    event.preventDefault()
    const {titleInput, dateInput, isActive} = this.state
    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''
    const newAppointmentItem = {
      id: v4(),
      titleInput,
      dateInput: formattedDate,
      isActive,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointmentItem],
      titleInput: '',
      dateInput: '',
      isActive: false,
    }))
  }

  toggleActiveStatus = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isActive: !eachAppointment.isActive}
        }
        return eachAppointment
      }),
    }))
  }

  filterList = () => {
    const {appointmentsList, filterAdded} = this.state
    if (filterAdded) {
      const filteredList = appointmentsList.filter(
        eachAppointment => eachAppointment.isActive === true,
      )
      return filteredList
    }
    return appointmentsList
  }

  starredClick = () => {
    this.setState(prevState => ({filterAdded: !prevState.filterAdded}))
  }

  render() {
    const {titleInput, dateInput, isFilterAdd} = this.state
    const filterList = this.filterList()
    const filterClassName = isFilterAdd ? 'filter-filled' : 'filter-empty'

    return (
      <div className="bg-container">
        <div className="main-card">
          <div className="sub-card">
            <div className="card">
              <h1 className="appointment-heading">Add Appointment</h1>
              <form>
                <label htmlFor="title">Title</label>
                <input
                  value={titleInput}
                  type="text"
                  id="title"
                  className="input"
                  onChange={this.onChangeTitleInput}
                  placeholder="Title"
                />
                <label htmlFor="date">Date</label>
                <input
                  value={dateInput}
                  type="date"
                  id="date"
                  className="input"
                  onChange={this.onChangeDateInput}
                />
                <button
                  className="add-button"
                  type="button"
                  onClick={this.AddAppointmentItem}
                >
                  Add
                </button>
              </form>
            </div>
            <img
              className="image"
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <hr className="line" />
          <hr className="line" />
          <div className="appointment-card ">
            <h1 className="appointment-heading">Appointments</h1>
            <button
              type="button"
              className={`filter-style ${filterClassName}`}
              onClick={this.starredClick}
            >
              Starred
            </button>
          </div>

          <ul className="appointments-list">
            {filterList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                toggleActiveStatus={this.toggleActiveStatus}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Appointments
