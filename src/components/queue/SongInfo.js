/*
 * Author: David Shefcik
 * Created: 11/25/19
 * Project | File: Spotify Queue Client | src/components/SongInfo.js
 */

// Module imports
import React, { Component } from 'react'
import axiosConfig from '../../modules/axiosConfig'
import { connect } from 'react-redux'

// CSS imports
import styles from './css/SongInfo.css'

// Component
class SongInfo extends Component {
  constructor(props) {
    super(props)

    this.state = {
      song: {},
      renderSong: false
    }

    this.songInfo = this.songInfo.bind(this)
  }
  componentDidMount() {
    if (this.props.song.uri != undefined) {
      this.setState(
        {
          song: this.props.song
        },
        () => {
          this.songInfo()
        }
      )
    } else {
      this.setState({
        renderSong: true
      })
    }
  }
  componentDidUpdate(prevProps) {
    if (this.props.song != prevProps.song) {
      if (this.props.song.uri != undefined) {
        this.setState(
          {
            song: this.props.song
          },
          () => {
            this.songInfo()
          }
        )
      } else {
        this.setState({
          renderSong: true
        })
      }
    }
  }
  songInfo() {
    let songID
    let uri = this.state.song.uri
    let token = this.props.token
    try {
      uri = uri.split("/");
      songID = uri[uri.length - 1].split("?")[0]
    } catch (e) {
      songID = this.state.song.uri
    }

    axiosConfig
      .get('/song/' + songID, { headers: { token: token } })
      .then(res => {
        let song = {
          artists: res['data']['song']['artists'].join(', '),
          name: res['data']['song']['name'],
          image: res['data']['song']['image']
        }
        this.setState({
          song: song,
          renderSong: true
        })
      })
      .catch(error => {
        if (process.env.PRODUCTION === 'false') {
          console.log(error)
        }
        this.props.history.push('/error')
      })
  }
  render() {
    return (
      <div>
        {this.state.renderSong ? (
          Object.entries(this.state.song).length === 0 ? (
            <p className={styles.noSong}>No Song</p>
          ) : (
            <div>
              <img
                src={this.state.song.image}
                alt=""
                className={styles.image}
              />
              <ul className={styles.songText}>
                <li className={styles.name} title={this.state.song.name}>
                  <span>{this.state.song.name}</span>
                </li>
                <li className={styles.artist} title={this.state.song.artists}>
                  <span>{this.state.song.artists}</span>
                </li>
              </ul>
            </div>
          )
        ) : (
          <p>Loading...</p>
        )}
      </div>
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
export default connect(mapStateToProps)(SongInfo)
