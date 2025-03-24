from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean, Text, ForeignKey, Table, Column, Integer
from sqlalchemy.orm import Mapped, mapped_column, relationship
# ✅ 🤙🏼👇👇 Importamos funciones para hashear contraseñas de manera segura
from werkzeug.security import generate_password_hash, check_password_hash
import datetime

db = SQLAlchemy()

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    # ✅ 🤙🏼👇👇 Aumentamos la longitud del campo password para almacenar el hash (no la contraseña en texto plano)
    password: Mapped[str] = mapped_column(String(256), nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False, default=True)

    # ✅ 🤙🏼👇👇 Constructor para la clase User que inicializa con email y password
    def __init__(self, email, password):
        self.email = email
        # 💪 Hasheamos la contraseña al crear el usuario
        self.set_password(password)
        self.is_active = True

    # ✅ 🤙🏼👇👇 Método para establecer la contraseña (hasheada)
    # 👉🏻 generate_password_hash crea un hash unidireccional (no se puede revertir)
    def set_password(self, password):
        self.password = generate_password_hash(password)

    # ✅ 🤙🏼👇👇 Método para verificar si una contraseña coincide con el hash almacenado
    # 👉🏻 check_password_hash compara la contraseña proporcionada con el hash almacenado
    def check_password(self, password):
        return check_password_hash(self.password, password)

    # ✅ 🤙🏼👇👇 Método para convertir el objeto a diccionario (JSON)
    # 👉🏻 NUNCA incluimos la contraseña en la serialización por seguridad
    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "is_active": self.is_active
            # do not serialize the password, its a security breach
        }

