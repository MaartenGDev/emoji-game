import React from 'react'
import PropTypes from 'prop-types'

const TaskGrid = ({tasks, onTaskClick}) => {
  return (
    <section className="flex flex-wrap text-center">
      {tasks.map((task, index) => {
        const {icon, is_completed} = task

        return <section className={`w-1/2 lg:w-1/3 border border-grey-light text-5xl ${is_completed ? 'bg-grey' : ''}`}
                        key={index} style={{padding: '60px 0'}} onClick={x => onTaskClick(task)}>{icon}</section>
      })}
    </section>
  )
}

TaskGrid.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string.isRequired,
    is_completed: PropTypes.bool.isRequired
  }).isRequired).isRequired,
  onTaskClick: PropTypes.func.isRequired
}

export default TaskGrid