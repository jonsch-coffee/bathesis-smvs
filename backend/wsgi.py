import os
import sys
from a2wsgi import ASGIMiddleware
from main import app

## Needed in PROD-Enviroment!
sys.path.insert(0, "/var/www/webroot/ROOT") # Application-root

application = ASGIMiddleware(app)
