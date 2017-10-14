// @flow

import { typeof Hero } from '../types';

// https://habrahabr.ru/company/darudar/blog/143188/
const wilsonScore = (up: number, down: number) => {
  if (!up) return -down;
  const n = up + down;
  const z = 1.64485; // 1.0 = 85%, 1.6 = 95%
  const phat = up / n;
  // eslint-disable-next-line
  return (phat+z*z/(2*n)-z*Math.sqrt((phat*(1-phat)+z*z/(4*n))/n))/(1+z*z/n);
};

const byWilsonScore = (a: Hero, b: Hero) => b.wilsonScore - a.wilsonScore;

export const getTop = (heroes: Array<Hero>, count: number) => {
  const newHeroes = heroes.map(hero => ({
    ...hero, wilsonScore: wilsonScore(hero.pro_win, hero.pro_pick),
  }));

  return newHeroes.sort(byWilsonScore).slice(0, count);
};

export default {
  getTop,
};
