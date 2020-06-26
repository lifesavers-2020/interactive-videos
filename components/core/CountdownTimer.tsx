import React from "react";

interface Props {
  countDownFinishHandler: any;
  width: number;
  height: number;
  showTimer: boolean;
}


interface State {
  counter: number;
  progressWidth: number;
}

export class CountdownTimer extends React.Component<Props, State> {
  private timerID: any;
  private static COUNTDOWN = 5000; // 5 seconds in milliseconds;

  constructor(props: any) {
    super(props);
    this.state = {
      counter: CountdownTimer.COUNTDOWN,
      progressWidth: this.props.width,
    };
    this.resetCounter = this.resetCounter.bind(this);
  }

  componentDidUpdate(_prevProps: Props, _prevState: State) {
    if (this.state.counter === 0) {
      this.resetCounter();
      this.props.countDownFinishHandler();
    } else {
      if (_prevState.counter !== this.state.counter) {
        this.setState({
          progressWidth: (this.state.counter / CountdownTimer.COUNTDOWN) * this.props.width,
        });
      }
    }

  }

  componentDidMount() {
    if (this.props.showTimer) {
      this.timerID = setInterval(this.tick, 200);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  private tick = () => {
    this.setState({
      counter: this.state.counter - 200,
    });
  };

  resetCounter = () => {
    clearInterval(this.timerID);
    this.setState({
      counter: CountdownTimer.COUNTDOWN,
    });
  };

  render() {
    if (this.props.showTimer) {
      const { progressWidth } = this.state;
      return (
        <div>
          <h2
            style={{
              position: "absolute",
              zIndex: 3,
              marginTop: 0.7 * this.props.height,
              marginLeft: 0.67 * this.props.width,
              color: "red",
            }}
          >
            {this.state.counter}{" "}
          </h2>
          <div id="progressBar"
               style={{
                 height: 30,
                 width: progressWidth,
                 zIndex: 3,
                 marginTop: 0.8 * this.props.height,
                 backgroundColor: "red",
                 position: "absolute"
               }}
          />
          {/*<div*/}
          {/*  style={{*/}
          {/*    width: 50,*/}
          {/*    height: 50,*/}
          {/*    backgroundColor: "transparent",*/}
          {/*    position: "absolute",*/}
          {/*    zIndex: 3,*/}
          {/*    borderRadius: this.state.width * 0.67 * 0.5,*/}
          {/*    border: "20px solid",*/}
          {/*    marginLeft: 0.6485 * this.state.width,*/}
          {/*    marginTop: 0.668 * this.state.height,*/}
          {/*    borderLeftColor: "transparent",*/}
          {/*    borderBottomColor: "transparent",*/}
          {/*    borderRightColor: "red",*/}
          {/*    borderTopColor: "red",*/}
          {/*    transform: [rotateZ("45deg")],*/}
          {/*  }}*/}
          {/*/>*/}
          {/* <div
          style={{
            width: 50,
            height: 50,
            backgroundColor: "blue",
            position: "absolute",
            zIndex: 2,
            borderColor: "red",
            borderRadius: this.state.width * 0.67 * 0.5,
            border: "20px solid red",
            marginLeft: 0.6485 * this.state.width,
            marginTop: 0.668 * this.state.height,
          }}
        /> */}

        </div>
      );
    } else {
      return null;
    }
  }
}
