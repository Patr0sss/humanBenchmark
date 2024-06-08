from flask import Blueprint, request, jsonify, make_response, render_template
import uuid
from werkzeug.security import generate_password_hash, check_password_hash
from . import db
from flask_cors import CORS
import datetime
from flask_login import login_required
# import jwt
# import datetime

auth = Blueprint('auth', __name__)
CORS(auth, origins="http://localhost:5173", methods=["GET", "POST"])  # apply CORS to the auth blueprint

@auth.route('/register')
def register_form():
    return render_template('index.html')

@auth.route('/auth', methods=['POST'])
def register():

    data = request.get_json() # get the data from the request
    
    # Sprawdź, czy adres e-mail jest już w użyciu
    existing_user_email = db.user.find_one({"email": data['email']})
    existing_username = db.user.find_one({"username": data['username']})

    if existing_user_email :
        return jsonify({'error': 'Email already exists'}), 400  # Zwróć błąd, jeśli adres e-mail już istnieje
    
    if existing_username:
        return jsonify({'error': 'Username already exists'}), 400  # Zwróć błąd, jeśli nazwa użytkownika już istnieje
    
    hashed_password = generate_password_hash(data['password'])

    db.user.insert_one({ # insert the data into the database
        "public_id": str(uuid.uuid4()), 
        "email": data['email'], 
        "password": hashed_password, 
        "username": data['username'],
        "date_created": datetime.datetime.now()
    }).inserted_id

    return jsonify({'message': 'registered successfully'}) # return a message to the user


@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()  # Pobierz dane z żądania

    # Sprawdź, czy dostarczono nazwę użytkownika i hasło
    if 'username' not in data or 'password' not in data:
        return jsonify({'message': 'Username and password are required'}), 400

    username = data['username']
    password = data['password']

    # Znajdź użytkownika o podanym nazwie użytkownika w bazie danych
    user = db.user.find_one({"username": username})

    if not user:
        return jsonify({'message': 'User not found'}), 404

    # Sprawdź, czy hasło jest poprawne
    if check_password_hash(user['password'], password):
        return jsonify({'message': 'Login successful'})
    else:
        return jsonify({'message': 'Login failed'}), 401
    
@auth.route('/logout')
@login_required
def logout():

    return jsonify({'message': 'logout successful'})

    
    