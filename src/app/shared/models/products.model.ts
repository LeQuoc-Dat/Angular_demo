export interface Meta{
  createdAt: string,
  updatedAt: string,
  barcode: string,
  qrCode: string
}

 export interface Review{
  rating: number,
  comment: string,
  date:string,
  reviewerName: string,
  reviewerEmail: string
}

export interface Product{
  id: number,
  title: string,
  description: string,
  category: string,
  price: number,
  discountPercentage: number,
  rating: number,
  stock: number,
  tags:string [],
  images: string[],
  reviews: Review[],
  meta: Meta
  minimumOrderQuantity: number,
  thumbnail: string,
  availabilityStatus: string,
}