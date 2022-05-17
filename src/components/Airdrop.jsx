import React, { Component } from 'react';

class Airdrop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: {},
      seconds: 20
    };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.counterDown = this.counterDown.bind(this);
  }

  secondsToTime(secs) {
    let hours, minutes, seconds;
    hours = Math.floor(secs / (60 * 60));

    let devisorForMin = secs % (60 * 60);
    minutes = Math.floor(devisorForMin / 60);

    let devisorForSec = secs % 60;
    seconds = Math.ceil(devisorForSec);

    return {
      hours,
      minutes,
      seconds
    };
  }

  startTimer() {
    if (this.timer == 0) {
      this.timer = setInterval(this.counterDown, 1000);
    }
  }

  counterDown() {
    let seconds = this.state.seconds - 1;

    this.setState({
      time: this.secondsToTime(seconds),
      seconds
    });

    if (seconds == 0) {
      clearInterval(this.timer);
    }
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  render() {
    return (
      <div style={{ color: 'black' }}>
        {this.state.seconds <= 3 ? (
          <div
            style={{ color: 'red', fontSize: '1.5rem', fontWeight: 'bolder' }}
          >
            {this.state.time.minutes}:{this.state.time.seconds}
          </div>
        ) : (
          <div>
            {this.state.time.minutes}:{this.state.time.seconds}
          </div>
        )}
        {this.startTimer()}
      </div>
    );
  }
}

export default Airdrop;
