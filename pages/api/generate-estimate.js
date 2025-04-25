export default async function handler(req, res) {
  console.log('API Route Hit:', req.method);
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { prompt, zipcode, serviceType } = req.body;
  console.log('Request Body:', { prompt, zipcode, serviceType });

  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  if (!zipcode) {
    return res.status(400).json({ error: 'ZIP code is required' });
  }

  if (!serviceType || !['service', 'materials'].includes(serviceType.toLowerCase())) {
    return res.status(400).json({ error: 'Service type must be either "service" or "materials"' });
  }

  try {
    // Call the Gemini API to generate the cost estimate
    console.log('Calling Gemini API...');
    const modelName = process.env.GEMINI_MODEL_NAME || 'gemini-2.0-flash';
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-goog-api-key': process.env.GEMINI_API_KEY
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: `Generate a detailed cost estimate for the following project in JSON format. The ZIP code is crucial for accurate pricing as it affects labor rates, material costs, and local market conditions.
              
            Project: ${prompt}
            Service Type: ${serviceType}
            ZIP Code: ${zipcode}
              
            Important: Use the ZIP code to determine:
            1. Local market rates and pricing
            2. Material costs specific to the region
            3. Local requirements and regulations
            4. Regional market conditions and pricing trends
            
            Note: For materials-only projects, use standard retail pricing for products and materials.
            For professional services:
            - If the service involves physical labor (e.g., construction, installation), include labor costs
            - If the service is management-based (e.g., marketing, consulting), include professional fees but no labor costs
            - Use appropriate pricing tiers (retail for materials-only, professional rates for services)
            
            Analyze the project to determine the appropriate cost components:
            Examples:
            - Physical services (renovation, landscaping) include labor and materials
            - Management services (marketing, consulting) include professional fees
            - Materials-only projects (computer parts, furniture) use retail pricing
            
            Return a valid JSON object with this structure:
            {
              "query": "${prompt}",
              "service_type": "${serviceType}",
              "zipcode": "${zipcode}",
              "date": "${new Date().toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}",
              "components": [
                {
                  "name": "Component name appropriate for this project",
                  "low": 1000, 
                  "medium": 2000,
                  "high": 3000,
                  "notes": "Optional notes about this component, including how the ZIP code affects pricing"
                }
              ],
              "totals": {
                "low": 1000,
                "medium": 2000,
                "high": 3000
              },
              "confidence_level": "low|medium|high",
              "disclaimers": [
                "Prices are specific to ZIP code ${zipcode} and may vary in other areas",
                "Relevant disclaimer 2"
              ]
            }
            
            Only respond with valid JSON with no additional text.`
          }]
        }],
        generationConfig: {
          temperature: 0.2,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        }
      })
    });
    
    console.log('Gemini API Response Status:', response.status);
    const data = await response.json();
    console.log('Gemini API Response:', data);
    
    // Check for API errors
    if (!response.ok) {
      console.error('Gemini API Error:', data);
      throw new Error(`Gemini API Error: ${data.error?.message || 'Unknown error'}`);
    }
    
    // Validate response structure
    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      console.error('Invalid Gemini API Response:', data);
      throw new Error('Invalid response format from Gemini API');
    }
    
    // Extract the JSON content from Gemini's response
    const content = data.candidates[0].content.parts[0].text;
    console.log('Extracted Content:', content);
    
    try {
      // Remove markdown code block formatting if present
      const jsonContent = content.replace(/```json\n|\n```/g, '').trim();
      const estimateJson = JSON.parse(jsonContent);
      console.log('Parsed JSON:', estimateJson);
      
      // Validate the required fields
      if (!estimateJson.components || !estimateJson.totals) {
        throw new Error('Missing required fields in estimate JSON');
      }
      
      return res.status(200).json(estimateJson);
    } catch (parseError) {
      console.error('JSON Parse Error:', parseError);
      throw new Error('Failed to parse Gemini API response as JSON');
    }
  } catch (error) {
    console.error('Error generating estimate:', error);
    
    // Return a more detailed error response
    return res.status(500).json({
      error: 'Failed to generate estimate',
      details: error.message,
      fallback: true
    });
    
    // Fallback to mock data in case of error
    // return res.status(200).json(generateMockResponse(prompt, location));
  }
}

function generateMockResponse(prompt, location) {
  // This function would normally be replaced by your AI API call
  // It creates mock data based on the prompt for demonstration purposes
  
  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const lowTotal = Math.floor(Math.random() * 5000) + 500;
  const mediumTotal = lowTotal * 2;
  const highTotal = mediumTotal * 2;
  
  // Very simple prompt parsing - in reality, this would be done by the AI
  let components = [];
  
  if (prompt.toLowerCase().includes('bathroom')) {
    components = [
      {
        name: 'Labor',
        low: Math.floor(lowTotal * 0.4),
        medium: Math.floor(mediumTotal * 0.35),
        high: Math.floor(highTotal * 0.3),
        notes: 'Includes demolition, installation, and finishing work'
      },
      {
        name: 'Fixtures (toilet, sink, shower)',
        low: Math.floor(lowTotal * 0.3),
        medium: Math.floor(mediumTotal * 0.3),
        high: Math.floor(highTotal * 0.3),
        notes: 'Quality ranges from basic models to premium fixtures'
      },
      {
        name: 'Tile and Flooring',
        low: Math.floor(lowTotal * 0.2),
        medium: Math.floor(mediumTotal * 0.25),
        high: Math.floor(highTotal * 0.3),
      },
      {
        name: 'Miscellaneous (paint, hardware, etc.)',
        low: Math.floor(lowTotal * 0.1),
        medium: Math.floor(mediumTotal * 0.1),
        high: Math.floor(highTotal * 0.1),
      }
    ];
  } else if (prompt.toLowerCase().includes('kitchen')) {
    components = [
      {
        name: 'Labor',
        low: Math.floor(lowTotal * 0.35),
        medium: Math.floor(mediumTotal * 0.3),
        high: Math.floor(highTotal * 0.25),
        notes: 'Includes demolition, installation, and finishing work'
      },
      {
        name: 'Cabinets',
        low: Math.floor(lowTotal * 0.3),
        medium: Math.floor(mediumTotal * 0.3),
        high: Math.floor(highTotal * 0.3),
      },
      {
        name: 'Countertops',
        low: Math.floor(lowTotal * 0.15),
        medium: Math.floor(mediumTotal * 0.2),
        high: Math.floor(highTotal * 0.25),
      },
      {
        name: 'Appliances',
        low: Math.floor(lowTotal * 0.15),
        medium: Math.floor(mediumTotal * 0.15),
        high: Math.floor(highTotal * 0.15),
      },
      {
        name: 'Miscellaneous (lighting, hardware, etc.)',
        low: Math.floor(lowTotal * 0.05),
        medium: Math.floor(mediumTotal * 0.05),
        high: Math.floor(highTotal * 0.05),
      }
    ];
  } else if (prompt.toLowerCase().includes('flower') || prompt.toLowerCase().includes('garden')) {
    components = [
      {
        name: 'Labor',
        low: Math.floor(lowTotal * 0.4),
        medium: Math.floor(mediumTotal * 0.35),
        high: Math.floor(highTotal * 0.3),
        notes: 'Includes soil preparation, planting, and cleanup'
      },
      {
        name: 'Plants',
        low: Math.floor(lowTotal * 0.3),
        medium: Math.floor(mediumTotal * 0.35),
        high: Math.floor(highTotal * 0.4),
        notes: 'Varies based on plant types, sizes, and quantity'
      },
      {
        name: 'Soil and Amendments',
        low: Math.floor(lowTotal * 0.2),
        medium: Math.floor(mediumTotal * 0.2),
        high: Math.floor(highTotal * 0.2),
      },
      {
        name: 'Decorative Elements',
        low: Math.floor(lowTotal * 0.1),
        medium: Math.floor(mediumTotal * 0.1),
        high: Math.floor(highTotal * 0.1),
        notes: 'Includes edging, mulch, and decorative stones'
      }
    ];
  } else {
    // Generic project
    components = [
      {
        name: 'Labor',
        low: Math.floor(lowTotal * 0.5),
        medium: Math.floor(mediumTotal * 0.45),
        high: Math.floor(highTotal * 0.4),
      },
      {
        name: 'Materials',
        low: Math.floor(lowTotal * 0.4),
        medium: Math.floor(mediumTotal * 0.45),
        high: Math.floor(highTotal * 0.5),
      },
      {
        name: 'Additional Costs',
        low: Math.floor(lowTotal * 0.1),
        medium: Math.floor(mediumTotal * 0.1),
        high: Math.floor(highTotal * 0.1),
      }
    ];
  }
  
  // Recalculate totals to ensure they match component sums exactly
  const recalculatedTotals = {
    low: components.reduce((sum, component) => sum + component.low, 0),
    medium: components.reduce((sum, component) => sum + component.medium, 0),
    high: components.reduce((sum, component) => sum + component.high, 0)
  };
  
  return {
    query: prompt,
    location: location || "Not specified",
    date: today,
    project_type: determineProjectType(prompt),
    components: components,
    totals: recalculatedTotals,
    confidence_level: "medium",
    disclaimers: [
      "Estimates reflect typical costs for the specified location",
      "Actual costs may vary based on specific materials selected and contractor rates",
      "Estimates do not include permits, design fees, or unforeseen complications",
      "This is a ballpark estimate only and should not replace professional quotes"
    ]
  };
}

function determineProjectType(prompt) {
  const prompt_lower = prompt.toLowerCase();
  
  if (prompt_lower.includes('bathroom') || prompt_lower.includes('kitchen') || prompt_lower.includes('renovate') || prompt_lower.includes('remodel')) {
    return 'home_renovation';
  } else if (prompt_lower.includes('garden') || prompt_lower.includes('flower') || prompt_lower.includes('lawn') || prompt_lower.includes('landscape')) {
    return 'landscaping';
  } else if (prompt_lower.includes('marketing') || prompt_lower.includes('campaign') || prompt_lower.includes('advertising')) {
    return 'marketing';
  } else if (prompt_lower.includes('office') || prompt_lower.includes('commercial') || prompt_lower.includes('business')) {
    return 'commercial';
  } else {
    return 'general';
  }
} 