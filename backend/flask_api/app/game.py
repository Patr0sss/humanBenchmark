from flask import Blueprint, request, jsonify, render_template
from flask_login import  login_required, current_user
from . import db
import datetime

game = Blueprint('game', __name__)

@game.route('/aim-trainer', methods=['POST'])
@login_required
def aim_trainer():
    data = request.get_json()

    db.user.update_one(
        {"public_id": current_user._public_id},
        {"$push": {# Dodaj nowy dokument AimTrainer do listy aim_trainers użytkownika
            "aim_trainers": {  
                "id": str(datetime.datetime.now()),
                "accuracy": data['accuracy'],
                "average_time": data['average_time']
            }
        }}
    )

    return jsonify({'message': 'Aim trainer data added successfully'}), 200

@game.route('/memory-game', methods=['POST'])
@login_required
def memory_game():
    data = request.get_json()

    db.user.update_one(
        {"public_id": current_user._public_id},
        # Używa operatora $push, aby dodać nowy element do tablicy aim_trainers w dokumencie użytkownika.
        {"$push": {# Dodaj nowy dokument MemoryGame do listy memory_games użytkownika
            "memory_games": {
                "id": str(datetime.datetime.now()),
                "score": data['score']
            }
        }}
    )

    return jsonify({'message': 'Memory game data added successfully'}), 200

@game.route('/sequence-memory', methods=['POST'])
@login_required
def sequence_memory():
    data = request.get_json()

    db.user.update_one(
        {"public_id": current_user._public_id},
        {"$push": {# Dodaj nowy dokument SequenceMemory do listy sequence_memories użytkownika
            "sequence_memories": {
                "id": str(datetime.datetime.now()),
                "score": data['score']
            }
        }}
    )

    return jsonify({'message': 'Sequence memory data added successfully'}), 200

@game.route('/get-aim-trainer', methods=['GET'])
@login_required
def get_aim_trainer():
    user = db.user.find_one({"public_id": current_user._public_id})

    aim_trainers = user['aim_trainers']

    return jsonify(aim_trainers), 200

@game.route('/get-memory-game', methods=['GET'])
@login_required
def get_memory_game():
    user = db.user.find_one({"public_id": current_user._public_id})

    memory_games = user['memory_games']

    return jsonify(memory_games), 200

@game.route('/get-sequence-memory', methods=['GET'])
@login_required
def get_sequence_memory():
    user = db.user.find_one({"public_id": current_user._public_id})

    sequence_memories = user['sequence_memories']

    return jsonify(sequence_memories), 200

