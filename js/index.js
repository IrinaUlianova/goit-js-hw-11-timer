class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.element = document.querySelector(selector);
    this.targetDate = targetDate;

    this.initializeClock();
  }

  initializeClock() {
    const currentDate = Date.now();
    let time = this.targetDate.getTime() - currentDate;
    const intervalId = setInterval(() => {
      time -= 1000;
      if (time < 0) {
        time = 0;
        clearInterval(intervalId);
      }
      const timeComponentsValues = this.getTimeRemaining(time);
      this.render(timeComponentsValues);
    }, 1000);
  }

  getTimeRemaining(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));
    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, "0");
  }

  render({ days, hours, mins, secs }) {
    return (this.element.innerHTML = `
    <div class="field">
      <span class="value" data-value="days">${days}</span>
      <span class="label">Days</span>
    </div>
  
    <div class="field">
      <span class="value" data-value="hours">${hours}</span>
      <span class="label">Hours</span>
    </div>
  
    <div class="field">
      <span class="value" data-value="mins">${mins}</span>
      <span class="label">Minutes</span>
    </div>
  
    <div class="field">
      <span class="value" data-value="secs">${secs}</span>
      <span class="label">Seconds</span>
    </div>
    `);
  }
}

const timer = new CountdownTimer({
  selector: "#timer-1",
  targetDate: new Date("September 20, 2021"),
});
