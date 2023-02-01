import {Component} from 'react'
import Loader from 'react-loader-spinner'
import CourseItem from '../CourseItem'
import Navbar from '../Navbar'

import './index.css'

const apiStatusTexts = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'Failed',
}

class TechEra extends Component {
  state = {coursesList: [], apiStatus: apiStatusTexts.initial}

  componentDidMount() {
    this.getCourses()
  }

  getCourses = async () => {
    this.setState({apiStatus: apiStatusTexts.inProgress})
    const url = 'https://apis.ccbp.in/te/courses'
    const response = await fetch(url)
    const data = await response.json()
    const coursesList = data.courses.map(eachItem => ({
      id: eachItem.id,
      name: eachItem.name,
      logoUrl: eachItem.logo_url,
    }))
    if (response.ok) {
      this.setState({coursesList, apiStatus: apiStatusTexts.success})
    } else {
      this.setState({apiStatus: apiStatusTexts.failure})
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="loader-cont">
      <Loader type="ThreeDots" color="#4656a1" height={75} width={75} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-cont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png "
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for</p>
      <button type="button" className="retry" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {coursesList} = this.state
    return (
      <div className="courses-cont">
        <h1>Courses</h1>
        <ul className="courses-list">
          {coursesList.map(eachCourse => (
            <CourseItem key={eachCourse.id} itemDetails={eachCourse} />
          ))}
        </ul>
      </div>
    )
  }

  getCoursesView = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusTexts.success:
        return this.renderSuccessView()
      case apiStatusTexts.failure:
        return this.renderFailureView()
      default:
        return this.renderLoadingView()
    }
  }

  onClickRetry = () => {
    this.getCourses()
  }

  render() {
    return (
      <>
        <Navbar />
        {this.getCoursesView()}
      </>
    )
  }
}

export default TechEra
