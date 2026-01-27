from langchain_google_genai import GoogleGenerativeAIEmbeddings
from app.core.config import settings
import sys
import os

# Ensure we can import app
sys.path.append(os.getcwd())

def test_model(model_name):
    print(f"Testing {model_name}...")
    try:
        emb = GoogleGenerativeAIEmbeddings(model=model_name, google_api_key=settings.GOOGLE_API_KEY)
        vec = emb.embed_query("Helo world")
        print(f"SUCCESS: {model_name} produced vector len {len(vec)}")
        return True
    except Exception as e:
        print(f"FAIL: {model_name} - {e}")
        return False

if __name__ == "__main__":
    candidates = ["models/text-embedding-005", "models/text-embedding-004", "models/embedding-001", "models/gemini-embedding-001"]
    for c in candidates:
        if test_model(c):
            print(f"Use this: {c}")
            break
