/**
 * Google Apps Script — the private "backend" for the portfolio contact form.
 *
 * Paste this into the script editor of the Google Sheet that should receive
 * messages (Sheet → Extensions → Apps Script). See SETUP-CONTACT-FORM.md.
 *
 * Flow: website server (/api/contact) → this script → appends a row + emails you.
 * The browser never talks to this script or to the sheet.
 */

const NOTIFY_TO = "olagoroyesamuelakolawole@gmail.com"; // who gets the notification email
const SHEET_NAME = "Messages";
const HEADERS = [
  "Received (UTC)",
  "Name",
  "Email",
  "Topic",
  "Message",
  "Status",
  "Source",
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000);
    const data = JSON.parse(e.postData.contents);

    // Shared-secret check: set SECRET in Project Settings → Script properties
    const secret =
      PropertiesService.getScriptProperties().getProperty("SECRET");
    if (!secret || data.secret !== secret)
      return reply({ ok: false, error: "unauthorized" });

    const name = str(data.name, 100);
    const email = str(data.email, 200);
    const topic = str(data.type, 60);
    const message = str(data.message, 3000);
    if (!name || !email || !message)
      return reply({ ok: false, error: "invalid" });

    const sheet = getSheet();
    // safeCell() stops spreadsheet formula injection (=, +, -, @ at the start)
    sheet.appendRow([
      new Date(),
      safeCell(name),
      safeCell(email),
      safeCell(topic),
      safeCell(message),
      "New",
      safeCell(str(data.source, 100)),
    ]);

    MailApp.sendEmail({
      to: NOTIFY_TO,
      replyTo: email, // hit "Reply" in Gmail to answer the visitor directly
      name: "Portfolio contact form",
      subject: "New portfolio message from " + name + " (" + topic + ")",
      body:
        "From: " +
        name +
        " <" +
        email +
        ">\nTopic: " +
        topic +
        "\n\n" +
        message +
        "\n\n— Saved in your Google Sheet: " +
        SpreadsheetApp.getActiveSpreadsheet().getUrl(),
      htmlBody:
        "<div style='font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#111'>" +
        "<h2 style='margin:0 0 12px'>New portfolio message</h2>" +
        "<p><b>From:</b> " +
        esc(name) +
        " &lt;" +
        esc(email) +
        "&gt;<br><b>Topic:</b> " +
        esc(topic) +
        "</p>" +
        "<p style='white-space:pre-wrap;border-left:3px solid #ff5a1f;padding-left:12px'>" +
        esc(message) +
        "</p>" +
        "<p><a href='" +
        SpreadsheetApp.getActiveSpreadsheet().getUrl() +
        "'>Open the Google Sheet</a></p></div>",
    });

    return reply({ ok: true });
  } catch (err) {
    console.error(err);
    return reply({ ok: false, error: "server" });
  } finally {
    try {
      lock.releaseLock();
    } catch (_) {}
  }
}

// Opening the web-app URL in a browser just shows this (no data is ever returned).
function doGet() {
  return reply({ ok: true, service: "portfolio-contact" });
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow(HEADERS);
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setColumnWidth(5, 480);
  }
  return sheet;
}

const str = (v, max) =>
  String(v == null ? "" : v)
    .trim()
    .slice(0, max);
const safeCell = (v) => (/^[=+\-@]/.test(v) ? "'" + v : v);
const esc = (s) =>
  String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ],
  );
const reply = (obj) =>
  ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON,
  );

/** Run this ONCE from the editor to authorise Sheets + Gmail access and create the tab. */
function setup() {
  getSheet();
  MailApp.sendEmail(
    NOTIFY_TO,
    "Portfolio form: setup OK",
    "Your contact form script is authorised and can send you email.",
  );
}
