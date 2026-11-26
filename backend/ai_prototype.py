from google import genai
import json

client = genai.Client()

response = client.models.generate_content(
    model="gemini-3.5-flash-lite",
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

try:
    word_data = json.loads(response.text)
    chinese = word_data["chinese"]
    jyutping = word_data["jyutping"]
    english = word_data["english"]

    print(chinese)
    print(jyutping)
    print(english)
except json.JSONDecodeError:
    print("Gemini returned invalid JSON")
except KeyError:
    print("Gemini returned incomplete data")
