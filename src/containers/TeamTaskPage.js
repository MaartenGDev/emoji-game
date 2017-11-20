import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as groupActions from '../actions/groupActions'
import { bindActionCreators } from 'redux'

class TeamPage extends Component {
  state = {
    group: this.props.group,
    task: this.props.task,
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      group: nextProps.group,
      task: nextProps.task
    })
  }

  navigateHome = () => {
    this.props.history.push(`/groups/${this.state.group.id}/`)
  }

  render () {
    const {task} = this.state

    return (
      <section>
        <section className="bg-orange font-sans" style={{height: '200px'}}>
          <section className="mx-auto container pt-2" style={{width: "calc(100% - 20px)"}}>
            <button className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-black hover:bg-white mt-4 lg:mt-0" onClick={this.navigateHome}>Back</button>
          </section>
        </section>

        <section className="rounded shadow-lg container mt-8 mx-auto bg-white font-sans" style={{marginTop: "-80px", width: "calc(100% - 20px)"}}>
          <section className="flex justify-center">
            <section style={{marginTop: '-80px', padding: '30px'}}><span className="inline-block p-8 bg-white shadow-md" style={{borderRadius: "50px", fontSize: "35px"}}>{task.icon}</span>
            </section>
          </section>

          <section className="px-6 py-4">
            <section className="font-bold text-xl mb-2">{task.title}</section>
            <p className="text-grey-darker text-base" dangerouslySetInnerHTML={{__html: task.description}} />
          </section>
        </section>
      </section>
    )
  }
}

const buildTask = group => ({
  id: undefined,
  group_id: group !== undefined ? group.id : undefined,
  icon: '',
  title: '',
  description: '',
})

const mapStateToProps = (state, ownProps) => {
  const {id, taskId} = ownProps.match.params
  const group = state.groups.find(x => x.id === parseInt(id, 10))

  const task = group === undefined
    ? undefined
    : group.tasks.find(x => x.id === parseInt(taskId, 10))

  return {
    group,
    task: task || buildTask(task)
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(groupActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(TeamPage)