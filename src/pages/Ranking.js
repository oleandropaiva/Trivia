import React from 'react';
import { Link } from 'react-router-dom';

class Ranking extends React.Component {
  state = {
    ranking: [],
  }

  componentDidMount() {
    const rankingJS = localStorage.getItem('ranking');
    const showRanking = JSON.parse(rankingJS);
    this.saveRankingState(showRanking);
  }

  saveRankingState = (showRanking) => {
    const RETURN_NUMBER = 1;

    showRanking.sort((keyRankingA, keyRankingB) => { // Ordena
      if (keyRankingA.name < keyRankingB.score) {
        return -RETURN_NUMBER;
      }
      return true;
    });
    const reverseRanking = showRanking.reverse(); // inverte a ordem
    this.setState({ ranking: reverseRanking });
  }

  render() {
    const { ranking } = this.state;
    console.log(ranking);
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        <Link to="/">
          <button
            type="button"
            data-testid="btn-go-home"
          >
            Tela inicial
          </button>
        </Link>
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

export default Ranking;
