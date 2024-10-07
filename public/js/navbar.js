

const userId = sessionStorage.getItem("userId");
// profile nav item and link
const profileNavItem = document.querySelector("#profile-nav-item");
const profileNavLink = document.querySelector("#profile-nav-link");
// products admin nav item and link
const productsAdminNavItem = document.querySelector("#products-admin-nav-item");
const productsAdminNavLink = document.querySelector("#products-admin-nav-link");

// register nav item
const registerNavItem = document.querySelector("#register-nav-item");

// login nav item and link
const loginNavItem = document.querySelector("#login-nav-item");
// logout nav item and link
const logoutNavItem = document.querySelector("#logout-nav-item");
const btnLogout = document.querySelector("#btn-logout");

//if the user is logged in, show profile, products admin and logout navliks.
if (userId) {
  profileNavLink.setAttribute("href", `/users/${userId}`);
  profileNavItem.classList.toggle("d-none");
  
  productsAdminNavLink.setAttribute("href", `/products/admin/${userId}`);
  productsAdminNavItem.classList.toggle("d-none");
  
  logoutNavItem.classList.toggle("d-none");

  //configure logout button
  btnLogout.onclick = async (e) => {
    console.log(`/api/users/logout/${userId}`);
    const response = await fetch(`/api/users/logout/${userId}`);
    if(response.status === 200){
      sessionStorage.removeItem("userId");
      location.replace("/");
    }else{
      Swal.fire("oops something went wrong, unable to logout")
    }
  }

}else{
  //show login link
  registerNavItem.classList.toggle("d-none");
  loginNavItem.classList.toggle("d-none");
}
