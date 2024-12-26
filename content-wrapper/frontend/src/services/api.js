
import axios from 'axios';

const API_URL = "http://localhost:8000";

export const generateContent = async (niche, type, keywords) => {
  try {
    const response = await axios.post(`${API_URL}/content`, { niche, type, keywords });
    return response.data;
  } catch (error) {
    console.error("Error generating content:", error);
    return { content: "Error generating content. Please try again." };
  }
};
