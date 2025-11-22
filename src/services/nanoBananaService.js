/**
 * Service for Google Gemini API (Nano Banana).
 * Handles virtual try-on generation using multimodal capabilities.
 */

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
// Using the model recommended by the user for image generation
const MODEL_NAME = "gemini-3-pro-image-preview";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;

// Helper to convert File to Base64
const fileToGenerativePart = async (file) => {
  const base64EncodedDataPromise = new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result.split(',')[1]);
    reader.readAsDataURL(file);
  });

  return {
    inlineData: {
      data: await base64EncodedDataPromise,
      mimeType: file.type,
    },
  };
};

export const generateTryOn = async (userImage, dressImage) => {
  console.log(`Generating try-on with ${MODEL_NAME}...`);

  if (!API_KEY) {
    throw new Error("API Key is missing. Please check your .env file.");
  }

  try {
    const userImagePart = await fileToGenerativePart(userImage);
    const dressImagePart = await fileToGenerativePart(dressImage);

    // Detailed prompt for the virtual try-on task
    const prompt = "A photorealistic image of the person in the first image wearing the dress from the second image. Maintain the person's pose, body shape, and facial features exactly. The lighting and shadows should be consistent. High quality, 4k resolution.";

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: prompt },
              userImagePart,
              dressImagePart
            ],
          },
        ],
        generationConfig: {
          response_modalities: ["IMAGE"],
        },
        // Safety settings to avoid blocking fashion/body images
        safetySettings: [
          { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_ONLY_HIGH" },
          { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_ONLY_HIGH" },
          { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_ONLY_HIGH" },
          { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_ONLY_HIGH" }
        ]
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("API Error Response:", data);
      throw new Error(data.error?.message || `API Error: ${data.error?.status || response.statusText}`);
    }

    // Check if we got a valid candidate with content
    if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.inlineData) {
      const inlineData = data.candidates[0].content.parts[0].inlineData;
      const imageUrl = `data:${inlineData.mimeType};base64,${inlineData.data}`;

      return {
        success: true,
        imageUrl: imageUrl,
        message: "Virtual try-on generated successfully!",
      };
    } else {
      console.warn("Unexpected API response structure:", data);
      // Fallback if the model returns text instead of image (unlikely with response_modalities: ["IMAGE"])
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        throw new Error("The model returned text instead of an image. Please try again.");
      }
      throw new Error("No image generated. The request might have been blocked by safety filters.");
    }

  } catch (error) {
    console.error("API Service Error:", error);
    return { success: false, message: error.message };
  }
};
