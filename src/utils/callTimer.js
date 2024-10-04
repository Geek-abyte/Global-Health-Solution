const startCallTimer = (duration, onTimeUp) => {
  let timeLeft = duration;
  const timerId = setInterval(() => {
    timeLeft -= 1;
    if (timeLeft <= 0) {
      clearInterval(timerId);
      onTimeUp();
    }
  }, 1000);

  return () => clearInterval(timerId); // Return a function to clear the timer
};

export default startCallTimer;
