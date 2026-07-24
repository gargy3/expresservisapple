import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);
const TO = process.env.CONTACT_EMAIL ?? 'info@expresservisapple.cz';

/* ─── Wizard poptávka ─────────────────────────────────────── */
interface WizardPayload {
  type: 'wizard';
  name: string;
  email: string;
  phone: string;
  model: string;
  storage: string;
  condition: string;
  batteryOk: boolean | null;
  brokenDisplay: boolean | null;
  brokenCamera: boolean | null;
  bentOrBroken: boolean | null;
  estimatedPrice: number | null; // null = poškozené, individuální nacenění
}

/* ─── Kontaktní formulář ──────────────────────────────────── */
interface ContactPayload {
  type: 'contact';
  name: string;
  email: string;
  phone?: string;
  message: string;
}

type Payload = WizardPayload | ContactPayload;

function wizardHtml(d: WizardPayload): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:6px 12px;color:#6e6e73;font-size:14px;">${label}</td>
     <td style="padding:6px 12px;font-size:14px;font-weight:600;">${value}</td></tr>`;

  const defects = [
    d.batteryOk === false && 'Baterie pod 85 %',
    d.brokenDisplay === true && 'Rozbitý displej',
    d.brokenCamera === true && 'Poškozená kamera',
    d.bentOrBroken === true && 'Ohnutý / prasklý',
  ]
    .filter(Boolean)
    .join(', ') || '–';

  const priceRow =
    d.estimatedPrice !== null
      ? row('Odhadovaná cena', `<span style="color:#ff6b2c">až ${d.estimatedPrice.toLocaleString('cs-CZ')} Kč</span>`)
      : row('Nacenění', '<span style="color:#ff6b2c">Poškozené – individuálně na provozovně</span>');

  return `
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px;margin:auto;border:1px solid #e5e5ea;border-radius:12px;overflow:hidden;">
  <div style="background:#ff6b2c;padding:24px 32px;">
    <h1 style="color:#fff;margin:0;font-size:20px;">Nová výkupní poptávka</h1>
  </div>
  <div style="padding:24px 32px;">
    <h2 style="font-size:16px;margin:0 0 12px;">Zařízení</h2>
    <table style="width:100%;border-collapse:collapse;background:#f5f5f7;border-radius:8px;overflow:hidden;">
      ${row('Model', d.model)}
      ${row('Úložiště', d.storage)}
      ${row('Stav', d.condition)}
      ${row('Defekty', defects)}
      ${priceRow}
    </table>

    <h2 style="font-size:16px;margin:20px 0 12px;">Kontakt</h2>
    <table style="width:100%;border-collapse:collapse;background:#f5f5f7;border-radius:8px;overflow:hidden;">
      ${row('Jméno', d.name)}
      ${row('E-mail', `<a href="mailto:${d.email}">${d.email}</a>`)}
      ${row('Telefon', `<a href="tel:${d.phone}">${d.phone}</a>`)}
    </table>
  </div>
</div>`;
}

function contactHtml(d: ContactPayload): string {
  return `
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:560px;margin:auto;border:1px solid #e5e5ea;border-radius:12px;overflow:hidden;">
  <div style="background:#ff6b2c;padding:24px 32px;">
    <h1 style="color:#fff;margin:0;font-size:20px;">Nová zpráva z kontaktního formuláře</h1>
  </div>
  <div style="padding:24px 32px;">
    <p style="font-size:14px;color:#1d1d1f;white-space:pre-line;">${d.message}</p>
    <hr style="border:none;border-top:1px solid #e5e5ea;margin:20px 0;">
    <p style="font-size:13px;color:#6e6e73;margin:0;">
      <strong>${d.name}</strong> · ${d.email}${d.phone ? ` · ${d.phone}` : ''}
    </p>
  </div>
</div>`;
}

export async function POST(req: NextRequest) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  // Basic validation
  if (!body.name || !body.email) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  const isWizard = body.type === 'wizard';

  const { error } = await resend.emails.send({
    // Po ověření domény na resend.com změň na: 'Expresservis Apple <noreply@expresservisapple.cz>'
    from: 'Expresservis Apple <onboarding@resend.dev>',
    to: TO,
    replyTo: body.email,
    subject: isWizard
      ? `Výkup: ${(body as WizardPayload).model} – ${body.name}`
      : `Zpráva od ${body.name}`,
    html: isWizard
      ? wizardHtml(body as WizardPayload)
      : contactHtml(body as ContactPayload),
  });

  if (error) {
    console.error('[Resend error]', error);
    return NextResponse.json({ error: 'Email failed' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
