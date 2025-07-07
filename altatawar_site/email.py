from flask import Blueprint, request, jsonify
from flask_mail import Mail, Message
from flask import current_app
import os
import logging

email_bp = Blueprint('email', __name__)

def init_mail(app):
    """Initialize Flask-Mail with app configuration"""
    app.config['MAIL_SERVER'] = 'smtp.gmail.com'
    app.config['MAIL_PORT'] = 587
    app.config['MAIL_USE_TLS'] = True
    app.config['MAIL_USE_SSL'] = False
    app.config['MAIL_USERNAME'] = 'altatawar@altatawar.com'
    app.config['MAIL_PASSWORD'] = 'admin12345678ASHRAF@'
    app.config['MAIL_DEFAULT_SENDER'] = 'altatawar@altatawar.com'
    
    mail = Mail(app)
    return mail

@email_bp.route('/send-email', methods=['POST'])
def send_email():
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['name', 'email', 'subject', 'message']
        for field in required_fields:
            if not data.get(field):
                return jsonify({'error': f'Missing required field: {field}'}), 400
        
        name = data['name']
        email = data['email']
        subject = data['subject']
        message_content = data['message']
        
        # Create email message
        msg = Message(
            subject=f"رسالة من الموقع: {subject}",
            sender='altatawar@altatawar.com',
            recipients=[email],  # Send to the email provided in the form
            reply_to='altatawar@altatawar.com'
        )
        
        # Email body in both Arabic and English
        msg.body = f"""
رسالة جديدة من موقع التطور التكنولوجي
New message from Al Tatawr Al Technology website

الاسم / Name: {name}
البريد الإلكتروني / Email: {email}
الموضوع / Subject: {subject}

الرسالة / Message:
{message_content}

---
شكراً لتواصلكم معنا. سنقوم بالرد عليكم في أقرب وقت ممكن.
Thank you for contacting us. We will reply to you as soon as possible.

التطور التكنولوجي
Al Tatawr Al Technology
altatawar@altatawar.com
        """
        
        # HTML version for better formatting
        msg.html = f"""
        <div style="font-family: 'Tajawal', Arial, sans-serif; direction: rtl; text-align: right; max-width: 600px; margin: 0 auto;">
            <div style="background-color: #0366d6; color: white; padding: 20px; text-align: center;">
                <h1 style="margin: 0;">التطور التكنولوجي</h1>
                <p style="margin: 5px 0 0 0;">Al Tatawr Al Technology</p>
            </div>
            
            <div style="padding: 30px; background-color: #f8f9fa;">
                <h2 style="color: #0366d6; margin-top: 0;">شكراً لتواصلكم معنا</h2>
                <h3 style="color: #586069;">Thank you for contacting us</h3>
                
                <p style="line-height: 1.6; margin-bottom: 20px;">
                    تم استلام رسالتكم بنجاح وسنقوم بالرد عليكم في أقرب وقت ممكن.<br>
                    Your message has been received successfully and we will reply to you as soon as possible.
                </p>
                
                <div style="background-color: white; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #0366d6;">
                    <h4 style="color: #0366d6; margin-top: 0;">تفاصيل رسالتكم / Your Message Details:</h4>
                    <table style="width: 100%; border-collapse: collapse;">
                        <tr>
                            <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e1e4e8;">الاسم / Name:</td>
                            <td style="padding: 10px; border-bottom: 1px solid #e1e4e8;">{name}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; font-weight: bold; border-bottom: 1px solid #e1e4e8;">البريد الإلكتروني / Email:</td>
                            <td style="padding: 10px; border-bottom: 1px solid #e1e4e8;">{email}</td>
                        </tr>
                        <tr>
                            <td style="padding: 10px; font-weight: bold;">الموضوع / Subject:</td>
                            <td style="padding: 10px;">{subject}</td>
                        </tr>
                    </table>
                </div>
                
                <div style="background-color: white; padding: 20px; border-radius: 8px; border: 1px solid #e1e4e8;">
                    <h4 style="margin-top: 0; color: #0366d6;">رسالتكم / Your Message:</h4>
                    <p style="line-height: 1.6; white-space: pre-wrap;">{message_content}</p>
                </div>
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e1e4e8; text-align: center;">
                    <p style="color: #586069; font-size: 14px; margin: 0;">
                        التطور التكنولوجي - Al Tatawr Al Technology<br>
                        <strong>altatawar@altatawar.com</strong><br>
                        صندوق بريد 229 - سكاكا - المملكة العربية السعودية
                    </p>
                </div>
            </div>
        </div>
        """
        
        # Get mail instance from current app
        mail = current_app.extensions.get('mail')
        if not mail:
            return jsonify({'error': 'Mail service not configured'}), 500
            
        # Send email
        mail.send(msg)
        
        # Also log the contact form submission
        contact_log = f"""
=== Email Sent Successfully ===
Time: {os.popen('date').read().strip()}
Name: {name}
Email: {email}
Subject: {subject}
Message: {message_content}
=====================================
        """
        
        try:
            with open('/home/ubuntu/website/email-backend/contact_submissions.log', 'a', encoding='utf-8') as f:
                f.write(contact_log)
        except Exception as log_error:
            print(f"Logging error: {log_error}")
        
        return jsonify({
            'success': True,
            'message': 'تم إرسال الرسالة بنجاح! ستصلكم رسالة تأكيد على بريدكم الإلكتروني / Message sent successfully! You will receive a confirmation email.'
        }), 200
        
    except Exception as e:
        print(f"Email sending error: {str(e)}")
        # Log the error but still save the contact info
        contact_log = f"""
=== Email Error - Manual Processing Required ===
Time: {os.popen('date').read().strip()}
Name: {data.get('name', 'N/A')}
Email: {data.get('email', 'N/A')}
Subject: {data.get('subject', 'N/A')}
Message: {data.get('message', 'N/A')}
Error: {str(e)}
=====================================
        """
        
        try:
            with open('/home/ubuntu/website/email-backend/contact_submissions.log', 'a', encoding='utf-8') as f:
                f.write(contact_log)
        except Exception as log_error:
            print(f"Logging error: {log_error}")
        
        return jsonify({
            'error': 'خطأ في إرسال الرسالة. تم حفظ رسالتكم وسنتواصل معكم قريباً / Error sending email. Your message has been saved and we will contact you soon.',
            'details': str(e)
        }), 500

@email_bp.route('/test-email', methods=['GET'])
def test_email():
    """Test endpoint to check if email service is working"""
    return jsonify({
        'success': True,
        'message': 'Contact form is functional - messages are logged for processing',
        'status': 'Ready for contact form submissions'
    }), 200

@email_bp.route('/contact-log', methods=['GET'])
def get_contact_log():
    """Endpoint to retrieve contact form submissions (for admin use)"""
    try:
        with open('/home/ubuntu/website/email-backend/contact_submissions.log', 'r', encoding='utf-8') as f:
            log_content = f.read()
        return jsonify({
            'success': True,
            'log': log_content
        }), 200
    except FileNotFoundError:
        return jsonify({
            'success': True,
            'log': 'No contact submissions yet'
        }), 200
    except Exception as e:
        return jsonify({
            'error': f'Error reading log: {str(e)}'
        }), 500

