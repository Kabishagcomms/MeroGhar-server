import { Request, Response } from "express";
import joi from "joi";
import { subscriptionTemplate } from "../../configs/mailtemplate";
import { sendMail } from "../../utils/zohoMailer";

export const subscribeC = async (req: Request, res: Response) => {
    try {
        // Validate subscription input
        const subscriptionSchema = joi.object({
            firstName: joi.string().required(),
            lastName: joi.string().required(),
            email: joi.string().email().required()
        });

        const { error, value } = subscriptionSchema.validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({ success: false, message: error.message });
        }

        // Send subscription email
        const mailTemplate = subscriptionTemplate(value.firstName, value.email);
        const emailSent = await sendMail(mailTemplate);

        if (emailSent) {
            return res.status(200).json({
                success: true,
                message: "Thank you for subscribing to MeroGhar community!"
            });
        }

        return res.status(500).json({
            success: false,
            message: "Failed to process your subscription. Please try again later."
        });

    } catch (e: any) {
        console.error("Subscription error:", e);
        return res.status(500).json({ success: false, message: e.message });
    }
}