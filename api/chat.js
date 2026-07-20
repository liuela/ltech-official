export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed"
    });
  }

  const { message } = req.body;

  const apiKey = process.env.GEMINI_API_KEY;

  try {

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=" + apiKey,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text:
`You are L Tech AI Assistant.

Company: L Tech Ethiopia.
Services:
- Website Development
- Cybersecurity
- Programming
- AI Solutions

Packages:
Starter: 5000-10000 ETB
Business: 12000-30000 ETB
Premium: 35000-100000+ ETB

Free domain:
1 year free domain for clients who agree.

Customer question:
${message}`
                }
              ]
            }
          ]
        })
      }
    );


    const data = await response.json();


    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Sorry, I cannot answer now.";


    res.status(200).json({
      reply
    });


  } catch(error){

    res.status(500).json({
      error: error.message
    });

  }

}
