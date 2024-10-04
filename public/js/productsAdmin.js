// import { Swal } from "sweetalert2";
// product creation
//capturing buttons
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

// new product form submition
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
      alert("Product created !");
    } catch (error) {
      console.log(error);
    }
  }
};

//product update
const updateButtons = document.querySelectorAll(".btn-update");
for (const btn of updateButtons) {
  btn.onclick = async () => {
    // capture the modal.
    const myModal = new bootstrap.Modal(
      document.getElementById("updateModal"),
      {}
    );

    // get the product data from the api.
    const response = await fetch(`/api/products/${btn.dataset.productId}`);
    const json = await response.json();
    const product = json.response;

    // hidrate the modal
    const updatedTitle = document.querySelector("#updated-title");
    const updatedCategory = document.querySelector("#updated-category");
    const updatedPrice = document.querySelector("#updated-price");
    const updatedStock = document.querySelector("#updated-stock");
    const updatedPhoto = document.querySelector("#updated-photo");

    // Hydrate the modal fields
    updatedTitle.value = product.title;
    updatedCategory.value = product.category;
    updatedPrice.value = product.price;
    updatedStock.value = product.stock;
    updatedPhoto.value = product.photo;

    // form submition
    const updateForm = document.querySelector("#product-update-form");
    updateForm.onsubmit = async (e) => {
      e.preventDefault();
      if (updateForm.checkValidity()) {
        // get the updated values from the form
        const title = updatedTitle.value;
        const category = updatedCategory.value;
        const price = updatedPrice.value;
        const stock = updatedStock.value;
        const photo = updatedPhoto.value;

        const updatedData = removeEmptyStrings({
          title,
          category,
          price,
          stock,
          photo,
        });
        try {
          const response = await fetch(
            `/api/products/${btn.dataset.productId}`,
            {
              method: "PUT",
              headers: { "content-Type": "application/json" },
              body: JSON.stringify(updatedData),
            }
          );
          if (response.status != 200) {
            throw new Error("update failed");
          }
          await myModal.toggle();
          Swal.fire("Product Updated!").then(() => location.reload());
        } catch (error) {
          Swal.fire("Something went wrong").then(() => {
            updateForm.reset();
            myModal.toggle();
          });
        }
      }
    };
    const btnCancelUpdate = document.querySelector("#btn-cancel-update");
      btnCancelUpdate.onclick = () =>{
        updateForm.reset();
        myModal.toggle();
      }
    myModal.toggle();
  };
}
