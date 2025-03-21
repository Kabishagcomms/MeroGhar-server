import { ContactFormData } from "../../interfaces/contactForm";
import { contactFormTemplate } from "../../configs/mailtemplate";
import { sendMail } from "../../utils/zohoMailer";

export const submitContactFormS = async (formData: ContactFormData): Promise<boolean> => {
  try {
    // Create email from template
    const mailOptions = contactFormTemplate(formData);
    
    // Send email
    const emailSent = await sendMail(mailOptions);
    
    if (!emailSent) {
      throw new Error("Failed to send contact form email");
    }
    
    return true;
  } catch (e) {
    console.error("Contact form submission error:", e);
    throw e;
  }
}