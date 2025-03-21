import { notificationModel } from "../../models/notification";
import { INotification } from "../../interfaces/dbInterface";
import { Types } from "mongoose";

export const createNotificationS = async (
  userId: string,
  message: string,
  type: 'booking' | 'system' | 'payment' | 'review',
  relatedId?: string,
  onModel?: 'Booking' | 'Property' | 'User'
): Promise<boolean> => {
  try {
    const notification = await notificationModel.create({
      userId: new Types.ObjectId(userId),
      message,
      type,
      relatedId: relatedId ? new Types.ObjectId(relatedId) : undefined,
      onModel,
      isRead: false
    });

    await notification.save();
    return true;
  } catch (e) {
    console.error("Notification creation error:", e);
    throw e;
  }
};

export const getNotificationsS = async (
  userId: string,
  page: number = 1,
  limit: number = 10
): Promise<INotification[]> => {
  try {
    const notifications = await notificationModel
      .find({ userId: new Types.ObjectId(userId) })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();

    return notifications;
  } catch (e) {
    console.error("Get notifications error:", e);
    throw e;
  }
};

export const markNotificationAsReadS = async (
  notificationId: string
): Promise<boolean> => {
  try {
    const notification = await notificationModel.findByIdAndUpdate(
      notificationId,
      { isRead: true },
      { new: true }
    );

    return !!notification;
  } catch (e) {
    console.error("Mark notification as read error:", e);
    throw e;
  }
};