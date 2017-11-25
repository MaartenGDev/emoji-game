import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as groupActions from '../actions/groupActions'
import { bindActionCreators } from 'redux'
import Dropdown from '../components/Dropdown'
import TaskGrid from '../components/TaskGrid'
import ScoreVisualizerService from '../services/ScoreVisualizerService'

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
    const selectedGroup = this.state.groups.find(x => x.id === parseInt(e.target.value, 10))
    this.setState({
      selectedGroup
    })

    this.props.history.push(`/groups/${selectedGroup.id}`)
  }

  handleTaskClick = (task) => {
    const {selectedGroup} = this.state

    this.props.history.push(`/groups/${selectedGroup.id}/tasks/${task.id}`)
  }

  render () {
    const {groups, selectedGroup} = this.state
    const options = groups.map(({id, name}) => ({value: id, label: name}))

    const hasSelectedGroup = selectedGroup.tasks.length > 0
    const tasksForSelectedGroup = selectedGroup.tasks

    const awardedScores = selectedGroup.tasks.reduce((acc, task) => {
      if (task.position === null) return acc

      const count = (acc.find(x => x.position === task.position) || {position: 0}).position + 1

      const scoreForPosition = ScoreVisualizerService.getScoreForPosition(task.position);
      return [...acc.filter(x => x.position !== task.position), {
        position: task.position,
        label: `${scoreForPosition.icon} ${scoreForPosition.label}`,
        count
      }]
    }, []).sort((a, b) => a.position - b.position)

    return (
      <section>
        <section className="bg-white shadow-md rounded p-4">
          <section className="relative">
            <Dropdown options={options} onChange={this.handleTeamChange} selectedValue={selectedGroup.id}/>

            <section className="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
              <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </section>
          </section>

          <div className="mt-2">
            {awardedScores.map(score => {
              return <span
                className="inline-block bg-green rounded-full px-3 py-1 text-white mr-2"
                key={score.position}><span className="font-semibold">{score.label}</span> x {score.count}</span>
            })}
          </div>
        </section>
        {hasSelectedGroup && <TaskGrid tasks={tasksForSelectedGroup} onTaskClick={this.handleTaskClick}/>}
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

  return {
    groups: groups,
    selectedGroup
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(groupActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(TeamPage)