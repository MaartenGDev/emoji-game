import React, { Component } from 'react'
import EmojiGrid from './Components/EmojiGrid'

class App extends Component {
  state = {
    emojis: [
      {icon: '😱', isCompleted: false},
      {icon: '🤠', isCompleted: false},
      {icon: '🙄', isCompleted: false},
      {icon: '👽', isCompleted: false},
      {icon: '😡', isCompleted: false},
      {icon: '🎃', isCompleted: false},
      {icon: '💩', isCompleted: false},
      {icon: '🤖', isCompleted: false},
      {icon: '🐼', isCompleted: false},
      {icon: '🌚', isCompleted: false},
      {icon: '🌍', isCompleted: false},
      {icon: '🌈', isCompleted: false},
      {icon: '☃️', isCompleted: false},
      {icon: '🥐', isCompleted: false},
      {icon: '🍩', isCompleted: false}]
  }
  handleClick = () => {
    console.log('clicked!')
  }

  render () {
    const {emojis} = this.state

    return (
      <section>
        <EmojiGrid emojis={emojis} onEmojiClick={this.handleClick}/>
      </section>
    )
  }
}

export default App
