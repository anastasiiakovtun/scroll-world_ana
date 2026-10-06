/*
 * Single-journey adapter for oso95/scroll-world's scrub-engine pattern.
 *
 * The upstream engine is designed for several dive clips plus connector clips.
 * This project already has those visual beats assembled into one master video, so
 * this adapter keeps the same important mechanics—blob loading, coalesced seeks,
 * sticky stage, chapter configuration, mobile-safe sizing and reduced-motion
 * handling—while mapping one clip across the four editorial chapters.
 */

export function mountScrollWorld(container, config) {
  const video = container.querySelector('[data-scroll-video]');
  const track = container.querySelector('.experience__track');
  const status = container.querySelector('[data-media-status]');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
  const copyLayer = container.querySelector('.experience__copy');
  const copy = {
    chapter: container.querySelector('[data-copy-chapter]'),
    eyebrow: container.querySelector('[data-copy-eyebrow]'),
    title: container.querySelector('[data-copy-title]'),
    line: container.querySelector('[data-copy-line]'),
  };
  const buttons = [...container.querySelectorAll('[data-jump]')];
  const chapters = config.sections || [];
  const timeline = {
    duration: config.timeline?.duration || 40,
    videoStart: config.timeline?.videoStart || 6,
    videoEnd: config.timeline?.videoEnd || 32,
  };

  if (!video || !track || !chapters.length) return null;

  let videoDuration = config.videoDuration || 26.04;
  let ready = false;
  let loading = false;
  let seeking = false;
  let lastTarget = -1;
  let rafPending = false;
  let blobUrl = null;
  let lastChapter = -1;
  let openingLoop = false;
  let openingIdleTimer = null;
  const openingDuration = config.openingDuration || 4.04;

  track.style.height = `${config.scrollHeight || 500}vh`;
  video.pause();
  if (reduce.matches && config.reducedMotionPoster) {
    video.poster = config.reducedMotionPoster;
  }
  status?.classList.add('is-hidden');

  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));

  function getProgress() {
    const start = container.offsetTop;
    const distance = Math.max(container.offsetHeight - window.innerHeight, 1);
    return clamp((window.scrollY - start) / distance);
  }

  function getTimelineTime() {
    return getProgress() * timeline.duration;
  }

  function stopOpeningLoop() {
    if (!openingLoop) return;
    openingLoop = false;
    video.pause();
  }

  function startOpeningLoop() {
    if (reduce.matches || !ready || getProgress() > 0.001) return;
    openingLoop = true;
    seeking = false;
    if (video.currentTime >= openingDuration - 0.05 || video.currentTime > openingDuration) {
      video.currentTime = 0;
    }
    video.play().catch(() => {});
  }

  function queueOpeningLoop() {
    window.clearTimeout(openingIdleTimer);
    openingIdleTimer = window.setTimeout(startOpeningLoop, 220);
  }

  function getVideoTime(time) {
    if (time <= timeline.videoStart) return 0;
    if (time >= timeline.videoEnd) return videoDuration;
    return ((time - timeline.videoStart) / (timeline.videoEnd - timeline.videoStart)) * videoDuration;
  }

  function activeChapter(time) {
    return chapters.findIndex((chapter, index) => {
      const isLast = index === chapters.length - 1;
      return time >= chapter.start && (time < chapter.end || isLast);
    });
  }

  function updateCopy(time) {
    const index = Math.max(0, activeChapter(time));
    const chapter = chapters[index];
    copy.chapter.textContent = chapter.number;
    copy.eyebrow.textContent = chapter.eyebrow;
    copy.title.textContent = chapter.title;
    copy.line.textContent = chapter.line;

    buttons.forEach((button, buttonIndex) => {
      button.classList.toggle('is-active', buttonIndex === index);
    });

    if (index !== lastChapter) {
      container.dispatchEvent(new CustomEvent('scroll-world:chapter', {
        detail: { index, chapter },
      }));
      lastChapter = index;
    }
  }

  function updateInstruction(time) {
    const instruction = container.querySelector('[data-scroll-instruction]');
    instruction?.classList.toggle('is-hidden', time > 2);
  }

  function update() {
    const progress = getProgress();
    const time = progress * timeline.duration;
    copyLayer?.classList.toggle('is-intro', progress < 0.12);
    updateCopy(time);
    updateInstruction(time);
    document.documentElement.style.setProperty('--journey-progress', getProgress().toFixed(4));

    if (openingLoop) return;

    if (reduce.matches) {
      video.pause();
      video.classList.add('is-reduced-motion');
      return;
    }

    video.classList.remove('is-reduced-motion');
    if (!ready || video.readyState < 1 || seeking) return;

    const target = getVideoTime(time);
    if (Math.abs(target - lastTarget) < 0.04) return;
    lastTarget = target;
    seeking = true;
    video.currentTime = target;
  }

  function scheduleUpdate() {
    if (rafPending) return;
    rafPending = true;
    window.requestAnimationFrame(() => {
      rafPending = false;
      update();
    });
  }

  function showStatus(error = false) {
    if (!status) return;
    status.classList.toggle('is-error', error);
    status.classList.remove('is-hidden');
  }

  function loadVideo() {
    if (reduce.matches || loading || ready) return;
    loading = true;

    fetch(config.clip)
      .then((response) => {
        if (!response.ok) throw new Error(`Video request failed: ${response.status}`);
        return response.blob();
      })
      .then((blob) => {
        blobUrl = URL.createObjectURL(blob);
        video.src = blobUrl;
        video.load();
      })
      .catch(() => {
        loading = false;
        showStatus(true);
      });
  }

  video.addEventListener('loadedmetadata', () => {
    if (Number.isFinite(video.duration) && video.duration > 0) {
      videoDuration = video.duration;
    }
    ready = true;
    status?.classList.add('is-hidden');
    update();
  });

  video.addEventListener('loadeddata', () => {
    status?.classList.add('is-hidden');
    queueOpeningLoop();
  });

  video.addEventListener('seeked', () => {
    seeking = false;
    update();
  });

  video.addEventListener('timeupdate', () => {
    if (openingLoop && video.currentTime >= openingDuration - 0.04) {
      openingLoop = false;
      video.pause();
      video.currentTime = openingDuration - 0.04;
    }
  });

  video.addEventListener('error', () => {
    loading = false;
    showStatus(true);
  });

  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const target = Number(button.dataset.jump);
      const progress = clamp(target / timeline.duration);
      const top = container.offsetTop + progress * (container.offsetHeight - window.innerHeight);
      window.scrollTo({ top, behavior: reduce.matches ? 'auto' : 'smooth' });
    });
  });

  function handleScroll() {
    if (getProgress() > 0.001) {
      window.clearTimeout(openingIdleTimer);
      stopOpeningLoop();
    } else {
      queueOpeningLoop();
    }
    scheduleUpdate();
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', scheduleUpdate, { passive: true });
  reduce.addEventListener?.('change', scheduleUpdate);

  // The upstream engine keeps reduced-motion pages on stills and avoids video
  // decoding. The final arrangement poster is therefore the accessible fallback.
  if (!reduce.matches) loadVideo();
  update();
  queueOpeningLoop();

  return {
    update,
    destroy() {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', scheduleUpdate);
      window.clearTimeout(openingIdleTimer);
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    },
  };
}
