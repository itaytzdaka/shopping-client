import { UserModel } from '../models/user.model';
import { CartModel } from '../models/cart.model';


export class InviteModel {
    public constructor(
        public _id?: string,
        public userId?: string,
        public cartId?: string,
        public cartPrice?: number,
        public cityId?: string,
        public street?: string,
        public orderDate?: string,
        public deliveryDate?: string,
        public creditCard?: string,
        public user?: UserModel,
        public cart?: CartModel
        ){}

}
