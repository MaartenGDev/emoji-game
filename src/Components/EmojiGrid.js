import React from 'react';
import PropTypes from 'prop-types';

const EmojiGrid = ({emojis}) => {
  return (
    <section>
      {emojis.map(({icon, isCompleted}, index) => {
        return <section key={index}>{icon}</section>
      })}
    </section>
  );
};


EmojiGrid.propTypes = {
  emojis: PropTypes.arrayOf(PropTypes.shape({
    icon: PropTypes.string.isRequired,
    isCompleted: PropTypes.bool.isRequired
  }).isRequired).isRequired,
  onEmojiClick: PropTypes.func.isRequired
}

export default EmojiGrid;