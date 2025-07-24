from flask import Blueprint, request, jsonify
cadastro_bp = Blueprint("cadastro", __name__)




@cadastro_bp.route("/api/cadastro", methods=["POST"])
def cadastrar_usuario():
    dados = request.json
    print("Usuário cadastrado:", dados) 
    return jsonify({"mensagem": "Cadastro realizado com sucesso!"})
