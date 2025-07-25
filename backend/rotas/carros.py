from flask import Blueprint, request, jsonify
from pydantic import BaseModel, ValidationError
from typing import List

carros_bp = Blueprint("carros", __name__)


carros = []
contador = 1

class CarroModel(BaseModel):
    marca: str
    modelo: str
    preco: float

@carros_bp.route("/api/carros", methods=["GET"])
def listar_carros():
    return jsonify(carros)

@carros_bp.route("/api/carros", methods=["POST"])
def adicionar_carro():
    global contador
    try:
        dados = CarroModel(**request.json)
        novo = {
            "id": contador,
            "marca": dados.marca,
            "modelo": dados.modelo,
            "preco": dados.preco
        }
        carros.append(novo)
        contador += 1
        return jsonify({"mensagem": "Carro cadastrado com sucesso!"})
    except ValidationError as erro:
        return jsonify({"erro": erro.errors()}), 400
