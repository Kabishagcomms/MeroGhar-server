import { mailBody } from "../interfaces/mail"
import { ContactFormData } from "../interfaces/contactForm"
import * as dotenv from "dotenv"
dotenv.config()


//create function which takes basic information and returns mail template 
export const signupMailTemplate = (userId: string, userEmail: string): mailBody => {
    return {
        to: userEmail,
        from: "meroghar@zohomail.com",
        subject: "Welcome to MeroGhar!",
        text: "",
        html: `<html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    font-size: 16px;
                    line-height: 1.5;
                    background-color: #EAE7DD;
                    margin: 0;
                    padding: 20px;
                }

                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    border-radius: 8px;
                    padding: 30px;
                    box-shadow: 0 2px 10px rgba(153, 119, 92, 0.1);
                }

                .logo {
                    text-align: center;
                    margin-bottom: 30px;
                }

                .logo img {
                    max-width: 150px;
                }

                h1 {
                    color: #99775C;
                    font-size: 28px;
                    margin: 0 0 20px;
                    padding-bottom: 15px;
                    border-bottom: 2px solid #EAE7DD;
                    text-align: center;
                }

                h3 {
                    color: #886a52;
                    font-size: 20px;
                    margin: 0 0 15px;
                    text-align: center;
                }

                p {
                    color: #555555;
                    font-size: 16px;
                    margin: 0 0 20px;
                    text-align: center;
                }

                .button {
                    display: inline-block;
                    background-color: #99775C;
                    color: #ffffff;
                    padding: 12px 24px;
                    border-radius: 6px;
                    text-decoration: none;
                    font-weight: bold;
                    margin-top: 20px;
                    transition: background-color 0.3s ease;
                }

                .button:hover {
                    background-color: #886a52;
                }

                .button-container {
                    text-align: center;
                    margin-top: 30px;
                }

                .welcome-message {
                    background-color: #EAE7DD;
                    border-radius: 6px;
                    padding: 20px;
                    margin: 20px 0;
                    text-align: center;
                }

                .footer {
                    margin-top: 30px;
                    text-align: center;
                    font-size: 14px;
                    color: #886a52;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="logo">
                    <!-- Add your logo here -->
                    <h1>MeroGhar</h1>
                </div>
                
                <div class="welcome-message">
                    <h1>Welcome to MeroGhar 👋</h1>
                    <h3>Hello ${userEmail}!</h3>
                </div>

                <p>We're excited to have you join our community of property renters and hosts. Your journey to finding the perfect home or hosting your property begins here.</p>

                <div class="button-container">
                    <p>To get started, please complete your KYC verification:</p>
                    <a href="http://localhost:3000/" class="button">Complete KYC Form</a>
                </div>

                <div class="footer">
                    <p>If you have any questions, feel free to contact our support team.</p>
                    <p>© ${new Date().getFullYear()} MeroGhar. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>`
    }
}


export const postEmailTemplate=(userEmail:string,token:string,):mailBody=>{
    return {
        to:userEmail,
        from:"meroghar@zohomail.com",
        subject:"Verify Email Request",
        text:"",
        html:` <p>Verify Email by Clicking the link Given below.....</p>
        <a href="http://localhost:2900/user/v1/verifyEmail/${token}" >verify Email</a>
         `
    }
}


export const forgotPasswordTemplate = (userEmail: string, token: string): mailBody => {
    return {
        to: userEmail,
        from: "meroghar@zohomail.com",
        subject: "Reset Your Password - MeroGhar",
        text: "",
        html: `<html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    font-size: 16px;
                    line-height: 1.5;
                    background-color: #EAE7DD;
                    margin: 0;
                    padding: 20px;
                }

                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    border-radius: 8px;
                    padding: 30px;
                    box-shadow: 0 2px 10px rgba(153, 119, 92, 0.1);
                }

                .logo {
                    text-align: center;
                    margin-bottom: 30px;
                }

                h1 {
                    color: #99775C;
                    font-size: 28px;
                    margin: 0 0 20px;
                    padding-bottom: 15px;
                    border-bottom: 2px solid #EAE7DD;
                    text-align: center;
                }

                .alert-box {
                    background-color: #EAE7DD;
                    border-radius: 6px;
                    padding: 20px;
                    margin: 20px 0;
                    text-align: center;
                    border-left: 4px solid #99775C;
                }

                p {
                    color: #555555;
                    font-size: 16px;
                    margin: 0 0 20px;
                    text-align: center;
                }

                .button {
                    display: inline-block;
                    background-color: #99775C;
                    color: #ffffff;
                    padding: 12px 24px;
                    border-radius: 6px;
                    text-decoration: none;
                    font-weight: bold;
                    margin-top: 20px;
                    transition: background-color 0.3s ease;
                }

                .button:hover {
                    background-color: #886a52;
                }

                .button-container {
                    text-align: center;
                    margin-top: 30px;
                }

                .footer {
                    margin-top: 30px;
                    text-align: center;
                    font-size: 14px;
                    color: #886a52;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="logo">
                    <h1>MeroGhar</h1>
                </div>
                
                <div class="alert-box">
                    <h1>Password Reset Request</h1>
                    <p>We received a request to reset your password.</p>
                </div>

                <p>Click the button below to reset your password. If you didn't request this, you can safely ignore this email.</p>

                <div class="button-container">
                    <a href="http://localhost:2900/auth/v1/forgotPasswordPatch/${token}" class="button">Reset Password</a>
                </div>

                <div class="footer">
                    <p>This link will expire in 10 hours for security reasons.</p>
                    <p>© ${new Date().getFullYear()} MeroGhar. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>`
    }
}

export const forgotPasswordPatchTemplate = (userEmail: string, password: string): mailBody => {
    return {
        to: userEmail,
        from: "meroghar@zohomail.com",
        subject: "Your New Password - MeroGhar",
        text: "",
        html: `<html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    font-size: 16px;
                    line-height: 1.5;
                    background-color: #EAE7DD;
                    margin: 0;
                    padding: 20px;
                }

                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    border-radius: 8px;
                    padding: 30px;
                    box-shadow: 0 2px 10px rgba(153, 119, 92, 0.1);
                }

                .logo {
                    text-align: center;
                    margin-bottom: 30px;
                }

                h1 {
                    color: #99775C;
                    font-size: 28px;
                    margin: 0 0 20px;
                    padding-bottom: 15px;
                    border-bottom: 2px solid #EAE7DD;
                    text-align: center;
                }

                .password-box {
                    background-color: #EAE7DD;
                    border-radius: 6px;
                    padding: 20px;
                    margin: 20px 0;
                    text-align: center;
                    border: 2px dashed #99775C;
                }

                .password-text {
                    color: #99775C;
                    font-size: 24px;
                    font-weight: bold;
                    letter-spacing: 2px;
                }

                p {
                    color: #555555;
                    font-size: 16px;
                    margin: 0 0 20px;
                    text-align: center;
                }

                .button {
                    display: inline-block;
                    background-color: #99775C;
                    color: #ffffff;
                    padding: 12px 24px;
                    border-radius: 6px;
                    text-decoration: none;
                    font-weight: bold;
                    margin-top: 20px;
                    transition: background-color 0.3s ease;
                }

                .footer {
                    margin-top: 30px;
                    text-align: center;
                    font-size: 14px;
                    color: #886a52;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="logo">
                    <h1>MeroGhar</h1>
                </div>
                
                <h1>Your New Password</h1>
                
                <p>Here's your new password for MeroGhar. Please change it after logging in.</p>

                <div class="password-box">
                    <div class="password-text">${password}</div>
                </div>

                <div class="footer">
                    <p>For security reasons, please change this password immediately after logging in.</p>
                    <p>© ${new Date().getFullYear()} MeroGhar. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>`
    }
}



export const verifyEmailTemplate=(userName:string,userEmail:string):mailBody=>{
    return {
        to:userEmail,
        from:"nikantest@zohomail.com",
        subject:"Email Verification",
        text:"",
        html:`<h1> Email has been Sucessfully Verified  👋 ${userName}</h1>
        <h3>We are excited to have You with us in your Journey of renting and Renting out property </h3>
        <p>if u have not Verified Yourself by filling kyc form here it is ... </P>
        <br>
        <a href="http://localhost:3000/user/v1/kycVerification">Kyc Form </a>
         `
    }
}


export const verifyKycTemplate=(userName:string,userEmail:string,state:boolean,message?:string):mailBody=>{
    return {
        to:userEmail,
        from:"nikantest@zohomail.com",
        subject:"Kyc Verification",
        text:"",
        html:state?`<h1> Kyc Successfully Verified 👋 ${userName}</h1>
        <h3>We are excited to have You with us in your Journey of renting and Renting out property </h3>
        <a href="http://localhost:3000/Home">Rent With Us</a>
         `:

        `<h1> Kyc Verification Failed  ${userName}</h1>
        <h3>Please Provide Proper kycinformation!!</h3>
        <h2>${message}</h2>
        <a href="http://localhost:3000/Home">Rent With Us</a>
         `
    }
}


export const banUnbanUserTemplate=(userName:string,userEmail:string,state:boolean,message?:string):mailBody=>{
    return {
        to:userEmail,
        from:"nikantest@zohomail.com",
        subject:"Ban Activity",
        text:"",
        html:state?`<h1> U Have Been Banned</h1>
        <h3>due to some reasons such as  ${message} u have been banned ur properties posting has also been banned </h3>
        
         `:

        `<h1> U Have Been unBanned</h1>
        <h3>Hope U dont do the same mistakes again </h3>
         `
    }
}

export const banUnbanPropTemplate=(userName:string,userEmail:string,state:boolean,propId:string,img?:string,message?:string):mailBody=>{
    return {
        to:userEmail,
        from:"nikantest@zohomail.com",
        subject:"Ban Activity",
        text:"",
        html:state?`<h1> Your Property Has been banned ${userName}</h1>
        <h2>${propId}</h2>
        <img src=${img} />
        <h3>due to misconduct${message} can only be unbanned by admin </h3>
      
         `:

         `<h1> Your Property Has been unbanned ${userName}</h1>
         <h2>${propId}</h2>
         <img src=${img} />
         <h3>do not repeat the same mistakes again </h3>
          `
    }
}









export const userPropTemplate=(userName:string,userEmail:string,state:boolean,propId:string,img?:string):mailBody=>{
    return {
        to:userEmail,
        from:"nikantest@zohomail.com",
        subject:"Property Post/Delete Verification",
        text:"",
        html:state?`<h1> property Posted/updated Successfully! 👋 ${userName}</h1>
        <h2>${propId}</h2>
        <img src=${img} />
        <h3>Property Has been Posted/updated and send for further Verification/ you will be notified after it has been verified </h3>
      
         `:

         `<h1> property deleted Successfully! 👋 ${userName}</h1>
         <h2>${propId}</h2>
         <h3>Property Has been deleted thankYour for providing service</h3>
         <a href="http://localhost:3000/Home">Rent With Us</a>
          `
    }
}



export const adminPropTemplate=(userName:string,userEmail:string,state:boolean,propId:string,img?:string,message?:string):mailBody=>{
    return {
        to:userEmail,
        from:"nikantest@zohomail.com",
        subject:"property Verification",
        text:"",
        html:state?`<h1> property Verified Successfully! 👋 ${userName}</h1>
        <h2>${propId}</h2>
        <img src=${img} />
        <h3>Property Has been verified now u can host property </h3>
      
         `:

         `<h1> property not Verified/Rejected ${userName}</h1>
         <h2>${propId}</h2>
         <img src=${img} />
         <h3>${message}</h3>
         <a href="http://localhost:3000/Home/listProperty">Rent With Us</a>
          `
    }
}

export const userBookingTemplate=(userName:string,userEmail:string,propId:string,bill:string,state:boolean,img?:string):mailBody=>{
    return {
        to:userEmail,
        from:"nikantest@zohomail.com",
        subject:"Property Hosted/booked",
        text:"",
        attachments: [
            {
              filename: 'bill.pdf',
              content: bill.split('base64,')[1], // Extract the base64-encoded PDF data
              encoding: 'base64'
            }
          ],
          html:state?`<h1> property Booked  Successfully!</h1>
          <h2>${propId}</h2>
          <img src="${img}" width="500" height="300" />

          <h3>Property Has been verified and Booked Your Bill is attched  </h3>
          <h4>Enjoy Your Stay!!! </h4>
      
       
      
         `:

         `<h1> property Booked  Successfully! by ${userName}</h1>
         <h2>'property Title:' ${propId}</h2>
         <img src=${img} />
         <h3>user Has been verified and Booked Your Bill is attched  </h3>
         <h4>Enjoy Hosting !!! </h4>
     
          `

    }
}


export const subscriptionTemplate = (firstName: string, email: string): mailBody => {
    return {
        to: email,
        from: "meroghar@zohomail.com",
        subject: "Welcome to MeroGhar Community!",
        text: "",
        html: `<html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    font-size: 16px;
                    line-height: 1.5;
                    background-color: #EAE7DD;
                    margin: 0;
                    padding: 20px;
                }

                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    border-radius: 8px;
                    padding: 30px;
                    box-shadow: 0 2px 10px rgba(153, 119, 92, 0.1);
                }

                .logo {
                    text-align: center;
                    margin-bottom: 30px;
                }

                h1 {
                    color: #99775C;
                    font-size: 28px;
                    margin: 0 0 20px;
                    padding-bottom: 15px;
                    border-bottom: 2px solid #EAE7DD;
                    text-align: center;
                }

                .welcome-box {
                    background-color: #EAE7DD;
                    border-radius: 6px;
                    padding: 20px;
                    margin: 20px 0;
                    text-align: center;
                }

                p {
                    color: #555555;
                    font-size: 16px;
                    margin: 0 0 15px;
                    text-align: center;
                }

                .benefits {
                    margin: 20px 0;
                    padding: 0;
                    list-style: none;
                }

                .benefits li {
                    color: #99775C;
                    margin: 10px 0;
                    padding-left: 24px;
                    position: relative;
                }

                .benefits li:before {
                    content: "✓";
                    position: absolute;
                    left: 0;
                    color: #99775C;
                }

                .footer {
                    margin-top: 30px;
                    text-align: center;
                    font-size: 14px;
                    color: #886a52;
                    border-top: 2px solid #EAE7DD;
                    padding-top: 20px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="logo">
                    <h1>MeroGhar</h1>
                </div>
                
                <div class="welcome-box">
                    <h1>Welcome to Our Community, ${firstName}! 🏠</h1>
                </div>

                <p>Thank you for subscribing to the MeroGhar community! We're excited to have you join us.</p>

                <div class="benefits">
                    <p>As a subscriber, you'll receive:</p>
                    <ul class="benefits">
                        <li>Early access to new property listings</li>
                        <li>Exclusive deals and discounts</li>
                        <li>Monthly newsletter with real estate insights</li>
                        <li>Special offers from our premium hosts</li>
                        <li>Community updates and events</li>
                    </ul>
                </div>

                <div class="footer">
                    <p>Stay tuned for amazing deals and updates!</p>
                    <p>© ${new Date().getFullYear()} MeroGhar. All rights reserved.</p>
                </div>
            </div>
        </body>
        </html>`
    }
}

export const contactFormTemplate = (formData: ContactFormData): mailBody => {
  return {
    to: "meroghar@zohomail.com",
    from: "meroghar@zohomail.com",
    subject: `Contact Form: ${formData.subject}`,
    text: "",
    html: `<html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            font-size: 16px;
            line-height: 1.5;
            background-color: #f5f5f5;
            padding: 20px;
          }
          
          .container {
            background-color: #fff;
            border-radius: 5px;
            padding: 20px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          }
          
          h1 {
            color: #4CAF50;
            font-size: 24px;
            margin-top: 0;
            border-bottom: 1px solid #eee;
            padding-bottom: 10px;
          }
          
          .field {
            margin-bottom: 15px;
          }
          
          .field-name {
            font-weight: bold;
            color: #555;
          }
          
          .field-value {
            color: #333;
          }
          
          .message {
            background-color: #f9f9f9;
            padding: 15px;
            border-radius: 5px;
            border-left: 4px solid #4CAF50;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>New Contact Form Submission</h1>
          
          <div class="field">
            <div class="field-name">Name:</div>
            <div class="field-value">${formData.firstName} ${formData.lastName}</div>
          </div>
          
          <div class="field">
            <div class="field-name">Email:</div>
            <div class="field-value">${formData.email}</div>
          </div>
          
          ${formData.phoneNumber ? `
          <div class="field">
            <div class="field-name">Phone Number:</div>
            <div class="field-value">${formData.phoneNumber}</div>
          </div>
          ` : ''}
          
          <div class="field">
            <div class="field-name">Subject:</div>
            <div class="field-value">${formData.subject}</div>
          </div>
          
          <div class="field">
            <div class="field-name">Message:</div>
            <div class="field-value message">${formData.message.replace(/\n/g, '<br>')}</div>
          </div>
        </div>
      </body>
    </html>`
  }
}
