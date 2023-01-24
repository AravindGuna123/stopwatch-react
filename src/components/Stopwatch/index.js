// Write your code here
import {Component} from 'react'

import './index.css'

const initialState = {
  isRunning: false,
  timeElapsedInSeconds: 0,
}

class Stopwatch extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimeIntervalId()
  }

  clearTimeIntervalId = () => {
    clearInterval(this.intervalId)
  }

  getTimeInFormat = () => {
    const {timeElapsedInSeconds} = this.state

    const minutes = Math.floor(timeElapsedInSeconds / 60)
    const seconds = Math.floor(timeElapsedInSeconds % 60)
    const stringifiedminutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedseconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedminutes}:${stringifiedseconds}`
  }

  increaseElapsedInSeconds = () => {
    this.setState(prevState => ({
      timeElapsedInSeconds: prevState.timeElapsedInSeconds + 1,
    }))
  }

  startTimer = () => {
    const {timeElapsedInSeconds} = this.state

    this.intervalId = setInterval(this.increaseElapsedInSeconds, 1000)
    this.setState(prevState => ({
      isRunning: !prevState.isRunning,
    }))
  }

  stopTimer = () => {
    this.clearTimeIntervalId()
    this.setState(prevState => ({
      isRunning: !prevState.isRunning,
    }))
  }

  resetTimer = () => {
    this.clearTimeIntervalId()
    this.setState(initialState)
  }

  render() {
    const {isRunning} = this.state
    return (
      <div className="bg-container">
        <h1>Stopwatch</h1>
        <div className="timercontrol-container">
          <div className="timer-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
              alt="stopwatch"
              className="timer-image"
            />
            <p>Timer</p>
          </div>
          {this.getTimeInFormat()}
          <div className="button-container">
            <button
              type="button"
              onClick={this.startTimer}
              disabled={isRunning}
            >
              Start
            </button>
            <button type="button" onClick={this.stopTimer}>
              Stop
            </button>
            <button type="button" onClick={this.resetTimer}>
              Reset
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Stopwatch
