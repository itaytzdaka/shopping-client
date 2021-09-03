import { ProductModel } from './product.model';
import { CartModel } from './cart.model';


export class CartItemModel {
    public constructor(
        public _id?: string,
        public productId?: string,
        public cartId?: string,
        public amount?: number,
        public totalPrice?: number,
        public product?: ProductModel,
        public cart?: CartModel
    ){}
}
