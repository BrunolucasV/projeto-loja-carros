from flask import Blueprint, request, jsonify
from db import conectar
from pydantic import BaseModel, EmailStr, field_validator
from pydantic import ValidationError

cadastro_bp = Blueprint("cadastro_cliente", __name__)

# 🎯 Validação com Pydantic
class ClienteSchema(BaseModel):
    cpf: str
    nome: str
    email: EmailStr
    telefone: str

    @field_validator("cpf")
    def cpf_deve_ter_11_digitos(cls, v):
        if len(v) != 11 or not v.isdigit():
            raise ValueError("CPF deve conter exatamente 11 números.")
        return v

    @field_validator("nome")
    def nome_max_75(cls, v):
        if len(v) > 75:
            raise ValueError("Nome deve ter no máximo 75 caracteres.")
        return v

    @field_validator("telefone")
    def telefone_max_25(cls, v):
        if len(v) > 25:
            raise ValueError("Telefone deve ter no máximo 25 caracteres.")
        return v


@cadastro_bp.route("/api/cadastrar_cliente", methods=["POST"])
def cadastrar_cliente():
    try:
        # Valida com Pydantic
        cliente = ClienteSchema(**request.get_json())
    except ValidationError as e:
        erros = e.errors()
        primeiro_erro = erros[0]
        campo = primeiro_erro.get("loc", ["campo"])[0]
        mensagem = primeiro_erro.get("msg", "Valor inválido.")

        return jsonify({
            "erro": f"O campo '{campo}' é inválido: {mensagem}. Digite um email válido como exemplo@dominio.com. "
        }), 422


    # Extrai os campos após validação
    cpf = cliente.cpf
    nome = cliente.nome
    email = cliente.email
    telefone = cliente.telefone

    conexao = conectar()
    cursor = conexao.cursor(dictionary=True)

    # Verifica duplicidade
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
