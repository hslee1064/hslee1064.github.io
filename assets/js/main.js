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

  const personalMessageEl = document.getElementById('personal-message');
  const messageSection = document.getElementById('message');
  const messageModal = document.getElementById('message-modal');
  const messageModalText = document.getElementById('message-modal-text');
  const messageModalCloseButtons = messageModal?.querySelectorAll('[data-message-close]');
  const urlParams = new URLSearchParams(window.location.search);
  const hashParams = new URLSearchParams((window.location.hash || '').split('?')[1] || '');
  const visitorName = (urlParams.get('name') || hashParams.get('name') || '').trim();

  function openMessageModal(message) {
    if (!messageModal || !messageModalText) return;
    messageModalText.textContent = message;
    messageModal.classList.add('is-open');
    messageModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMessageModal() {
    if (!messageModal) return;
    messageModal.classList.remove('is-open');
    messageModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (messageModal && messageModalCloseButtons?.length) {
    messageModalCloseButtons.forEach((btn) => btn.addEventListener('click', closeMessageModal));
  }

  if (personalMessageEl && visitorName) {
    const messageMap = window.MESSAGE_MAP || {};
    const mappedMessage = messageMap[visitorName];
    if (mappedMessage) {
      personalMessageEl.textContent = mappedMessage;
      openMessageModal(mappedMessage);
    } else {
      messageSection?.remove();
      messageModal?.remove();
    }
  } else if (messageSection || messageModal) {
    messageSection?.remove();
    messageModal?.remove();
  }

  const copyLinkButton = document.querySelector('[data-copy-link]');
  const kakaoShareButton = document.querySelector('[data-kakao-share]');
  const accountCopyButtons = document.querySelectorAll('[data-copy-account]');
  const shareUrl = window.location.href;

  async function copyToClipboard(text) {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (error) {
      // Fall back to the legacy approach below.
    }

    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand('copy');
    document.body.removeChild(textarea);
    return copied;
  }

  async function handleCopyLink() {
    await handleCopyText(shareUrl, '링크가 복사되었습니다.');
  }

  async function handleCopyText(text, successMessage) {
    const copied = await copyToClipboard(text);
    if (copied) {
      window.alert(successMessage);
    } else {
      window.prompt('아래 내용을 복사해 주세요.', text);
    }
  }

  async function handleKakaoShare() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: document.title,
          text: '이현식 & 조지원 결혼식에 초대합니다.',
          url: shareUrl
        });
        return;
      } catch (error) {
        // Ignore share cancellation and fall back to copying the link.
      }
    }
    handleCopyText(shareUrl, '링크가 복사되었습니다.');
  }

  if (copyLinkButton) {
    copyLinkButton.addEventListener('click', handleCopyLink);
  }

  if (kakaoShareButton) {
    kakaoShareButton.addEventListener('click', handleKakaoShare);
  }

  if (accountCopyButtons.length) {
    accountCopyButtons.forEach((button) => {
      button.addEventListener('click', () => {
        const accountNumber = button.getAttribute('data-copy-account');
        if (accountNumber) {
          handleCopyText(accountNumber, '계좌번호가 복사되었습니다.');
        }
      });
    });
  }

  const galleryFigures = Array.from(document.querySelectorAll('.gallery .photo'));
  const galleryToggleButton = document.querySelector('[data-gallery-toggle]');
  const initialGalleryCount = 6;
  const lightbox = document.getElementById('lightbox');
  const lightboxImage = document.getElementById('lightbox-image');
  const lightboxCount = document.getElementById('lightbox-count');
  const prevBtn = lightbox?.querySelector('[data-prev]');
  const nextBtn = lightbox?.querySelector('[data-next]');
  const closeBtns = lightbox?.querySelectorAll('[data-close]');

  if (lightbox && lightbox.parentElement !== document.body) {
    document.body.appendChild(lightbox);
  }

  if (galleryFigures.length > initialGalleryCount) {
    galleryFigures.slice(initialGalleryCount).forEach((figure) => {
      figure.classList.add('is-hidden');
    });
  } else if (galleryToggleButton) {
    galleryToggleButton.style.display = 'none';
  }

  if (galleryToggleButton) {
    galleryToggleButton.addEventListener('click', () => {
      const isExpanded = galleryFigures.some((figure) => figure.classList.contains('is-hidden'));
      galleryFigures.slice(initialGalleryCount).forEach((figure) => {
        figure.classList.toggle('is-hidden', !isExpanded);
      });
      galleryToggleButton.textContent = isExpanded ? '사진 접기' : '사진 더보기';
      if (isExpanded) {
        galleryToggleButton.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

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
    let scrollYBeforeOpen = 0;

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
      scrollYBeforeOpen = window.scrollY || window.pageYOffset || 0;
      document.body.style.top = `-${scrollYBeforeOpen}px`;
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      if (!lightboxStatePushed) {
        history.pushState({ lightbox: true }, '', window.location.href);
        lightboxStatePushed = true;
      }
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.addEventListener('keydown', handleKeydown);
      nextBtn.focus();
    }

    function closeLightbox(triggeredByPop = false) {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      window.scrollTo(0, scrollYBeforeOpen);
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
