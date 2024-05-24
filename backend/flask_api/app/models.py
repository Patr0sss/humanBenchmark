from . import db
from sqlalchemy.sql import func

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    public_id = db.Column(db.String(50), unique=True) # public_id is a unique identifier for each user 
    email = db.Column(db.String(150), unique=True)
    password = db.Column(db.String(150))
    ussername = db.Column(db.String(150), unque=True)
    date_created = db.Column(db.DateTime(timezone=True), default=func.now())
    AimTrainer = db.relationship('AimTrainer', backref='user', lazy=True) #lazy=True means that SQLAlchemy will load the data from the database in one go


class AimTrainer(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    accuracy = db.Column(db.Integer)
    average_time = db.Column(db.Integer)
    date_created = db.Column(db.DateTime(timezone=True), default=func.now())
    user_id = db.Column(db.String(50), db.ForeignKey('user.public_id')) # ForeignKey is used to link the AimTrainer table to the User table