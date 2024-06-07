from flask import Flask
from flask_pymongo import PyMongo
import json

mongo = PyMongo()
db = None

def create_app():
    global db

    app = Flask(__name__)
    
    with open('./config.json') as config_file:
        config = json.load(config_file)
        
    app.config['SECRET_KEY'] = config['secret_key'] 
    app.config['MONGO_URI'] = config['mongo_uri']

    mongo.init_app(app)
    db = mongo.db
    

    from . import auth  # Import the "auth" blueprint module
    app.register_blueprint(auth.auth)

    return app