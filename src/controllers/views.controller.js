import cartsService from "../services/carts.service.js";
import productsService from "../services/products.service.js";
import usersService from "../services/users.service.js";

class ViewsController {
  constructor() {
    this.showCart = this.showCart.bind(this);
    this.showHome = this.showHome.bind(this);
    this.showProductDetail = this.showProductDetail.bind(this);
    this.showProductsAdminPanel = this.showProductsAdminPanel.bind(this);
    this.showUser = this.showUser.bind(this);
    this.showLogin = this.showLogin.bind(this);
    this.showRegister = this.showRegister.bind(this);
    this.showVerify = this.showVerify.bind(this);
  }
  async showCart(req, res, next) {
    const { id } = req.params;
    const cart = await cartsService.read(id);
    return res.render("cart.handlebars", { cart });
  }

  async showHome(req, res, next) {
    const { category, limit, page } = req.query;
    const productsAndLinks = await productsService.showHome(
      category,
      limit,
      page
    );
    return res.render("home.handlebars", productsAndLinks);
  }

  async showProductDetail(req, res, next) {
    const { pid } = req.params;
    const product = await productsService.showProductDetail(pid);
    return res.render("productDetail.handlebars", { product });
  }

  async showProductsAdminPanel(req, res, next) {
    const { category, limit, page } = req.query;
    const { userId } = req.params;
    console.log(req.user);
    const productsAndLinks = await productsService.showProductsAdminPanel(
      category,
      limit,
      page,
      userId
    );

    return res.render("productsAdmin.handlebars", productsAndLinks);
  }

  async showUser(req, res, next) {
    const { userId } = req.params;
    const user = await usersService.read(userId);
    res.render("userProfile.handlebars", { user });
  }

  showLogin(req, res, next) {
    res.render("login.handlebars", {});
  }

  showRegister(req, res, next) {
    res.render("register");
  }
  showVerify(req, res, next) {
    const { id } = req.params;
    res.status(302).render("verifyAccount", { id });
  }

  showPasswordRecovery(req, res, next) {
    return res.status(200).render("passwordRecovery.handlebars");
  }
}

export default new ViewsController();
