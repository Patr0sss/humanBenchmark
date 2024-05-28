from flask import Flask
from flask_mongoengine import MongoEngine

def create_app():
    app= Flask(__name__)
    app.config['SECRET_KEY'] = 'secretkey'
    app.config['MONGODB_SETTINGS'] = {
        'db': 'humanBenchmark',
        'host': 'mongodb+srv://admin:admin@atlascluster.tx7dk4w.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster'
    }
    
    db = MongoEngine(app)
    db.init_app(app)
    return app
