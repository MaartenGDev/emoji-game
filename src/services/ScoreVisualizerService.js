class ScoreVisualizerService {
  static getScores () {
    return [
      {
        value: 1,
        icon: '🥇',
        label: '1st'
      },
      {
        value: 2,
        icon: '🥈',
        label: '2nd',
      },
      {
        value: 3,
        icon: '🥉',
        label: '3rd',
      },
      {
        value: 4,
        icon: '💩',
        label: 'You tried'
      }
    ]
  }

  static getScoreForPosition (position) {
    return ScoreVisualizerService.getScores().find(x => x.value === parseInt(position, 10))
  }
}

export default ScoreVisualizerService