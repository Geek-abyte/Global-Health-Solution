const startCallTimer = (duration, onTimeUp, onTick) => {
  let timeLeft = duration;
  const timerId = setInterval(() => {
    timeLeft -= 1;
    onTick(timeLeft);
    if (timeLeft <= 0) {
      clearInterval(timerId);
      onTimeUp();
    }
  }, 1000);

  return () => clearInterval(timerId); // Return a function to clear the timer
};

export default startCallTimer;
