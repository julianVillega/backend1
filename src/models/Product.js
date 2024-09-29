export class Product {
  constructor(
    id,
    title,
    price,
    stock,
    category,
    photo,
  ) {
    this.id = id;
    this.category = category;
    this.photo = photo;
    this.title = title;
    this.price = price;
    this.stock = stock;
  }
}