export interface Product
{
  id: number,
  title: string,
  price: number,
  quantity: number,
  total: number,
  discountPercentage: number,
  discountedTotal: number,
  thumbnail: string,
}

export interface Cart
{
  id: number,
  userID: number,
  products: Product[],
  total: number,
  totalProducts: number,
  totalQuantity: number,
}