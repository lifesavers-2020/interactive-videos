import React from "react";

interface Props {}

interface State {
  counter: number;
  height: number;
  width: number;
}

export class Timer extends React.Component<Props, State> {
  private timerID: any;

  constructor(props: any) {
    super(props);
    this.state = {
      counter: 5,
      height: 512,
      width: 375,
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidUpdate() {
    if (this.state.counter === 0) {
      this.resetCounter();
    }
  }

  componentDidMount() {
    this.timerID = setInterval(this.tick, 1000);
    this.updateWindowDimensions();
    window.addEventListener("resize", this.updateWindowDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateWindowDimensions.bind(this));
    clearInterval(this.timerID);
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  private tick = () => {
    this.setState({
      counter: this.state.counter - 1,
    });
  };

  private resetCounter = () => {
    this.setState({
      counter: 5,
    });
  };

  render() {
    return (
      <div>
        <h2
          style={{
            position: "absolute",
            zIndex: 2,
            marginTop: 0.7 * this.state.height,
            marginLeft: 0.67 * this.state.width,
            color: "red",
          }}
        >
          {this.state.counter}{" "}
        </h2>
        <div
          style={{
            width: 50,
            height: 50,
            backgroundColor: "transparent",
            position: "absolute",
            zIndex: 3,
            borderRadius: this.state.width * 0.67 * 0.5,
            border: "20px solid",
            marginLeft: 0.6485 * this.state.width,
            marginTop: 0.668 * this.state.height,
            borderLeftColor: "transparent",
            borderBottomColor: "transparent",
            borderRightColor: "red",
            borderTopColor: "red",
            transform: [rotateZ("45deg")],
          }}
        />
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
  }
}
