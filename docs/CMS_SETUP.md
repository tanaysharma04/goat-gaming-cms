# GOAT GAMING CMS - Phase 1

Phase 1 moves only the game library into Google Sheets. Pricing, reviews, facilities, contact, opening hours, gallery, and tournaments can follow the same service + hook + component pattern later.

## 1. Create the spreadsheet

1. Open Google Sheets.
2. Create a new spreadsheet named GOAT GAMING CMS.
3. Rename the first worksheet to Games.
4. Add these columns in this exact order:

id, active, status, title, developer, description, genre, tags, platform, image_url, primary_color, secondary_color, shadow_color, display_order

A starter CSV is included at docs/games-seed.csv. You can import it or paste it into the Games worksheet.

## 2. Publish it

Google's official help page says published files can be shared with a public URL, and updates to the original file automatically update the published version after a short delay. In Sheets, use File > Share > Publish to web, choose the Games worksheet, choose Comma-separated values (.csv), and publish.

## 3. Obtain the endpoint

Copy the published CSV URL. It usually looks like this:

https://docs.google.com/spreadsheets/d/e/YOUR_PUBLISHED_ID/pub?gid=WORKSHEET_GID&single=true&output=csv

The important parts are output=csv and the worksheet gid for Games.

## 4. Connect the website

Create a local .env file from .env.example and paste the URL:

VITE_GOOGLE_SHEETS_PUBLISHED_CSV_URL="https://docs.google.com/spreadsheets/d/e/YOUR_PUBLISHED_ID/pub?gid=WORKSHEET_GID&single=true&output=csv"

Restart the dev server after changing .env.

## 5. Add a game

Add a new row in the Games worksheet. Use a new id such as game009, set active to TRUE, set status to Available or Coming Soon, and fill the rest of the fields.

## 6. Hide a game

Set active to FALSE. The game disappears from both Available Games and Coming Soon.

## 7. Move a game from Coming Soon to Available

Change status from Coming Soon to Available. The game moves from the Coming Soon section to the Available Games section automatically.

## 8. display_order

Use numbers to control order. Lower numbers show first. Example: 1 appears before 2.

## 9. Image URLs

Paste a direct image URL in image_url. Landscape images work best. If an image host blocks hotlinking, use another hosted image URL.

## 10. Add another worksheet later

For the next CMS phase, add a worksheet such as Pricing or Reviews, create a service function in src/services/googleSheets.js or a related service file, create a hook such as usePricing.js, and consume that hook in the matching component. Keep fetching logic out of UI components.
