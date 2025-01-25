

const emailForm = document.querySelector("#email-form");
const recoveryCodeForm = document.querySelector("#recovery-code-form");
const email = document.querySelector("#email");
const recoveryCode = document.querySelector("#recovery-code");
const newPassword = document.querySelector("#new-password");
const newPasswordCopy = document.querySelector("#new-password-copy");

emailForm.onsubmit = async (e) => {
  e.preventDefault();
  //request the server to send a passport recovery code to the user's email.
  const response = await fetch("/api/passwords", {
    method: "POST",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify({ email: email.value }),
  });
  if (response.status === 200) {
    emailForm.classList.toggle("d-none");
    recoveryCodeForm.classList.toggle("d-none");
  } else {
    Swal.fire("something went wrong");
  }
};

recoveryCodeForm.onsubmit = async (e) => {
  e.preventDefault();
  if (
    recoveryCodeForm.checkValidity() === false ||
    newPassword.value !== newPasswordCopy.value
  ) {
    if (newPassword.value !== newPasswordCopy.value) {
      Swal.fire("Passwords do not match");
    }
    recoveryCodeForm.classList.add("was-validated");
  } else {
    const response = await fetch("/api/passwords/reset", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        recoveryCode: recoveryCode.value,
        email: email.value,
        newPassword: newPassword.value,
      }),
      redirect: "follow",
    });

    if (response.status === 200) {
      Swal.fire("Your password has been updated")
      window.location.replace("/users/login");
    } else {
      Swal.fire("Ops something went wrong");
    }
  }
};
