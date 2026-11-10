import { profile } from "./content";

/**
 * Privacy policy shown in the footer popup.
 * DRAFT: review with a legal professional and keep it in sync with what the site really does
 * (analytics, new embeds, a different form backend, hosting changes, etc.).
 */
export const privacy = {
  title: "Privacy Policy",
  updated: "10/11/2026",
  sections: [
    {
      heading: "Data Controller",
      paragraphs: [
        `${profile.name}, freelance fullstack developer, based in Nigeria.`,
        `Contact email: ${profile.email}`,
      ],
    },
    {
      heading: "Data Collected",
      paragraphs: [
        "This website does not install tracking or profiling cookies and does not use analytics.",
        "The site offers two ways to get in touch:",
      ],
      bullets: [
        "A contact form. If you use it, the data you type in is collected: your name, email address, the topic you choose and your message. Nothing else is required, and submitting the form is a voluntary action.",
        "A mailto link, which opens your email client with the recipient field already filled in. The data in the message you then send (email address, name, content) is processed solely to respond to you.",
      ],
    },
    {
      heading: "How Form Submissions Are Handled",
      paragraphs: [
        "When you send the contact form, your message goes from your browser to this website's server, which passes it to a private Google Apps Script. The script saves it as a row in a Google Sheet and emails a notification to the site owner's Gmail inbox. The browser never connects to Google directly.",
        "To reduce spam, the site's server briefly uses your IP address to limit how many messages can be sent in a short period. Your IP address is not saved with your message.",
      ],
    },
    {
      heading: "Purpose of Processing",
      paragraphs: [
        "Data from the contact form or email is used solely to read and reply to your enquiry and, where relevant, to discuss working together. It is not used for marketing, sold or shared for advertising.",
      ],
    },
    {
      heading: "Third-Party Services",
      paragraphs: [
        "Form submissions are stored and delivered using Google Workspace services (Google Sheets, Apps Script and Gmail), which process the data on Google's infrastructure. See Google's privacy policy: https://policies.google.com/privacy.",
        "The website is hosted on Vercel, which processes standard technical request data (such as IP address and browser details) in order to serve the site. This website also loads fonts from Google Fonts and some images from Unsplash; those providers receive similar technical data when your browser requests the files.",
      ],
    },
    {
      heading: "Cookie",
      paragraphs: [
        "This website does not set its own cookies, and no tracking or advertising cookies are used.",
      ],
    },
    {
      heading: "Data Retention",
      paragraphs: [
        "Messages are kept in the Google Sheet for as long as needed to handle your enquiry and any resulting work, and afterwards only as required by applicable legal, tax and contractual obligations. You can ask for your message to be deleted at any time.",
      ],
    },
    {
      heading: "Data Subject Rights",
      paragraphs: [
        `You can exercise your rights under the Nigeria Data Protection Act 2023 and, where applicable, the GDPR or UK GDPR (access, rectification, erasure, restriction, portability, objection) at any time by writing to ${profile.email}. You also have the right to lodge a complaint with the Nigeria Data Protection Commission or with your local data protection authority.`,
      ],
    },
  ] as { heading: string; paragraphs: string[]; bullets?: string[] }[],
};
