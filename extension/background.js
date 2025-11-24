// Background Service Worker

// TODO: Replace with your actual API Key or implement a secure way to fetch it
const API_KEY = "AIzaSyAiQflgfDREorcT0y8td-xmD3Uj8NGq4Cg";
const MODEL_NAME = "gemini-3-pro-image-preview";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "generateTryOn") {
        handleTryOn(request.productImageUrl, sendResponse);
        return true; // Indicates async response
    }
});

async function handleTryOn(productImageUrl, sendResponse) {
    try {
        // 1. Get User Image from Storage
        const storageData = await chrome.storage.local.get(['userImage']);
        const userImageBase64 = storageData.userImage;

        if (!userImageBase64) {
            sendResponse({ success: false, error: "Please upload your photo in the extension popup first." });
            return;
        }

        // 2. Fetch Product Image and convert to Base64
        // Note: We fetch it here to avoid CORS issues in the content script
        const productBase64 = await fetchImageAsBase64(productImageUrl);

        // 3. Call Gemini API
        const result = await callGeminiAPI(userImageBase64, productBase64);

        sendResponse(result);

    } catch (error) {
        console.error("Try-On Error:", error);
        sendResponse({ success: false, error: error.message });
    }
}

async function fetchImageAsBase64(url) {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result.split(',')[1]); // Remove data:image/xxx;base64, prefix
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
}

async function callGeminiAPI(userImageDataUrl, productImageBase64) {
    // Extract base64 data from data URL if present
    const userImageBase64 = userImageDataUrl.split(',')[1];

    const prompt = "A photorealistic image of the person in the first image wearing the dress/outfit from the second image. Maintain the person's pose, body shape, and facial features exactly. The lighting and shadows should be consistent. High quality, 4k resolution.";

    const payload = {
        contents: [
            {
                parts: [
                    { text: prompt },
                    {
                        inlineData: {
                            mimeType: "image/jpeg", // Assuming jpeg/png, API is flexible
                            data: userImageBase64
                        }
                    },
                    {
                        inlineData: {
                            mimeType: "image/jpeg",
                            data: productImageBase64
                        }
                    }
                ]
            }
        ],
        generationConfig: {
            response_modalities: ["IMAGE"]
        }
    };

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error?.message || "API Error");
        }

        if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.inlineData) {
            const inlineData = data.candidates[0].content.parts[0].inlineData;
            const imageUrl = `data:${inlineData.mimeType};base64,${inlineData.data}`;
            return { success: true, imageUrl: imageUrl };
        } else {
            throw new Error("No image generated.");
        }

    } catch (error) {
        return { success: false, error: error.message };
    }
}
