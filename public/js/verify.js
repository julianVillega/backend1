const form = document.querySelector("#verify-form");
const btnVerify = document.querySelector("#btn-verify");
const userId = btnVerify.dataset.userId;

form.onsubmit = async (e) => {
  e.preventDefault();
  const verificationCode = document.querySelector("#verificationCode");

  data = { verificationCode: verificationCode.value, userId };
  const response = await fetch("/api/users/verify", {
    method: "post",
    headers: {
      "content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (response.status === 200) {
    Swal.fire("Verification Successfull").then(() => {
      location.replace("/users/login");
    });
  } else {
    Swal.fire("Something went wrong");
  }
};
