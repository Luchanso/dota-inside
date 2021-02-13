/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import MenuItem from '@material-ui/core/MenuItem';
import Grid from '@material-ui/core/Grid';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import HeroCard from '../HeroCard';
import { fetchHeroes } from '../../api';
import { getTop } from '../utils';

const Wrapper = styled.div`
  body:not(&) {
    margin: 0;
  }

  padding: 30px;
`;

const VerticalSpaceGrid = styled(Grid)`
  && {
    margin-bottom: 12px;
  }
`;

const SORT_TYPE = {
  WilsonScore: 0,
  NumberOfProPicks: 1,
  ProWinrate: 2,
  ProBans: 3,
};

const TIME_UPDATE = 1e3 * 60 * 5; // 5 min

class App extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isLoading: true,
      heroes: [],
      sortType: 0,
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
  };

  handleChangeSort = (event) => {
    this.setState({
      sortType: event.target.value,
    });
  };

  renderHeroList() {
    const { isLoading, heroes, sortType } = this.state;

    const topHeroes = getTop(heroes, 50).sort((a, b) => {
      if (sortType === SORT_TYPE.ProBans) {
        return b.pro_ban - a.pro_ban;
      }

      if (sortType === SORT_TYPE.ProWinrate) {
        return (b.pro_win / b.pro_pick) * 100 - (a.pro_win / a.pro_pick) * 100;
      }

      if (sortType === SORT_TYPE.NumberOfProPicks) {
        return b.pro_pick - a.pro_pick;
      }

      return b.wilsonScore - a.wilsonScore;
    });

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
        <Grid container spacing={24} justify="center" >
          <VerticalSpaceGrid item xs={12} >
            <Typography type="display4" gutterBottom>
              Top PRO Heroes
            </Typography>
            <Typography type="display1" gutterBottom>
              auto update every 5 minutes
            </Typography>
            <InputLabel id="label-sort">Sort by</InputLabel>
            <Select
              labelId="label-sort"
              value={this.state.sortType}
              onChange={this.handleChangeSort}
            >
              <MenuItem value={0}>Wilson score</MenuItem>
              <MenuItem value={1}>Number of Pro Picks</MenuItem>
              <MenuItem value={2}>Pro Win rate</MenuItem>
              <MenuItem value={3}>Pro Bans</MenuItem>
            </Select>
          </VerticalSpaceGrid>
          {this.renderHeroList()}
        </Grid>
      </Wrapper>
    );
  }
}

export default App;
