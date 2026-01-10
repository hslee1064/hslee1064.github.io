(function () {
  const countdownEl = document.getElementById('countdown');
  const ceremonyDate = new Date('2025-10-11T14:00:00+09:00');

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
})();
