export default async function handler(req, res) {

  // Only POST allowed
  if (req.method !== "POST") {
    return res.status(405).json({
      reply: "Method not allowed"
    });
  }


  try {

    const { message } = req.body;


    if (!message) {
      return res.status(400).json({
        reply: "Please enter a question."
      });
    }


    const apiKey = process.env.GEMINI_API_KEY;


    if (!apiKey) {
      return res.status(500).json({
        reply: "API key is missing."
      });
    }


    const prompt = `
You are L Tech AI Assistant.

Company:
L Tech is an Ethiopian technology company providing digital solutions.

Services:
- Website Development
- Portfolio Websites
- Business Websites
- E-commerce Websites
- Web Applications
- Cybersecurity Awareness
- Programming
- AI Solutions

Packages:

Starter:
Price: 5,000 - 10,000 ETB

Includes:
- Personal portfolio website
- Mini shop website
- Responsive design
- Mobile friendly
- Basic animations
- Contact section
- Social media integration
- 1 year free domain if client accepts the offer


Business:
Price: 12,000 - 30,000 ETB

Includes:
- Company websites
- Cafe websites
- Hotel websites
- Professional UI
- SEO basics
- Contact forms
- Domain connection
- 1 year free domain if client accepts the offer


Premium:
Price: 35,000 - 100,000+ ETB

Includes:
- Advanced web applications
- Dashboards
- Login systems
- Database integration
- AI integration
- Custom features


Rules:
- Answer professionally.
- Help customers choose packages.
- Do not create fake prices.
- If question is not about L Tech, politely say you only help with L Tech.

Customer:
${message}
`;


    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({

          contents:[
            {
              parts:[
                {
                  text:prompt
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
        reply: data.error?.message || "Gemini error"
      });

    }


    const answer =
      data.candidates?.[0]?.content?.parts?.[0]?.text;


    return res.status(200).json({
      reply: answer || "No answer received."
    });


  } catch(error){

    return res.status(500).json({
      reply: error.message
    });

  }

}