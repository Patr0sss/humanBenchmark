from flask import Blueprint, request, jsonify, make_response
import uuid
from werkzeug.security import generate_password_hash, check_password_hash
from .models import User
from . import db
# import jwt
# import datetime

auth = Blueprint('auth', __name__)

@auth.route('/auth', methods=['POST'])
def register():
    data= request.get_json() # get the data from the request
    hashed_password = generate_password_hash(data['password'], method='sha256')

    new_user = User(public_id=str(uuid.uuid4()), 
                    email=data['email'], 
                    password=hashed_password, 
                    username=data['username'])
    new_user.save() # save the user to the database

    return jsonify({'message': 'registered successfully'}) # return a message to the user

@auth.route('/login', methods=['POST'])
def login():
    auth= request.authorization
    if not auth or not auth.username or not auth.password:
        return make_response('could not verify', 401, {'WWW-Authenticate': 'Basic realm="Login required!"'}) #401 is the status code for unauthorized
    
    user = User.query.filter_by(username=auth.username).first()
    if not user:
        return jsonify({'message': 'user not found'})
    
    if check_password_hash(user.password, auth.password):
       
        return jsonify({'message': 'login successful'})
    else:
        return jsonify({'message': 'login failed'})
    
@auth.route('/logout')
def logout():

    return jsonify({'message': 'logout successful'})


    
    