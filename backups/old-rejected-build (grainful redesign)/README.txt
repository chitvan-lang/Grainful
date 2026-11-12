GRAINFUL - NEW HOMEPAGE (PREVIEW)
=================================

HOW TO VIEW
1. Unzip this folder first (right-click the .zip > "Extract All").
   Opening index.html directly from inside the zip will not show images.
2. Open the extracted folder and double-click  index.html
3. It opens in your web browser (Chrome, Edge, Firefox or Safari).

No internet connection or installation is needed to view the homepage.
To see the mobile layout, make the browser window narrow, or open the
page on a phone.

NOTES
- Menu and footer links open the pages on the live site, grainful.in.
- The enquiry form and "Subscribe" need two accounts that Grainful owns
  (see BEFORE GOING LIVE). Until then each says it is not connected yet;
  neither pretends a message was sent.
- privacy.html is a DRAFT privacy notice for Grainful to approve.
- Natural Wonder - Ghee is shown under Our Products. grainful.in has no
  page for it yet, so its card opens the Our Products page, and the jar
  picture is placeholder artwork until a product photo is supplied.

WHAT'S IN THE FOLDER
index.html        the homepage
privacy.html      privacy notice (draft, linked from both forms and the footer)
assets/css        styling
assets/js         menus, slider and other interactive parts
assets/img        images
assets/fonts      LT Superior and Inter Tight (both SIL Open Font License), bundled so the
                  page also works offline – see FONT-LICENSES.txt

BEFORE GOING LIVE
1. Enquiry form (Web3Forms, free up to 250 enquiries a month)
   - Go to web3forms.com, enter mail@grainful.in and create an access key.
     Web3Forms emails the key to that address.
   - In index.html, find  REPLACE-WITH-WEB3FORMS-ACCESS-KEY  and paste
     the key in its place. (This key is meant to be public.)
   - Send one test enquiry from the live page and check it arrives.
2. Newsletter (Mailchimp)
   - In Mailchimp: Audience > Signup forms > Embedded forms. Copy the
     form's "action" URL and the hidden field named  b_xxxx_yyyy .
   - In index.html, replace the Subscribe form's action URL
     (https://REPLACE-WITH-MAILCHIMP-FORM-URL/...) with the copied URL,
     and replace  b_REPLACE_REPLACE  with the copied field name.
   - Keep double opt-in switched on in Mailchimp.
3. Privacy notice
   - Fill in the highlighted items in privacy.html and have the text
     approved. Then delete the yellow "Draft" box and the line
     <meta name="robots" content="noindex">.
4. Security headers (if the host sets a Content-Security-Policy)
   - Allow  connect-src https://api.web3forms.com  and
     script-src https://*.list-manage.com  so both forms keep working.
