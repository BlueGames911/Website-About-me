document.addEventListener("DOMContentLoaded", () => {

  const topTimer = document.getElementById("top-timer");
  const timerComment = document.getElementById("timer-comment");
  const footerTimer = document.getElementById("timer");

  let seconds = 0;
  setInterval(() => {
    seconds++;
    const mins = Math.floor(seconds / 60);
    const s = seconds % 60;
    const formatted = `${mins}:${s.toString().padStart(2,"0")}`;
    if (topTimer) topTimer.textContent = formatted;
    if (footerTimer) footerTimer.textContent = formatted;

    handleComments(seconds);
  }, 1000);

  const commentThresholds = [
    { t: 5, msg: "Nice — you found the page!" },
    { t: 45, msg: "Still here? Nice." },
    { t: 160, msg: "I must be quite interesting." },
    { t: 280, msg: "Dont tell me you went AFK -_-"},
    { t: 360, msg: "Maybe the music is that good"}
  ];
  let lastCommentIndex = -1;
  function handleComments(sec) {
    for (let i = commentThresholds.length - 1; i >= 0; i--) {
      if (sec >= commentThresholds[i].t && lastCommentIndex < i) {
        timerComment.textContent = commentThresholds[i].msg;
        lastCommentIndex = i;
        break;
      }
    }
  }

  // Dark mode toggle
  const darkBtn = document.getElementById("darkToggle");
  const htmlRoot = document.documentElement;
  if (darkBtn) {
    darkBtn.addEventListener("click", () => {
      const active = htmlRoot.classList.toggle("dark-mode");
      darkBtn.setAttribute("aria-pressed", String(active));
      darkBtn.textContent = active ? "Turn On The Lights" : "Turn Off The Lights";
    });
  }

  

  // Music player
  const player = document.getElementById("music-player");
  if (player) {
    player.muted = true;
    player.addEventListener("play", () => {
      if (player.muted) player.muted = false;
    });
  }
});