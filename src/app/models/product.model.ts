import { CategoryModel } from './category.model';


export class ProductModel {
    public constructor(
        public _id?: string,
        public name?: string,
        public price?: number,
        public image?: string,
        public stock?: string,
        public categoryId?: string,
        public category?: CategoryModel
    ){}

}
