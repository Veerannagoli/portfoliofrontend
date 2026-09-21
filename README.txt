# Veeranna Portfolio SEO Package

Use these files with the Netlify frontend.

## 1. index.html

Copy the SEO block from `SEO_HEAD_SNIPPET.html` into the `<head>` of your current `index.html`.

Do not create a second `<title>`, canonical tag, Open Graph block, or JSON-LD block. Replace the old SEO versions.

## 2. robots.txt

Put this file in the ROOT of the Netlify site:

robots.txt

It allows search-engine crawlers and points them to the sitemap.

## 3. sitemap.xml

Put this file in the ROOT of the Netlify site:

sitemap.xml

## Important

The canonical URL is the current Netlify portfolio:

https://veeranna-portfolio.netlify.app/

The structured-data image is:

https://veeranna-portfolio.netlify.app/assets/images/veeranna-profile.jpg

Make sure that exact image path exists in your deployed `assets/images/` folder. If your profile image has a different filename/path, change both image URLs in the SEO block.

After deployment, add the site to Google Search Console and submit:

https://veeranna-portfolio.netlify.app/sitemap.xml

Google recommends submitting a sitemap and using URL Inspection after publishing changes. Structured data should also be validated before release.
