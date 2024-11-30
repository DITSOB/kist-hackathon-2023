function calculatePeriod() {
  const lastPeriod = document.getElementById("lastPeriodDate");
  const lastPeriodDate = new Date(lastPeriod.value);
  const cycleLength = 28;

  const nextPeriodDate = new Date(
    lastPeriodDate.getTime() + cycleLength * 24 * 60 * 60 * 1000
  );

  const currentDate = new Date();
  const timeRemaining = nextPeriodDate.getTime() - currentDate.getTime();

  const daysRemaining = Math.ceil(timeRemaining / (24 * 60 * 60 * 1000));

  if (daysRemaining < 0) {
    const final = document.getElementById("Your_Result");
    final.innerHTML = `Irreguular period detected. It is better to seek out medical help if it last more than 35 days.`;
  } else if (daysRemaining > 28) {
    const final = document.getElementById("Your_Result");
    final.innerHTML = `Invalid Info.`;
  } else {
    const final = document.getElementById("Your_Result");

    // Ovulation day estimation (around 14 days before the next period)
    const ovulationDate = new Date(
      nextPeriodDate.getTime() - 14 * 24 * 60 * 60 * 1000
    );

    // Discharge day estimation (around 5-7 days before ovulation)
    const dischargeDate = new Date(
      ovulationDate.getTime() -
        (Math.floor(Math.random() * 3) + 5) * 24 * 60 * 60 * 1000
    );

    const menstrualPhase = determineMenstrualPhase(daysRemaining);

    final.innerHTML = `Your next period is expected around ${nextPeriodDate.toDateString()}.
       <br>Time remaining: ${daysRemaining} days "Please carry your neccisities (suitable menstrual products,Portable hotbags and Pain relief medications)".
       <br>Ovulation day is estimated around ${ovulationDate.toDateString()}.
       <br>Discharge day is estimated around ${dischargeDate.toDateString()}.
       <br><br>Please note that this may vary according to your ovulation cycle.`;
    // Save lastPeriodDate to localStorage
    localStorage.setItem("lastPeriodDate", lastPeriodDate.toISOString());
  }
}

function checkPreviousPeriod() {
  // Retrieve lastPeriodDate from localStorage
  const storedLastPeriodDate = localStorage.getItem("lastPeriodDate");
  const lastPeriodDate = storedLastPeriodDate
    ? new Date(storedLastPeriodDate)
    : null;

  if (lastPeriodDate) {
    const final = document.getElementById("Your_Result");
    final.innerHTML = `Your previous period was on ${lastPeriodDate.toDateString()}.`;
  } else {
    const final = document.getElementById("Your_Result");
    final.innerHTML = `No previous period data available.`;
  }
}

function determineMenstrualPhase(daysRemaining) {
  if (daysRemaining <= 7) {
    return "Early Follicular Phase";
  } else if (daysRemaining <= 14) {
    return "Late Follicular Phase";
  } else if (daysRemaining === 14) {
    return "Ovulation Phase";
  } else if (daysRemaining <= 21) {
    return "Early Luteal Phase";
  } else {
    return "Late Luteal Phase";
  }
}

function sendMail() {
  const params = {
    to_name: document.getElementById("name").value,
    to_email: document.getElementById("email").value,
    t_days: lastPeriodDate.toDateString(),
  };
  console.log(params);
  emailjs
    .send("service_ty5xi7o", "template_97q6gr6", params, "Y-m9GIeauLqIPKoxW")
    .then(function (res) {
      alert("Success" + res.status);
    });
}

function onSubmit(event) {
  event.preventDefault();
  sendMail();
}
const signupButton = document.getElementById("signupButton");
signupButton.addEventListener("click", onSubmit);
