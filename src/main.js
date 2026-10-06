import './style.scss';
import { mountScrollWorld } from './scroll-world-adapter.js';

const sections = [
  {
    start: 0,
    end: 6,
    number: '01 / 04',
    eyebrow: '',
    title: 'The blue hour, held in iris.',
    line: 'A cool floral trace rests in the last light before the world begins to open.',
  },
  {
    start: 6,
    end: 17,
    number: '02 / 04',
    eyebrow: 'Atmosphere in bloom',
    title: 'Scent becomes atmosphere.',
    line: 'The floral heart moves through blue shadow, close enough to feel.',
  },
  {
    start: 17,
    end: 29,
    number: '03 / 04',
    eyebrow: 'The iris accord',
    title: 'Closer than a memory.',
    line: 'Powdered violet, luminous depth, a quiet warmth held in the fold.',
  },
  {
    start: 29,
    end: 40,
    number: '04 / 04',
    eyebrow: 'The return',
    title: "The world's quiet signature.",
    line: 'One iris. One bottle. The blue hour, held in L’Heure Bleue.',
  },
];

mountScrollWorld(document.querySelector('[data-scroll-experience]'), {
  clip: 'video/lheure-bleue-master.mp4',
  reducedMotionPoster: 'video/final-arrangement.jpg',
  videoDuration: 25.23,
  scrollHeight: 500,
  timeline: {
    duration: 40,
    videoStart: 6,
    videoEnd: 32,
  },
  sections,
});
