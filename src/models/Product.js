export class Product {
  constructor(
    id,
    title,
    price,
    stock,
    category = "none",
    photo = "https://random.imagecdn.app/200/200"
  ) {
    this.id = id;
    this.category = category;
    this.photo = photo;
    this.title = title;
    this.price = price;
    this.stock = stock;
  }
}