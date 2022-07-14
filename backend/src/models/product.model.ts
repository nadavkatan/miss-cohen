import mongoose, {Document, Schema} from 'mongoose';

export interface IProductModel extends Document{
    name: string;
    price: number;
    qtyInStock: number;
    onSale: boolean,
    discount: number,
    imgUrl: string;
}

const ProductSchema:Schema = new Schema({
    name: {type: String, required: true},
    price: {type: Number, required: true},
    qtyInStock: {type: Number, required: true},
    onSale: {type: Boolean, required: true},
    discount: {type: Number, required: true},
    imgUrl: {type: String, required: true}
});

export default mongoose.model<IProductModel>("product" ,ProductSchema);
 