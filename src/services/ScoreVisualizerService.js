class ScoreVisualizerService {
  static getScores () {
    return [
      {
        value: 1,
        label: '🥇 1st'
      },
      {
        value: 2,
        label: '🥈 2nd',
      },
      {
        value: 3,
        label: '🥉 3rd',
      },
      {
        value: 4,
        label: '💩 You tried'
      }
    ]
  }

  static getScoreForPosition (position) {
    return ScoreVisualizerService.getScores().find(x => x.value === parseInt(position, 10))
  }
}

export default ScoreVisualizerService