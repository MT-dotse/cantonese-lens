from google import genai
from google.genai.errors import APIError
from dotenv import load_dotenv
from pydantic import BaseModel, ValidationError, Field, ConfigDict
import json


class Translation(BaseModel):
    model_config = ConfigDict(str_strip_whitespace=True)

    chinese: str = Field(min_length=1)
    jyutping: str = Field(min_length=1)
    english: str = Field(min_length=1)


load_dotenv()
client = genai.Client()

try:
    response = client.models.generate_content(
        model="nonexistent-model",
        # model="gemini-3.5-flash-lite",
        contents="""
Translate the English word 'apple' into Cantonese.

Return:
- Traditional Chinese characters
- Jyutping romanization with tone numbers
- The original English word

Format the response as JSON with these keys:
chinese, jyutping, english

Return only JSON, without explanations.
""",
    )
    if response.text is None:
        raise ValueError("Gemini returned no text")

    word_data = json.loads(response.text)
    translation = Translation.model_validate(word_data)
    chinese = translation.chinese
    jyutping = translation.jyutping
    english = translation.english

    print(chinese)
    print(jyutping)
    print(english)


except APIError:
    print("Gemini API request failed")
except json.JSONDecodeError:
    print("Gemini returned invalid JSON")
except ValidationError:
    print("Gemini returned invalid translation data")
