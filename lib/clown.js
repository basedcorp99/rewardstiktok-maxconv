export async function renderClown() {
  // Generate the HTML content
  const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Go back</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 0; padding: 0; background: #111; color: #fff; display: flex; align-items: center; justify-content: center; height: 100vh; text-align: center; }
          h1 { font-size: 3rem; }
        </style>
      </head>
      <body>
        <h1>GO BACK TO DISCORD 🤡</h1>
      </body>
      </html>
    
  `;

  return new Response(htmlContent, {
    headers: { 'Content-Type': 'text/html' },
  });
}
