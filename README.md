# cantonese-lens

AI-powered Cantonese learning app using real-time camera recognition.

## Backend setup

### 1. Create and activate a virtual environment

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
```

### 2. Install dependencies

```bash
python -m pip install -r requirements.txt
```

### 3. Configure environment variables

Create a local `.env` file from the provided template:

```bash
cp .env.example .env
```

Get an API key from [Google AI Studio](https://aistudio.google.com/)
and add it to your `.env` file.

Never commit your API key to version control.

### 4. Run the AI prototype

```bash
python ai_prototype.py
```

The prototype translates an English word into Cantonese
and returns Traditional Chinese characters, Jyutping
and the original English word.
