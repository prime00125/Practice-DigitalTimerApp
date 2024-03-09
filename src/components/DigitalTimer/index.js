import {Component} from 'react'
import './index.css'
class DigitalTimer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      minute: 25,
      second: 0,
      val: 25,
      isActive: false,
      text: 'Paused',
      text2: 'Start',
    }
    this.timerID = null
  }
  // componentDidMount() {
  //   // do nothing here
  // }
  componentWillUnmount() {
    if (this.timerID) {
      clearInterval(this.timerID)
    }
  }
  tick = () => {
    this.setState(prevState => {
      if (prevState.second === 0) {
        return {minute: prevState.minute - 1, second: 59}
      }

      return {second: prevState.second - 1}
    })
    this.setState({text: 'Running', text2: 'Pause'})

    if (this.state.minute === 0 && this.state.second === 0) {
      clearInterval(this.timerID)
      this.setState({isActive: false, text: 'Paused', text2: 'Start'})
    }
  }
  start = () => {
    this.setState({isActive: true, text: 'Running', text2: 'Pause'})
    this.timerID = setInterval(this.tick, 1000)
  }
  pause = () => {
    this.setState({isActive: false, text: 'Paused', text2: 'Start'})

    clearInterval(this.timerID)
  }
  reset = () => {
    this.setState({
      minute: 25,
      second: 0,
      isActive: false,
      text: 'Paused',
      text2: 'Start',
      val: 25,
    })

    if (this.timerID) {
      clearInterval(this.timerID)
    }
  }
  increase = () => {
    if (!this.state.isActive) {
      this.setState(prevState => ({minute: prevState.minute + 1}))
      this.setState(prevState => ({val: prevState.val + 1}))
    }
  }
  decrease = () => {
    if (!this.state.isActive) {
      this.setState(prevState => ({minute: prevState.minute - 1}))
      this.setState(prevState => ({val: prevState.val - 1}))
    }
  }
  render() {
    const {minute, second, isActive, val, text, text2} = this.state
    const formattedMinute = minute < 10 ? `0${minute}` : minute
    const formattedSecond = second < 10 ? `0${second}` : second
    return (
      <div className="main">
        <h1>Digital Timer</h1>
        <div className="timer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/digital-timer-elapsed-bg.png"
            alt="stopWatch"
            className="mainImg"
          />
          <h2 className="time">
            {formattedMinute}:{formattedSecond}
          </h2>
          <p className="textF">{text}</p>

          {!isActive && (
            <div>
              <button className="btn" onClick={this.start}>
                {text2}
              </button>
              <img
                src="https://assets.ccbp.in/frontend/react-js/play-icon-img.png"
                alt="play icon"
                className="play"
                onClick={this.start}
              />
            </div>
          )}
          {isActive && (
            <div>
              <button className="btn" onClick={this.pause}>
                {text2}
              </button>
              <img
                src="https://assets.ccbp.in/frontend/react-js/pause-icon-img.png "
                alt="pause icon"
                className="play"
                onClick={this.pause}
              />
            </div>
          )}
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            alt="reset icon"
            className="play"
            onClick={this.reset}
          />
          <button className="btn" onClick={this.reset}>
            Reset
          </button>
          <div className="right">
            <div className="setTime" />
            <p>Set Timer Limit</p>
            <div className="section">
              <button className="btn" onClick={this.decrease}>
                -
              </button>
              <p className="num">{val}</p>
              <button className="btn" onClick={this.increase}>
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
