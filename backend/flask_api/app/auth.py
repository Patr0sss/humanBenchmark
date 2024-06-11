from flask import Blueprint, request, jsonify, make_response, render_template
import uuid
from werkzeug.security import generate_password_hash, check_password_hash
from auth_middleware import token_required
from . import db, app
from flask_cors import CORS
import datetime
from flask_login import login_required
from .models import Users
import jwt
import json

auth = Blueprint('auth', __name__)
CORS(auth, origins="http://localhost:5173", methods=["GET", "POST"])

@auth.route('/auth', methods=['POST'])
def register():
    data = request.get_json()
    
    existing_user_email = db.user.find_one({"email": data['email']})
    existing_username = db.user.find_one({"username": data['username']})

    if existing_user_email:
        return jsonify({'error': 'Email already exists'}), 400
    
    if existing_username:
        return jsonify({'error': 'Username already exists'}), 400
    
    hashed_password = generate_password_hash(data['password'])

    db.user.insert_one({
        "public_id": str(uuid.uuid4()), 
        "email": data['email'], 
        "password": hashed_password, 
        "username": data['username'],
        "date_created": datetime.datetime.now()
    })

    return jsonify({'message': 'registered successfully'})

@auth.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json()

        if 'username' not in data or 'password' not in data:
            return jsonify({'message': 'Username and password are required'}), 400

        username = data['username']
        password = data['password']

        user = Users().login(username, password)
        if user == "user":
            return jsonify({'message': 'User not found'}), 404
        
        if user == "password":
            return jsonify({'message': 'Password incorrect'}), 401

        if user:
            try:
                with open('./config.json') as config_file:
                    config = json.load(config_file)
                token = jwt.encode({'user_id': user['_id'], 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=24)}, 
                                    config['secret_key'], algorithm='HS256')
                user["token"] = token
                return jsonify({'message': 'login successful', 'user': user})
            except Exception as e:
                return jsonify({'message': 'An error occurred', 'error': str(e)}), 500

        return jsonify({
            "message": "Error fetching auth token!, invalid email or password",
            "data": None,
            "error": "Unauthorized"
        }), 404
    except Exception as e:
        return jsonify({'message': 'An error occurred', 'error': str(e)}), 500

@auth.route('/logout')
@token_required
def logout(current_user):
    return jsonify({'message': 'logout successful'})
