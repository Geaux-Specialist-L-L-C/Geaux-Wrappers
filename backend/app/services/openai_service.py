import openai
import os
from typing import List
from dotenv import load_dotenv

load_dotenv()
openai.api_key = os.getenv("OPENAI_API_KEY")

def generate_content(niche: str, content_type: str, keywords: List[str]) -> str:
    """
    Generate content using OpenAI's GPT model
    
    Parameters:
    - niche: The topic or industry of the content
    - content_type: Type of content (blog, script, summary)
    - keywords: List of keywords to include
    
    Returns:
    - Generated content text
    """
    
    prompts = {
        "blog": f"Write a blog post about {niche} including the following keywords: {', '.join(keywords)}.",
        "script": f"Write a YouTube video script about {niche} including the following keywords: {', '.join(keywords)}.",
        "summary": f"Write a podcast episode summary about {niche} including the following keywords: {', '.join(keywords)}."
    }
    
    prompt = prompts.get(content_type, prompts["blog"])
    
    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": f"You are a content specialist who creates high-quality {content_type}s."},
                {"role": "user", "content": prompt}
            ],
            max_tokens=1000,
            temperature=0.7
        )
        return response.choices[0].message.content.strip()
    except Exception as e:
        print(f"Error generating content: {e}")
        return ""