import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Navbar from '../Navbar'
import './index.css'

const apiStatusTexts = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'Failed',
}

class CourseItemDetails extends Component {
  state = {courseDetails: {}, apiStatus: apiStatusTexts.initial}

  componentDidMount() {
    this.getCourseDetails()
  }

  getCourseDetails = async () => {
    this.setState({apiStatus: apiStatusTexts.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const url = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(url)
    const data = await response.json()
    const courseDetails = {
      id: data.course_details.id,
      name: data.course_details.name,
      imageUrl: data.course_details.image_url,
      description: data.course_details.description,
    }
    if (response.ok) {
      this.setState({courseDetails, apiStatus: apiStatusTexts.success})
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
    const {courseDetails} = this.state
    const {name, imageUrl, description} = courseDetails
    return (
      <div className="main-cont">
        <div className="card-cont">
          <img src={imageUrl} alt={name} />
          <div className="head-para">
            <h1>{name}</h1>
            <p>{description}</p>
          </div>
        </div>
      </div>
    )
  }

  getCourseDetailsView = () => {
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
    this.getCourseDetails()
  }

  render() {
    return (
      <>
        <Navbar />
        {this.getCourseDetailsView()}
      </>
    )
  }
}

export default CourseItemDetails
