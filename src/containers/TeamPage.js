import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as groupActions from '../actions/groupActions'
import { bindActionCreators } from 'redux'
import Dropdown from '../components/Dropdown'
import EmojiGrid from '../components/EmojiGrid'

class TeamPage extends Component {
  state = {
    groups: this.props.groups,
    selectedGroup: this.props.selectedGroup
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      groups: nextProps.groups,
      selectedGroup: nextProps.selectedGroup
    })
  }

  handleTeamChange = e => {
    this.setState({
      selectedGroup: this.state.groups.find(x => x.id === parseInt(e.target.value, 10))
    })
  }

  handleEmojiClick = (emoji) => {
    console.log(emoji)
  }

  render () {
    const {groups, selectedGroup} = this.state
    const options = groups.map(({id, name}) => ({value: id, label: name}))

    const hasSelectedGroup = selectedGroup.tasks.length > 0
    const emojisForSelectedGroup = selectedGroup.tasks

    return (
      <section>
        <section className="my-4 bg-white shadow-md rounded p-4">
          <Dropdown options={options} onChange={this.handleTeamChange}/>
        </section>
        {hasSelectedGroup && <EmojiGrid emojis={emojisForSelectedGroup} onEmojiClick={this.handleEmojiClick}/>}
      </section>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const groups = state.groups || []

  return {
    groups: groups,
    selectedGroup: groups[0] || {tasks: []}
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(groupActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(TeamPage)