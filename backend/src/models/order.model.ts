import mongoose, {Document, Schema} from 'mongoose';

export interface IOrderModel extends Document{
    items: string[],
    date: Date,
    total_price: number,
    status: string,
    customer_name: string,
    customer_email: string,
    customer_address: string,
}

const orderSchema:Schema = new Schema({
    items: {type: [String], required: true},
    date: {type: String, required: true},
    total_price: {type: Number, required: true},
    status: {type: String, required: true},
    customer_name: {type: String, required: true},
    customer_email:{type: String, required: true},
    customer_address: {type: String, required: true}
},
{timestamps: true}
)

export default mongoose.model<IOrderModel>("order", orderSchema);