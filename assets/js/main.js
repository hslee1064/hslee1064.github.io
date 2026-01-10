(function () {
  const countdownEl = document.getElementById('countdown');
  const ceremonyDate = new Date('2026-04-18T13:00:00+09:00');

  function formatTime(ms) {
    const totalSeconds = Math.max(0, Math.floor(ms / 1000));
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    return `${days}일 ${hours}시간 ${minutes}분 남았습니다`;
  }

  function tick() {
    const now = new Date();
    const diff = ceremonyDate - now;
    countdownEl.textContent = diff > 0 ? formatTime(diff) : '오늘 함께해요!';
  }

  if (countdownEl) {
    tick();
    setInterval(tick, 60 * 1000);
  }

  const galleryFigures = Array.from(document.querySelectorAll('.gallery .photo'));
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxCount = document.getElementById('lightbox-count');
  const prevBtn = lightbox?.querySelector('[data-prev]');
  const nextBtn = lightbox?.querySelector('[data-next]');
  const closeBtns = lightbox?.querySelectorAll('[data-close]');

  if (galleryFigures.length && lightbox && lightboxImage && lightboxCount && prevBtn && nextBtn && closeBtns) {
    const slides = galleryFigures
      .map((figure) => {
        const img = figure.querySelector('img');
        return {
          src: img?.getAttribute('src') || '',
          alt: img?.getAttribute('alt') || ''
        };
      })
      .filter((slide) => slide.src);

    let currentIndex = 0;
    let lastFocused = null;
    let lightboxStatePushed = false;
    let isProgrammaticClose = false;

    function updateSlide(index) {
      currentIndex = (index + slides.length) % slides.length;
      const slide = slides[currentIndex];
      lightboxImage.src = slide.src;
      lightboxImage.alt = slide.alt;
      lightboxCount.textContent = `${currentIndex + 1} / ${slides.length}`;
    }

    function openLightbox(index) {
      if (!slides.length) return;
      lastFocused = document.activeElement;
      updateSlide(index);
      if (!lightboxStatePushed) {
        history.pushState({ lightbox: true }, '', window.location.href);
        lightboxStatePushed = true;
      }
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeydown);
      nextBtn.focus();
    }

    function closeLightbox(triggeredByPop = false) {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeydown);
      if (!triggeredByPop && lightboxStatePushed) {
        isProgrammaticClose = true;
        history.back();
      }
      lightboxStatePushed = false;
      isProgrammaticClose = false;
      if (lastFocused instanceof HTMLElement) {
        lastFocused.focus();
      }
    }

    function handleKeydown(event) {
      if (event.key === 'Escape') {
        closeLightbox();
      } else if (event.key === 'ArrowRight') {
        updateSlide(currentIndex + 1);
      } else if (event.key === 'ArrowLeft') {
        updateSlide(currentIndex - 1);
      }
    }

    galleryFigures.forEach((figure, index) => {
      figure.addEventListener('click', () => openLightbox(index));
      figure.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openLightbox(index);
        }
      });
    });

    prevBtn.addEventListener('click', () => updateSlide(currentIndex - 1));
    nextBtn.addEventListener('click', () => updateSlide(currentIndex + 1));
    closeBtns.forEach((btn) => btn.addEventListener('click', closeLightbox));

    window.addEventListener('popstate', (event) => {
      if (isProgrammaticClose) return;
      if (event.state && event.state.lightbox) {
        closeLightbox(true);
      } else if (lightbox.classList.contains('is-open')) {
        closeLightbox(true);
      }
    });
  }
})();
