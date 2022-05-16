import React, { Component } from 'react';

class Airdrop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: {},
      seconds: 20
    };
    this.timer = 0;
    this.startTime = this.startTime.bind(this);
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

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  render() {
    return (
      <div style={{ color: 'black' }}>
        {this.state.time.minutes}:{this.state.time.seconds}
      </div>
    );
  }
}

export default Airdrop;
