function sendMail() {
    const params = {
      to_name: document.getElementById("name").value,
      to_email: document.getElementById("email").value,
      
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
  