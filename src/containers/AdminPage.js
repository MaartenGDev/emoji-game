import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as taskActions from '../actions/taskActions'
import { bindActionCreators } from 'redux'
import Dropdown from '../components/Dropdown'
import ScoreVisualizerService from '../services/ScoreVisualizerService'

class ManageTeamPage extends Component {
  state = {
    groups: this.props.groups,
    tasks: this.props.tasks,
    selectedGroup: this.props.selectedGroup,
    selectedTask: this.props.selectedTask,
    selectedScore: this.props.selectedScore,
    form: this.props.form
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      groups: nextProps.groups,
      tasks: nextProps.tasks,
      selectedGroup: nextProps.selectedGroup,
      selectedTask: nextProps.selectedTask,
      selectedScore: nextProps.selectedScore,
      form: nextProps.form
    })
  }

  updateTaskStatusForTeam = () => {
    const {selectedTask, selectedScore, form} = this.state
    const position = selectedScore.value;

    this.props.actions.updateTask({...selectedTask, ...{position, token: form.token}})
  }

  navigateToSelectedGroupHome = () => {
    const {selectedGroup} = this.state

    this.props.history.push(`/groups/${selectedGroup.id}/`)
  }

  handleTeamChange = e => {
    const {groups, tasks} = this.state
    const selectedGroup = groups.find(x => x.id === parseInt(e.target.value, 10))
    const tasksForSelectedGroup = tasks.filter(x => x.group_id === selectedGroup.id)

    const selectedTask = tasksForSelectedGroup[0]

    this.setState({selectedGroup, selectedTask})
  }

  handleTaskChange = e => {
    const {selectedGroup, tasks} = this.state
    const tasksForSelectedGroup = tasks.filter(x => x.group_id === selectedGroup.id)
    const selectedTask = tasksForSelectedGroup.find(x => x.id === parseInt(e.target.value, 10))
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
    const {groups, tasks, selectedGroup, selectedTask, selectedScore, form} = this.state
    const options = groups.map(({id, name}) => ({value: id, label: name}))

    const tasksForSelectedGroup = tasks.filter(x => x.group_id === selectedGroup.id).map(({id, icon, title}) => ({
      value: id,
      label: `${icon} ${title}`
    }))

    const possibleScores = ScoreVisualizerService.getScores().map(x => ({...x, ...{label: `${x.icon} ${x.label}`}}))

    return (
      <section>
        <section className="bg-orange font-sans" style={{height: '200px'}}>
          <section className="mx-auto container pt-2" style={{width: 'calc(100% - 20px)'}}>
            <button
              className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-black hover:bg-white mt-4 lg:mt-0"
              onClick={this.navigateToSelectedGroupHome}>Back
            </button>
          </section>
        </section>

        <section className="rounded shadow-lg container mt-8 mx-auto bg-white font-sans"
                 style={{marginTop: '-80px', width: 'calc(100% - 20px)'}}>
          <section className="flex justify-center">
            <section style={{marginTop: '-80px', padding: '30px'}}>
              <span className="inline-block p-8 bg-white shadow-md"
                    style={{borderRadius: '50px', fontSize: '35px'}} role="img" aria-label="Admin settings">🔮</span>
            </section>
          </section>

          <section className="px-6 py-4">
            <form>
              <div className="mb-4">
                <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="token">
                  Token
                </label>
                <input
                  className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
                  name="token" id="token" type="password" value={form.token} onChange={this.onChange}/>
              </div>

              <div className="mb-4">
                <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="team">
                  Team
                </label>
                <Dropdown options={options} onChange={this.handleTeamChange} selectedValue={selectedGroup.id}
                          id="team"/>
              </div>

              <div className="mb-4">
                <label className="block text-grey-darker text-sm font-bold mb-2" htmlFor="team">
                  Questions
                </label>
                <Dropdown options={tasksForSelectedGroup} onChange={this.handleTaskChange}
                          selectedValue={selectedTask.id}
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
                <button className="bg-blue hover:bg-blue-dark text-white font-bold py-2 px-4 rounded" type="button"
                        onClick={this.updateTaskStatusForTeam}>
                  Update
                </button>
              </section>
            </form>
          </section>
        </section>
      </section>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {groups, tasks} = state
  const {id} = ownProps.match.params

  const selectedGroup = (id !== undefined && groups.length)
    ? groups.find(x => x.id === parseInt(id, 10))
    : groups[0] || {id: -1, tasks: []}

  const tasksForSelectedGroup = tasks.filter(x => x.group_id === selectedGroup.id)

  const selectedTask = tasksForSelectedGroup.length > 0
    ? tasksForSelectedGroup[0]
    : {id: -1, position: -1}

  return {
    groups,
    tasks,
    selectedGroup,
    selectedTask,
    selectedScore: ScoreVisualizerService.getScoreForPosition(selectedTask.position) || {value: -1},
    form: {
      token: ''
    }
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(taskActions, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(ManageTeamPage)