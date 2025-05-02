export async function generateRecipe(ingredients: string[]) {
    const API_KEY: string = import.meta.env.VITE_APP_KEY;
    const MODEL_ID = 'mistralai/Mixtral-8x7B-Instruct-v0.1';
    
    const response = await fetch(`https://api-inference.huggingface.co/models/${MODEL_ID}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        inputs: `<s>[INST] You are a professional chef. Create a detailed recipe using these ingredients: ${ingredients.join(', ')}. Include preparation steps, cooking time, and serving suggestions. [/INST]</s>`,
        parameters: {
          max_new_tokens: 1024,
          temperature: 0.7,
          return_full_text: false
        }
      })
    });
  
    if (!response.ok) {
      const errorData = await response.text();
      console.error('API Error:', errorData);
      throw new Error(`Hugging Face API error: ${errorData}`);
    }
    
    const data = await response.json();
    return data[0].generated_text;
  }