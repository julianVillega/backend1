// import Swal from "sweetalert2";

const btnAdd = document.querySelector("#btn-add-to-cart");
const btnIncrease = document.querySelector("#btn-increase");
const btnDecrease = document.querySelector("#btn-decrease");
const input = document.querySelector("#input-quantity");
const productId = btnAdd.dataset.productId;

btnIncrease.onclick = () => {
  input.value = Number(input.value) + 1;
};

btnDecrease.onclick = () => {
  const decreasedValue = Number(input.value) - 1;
  input.value = decreasedValue < 1 ? 1 : decreasedValue;
};

btnAdd.onclick = async () => {
  const userId = sessionStorage.getItem("userId");
  if (userId) {
    const data = {
      user_id: userId,
      product_id: productId,
      quantity: Number(input.value),
    };
    const response = await fetch("/api/carts/", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status === 201) {
      Swal.fire("Products added to cart !").then(() => {
        window.location.replace(`/carts/${userId}`);
      });
    } else {
      Swal.fire("whoops something went wrong :(");
    }
  } else {
    Swal.fire("debes iniciar session para poder agregar al carrito");
  }
  console.log(productId);
};
