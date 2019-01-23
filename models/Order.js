import uuid from 'uuid';
import dynamoose from '../utils/dynamoose';
const { Schema } = dynamoose;

const orderSchema = new Schema(
  {
    id: {
      type: String,
      hashKey: true,
      default: () => uuid.v4()
    },
    userName: {
      type: String,
      required: true
    },
    itemName: {
      type: String,
      required: true
    },
    price: {
        type: Integer,
        required: true
    },
    quantity: {
        type: Integer,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    }
  },
  {
    timestamps: true
  }
);

const Order = dynamoose.model('orders', orderSchema);
export default Order;