/* eslint-disable */
// @flow

import * as React from 'react';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';

import { type Hero } from '../../types';
import { API } from '../../constants';

type Props = {
  classes: {
    card: string,
    media: string,
    label: string,
    lastLabel: string,
  },
  hero: Hero,
};

type TypeLabel = {
  children: React.Node, isLast: boolean,
};

const styles = {
  card: {
    maxWidth: 256,
    margin: 'auto',
  },
  media: {
    height: 144,
  },
  label: {
    margin: '15px 0',
  },
  lastLabel: {
    marginTop: 15,
  },
};

class HeroCard extends React.Component<Props> {
  renderLabel() {
    const { classes } = this.props;

    return ({ children, isLast }: TypeLabel) => (
      <Typography component="p" className={(!isLast && classes.label) || classes.lastLabel}>
        {children}
      </Typography>
    );
  }

  render() {
    const { classes, hero } = this.props;
    const Label = this.renderLabel();

    const imgPath = `${API}${hero.img}`;
    const name = hero.localized_name;
    const picks = hero.pro_pick;
    const win = hero.pro_win;
    const bans = hero.pro_ban;
    const winRate = ((win / picks) * 100).toFixed(2);
    const wilsonScore = (hero.wilsonScore * 100).toFixed(2);

    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={imgPath}
          title="Cristal Maden"
        />
        <CardContent>
          <Typography type="headline" component="h2">
            {name}
          </Typography>
          <Label>Number of Pro Picks: <b>{picks}</b></Label>
          <Divider />
          <Label>Pro Win rate <b>{winRate}%</b></Label>
          <Divider />
          <Label>Pro Bans <b>{bans}</b></Label>
          <Divider />
          <Label isLast>Wilson score: <b>{wilsonScore} / 100</b></Label>
        </CardContent>
      </Card>
    );
  }
}

export default withStyles(styles)(HeroCard);
