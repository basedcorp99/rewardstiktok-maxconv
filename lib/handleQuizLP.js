import whitehat from '../assets/test.html'

export async function handleQuizLP(context, mappings) {


    const html = whitehat;
  
    return new Response(html, {
      headers: { 'Content-Type': 'text/html' },
    });
  }