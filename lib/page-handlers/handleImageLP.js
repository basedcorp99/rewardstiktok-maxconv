import { exit } from '../exitHelper'

import { getPageData } from './common';

export async function handleImageLP(catchall, mappings, searchParams) {
  const { user, mapping, subid, ttclid } = getPageData(catchall, mappings, searchParams);

  const targetUrl = exit(user, mapping, subid, ttclid);

  const lander = mapping.lander;

  // Generate the HTML content
  const htmlContent = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Shop</title>
            <style>
                body, html {
                    margin: 0;
                    padding: 0;
                    height: 100%;
                }
                img {
                    display: block;
                    max-width: 100%;
                    height: auto;
                    position: absolute;
                    top: 0;
                    left: 0;
                }
            </style>
        </head>
        <body>
            <div class="image-container">
                <a rel="noreferrer" href="${targetUrl}">
                    <img src="/public/images/${lander}">
                </a>
            </div>
        </body>
        </html>
  `;

  return new Response(htmlContent, {
    headers: { 'Content-Type': 'text/html' },
  });
}
