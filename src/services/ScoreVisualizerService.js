class ScoreVisualizerService {
  static getScores () {
    return [
      {
        value: 1,
        label: '🥇'
      },
      {
        value: 2,
        label: '🥈',
      },
      {
        value: 3,
        label: '🥉',
      },
      {
        value: 4,
        label: '💩'
      }
    ]
  }

  static getScoreForPosition (position) {
    return ScoreVisualizerService.getScores().find(x => x.value === parseInt(position, 10))
  }
}

export default ScoreVisualizerService