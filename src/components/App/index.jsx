import React from 'react';
import styled from 'styled-components';
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

const TIME_UPDATE = 1e3 * 60 * 5; // 5 min

class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isLoading: true,
      heroes: [],
    };
  }

  componentDidMount() {
    this.handleUpdate();
    this.timer = setInterval(this.handleUpdate, TIME_UPDATE);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  handleUpdate = () => {
    this.setState({
      isLoading: true,
    });

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
              </a> and auto update every 5 minutes
            </Typography>
          </Grid>
          {this.renderHeroList()}
        </Grid>
      </Wrapper>
    );
  }
}

export default App;
