const loginForm = document.querySelector("#login__form");
const email = document.querySelector("#email");
const password = document.querySelector("#password");

loginForm.onsubmit = async (e) => {
  e.preventDefault();

  if (loginForm.checkValidity) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({ email: email.value, password: password.value }),
    });
    if (response.status === 200) {
      const json = await response.json();
      const userId = json.response;
      window.location.replace(`/users/${userId}`);
    } else {
      Swal.fire("invalid email or password");
    }
  }
};
