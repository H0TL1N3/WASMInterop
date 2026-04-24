# Create venv if it doesn't exist
if (!(Test-Path .venv)) {
    python -m venv .venv
}

.\.venv\Scripts\python -m pip install -r requirements.txt
.\.venv\Scripts\python -m fastapi dev
