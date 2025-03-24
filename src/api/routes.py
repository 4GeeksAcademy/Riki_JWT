"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
# 🟢 Importamos funciones de JWT para autenticación
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def signup():
    body = request.get_json()

     # 🟢 Validación: aseguramos que se proporcionen email y password
    if not body or not body.get("email") or not body.get("password"):
        return jsonify({"error": "Debes proporcionar email y password"}), 400
    
    # 🟢 Comprobamos si el usuario ya existe para evitar duplicados
    if User.query.filter_by(email=body["email"]).first():
        return jsonify({"error": "El usuario ya existe"}), 400

    try:
        # 🟢 Creamos un nuevo usuario (la contraseña se hasheará en el constructor)
        new_user = User(
            email=body["email"],
            password=body["password"]
        )
        # 🟢 Añadimos el usuario a la sesión de base de datos
        db.session.add(new_user)
        # 🟢 Guardamos los cambios en la base de datos
        db.session.commit()

        return jsonify({"message": "Usuario creado con éxito!!"}), 201

    except Exception as e:
        # 🟢 Si ocurre un error, revertimos los cambios
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
 
 # 🟢 Endpoint para inicio de sesión (generación de token JWT)
@api.route('/login', methods=['POST'])
def create_token():
    # 🟢 Obtenemos los datos del cuerpo de la petición
    body = request.get_json()

    # 🟢 Validación de campos requeridos
    if not body or not body.get("email") or not body.get("password"):
        return jsonify({"error": "Debes proporcionar email y password"}), 400

    # 🟢 Buscamos el usuario por email
    user = User.query.filter_by(email=body["email"]).first()

    # 🟢 Validamos que el usuario exista y la contraseña sea correcta
    if not user or not user.check_password(body["password"]):
        return jsonify({"error": "Credenciales incorrectas"}), 401

    # 🟢 Creamos un token JWT con la identidad del usuario (su ID)
    # 🟢 La identidad se recuperará posteriormente con get_jwt_identity()
    access_token = create_access_token(identity=str(user.id))

    return jsonify({
        "access_token": access_token,  # 🟢 Token para autenticación
        "user": user.serialize()       # 🟢 Datos del usuario (sin contraseña)
    }), 200
