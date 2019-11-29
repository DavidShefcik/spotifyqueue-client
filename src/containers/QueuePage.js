/*
 * Author: David Shefcik
 * Created: 11/23/19
 * Project | File: Spotify Queue Client | src/containers/QueuePage.js
 */

// Module imports
import React, { Component } from 'react'
import axiosConfig from '../modules/axiosConfig'
import { connect } from 'react-redux'

// CSS imports
import styles from './css/QueuePage.css'

// Component imports
import Code from '../components/queue/Code'
import LoadingPage from '../components/LoadingPage'
import RedButton from '../components/RedButton'
import SongInfo from '../components/queue/SongInfo'
import PauseButton from '../components/queue/PauseButton'
import NextButton from '../components/queue/NextButton'
import BackButton from '../components/queue/BackButton'

// Component
class QueuePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      queueid: '',
      code: '',
      members: [],
      songs: [],
      ownerid: '',
      ownerName: '',
      renderPage: false,
      isOwner: false,
      currentSong: {}
    }
  }
  componentDidMount() {
    let token = this.props.token

    axiosConfig
      .get('/queue/' + this.props.id, { headers: { token: token } })
      .then(res => {
        this.setState(
          {
            queueid: res['data']['queue']['queueid'],
            code: res['data']['queue']['code'],
            members: res['data']['queue']['members'],
            songs: res['data']['queue']['songs'],
            ownerid: res['data']['queue']['ownerid']
          },
          () => {
            if (this.state.songs.length > 0) {
              this.setState({
                currentSong: this.state.songs[0]
              })
            }
            axiosConfig
              .get('/users/' + this.state.ownerid, {
                headers: { token: token }
              })
              .then(res => {
                this.setState({
                  ownerName: res['data']['user']['username']
                })
                axiosConfig
                  .get('/queue/' + this.state.queueid + '/isowner', {
                    headers: { token: token }
                  })
                  .then(r => {
                    if (r['data']['isOwner']) {
                      this.setState({
                        isOwner: true,
                        renderPage: true
                      })
                    } else {
                      this.setState({
                        renderPage: true
                      })
                    }
                  })
                  .catch(error => {
                    if (process.env.PRODUCTION === 'false') {
                      console.log(error)
                    }
                    this.props.history.push('/error')
                  })
              })
              .catch(error => {
                if (process.env.PRODUCTION === 'false') {
                  console.log(error)
                }
                this.props.history.push('/error')
              })
          }
        )
      })
  }
  render() {
    let renderPage = this.state.renderPage
    return renderPage ? (
      <div className={styles.container}>
        <div className={styles.content}>
          <div className={styles.header}>
            <Code
              code={this.state.code}
              queueid={this.props.id}
              className={styles.code}
              history={this.props.history}
              isOwner={this.state.isOwner}
            />
            <p className={styles.title}>
              {this.state.ownerName}'s Spotify Queue
            </p>
          </div>
          <div className={styles.queueController}>
            <div className={styles.queuControllerContent}>
              <div className={styles.songInfoArea}>
                <SongInfo
                  song={this.state.currentSong}
                  history={this.props.history}
                />
              </div>
              {this.state.isOwner ? (
                <div>
                  <ul className={styles.songController}>
                    <li>
                      <BackButton queueid={this.props.id} />
                    </li>
                    <li>
                      <PauseButton queueid={this.props.id} />
                    </li>
                    <li>
                      <NextButton queueid={this.props.id} />
                    </li>
                  </ul>
                  <div className={styles.button}>
                    <RedButton
                      text="End Session"
                      action={() => window.alert()}
                    />
                  </div>
                </div>
              ) : (
                <div className={styles.button}>
                  <RedButton
                    text="Leave Session"
                    action={() => window.alert()}
                  />
                </div>
              )}
            </div>
          </div>
          <div className={styles.queueContent}></div>
        </div>
      </div>
    ) : (
      <LoadingPage text="Please wait" />
    )
  }
}

// Map state to props
const mapStateToProps = state => {
  return {
    token: state.token.token
  }
}

// Export
export default connect(mapStateToProps)(QueuePage)
