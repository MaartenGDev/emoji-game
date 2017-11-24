import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as groupActions from '../actions/groupActions'
import { bindActionCreators } from 'redux'
import Dropdown from '../components/Dropdown'
import ScoreVisualizerService from '../services/ScoreVisualizerService'

class ManageTeamPage extends Component {
  state = {
    groups: this.props.groups,
    selectedGroup: this.props.selectedGroup,
    selectedTask: this.props.selectedTask,
    selectedScore: this.props.selectedScore
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      groups: nextProps.groups,
      selectedGroup: nextProps.selectedGroup,
      selectedScore: nextProps.selectedScore
    })
  }

  handleTeamChange = e => {
    const selectedGroup = this.state.groups.find(x => x.id === parseInt(e.target.value, 10))
    const selectedTask = selectedGroup.tasks[0];

    console.log(selectedTask)

    this.setState({selectedGroup, selectedTask})
  }

  handleTaskChange = e => {
    const selectedTask = this.state.selectedGroup.tasks.find(x => x.id === parseInt(e.target.value, 10))
    const selectedScore = ScoreVisualizerService.getScoreForPosition(selectedTask.position) || {value: -1}

    this.setState({selectedTask, selectedScore})
  }

  handleScoreChange = e => {
    const selectedScore = ScoreVisualizerService.getScoreForPosition(e.target.value) || {value: -1}

    this.setState({selectedScore})
  }

  handleTaskClick = (task) => {
    const {selectedGroup} = this.state

    this.props.history.push(`/groups/${selectedGroup.id}/tasks/${task.id}`)
  }

  onChange = ({target}) => {
    this.setState({
      form: {...this.state.form, ...{[target.name]: target.value}}
    })
  }

  render () {
    const {groups, selectedGroup, selectedTask, selectedScore, form} = this.state
    const options = groups.map(({id, name}) => ({value: id, label: name}))

    const tasksForSelectedGroup = selectedGroup.tasks.map(({id, icon, title}) => ({
      value: id,
      label: `${icon} ${title}`
    }))

    const possibleScores = ScoreVisualizerService.getScores()

    return (
      <section className="container mx-auto mt-4">

        <form className="bg-white shadow-md rounded p-4 mb-4">
          <div className="mb-4">
            <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="team">
              Team
            </label>
            <Dropdown options={options} onChange={this.handleTeamChange} selectedValue={selectedGroup.id} id="team"/>
          </div>

          <div className="mb-4">
            <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="team">
              Questions
            </label>
            <Dropdown options={tasksForSelectedGroup} onChange={this.handleTaskChange} selectedValue={selectedTask.id}
                      id="team"/>
          </div>

          <div className="mb-4">
            <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="score">
              Score
            </label>

            <Dropdown options={possibleScores} onChange={this.handleScoreChange}
                      selectedValue={selectedScore.value}
                      id="score"/>

          </div>

          <section className="flex items-center justify-between">
            <button className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded" type="button">
              Update
            </button>
          </section>
        </form>
      </section>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const groups = state.groups || []
  const {id} = ownProps.match.params

  const selectedGroup = (id !== undefined && groups.length)
    ? groups.find(x => x.id === parseInt(id, 10))
    : groups[0] || {id: -1, tasks: []}

  const selectedTask = selectedGroup.tasks.length > 0
    ? selectedGroup.tasks[0]
    : {id: -1, position: -1}

  return {
    groups: groups,
    selectedGroup,
    selectedTask,
    selectedScore: ScoreVisualizerService.getScoreForPosition(selectedTask.position) || {value: -1}
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(groupActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ManageTeamPage)