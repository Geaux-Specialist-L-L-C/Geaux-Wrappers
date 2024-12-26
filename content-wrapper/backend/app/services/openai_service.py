
import openai
import os
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

def generate_content(niche: str, content_type: str, keywords: list[str]) -> str:
    prompt = f"Write a {content_type} about {niche} including the keywords: {', '.join(keywords)}."
    try:
        response = openai.Completion.create(
            engine="text-davinci-003",
            prompt=prompt,
            max_tokens=500
        )
        return response.choices[0].text.strip()
    except Exception as e:
        print(f"Error generating content: {e}")
        return ""
