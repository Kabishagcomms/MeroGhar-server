import { Request, Response } from "express";
import { submitContactFormS } from "../../services/contact/contact.service";
import joi from "joi";

export const submitContactFormC = async (req: Request, res: Response) => {
  try {
    // Validate the contact form input
    const contactFormSchema = joi.object({
      firstName: joi.string().required(),
      lastName: joi.string().required(),
      email: joi.string().email().required(),
      phoneNumber: joi.string().allow('').optional(),
      subject: joi.string().valid(
        'Booking Inquiry',
        'Hosting Information',
        'Customer Support',
        'Feedback',
        'Other'
      ).required(),
      message: joi.string().min(10).required()
    });

    const { error, value } = contactFormSchema.validate(req.body, { abortEarly: false });
    if (error) {
      return res.status(400).json({ success: false, message: error.message });
    }

    // Submit the contact form
    const submitted = await submitContactFormS(req.body);
    
    if (submitted) {
      return res.status(200).json({ 
        success: true, 
        message: "Your message has been sent successfully. We'll get back to you soon!" 
      });
    }
    
    return res.status(500).json({ 
      success: false, 
      message: "Failed to send your message. Please try again later." 
    });
  } catch (e: any) {
    console.error(e);
    return res.status(500).json({ success: false, message: e.message });
  }
}