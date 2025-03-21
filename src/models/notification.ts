import { Schema, model, Types } from "mongoose";
import { INotification } from "../interfaces/dbInterface";

const notificationSchema = new Schema({
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true
    },
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ['booking', 'system', 'payment', 'review'],
      default: 'system'
    },
    isRead: {
      type: Boolean,
      default: false
    },
    relatedId: {
      type: Types.ObjectId,
      refPath: 'onModel'
    },
    onModel: {
      type: String,
      enum: ['Booking', 'Property', 'User']
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    updatedAt: {
      type: Date,
      default: Date.now
    }
  });
  
  export const notificationModel = model<INotification>('Notification', notificationSchema);