"""Application Models"""
import bson
from pymongo import MongoClient
from werkzeug.security import generate_password_hash, check_password_hash
from . import db
import datetime


"Aim Trainer Model"
class AimTrainers:
    def __init__(self):
        return
    
    "create aim trainer"
    def create(user_id: str, accuracy: float , average_time: float):
        new_aim_trainer= db.aim_trainer.insert_one({
            "user_id": user_id,
            "accuracy": accuracy,
            "average_time": average_time,
            "timestamp": datetime.datetime.now()
        }).inserted_id
        return new_aim_trainer
    
    "get aim trainer by user id"
    def get_by_user_id(user_id: str):
        aim_trainers= db.aim_trainer.find({"user_id": user_id})
         # Przekonwertuj tylko pole _id na typ str
        aim_trainers = [
            {**aim_trainer, "_id": str(aim_trainer["_id"])} for aim_trainer in aim_trainers # **aim_trainer - rozpakowuje słownik
    ]
        return aim_trainers

"Memory Game Model"
class MemoryGame:
    def __init__(self):
        return
    
    "create memory game"
    def create(user_id: str, score: int, level: int):
        new_memory_game= db.memory_game.insert_one({
            "user_id": user_id,
            "score": score,
            "level": level,
            "timestamp": datetime.datetime.now()
        }).inserted_id
        return new_memory_game
    
    "get memory game by user id"
    def get_by_user_id(user_id: str):
        memory_games= db.memory_game.find({"user_id": user_id})
        memory_games = [{**memory_game, "_id": str(memory_game["_id"])} for memory_game in memory_games]
        return memory_games
    
"Sequence Memory Model"
class SequenceMemory:
    def __init__(self):
        return
    
    "create sequence memory"
    def create(user_id: str, score: int):
        new_sequence_memory= db.sequence_memory.insert_one({
            "user_id": user_id,
            "score": score,
            "timestamp": datetime.datetime.now()
        }).inserted_id
        return new_sequence_memory
    
    "get sequence memory by user id"
    def get_by_user_id(user_id: str):
        sequence_memories= db.sequence_memory.find({"user_id": user_id})
        sequence_memories = [{**sequence_memory, "_id": str(sequence_memory["_id"])} for sequence_memory in sequence_memories]
        return sequence_memories

"Typing Model"
class Typing:
    def __init__(self):
        return
    
    "create typing"
    def create(user_id: str, score: int):
        new_typing= db.typing.insert_one({
            "user_id": user_id,
            "score": score,
            "timestamp": datetime.datetime.now()
        }).inserted_id
        return new_typing
    
    "get typing by user id"
    def get_by_user_id(user_id: str):
        typings= db.typing.find({"user_id": user_id})
        typings = [{**typing, "_id": str(typing["_id"])} for typing in typings]
        return typings

"Clicker Model"
class Clicker:
    def __init__(self):
        return
    
    "create clicker"
    def create(user_id: str, clicks_per_second: int, clicks: int, time: int):
        new_clicker= db.clicker.insert_one({
            "user_id": user_id,
            "clicks_per_second": clicks_per_second,
            "clicks": clicks,
            "time": time,
            "timestamp": datetime.datetime.now()
        }).inserted_id
        return new_clicker
    
    "get clicker by user id"
    def get_by_user_id(user_id: str):
        clickers= db.clicker.find({"user_id": user_id})
        clickers = [{**clicker, "_id": str(clicker["_id"])} for clicker in clickers]
        return clickers
    
"Reaction Time Model"
class ReactionTime:
    def __init__(self):
        return
    
    "create reaction time"
    def create(user_id: str, time: float):
        new_reaction_time= db.reaction_time.insert_one({
            "user_id": user_id,
            "time": time,
            "timestamp": datetime.datetime.now()
        }).inserted_id
        return new_reaction_time
    
    "get reaction time by user id"
    def get_by_user_id( user_id: str):
        reaction_times= db.reaction_time.find({"user_id": user_id})
        reaction_times = [{**reaction_time, "_id": str(reaction_time["_id"])} for reaction_time in reaction_times]
        return reaction_times
    
"Placeholder Model"
class Placeholder:
    def __init__(self):
        return
    
    "create placeholder"
    def create(user_id: str, score: int):
        new_placeholder= db.placeholder.insert_one({
            "user_id": user_id,
            "score": score,
            "timestamp": datetime.datetime.now()
        }).inserted_id
        return new_placeholder
    
    "get placeholder by user id"
    def get_by_user_id(user_id: str):
        placeholders= db.placeholder.find({"user_id": user_id})
        placeholders = [{**placeholder, "_id": str(placeholder["_id"])} for placeholder in placeholders]
        return placeholders

"TZWCTR Model"
class TZWCTR:
    def __init__(self):
        return
    
    "create tzwctr"
    def create(user_id: str, time: int, level: int):
        new_tzwctr= db.tzwctr.insert_one({
            "user_id": user_id,
            "time": time,
            "level": level,
            "timestamp": datetime.datetime.now()
        }).inserted_id
        return new_tzwctr
    
    "get tzwctr by user id"
    def get_by_user_id(user_id: str):
        tzwctrs= db.tzwctr.find({"user_id": user_id})
        tzwctrs = [{**tzwctr, "_id": str(tzwctr["_id"])} for tzwctr in tzwctrs]
        return tzwctrs

"User model"
class Users:
    def __init__(self):
        return
    
    "create user"
    def create(self, username: str, email: str, password: str, data_created: str):
        hashed_password = generate_password_hash(password)

        new_user= db.user.insert_one({
            "email": email,
            "password": hashed_password,
            "username": username,
            "date_created": data_created
        }).inserted_id

        return new_user

    "get user by email"
    def get_by_email(self, email: str):
        user= db.user.find_one({"email": email})

        if not user:
            return 
        user["_id"] = str(user["_id"])
        return user
    
    "get user by username"
    def get_by_username(self, username: str):
        user= db.user.find_one({"username": username})

        if not user:
            return
        user["_id"] = str(user["_id"])
        return user
    
    "get user by id"
    def get_by_id(self, user_id: str):
        user= db.user.find_one({"_id": bson.objectid.ObjectId(user_id)})
        if not user:
            return
        user["_id"] = str(user["_id"])
        user.pop("password") # remove password from user object before returning
        return user
    
    "delete user"
    def delete(self, user_id: str):
        AimTrainers().delete_by_user_id(user_id)
        MemoryGame().delete_by_user_id(user_id)
        SequenceMemory().delete_by_user_id(user_id)
        Typing().delete_by_user_id(user_id)
        Clicker().delete_by_user_id(user_id)
        ReactionTime().delete_by_user_id(user_id)
        
        db.user.delete_one({"_id": bson.objectid.ObjectId(user_id)})
        user= self.get_by_id(user_id)
        return user

    "login user"
    def login(self, username: str, password: str):
        user= db.user.find_one({"username": username})

        if not user:
            return "user"
        if check_password_hash(user["password"], password):
            user["_id"] = str(user["_id"])
            user.pop("password")
            return user
        return "password"