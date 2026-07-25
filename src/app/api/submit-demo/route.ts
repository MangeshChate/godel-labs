import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

interface TurnstileValidationResponse {
    success: boolean;
    challenge_ts?: string;
    hostname?: string;
    'error-codes'?: string[];
    action?: string;
    cdata?: string;
}

interface DemoFormData {
    fullName: string;
    email: string;
    company: string;
    phone?: string;
    building?: string;
    source?: string;
    turnstileToken: string;
}


async function validateTurnstile(token: string): Promise<TurnstileValidationResponse> {
    const secretKey = process.env.TURNSTILE_SECRET_KEY;

    if (!secretKey) {
        throw new Error('TURNSTILE_SECRET_KEY is not configured');
    }

    const response = await fetch(
        'https://challenges.cloudflare.com/turnstile/v0/siteverify',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                secret: secretKey,
                response: token,
            }),
        }
    );

    if (!response.ok) {
        throw new Error('Failed to validate Turnstile token');
    }

    return await response.json();
}

function generateEmailHTML(data: DemoFormData): string {
    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Demo Request</title>
    <style>
        body {
            font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
            line-height: 1.6;
            color: #000;
            max-width: 400px;
            margin: 0 auto;
            padding: 20px;
            background-color: #ffffff;
        }
        .header {
            margin-bottom: 30px;
        }
        .header h1 {
            margin: 0 0 15px 0;
            font-size: 22px;
            font-weight: 900;
            color: #000;
            letter-spacing: -0.025em;
        }
        .logo {
            display: block;
            height: 40px;
            width: auto;
            margin-top: 12px;
        }
        .field {
            margin-bottom: 18px;
            padding: 14px;
            background-color: #ffffff;
            border: 2px solid #000;
        }
        .field-label {
            font-size: 10px;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: #000;
            margin-bottom: 6px;
            display: block;
        }
        .field-value {
            font-size: 15px;
            font-weight: 600;
            color: #000;
            word-wrap: break-word;
            line-height: 1.4;
        }
        .field-value a {
            color: #7C3AED;
            text-decoration: none;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #000;
            font-size: 13px;
            color: #000;
        }
        .footer p {
            margin: 0 0 10px 0;
        }
        .timestamp {
            font-size: 11px;
            color: #666;
            font-family: ui-monospace, monospace;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>New Demo Request</h1>
    </div>
    
    <div class="field">
        <div class="field-label">Full Name</div>
        <div class="field-value">${data.fullName}</div>
    </div>
    
    <div class="field">
        <div class="field-label">Email Address</div>
        <div class="field-value"><a href="mailto:${data.email}">${data.email}</a></div>
    </div>
    
    ${data.company ? `
    <div class="field">
        <div class="field-label">Company / Organization</div>
        <div class="field-value">${data.company}</div>
    </div>
    ` : ''}
    
    ${data.phone ? `
    <div class="field">
        <div class="field-label">Phone Number</div>
        <div class="field-value"><a href="tel:${data.phone}">${data.phone}</a></div>
    </div>
    ` : ''}
    
    ${data.building ? `
    <div class="field">
        <div class="field-label">What are they building?</div>
        <div class="field-value">${data.building.replace(/\n/g, '<br>')}</div>
    </div>
    ` : ''}
    
    ${data.source ? `
    <div class="field">
        <div class="field-label">How did they hear about us?</div>
        <div class="field-value">${data.source}</div>
    </div>
    ` : ''}
    
    <div class="footer">
        <p><strong>Follow up within 24 hours</strong></p>
        <p class="timestamp">${new Date().toLocaleString('en-US', {
        dateStyle: 'full',
        timeStyle: 'short',
        timeZone: 'UTC'
    })}</p>
    </div>
</body>
</html>
    `.trim();
}

async function sendNotificationEmail(data: DemoFormData): Promise<void> {
    const salesEmail = process.env.SALES_EMAIL || 'sales@godel-labs.ai';

    if (!process.env.RESEND_API_KEY) {
        console.warn('RESEND_API_KEY not configured, skipping email notification');
        return;
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
        await resend.emails.send({
            from: salesEmail,
            to: salesEmail,
            subject: `New Demo Request from ${data.fullName} ${data.company ? `(${data.company})` : ''}`,
            html: generateEmailHTML(data),
        });

        console.log('Notification email sent successfully');
    } catch (error) {
        console.error('Failed to send notification email:', error);
        // Don't throw - we don't want email failure to block form submission
    }
}

export async function POST(request: NextRequest) {
    try {
        const body: DemoFormData = await request.json();

        // Validate required fields
        if (!body.fullName || !body.email || !body.company || !body.turnstileToken) {
            return NextResponse.json(
                { error: 'Missing required fields (Full Name, Email, and Company are required)' },
                { status: 400 }
            );
        }

        // Basic Email Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(body.email)) {
            return NextResponse.json(
                { error: 'Invalid email address format' },
                { status: 400 }
            );
        }

        // Basic Phone Validation (if provided)
        if (body.phone) {
            const phoneRegex = /^[+]?[0-9\s\-()]{7,20}$/;
            if (!phoneRegex.test(body.phone)) {
                return NextResponse.json(
                    { error: 'Invalid phone number format' },
                    { status: 400 }
                );
            }
        }

        // Validate Turnstile token
        const validationResult = await validateTurnstile(body.turnstileToken);

        if (!validationResult.success) {
            console.error('Turnstile validation failed:', validationResult['error-codes']);
            return NextResponse.json(
                { error: 'Security verification failed. Please refresh the page and try again.' },
                { status: 400 }
            );
        }

        // Send notification email
        await sendNotificationEmail(body);

        // Here you would typically:
        // 1. Save to database
        // 2. Add to CRM
        // etc.

        console.log('Demo form submission:', {
            fullName: body.fullName,
            email: body.email,
            company: body.company,
            phone: body.phone,
            building: body.building,
            source: body.source,
            timestamp: new Date().toISOString(),
        });

        // For now, just log and return success
        return NextResponse.json(
            {
                success: true,
                message: 'Form submitted successfully'
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Error processing demo form:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
