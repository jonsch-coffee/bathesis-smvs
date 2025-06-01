import os
from dotenv import load_dotenv

BASE_DIR = os.path.dirname(__file__)
load_dotenv()

API_KEY = os.getenv("API_KEY")

origins = os.getenv("CORS_ALLOWED_ORIGINS", "")
origins_list = [origin.strip() for origin in origins.split(",") if origin]

DB_PATH = os.path.join(BASE_DIR, "db.json") # db-filename