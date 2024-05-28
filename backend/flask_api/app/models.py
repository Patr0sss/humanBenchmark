from . import db
from flask_mongoengine import MongoEngine, StringField, Document, DateTimeField, DoubleField, ReferenceField, EmailField, EmbeddedDocumentField, ListField
import datetime

class AimTrainer(Document):
    id = StringField(max_length=150, unique=True, required=True)
    accuracy = DoubleField(required=True)
    average_time = DoubleField(required=True)
    date_created = DateTimeField(default=datetime.datetime.now)

class MemoryGame(Document):
    id = StringField(max_length=150, unique=True, required=True)
    score = DoubleField(required=True)
    date_created = DateTimeField(default=datetime.datetime.now)

class SequenceMemory(Document):
    id = StringField(max_length=150, unique=True, required=True)
    score = DoubleField(required=True)
    date_created = DateTimeField(default=datetime.datetime.now)

class User(Document):
    id = StringField(max_length=150, unique=True, required=True, primary_key=True)
    public_id = StringField(max_length=50, unique=True, required=True) # public_id is a unique identifier for each user 
    email = EmailField(max_length=150, unique=True, required=True)
    password = StringField(max_length=150, required=True)
    username = StringField(max_length=150, required=True)
    date_created = DateTimeField(default=datetime.datetime.now)
    aim_trainers = ListField(EmbeddedDocumentField(AimTrainer))  # Lista zagnieżdżonych dokumentów AimTrainer
    memory_games = ListField(ReferenceField(MemoryGame))  # Lista referencji do dokumentów MemoryGame
    sequence_memories = ListField(ReferenceField(SequenceMemory))  # Lista referencji do dokumentów SequenceMemory