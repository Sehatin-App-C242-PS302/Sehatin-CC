FROM python:3.10

WORKDIR /app

RUN apt-get update && apt-get install ffmpeg libsm6 libxext6 libgl1 -y

COPY requirements.txt requirements.txt

RUN pip install -r requirements.txt

COPY . .

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000"]