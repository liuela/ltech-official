export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      reply: "Only POST requests allowed"
    });
  }

  try {

    const { message } = req.body;

    if (!message) {
      return res.status(400).json({
        reply: "Please type a message."
      });
    }


    const apiKey = process.env.GEMINI_API_KEY;


    if (!apiKey) {
      return res.status(500).json({
        reply: "Gemini API key missing."
      });
    }


    const prompt = `
You are L Tech AI Assistant.

About L Tech:
L Tech is an Ethiopian technology company.

Services:
- Website Development
- Business Websites
- Portfolio Websites
- E-commerce Websites
- Web Applications
- Cybersecurity
- Programming
- AI Solutions


Packages:

Starter:
5,000 - 10,000 ETB
- Personal portfolio website
- Mini shop website
- Responsive design
- Basic animation
- Social media links
- 1 year free domain if client accepts


Business:
12,000 - 30,000 ETB
- Company websites
- Cafe websites
- Hotel websites
- Professional UI design
- Contact forms
- SEO basics
- Domain connection


Premium:
35,000 - 100,000+ ETB
- Advanced web applications
- Dashboards
- Login systems
- Database
- AI integration
- Custom features


Rules:
- Answer professionally.
- Help customers choose L Tech services.
- Do not create fake prices.


Customer message:
${message}
`;


    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=" + apiKey,
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
                  text: prompt
                }
              ]
            }
          ]
        })
      }
    );


    const data = await response.json();


    if (!response.ok) {
      return res.status(500).json({
        reply: data.error?.message || "Gemini API error"
      });
    }


    const answer =
      data.candidates?.[0]?.content?.parts?.[0]?.text;


    return res.status(200).json({
      reply: answer || "No response from AI."
    });


  } catch (error) {

    return res.status(500).json({
      reply: error.message
    });

  }

}