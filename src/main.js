import './style.scss';
import { mountScrollWorld } from './scroll-world-adapter.js';

const sections = [
  {
    start: 0,
    end: 6,
    number: '01 / 04',
    eyebrow: 'The reflection',
    title: 'A world held in water.',
    line: 'The last light rests on the surface before the scale begins to change.',
  },
  {
    start: 6,
    end: 17,
    number: '02 / 04',
    eyebrow: 'The blue hour',
    title: 'The familiar becomes immense.',
    line: 'A quiet blue opens into a place the eye cannot measure.',
  },
  {
    start: 17,
    end: 29,
    number: '03 / 04',
    eyebrow: 'Inside the iris',
    title: 'Stay close to the fold.',
    line: 'Veins, light and indigo depth: the flower reveals itself slowly.',
  },
  {
    start: 29,
    end: 40,
    number: '04 / 04',
    eyebrow: 'The return',
    title: 'Everything was already here.',
    line: 'The world returns to scale: one iris, one bottle, one puddle.',
  },
];

mountScrollWorld(document.querySelector('[data-scroll-experience]'), {
  clip: '/video/lheure-bleue-master.mp4',
  videoDuration: 26.04,
  scrollHeight: 500,
  timeline: {
    duration: 40,
    videoStart: 6,
    videoEnd: 32,
  },
  sections,
});
