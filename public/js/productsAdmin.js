const showFormButton = document.querySelector(
  "#btn-show-product-creation-form"
);
const submitButton = document.querySelector("#btn-sumbit");
const cancelFormButton = document.querySelector("#btn-cancel");

const form = document.querySelector("#product-creation-form");

function toggleForm() {
  form.classList.toggle("d-none");
  showFormButton.classList.toggle("d-none");
}

showFormButton.onclick = () => {
  toggleForm();
};

cancelFormButton.onclick = () => {
  toggleForm();
};

form.onsubmit = async (e) => {
  e.preventDefault();
  if (form.checkValidity()) {
    const title = document.querySelector("#title").value;
    const category = document.querySelector("#category").value;
    const photo = document.querySelector("#photo").value;
    const stock = document.querySelector("#stock").value;
    const price = document.querySelector("#price").value;

    const data = removeEmptyStrings({
      title,
      category,
      photo,
      stock,
      price,
    });

    try {
      const response = await fetch("/api/products", {
        method: "POST",
        headers: { "content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      form.reset();
      toggleForm();
      alert("Product created !")
    } catch (error) {
      console.log(error);
    }
  }
};
