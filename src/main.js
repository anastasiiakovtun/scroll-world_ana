import './style.scss';

const TIMELINE = {
  duration: 40,
  videoStart: 6,
  videoEnd: 32,
};

const chapters = [
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

class ScrollJourney {
  constructor() {
    this.experience = document.querySelector('[data-scroll-experience]');
    this.video = document.querySelector('[data-scroll-video]');
    this.status = document.querySelector('[data-media-status]');
    this.track = document.querySelector('.experience__track');
    this.chapter = document.querySelector('[data-copy-chapter]');
    this.eyebrow = document.querySelector('[data-copy-eyebrow]');
    this.title = document.querySelector('[data-copy-title]');
    this.line = document.querySelector('[data-copy-line]');
    this.instruction = document.querySelector('[data-scroll-instruction]');
    this.jumpButtons = document.querySelectorAll('[data-jump]');
    this.reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.rafPending = false;
    this.metadataReady = false;
    this.lastSeek = -1;
    this.videoDuration = 26.04;

    if (!this.experience || !this.video || !this.track) return;

    this.init();
  }

  init() {
    this.track.style.height = '500vh';
    this.video.pause();
    this.video.addEventListener('loadedmetadata', () => {
      if (Number.isFinite(this.video.duration) && this.video.duration > 0) {
        this.videoDuration = this.video.duration;
      }
      this.metadataReady = true;
      this.status?.classList.add('is-hidden');
      this.update();
    });
    this.video.addEventListener('loadeddata', () => this.status?.classList.add('is-hidden'));
    this.video.addEventListener('error', () => this.showMediaStatus());

    this.jumpButtons.forEach((button) => {
      button.addEventListener('click', () => {
        this.scrollToTime(Number(button.dataset.jump));
      });
    });

    this.reduceMotion.addEventListener?.('change', () => this.update());
    window.addEventListener('scroll', () => this.scheduleUpdate(), { passive: true });
    window.addEventListener('resize', () => this.scheduleUpdate(), { passive: true });
    this.update();
  }

  scheduleUpdate() {
    if (this.rafPending) return;
    this.rafPending = true;
    window.requestAnimationFrame(() => {
      this.rafPending = false;
      this.update();
    });
  }

  getProgress() {
    const start = this.experience.offsetTop;
    const distance = Math.max(this.experience.offsetHeight - window.innerHeight, 1);
    return clamp((window.scrollY - start) / distance);
  }

  getTimelineTime() {
    return this.getProgress() * TIMELINE.duration;
  }

  getVideoTime(timelineTime) {
    if (timelineTime <= TIMELINE.videoStart) return 0;
    if (timelineTime >= TIMELINE.videoEnd) return this.videoDuration;

    const videoProgress = (timelineTime - TIMELINE.videoStart) /
      (TIMELINE.videoEnd - TIMELINE.videoStart);
    return videoProgress * this.videoDuration;
  }

  update() {
    const timelineTime = this.getTimelineTime();
    const activeChapter = chapters.find(
      (chapter) => timelineTime >= chapter.start && timelineTime <= chapter.end,
    ) || chapters[chapters.length - 1];

    this.updateCopy(activeChapter, timelineTime);
    this.updateButtons(activeChapter);
    this.updateInstruction(timelineTime);

    if (this.reduceMotion.matches) {
      this.video.pause();
      this.video.classList.add('is-reduced-motion');
      return;
    }

    this.video.classList.remove('is-reduced-motion');
    if (this.metadataReady && this.video.readyState >= 1) {
      const target = this.getVideoTime(timelineTime);
      if (Math.abs(target - this.lastSeek) > 0.04 && !this.video.seeking) {
        this.lastSeek = target;
        this.video.currentTime = target;
      }
    }
  }

  updateCopy(chapter, timelineTime) {
    this.chapter.textContent = chapter.number;
    this.eyebrow.textContent = chapter.eyebrow;
    this.title.textContent = chapter.title;
    this.line.textContent = chapter.line;
    document.documentElement.style.setProperty('--journey-progress', this.getProgress().toFixed(4));
    document.documentElement.style.setProperty('--timeline-time', `${timelineTime.toFixed(2)}s`);
  }

  updateButtons(activeChapter) {
    this.jumpButtons.forEach((button, index) => {
      button.classList.toggle('is-active', chapters[index] === activeChapter);
    });
  }

  updateInstruction(timelineTime) {
    if (!this.instruction) return;
    this.instruction.classList.toggle('is-hidden', timelineTime > 2);
  }

  scrollToTime(targetTime) {
    const progress = clamp(targetTime / TIMELINE.duration);
    const start = this.experience.offsetTop;
    const distance = Math.max(this.experience.offsetHeight - window.innerHeight, 1);
    window.scrollTo({
      top: start + progress * distance,
      behavior: this.reduceMotion.matches ? 'auto' : 'smooth',
    });
  }

  showMediaStatus() {
    this.status?.classList.remove('is-hidden');
    this.status?.classList.add('is-error');
  }
}

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

new ScrollJourney();
