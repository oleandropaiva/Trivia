import React from 'react';
import { Link } from 'react-router-dom';
import RankingList from '../components/RankingList';

class Ranking extends React.Component {
  render() {
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
        <RankingList />
      </div>
    );
  }
}

export default Ranking;
