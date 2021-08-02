import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    titleInput: '',
    dateInput: '',
    isFilterActive: false,
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isStarred: !prevState.isStarred}
        }
        return eachItem
      }),
    }))
  }

  onClickFiltered = () => {
    const {isFilterActive} = this.state
    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state

    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: formattedDate,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  onChangeInput = event => {
    this.setState({
      titleInput: event.target.value,
    })
  }

  onChangeDate = event => {
    this.setState({
      dateInput: event.target.value,
    })
  }

  getFilteredAppointmentList = () => {
    const {appointmentsList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentsList.filter(eachItem => eachItem.isStarred === true)
    }
    return appointmentsList
  }

  render() {
    const {dateInput, titleInput, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    const filteredAppointmentsList = this.getFilteredAppointmentList()

    return (
      <div className="bg-container">
        <div className="second-container">
          <div className="appointment-container">
            <div className="add-appointment-container">
              <form className="form" onSubmit={this.onAddAppointment}>
                <h1 className="main-heading">Add Appointment</h1>
                <label className="label-edit" htmlFor="input">
                  Title
                </label>
                <input
                  className="input-edit"
                  type="text"
                  id="input"
                  placeholder="Title"
                  onChange={this.onChangeInput}
                  value={titleInput}
                />

                <label htmlFor="date" className="label-edit">
                  Date
                </label>
                <input
                  type="date"
                  id="date"
                  className="input-edit"
                  onChange={this.onChangeDate}
                  value={dateInput}
                />
                <button type="submit" className="add-button">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                alt="appointments"
                className="img"
              />
            </div>
            <hr className="line" />
            <div className="bottom-container">
              <h1 className="bottom-heading">Appointments</h1>
              <button
                type="button"
                className={`filter-style ${filterClassName}`}
                onClick={this.onClickFiltered}
              >
                Starred
              </button>
            </div>
            <ul className="appointments-list">
              {filteredAppointmentsList.map(eachFilter => (
                <AppointmentItem
                  key={eachFilter.id}
                  appointmentDetails={eachFilter}
                  toggleIsStarred={this.toggleIsStarred}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Appointments
