import React from 'react'
import PropTypes from 'prop-types'

const EmojiGrid = ({emojis, onEmojiClick}) => {
  return (
    <section className="flex flex-wrap text-center">
      {emojis.map((emoji, index) => {
        const {icon, is_completed} = emoji

        return <section className={`w-1/2 lg:w-1/3 border border-grey-light text-5xl ${is_completed ? 'bg-grey' : ''}`}
                        key={index} style={{padding: '60px 0'}} onClick={x => onEmojiClick(emoji)}>{icon}</section>
      })}
    </section>
  )
}

EmojiGrid.propTypes = {
  emojis: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string.isRequired,
    is_completed: PropTypes.bool.isRequired
  }).isRequired).isRequired,
  onEmojiClick: PropTypes.func.isRequired
}

export default EmojiGrid