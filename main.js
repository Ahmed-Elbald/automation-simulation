
const motors = document.querySelectorAll(".motor");
const startBtn = document.querySelector(".start-btn");
const stopBtn = document.querySelector(".stop-btn");
const timeLeftSpan = document.querySelector(".time-left .num");


let startClicked = false;
let currentTarget = motors.length;
let timer = 5, timeLeft = 5;
let timeLeftHandler;



document.addEventListener("DOMContentLoaded", () => {


  startBtn.addEventListener("click", () => {

    if (!startClicked) {
      startClicked = true;

      rotateMotors();


      if (timeLeft > 0 && timeLeft != 5) {
        setTimeout(() => {
          rotateMotors();
        }, timeLeft * 1000)
      }


      calcTimeLeft()

    }

  });

  stopBtn.addEventListener("click", () => {
    stopMotors();
  })

});



function rotateMotors() {

  motors.forEach(motor => {

    motor.style.animationName = "work";
    motor.classList.remove("freezing");

    if (motor.dataset.id == currentTarget) {
      motor.style.animationName = "none";
      motor.classList.add("freezing");
    }

  });

}

function stopMotors() {
  startClicked = false;

  clearInterval(timeLeftHandler);

  motors.forEach(motor => {
    motor.style.animationName = "none";
  });

}

function calcTimeLeft() {

  clearInterval(timeLeftHandler);
  timeLeftHandler = setInterval(() => {

    timeLeft -= 1;
    if (timeLeft == 0) {
      timeLeft = timer;

      if (currentTarget == motors.length) {
        currentTarget = 1;
      } else {
        currentTarget++;
      }

      rotateMotors();
    }

    timeLeftSpan.textContent = timeLeft;


  }, 1000)

}