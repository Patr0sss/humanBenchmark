
from flask import Flask
from flask_pymongo import PyMongo

mongo = PyMongo()
db = None

def create_app():
    global db

    app = Flask(__name__)
    app.config['SECRET_KEY'] = 'secretkey'
    app.config['MONGO_URI'] = 'mongodb+srv://admin:admin@atlascluster.tx7dk4w.mongodb.net/humanBenchmark?retryWrites=true&w=majority'

    mongo.init_app(app)
    db = mongo.db
    

    from . import auth  # Import the "auth" blueprint module
    app.register_blueprint(auth.auth)

    return app