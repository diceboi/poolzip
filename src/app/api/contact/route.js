import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const {
      formMode = 'email',
      name = '',
      email = '',
      phone = '',
      timeSlot = 'Bármikor a mai napon',
      note = '',
      width = '4.0',
      length = '8.0',
      color = 'Antracitszürke',
    } = body;

    // Validate required fields
    if (!name || !phone) {
      return NextResponse.json(
        { error: 'A név és a telefonszám megadása kötelező.' },
        { status: 400 }
      );
    }

    if (formMode === 'email' && !email) {
      return NextResponse.json(
        { error: 'Az e-mail cím megadása kötelező.' },
        { status: 400 }
      );
    }

    const isCallback = formMode === 'callback';
    const area = (parseFloat(width) * parseFloat(length)).toFixed(1);
    const dateFormatted = new Intl.DateTimeFormat('hu-HU', {
      dateStyle: 'long',
      timeStyle: 'short',
      timeZone: 'Europe/Budapest',
    }).format(new Date());

    const subject = isCallback
      ? `📞 Új Visszahívás Kérése: ${name} (${phone})`
      : `📋 Új Ajánlatkérés: ${name} (${width}m × ${length}m medence)`;

    // Attach official white logo inline (CID)
    const logoPath = path.join(process.cwd(), 'public', 'logos', 'poolzip-logo.png');
    let attachments = [];
    if (fs.existsSync(logoPath)) {
      const logoBuffer = fs.readFileSync(logoPath);
      attachments.push({
        filename: 'poolzip-logo.png',
        content: logoBuffer.toString('base64'),
        cid: 'poolzip-logo',
      });
    }

    // HTML Email Template
    const html = `
<!DOCTYPE html>
<html lang="hu">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; line-height: 1.6;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #f1f5f9; padding: 32px 16px;">
    <tr>
      <td align="center">
        <!-- Main Card -->
        <table role="presentation" width="100%" style="max-width: 600px; background-color: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 30px rgba(44, 66, 149, 0.08);">
          
          <!-- Header Banner with Official Logo -->
          <tr>
            <td style="background: linear-gradient(135deg, #1C2E6C 0%, #2C4295 100%); padding: 36px 32px; text-align: center;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <img
                      src="cid:poolzip-logo"
                      alt="POOLZIP"
                      width="180"
                      height="44"
                      style="display: block; margin: 0 auto; border: 0; outline: none; text-decoration: none; width: 180px; max-width: 100%; height: auto;"
                    />
                  </td>
                </tr>
                <tr>
                  <td align="center" style="padding-top: 18px;">
                    <span style="display: inline-block; background-color: ${isCallback ? '#F28C48' : '#D4EDFC'}; color: ${isCallback ? '#ffffff' : '#2C4295'}; padding: 6px 18px; border-radius: 9999px; font-size: 12px; font-weight: 700; text-transform: uppercase; letter-spacing: 1px;">
                      ${isCallback ? '📞 Visszahívás Kérése' : '✉️ Ajánlatkérés'}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Content Body -->
          <tr>
            <td style="padding: 32px;">
              <p style="font-size: 16px; margin: 0 0 24px 0; color: #334155;">
                Új megkeresés érkezett a <strong>poolzip.hu</strong> weboldal 3D konfigurátorából:
              </p>

              <!-- Client Info Table -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #F8FAFC; border-radius: 14px; padding: 20px; margin-bottom: 24px; border: 1px solid #E2E8F0;">
                <tr>
                  <td colspan="2" style="font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #2C4295; padding-bottom: 12px; border-bottom: 1px solid #E2E8F0;">
                    Ügyfél Adatai
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-size: 14px; color: #64748b; width: 40%;">Név:</td>
                  <td style="padding: 10px 0; font-size: 15px; font-weight: 700; color: #0f172a;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-size: 14px; color: #64748b; border-top: 1px solid #f1f5f9;">Telefonszám:</td>
                  <td style="padding: 10px 0; font-size: 15px; font-weight: 700; color: #2C4295; border-top: 1px solid #f1f5f9;">
                    <a href="tel:${phone}" style="color: #2C4295; text-decoration: none;">${phone}</a>
                  </td>
                </tr>
                ${email ? `
                <tr>
                  <td style="padding: 10px 0; font-size: 14px; color: #64748b; border-top: 1px solid #f1f5f9;">E-mail cím:</td>
                  <td style="padding: 10px 0; font-size: 15px; font-weight: 600; color: #0f172a; border-top: 1px solid #f1f5f9;">
                    <a href="mailto:${email}" style="color: #2C4295; text-decoration: none;">${email}</a>
                  </td>
                </tr>` : ''}
                ${isCallback ? `
                <tr>
                  <td style="padding: 10px 0; font-size: 14px; color: #64748b; border-top: 1px solid #f1f5f9;">Preferált idősáv:</td>
                  <td style="padding: 10px 0; font-size: 14px; font-weight: 600; color: #F28C48; border-top: 1px solid #f1f5f9;">${timeSlot}</td>
                </tr>` : ''}
              </table>

              <!-- 3D Config Summary Table (Only Important Data for Colleagues) -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #F8FAFC; border-radius: 14px; padding: 20px; margin-bottom: 24px; border: 1px solid #E2E8F0;">
                <tr>
                  <td colspan="2" style="font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #2C4295; padding-bottom: 12px; border-bottom: 1px solid #E2E8F0;">
                    3D Konfigurált Medenceméretek
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-size: 14px; color: #64748b; width: 40%;">Szélesség:</td>
                  <td style="padding: 10px 0; font-size: 15px; font-weight: 700; color: #0f172a;">${width} méter</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-size: 14px; color: #64748b; border-top: 1px solid #f1f5f9;">Hosszúság:</td>
                  <td style="padding: 10px 0; font-size: 15px; font-weight: 700; color: #0f172a; border-top: 1px solid #f1f5f9;">${length} méter</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-size: 14px; color: #64748b; border-top: 1px solid #f1f5f9;">Vízfelület:</td>
                  <td style="padding: 10px 0; font-size: 15px; font-weight: 700; color: #2C4295; border-top: 1px solid #f1f5f9;">~${area} m²</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-size: 14px; color: #64748b; border-top: 1px solid #f1f5f9;">Választott szín:</td>
                  <td style="padding: 10px 0; font-size: 15px; font-weight: 600; color: #0f172a; border-top: 1px solid #f1f5f9;">
                    ${color}
                  </td>
                </tr>
              </table>

              ${note ? `
              <!-- Client Note -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color: #FEF7EE; border-radius: 14px; padding: 20px; margin-bottom: 24px; border: 1px solid #FDE4C8;">
                <tr>
                  <td style="font-size: 12px; font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: #F28C48; padding-bottom: 8px;">
                    Ügyfél Megjegyzése
                  </td>
                </tr>
                <tr>
                  <td style="font-size: 14px; color: #334155; line-height: 1.6; white-space: pre-wrap;">${note}</td>
                </tr>
              </table>` : ''}

              <!-- Quick Action Call/Reply Buttons -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top: 28px;">
                <tr>
                  <td align="center">
                    <table role="presentation" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="border-radius: 12px; background-color: #F28C48; text-align: center; padding: 0 8px;">
                          <a href="tel:${phone}" style="background-color: #F28C48; border: 1px solid #F28C48; border-radius: 12px; color: #ffffff; display: inline-block; font-size: 14px; font-weight: 700; padding: 12px 24px; text-decoration: none; letter-spacing: 0.5px;">
                            📞 Ügyfél Hívása
                          </a>
                        </td>
                        ${email ? `
                        <td style="border-radius: 12px; background-color: #2C4295; text-align: center; padding: 0 8px;">
                          <a href="mailto:${email}?subject=Re:%20Poolzip%20medencefed%C3%A9s%20aj%C3%A1nlatk%C3%A9r%C3%A9s" style="background-color: #2C4295; border: 1px solid #2C4295; border-radius: 12px; color: #ffffff; display: inline-block; font-size: 14px; font-weight: 700; padding: 12px 24px; text-decoration: none; letter-spacing: 0.5px;">
                            ✉️ Válasz E-mailben
                          </a>
                        </td>` : ''}
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #F8FAFC; border-top: 1px solid #E2E8F0; padding: 20px 32px; text-align: center; font-size: 12px; color: #94a3b8;">
              <p style="margin: 0 0 6px 0;">
                Ez az értesítés automatikusan érkezett a <a href="https://poolzip.hu" style="color: #2C4295; text-decoration: none; font-weight: 600;">poolzip.hu</a> weboldalról.
              </p>
              <p style="margin: 0; color: #cbd5e1;">
                Időbélyeg: ${dateFormatted}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    // Send via Resend
    const data = await resend.emails.send({
      from: 'Poolzip Weboldal <noreply@poolzip.hu>',
      to: ['info@poolzip.hu'],
      reply_to: email || undefined,
      subject,
      html,
      attachments: attachments.length > 0 ? attachments : undefined,
    });

    if (data.error) {
      console.error('Resend API Error:', data.error);
      return NextResponse.json(
        { error: data.error.message || 'Hiba történt az e-mail küldésekor.' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data.data?.id });
  } catch (error) {
    console.error('Server error in /api/contact:', error);
    return NextResponse.json(
      { error: 'Belső szerverhiba történt. Kérjük próbálja meg később.' },
      { status: 500 }
    );
  }
}
