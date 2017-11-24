import React from 'react'
import PropTypes from 'prop-types'

const TaskGrid = ({tasks, onTaskClick}) => {
  return (
    <section className="flex flex-wrap text-center">
      {tasks.map((task, index) => {
        const {icon, position} = task
        const isCompleted = position !== null

        return <section
          className={`w-1/2 lg:w-1/3 border border-grey-light text-5xl relative ${isCompleted ? 'bg-grey-light' : ''}`}
          key={index} style={{padding: '60px 0'}} onClick={x => onTaskClick(task)}>
          {icon}
          {isCompleted &&
          <span className="absolute inline-block"
                style={{right: '5px', bottom: '5px'}}>{getScoreRepresentation(position)}</span>}
        </section>
      })}
    </section>
  )
}

const getScoreRepresentation = position => {
  switch (position){
    case 1: return '🥇';
    case 2: return '🥈';
    case 3: return '🥉';
    default: return '🏆';
  }
}

TaskGrid.propTypes = {
  tasks: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string.isRequired,
    position: PropTypes.bool.optional,
  }).isRequired).isRequired,
  onTaskClick: PropTypes.func.isRequired
}

export default TaskGrid