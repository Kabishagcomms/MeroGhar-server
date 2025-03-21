export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber?: string;
  subject: 'Booking Inquiry' | 'Hosting Information' | 'Customer Support' | 'Feedback' | 'Other';
  message: string;
}