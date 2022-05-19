import React, { Component } from 'react';

class Airdrop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      time: {},
      seconds: 5
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

    seconds = secs % 60;

    return {
      hours,
      minutes,
      seconds
    };
  }

  startTimer() {
    if (this.timer === 0 && this.state.seconds > 0) {
      this.timer = setInterval(this.counterDown, 1000);
    }
  }

  counterDown() {
    let seconds = this.state.seconds - 1;

    this.setState({
      time: this.secondsToTime(seconds),
      seconds
    });

    if (seconds === 0) {
      clearInterval(this.timer);
    }
  }

  airdropReleaseTokens() {
    let stakingBal = this.props.stakingBalance;
    if (stakingBal >= '50000000000000000000') {
      this.startTimer();
      if (this.state.seconds === 0) {
        this.props.issueReward();
      }
    }
  }

  componentDidMount() {
    let timeLeftVar = this.secondsToTime(this.state.seconds);
    this.setState({ time: timeLeftVar });
  }

  render() {
    {
      this.airdropReleaseTokens();
    }
    return (
      <div>
        {this.state.seconds <= 3 ? (
          <div
            style={{ color: 'red', fontSize: '1.5rem', fontWeight: 'bolder' }}
          >
            {this.state.time.minutes}:{this.state.time.seconds}
          </div>
        ) : (
          <div style={{ color: 'black' }}>
            {this.state.time.minutes}:{this.state.time.seconds}
          </div>
        )}
      </div>
    );
  }
}

export default Airdrop;
