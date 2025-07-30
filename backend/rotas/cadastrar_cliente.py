from flask import Blueprint, request, jsonify
from db import conectar

cadastro_bp = Blueprint("cadastro_cliente", __name__)

@cadastro_bp.route("/api/cadastrar_cliente", methods=["POST"])
def cadastrar_cliente():
    dados = request.get_json()
    cpf = dados.get("cpf")
    nome = dados.get("nome")
    email = dados.get("email")
    telefone = dados.get("telefone")

    conexao = conectar()
    cursor = conexao.cursor(dictionary=True)

    # Verifica duplicidade por CPF, email ou telefone
    cursor.execute("""
        SELECT * FROM cliente 
        WHERE CPF = %s OR Email = %s OR Telefone = %s
    """, (cpf, email, telefone))
    existente = cursor.fetchone()

    if existente:
        cursor.close()
        conexao.close()
        return jsonify({"erro": "CPF, email ou telefone já cadastrados."}), 400

    # Inserção
    cursor.execute("""
        INSERT INTO cliente (CPF, Nome, Email, Telefone)
        VALUES (%s, %s, %s, %s)
    """, (cpf, nome, email, telefone))
    
    conexao.commit()
    cursor.close()
    conexao.close()

    return jsonify({"mensagem": "Cliente cadastrado com sucesso!"})
