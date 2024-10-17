const form = document.querySelector("#register-form");

form.onsubmit = async (e) => {
  e.preventDefault();
  const email = document.querySelector("#email");
  const password = document.querySelector("#password");
  const passwordCopy = document.querySelector("#password-copy");

  if (form.checkValidity() === false || password.value !== passwordCopy.value) {
    if (password.value !== passwordCopy.value) {
      Swal.fire("Passwords do not match");
    }
    form.classList.add("was-validated");
  } else {
    data = { email:email.value, password:password.value };
    const response = await fetch("/api/users", {
      method: "post",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status === 201) {
      Swal.fire("Registration Successfull").then(() => {
        location.replace("/users/login");
      });
    }else{
      Swal.fire("Something went wrong")
    }
  }
};
