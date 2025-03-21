import { Request, Response } from "express";
import { 
  getNotificationsS, 
  markNotificationAsReadS 
} from "../../services/notification/notification.service";

export const getNotificationsC = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    const notifications = await getNotificationsS(req.userData.docId, page, limit);
    
    return res.status(200).json({
      success: true,
      notifications
    });
  } catch (e: any) {
    return res.status(500).json({
      success: false,
      message: e.message
    });
  }
};

export const markNotificationAsReadC = async (req: Request, res: Response) => {
  try {
    const { notificationId } = req.params;
    
    const marked = await markNotificationAsReadS(notificationId);
    
    if (marked) {
      return res.status(200).json({
        success: true,
        message: "Notification marked as read"
      });
    }

    return res.status(404).json({
      success: false,
      message: "Notification not found"
    });
  } catch (e: any) {
    return res.status(500).json({
      success: false,
      message: e.message
    });
  }
};