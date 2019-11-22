/*
 * Author: David Shefcik
 * Created: 11/18/19
 * Project | File: Spotify Queue Client | src/components/LoadingPage.js
 */

// Module imports
import React, { Component } from 'react'

// CSS imports
import styles from './css/LoadingPage.css'

// Component
class LoadingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dots: ""
    }
  }
  componentDidMount() {
    this.interval = setInterval(() => {
      if(this.state.dots.length >= 3) {
        this.setState({
          dots: ""
        });
      } else {
        let dots = this.state.dots;
        this.setState({
          dots: dots += "."
        })
      }
    }, 350);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    return (
      <div className={styles.container}>
        <div className={styles.content}>
          <p>{this.props.text + this.state.dots}</p>
        </div>
      </div>
    );
  }
}

// Export
export default LoadingPage
