import React from 'react';
import styled from 'styled-components';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';
import Grid from 'material-ui/Grid';

import HeroCard from '../HeroCard';
import { fetchHeroes } from '../../api';
import { getTop } from '../utils';

const Wrapper = styled.div`
  body:not(&) {
    margin: 0;
  }

  padding: 30px;
`;

class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isLoading: true,
      heroes: [],
    };
  }

  componentDidMount() {
    fetchHeroes().then((heroes) => {
      this.setState({
        isLoading: false,
        heroes,
      });
    });
  }

  renderHeroList() {
    const { isLoading, heroes } = this.state;

    const topHeroes = getTop(heroes, 50);

    if (isLoading) {
      return <CircularProgress />;
    }

    return topHeroes.map(hero => (
      <Grid item xs={2} key={hero.id}>
        <HeroCard hero={hero} />
      </Grid>
    ));
  }

  render() {
    return (
      <Wrapper>
        <Grid container spacing={24} justify="center">
          <Grid item xs={12}>
            <Typography type="display4" gutterBottom>
              Top PRO Heroes
            </Typography>
            <Typography type="display1" gutterBottom>
              Sortered by{' '}
              <a
                href="https://en.wikipedia.org/wiki/Binomial_proportion_confidence_interval"
                target="_blank"
                rel="noopener noreferrer"
              >
                wilson score
              </a>
            </Typography>
          </Grid>
          {this.renderHeroList()}
        </Grid>
      </Wrapper>
    );
  }
}

export default App;
