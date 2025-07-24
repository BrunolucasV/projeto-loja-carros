from flask import Blueprint, request, jsonify
carros_bp = Blueprint("carros", __name__)

# Simulando um banco com lista
carros = []
contador = 1

@carros_bp.route("/api/carros", methods=["GET"])
def listar_carros():
    return jsonify(carros)

@carros_bp.route("/api/carros", methods=["POST"])
def adicionar_carro():
    global contador
    dados = request.json
    novo = {
        "id": contador,
        "marca": dados["marca"],
        "modelo": dados["modelo"],
        "preco": dados["preco"]
    }
    carros.append(novo)
    contador += 1
    return jsonify({"mensagem": "Carro cadastrado com sucesso!"})
