export interface SectionTitleInt {
  title: string;
  text: string;
}

export interface sectionDetailsInt {
  id: number;
  title: string;
  text: string;
  img?: string;
}

export interface OrderDetails {
  orderItems: SingleItemOrderInf[];
  subtotal: number;
  total: number;
  clientSecret: string;
}

export interface UpdateProductPayload {
  id: string;
  createNew: boolean;
}

export interface ProductListInt {
  id: number;
  name: number;
  products: ProductInterface[];
}

export interface UserInterface {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: string;
  verificationToken: string;
  isVerified: boolean;
  passwordToken: string;
  passwordTokenExpirationDate: Date;
  verified: number;
  comparePassword: (candidatePassword: string) => string;
}

export interface UserInterface {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: string;
  verificationToken: string;
  isVerified: boolean;
  passwordToken: string;
  passwordTokenExpirationDate: Date;
  verified: number;
  comparePassword: (candidatePassword: string) => string;
}

export interface UserPayload {
  name: string;
  userId: string;
  role: string;
  email?: string;
}

export interface SingleItemOrderInf {
  _id?: string;
  name: string;
  image: string;
  price: number;
  amount: number;
  product?: string;
  product_total?: number;
}

export interface ProductInterface {
  _id?: string;
  name: string;
  image: string;
  short_desc: string;
  long_description: string;
  price: number;
  stock: number;
  type: string;
  category: string;
  available: boolean;
  featured: boolean;
}

export interface OrderInterface {
  _id?: string;
  createdAt?: string;
  subtotal: number;
  total: number;
  orderItems: SingleItemOrderInf[];
  paymentIntentId: string;
  clientSecret: string;
  status: string;
  user: UserInterface;
}

export interface UserInterface {
  _id?: string;
  name: string;
  email: string;
  password: string;
  role: string;
  verificationToken: string;
  isVerified: boolean;
  passwordToken: string;
  passwordTokenExpirationDate: Date;
  verified: number;
}

export interface UserPayload {
  name: string;
  userId: string;
  role: string;
}
