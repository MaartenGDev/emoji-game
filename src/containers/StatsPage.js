import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as groupActions from '../actions/groupActions'
import { bindActionCreators } from 'redux'

class StatsPage extends Component {
  state = {
    groups: this.props.groups,
    tasks: this.props.tasks,
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      groups: nextProps.groups,
      tasks: nextProps.tasks,
    })
  }

  render () {
    const {groups, tasks} = this.state

    const maxScore = tasks.map(x => x.position === null ? 0 : x.position).reduce((a, b) => {
      return Math.max(a, b)
    }, 0)

    console.log(maxScore)

    const teams = groups.map(group => {
      return {
        name: group.name,
        score: tasks.filter(task => task.group_id === group.id).reduce((acc, cur) => {
          if (cur.position === null) return acc

          const position = cur.position === null ? 0 : cur.position

          return acc + ((maxScore - position) + 1)
        }, 0)
      }
    })

    return (
      <section>
        <section className="bg-white shadow-md rounded p-4">
          <h1>Scores </h1>
          <div className="mt-2 flex content-between">
            {teams.map(team => {
              return (<div className="p-2 bg-indigo-darker items-center text-indigo-lightest leading-none lg:rounded-full flex lg:inline-flex" role="alert">
                <span className="flex rounded-full bg-indigo uppercase px-2 py-1 text-xs font-bold mr-3">{team.score}</span>
                <span className="font-semibold mr-2 text-left flex-1">{team.name}</span>
                <svg className="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
              </div>)
            })}
          </div>
        </section>
      </section>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const {groups, tasks} = state

  return {
    groups: groups,
    tasks
  }
}

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(groupActions, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(StatsPage)