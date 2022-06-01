import React, { Component } from 'react';

class RankingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ranking: [],
    };
  }

  componentDidMount() {
    const rankingJS = localStorage.getItem('ranking');
    const showRanking = JSON.parse(rankingJS);
    this.saveRankingState(showRanking);
  }

  saveRankingState = (showRanking) => {
    this.setState({ ranking: showRanking.sort((a, b) => (b.score - a.score)) });
  }

  render() {
    const { ranking } = this.state;

    return (
      <div>
        {ranking.map(({ name, score }, index) => (
          <div key={ index }>
            <h3 data-testid={ `player-name-${index}` }>{name}</h3>
            <h3 data-testid={ `player-score-${index}` }>{score}</h3>
          </div>
        ))}
      </div>
    );
  }
}

export default RankingList;
