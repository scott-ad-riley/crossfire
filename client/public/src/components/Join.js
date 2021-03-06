import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Logo from './Logo'
import Footer from './Footer'

import joinGame from '../actions/joinGame'
import loadHomePage from '../actions/loadHomePage'
import { joinGame as joinSocketGame } from '../canvas/socket'

class Join extends Component {
  renderGame = (key, index) => {
    return (
      <li key={index} onClick={this.joinGame(key)}>
        {key}
      </li>
    )
  }
  joinGame(gameName) {
    return () => {
      this.props.joinGame(gameName)
      joinSocketGame(this.context.socket, gameName)
    }
  }
  render() {
    return (
      <div>
        <div className="sublogo">
          <Logo type={'home-heading'} />
        </div>
        <div id="activeGamesList">
          <h3>Open Games</h3>
          <ul className="gameList">{Object.keys(this.props.games).map(this.renderGame)}</ul>
        </div>
        <div className="homepageButton">
          <button className="gameButton" onClick={this.props.loadHomePage}>
            Back to homepage
          </button>
          <Footer />
        </div>
      </div>
    )
  }
}

Join.contextTypes = {
  socket: PropTypes.object,
}

const mapStateToProps = ({ games }) => {
  return {
    games: games,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    joinGame: gameName => dispatch(joinGame(gameName)),
    loadHomePage: () => dispatch(loadHomePage),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Join)
