from flask import Blueprint, request, jsonify
from db import conectar
veiculos_bp = Blueprint("veiculos", __name__)


@veiculos_bp.route("/api/veiculos/<int:id_veiculo>", methods=["DELETE"])
def deletar_veiculo(id_veiculo):
    try:
        conexao = conectar()
        cursor = conexao.cursor()

        sql = "DELETE FROM veiculo WHERE Id_Veiculo = %s"
        cursor.execute(sql, (id_veiculo,))
        conexao.commit()

        if cursor.rowcount == 0:
            return jsonify({"erro": "Veículo não encontrado."}), 404

        return jsonify({"mensagem": "Veículo removido com sucesso!"})
    except Exception as e:
        return jsonify({"erro": str(e)}), 500
    finally:
        cursor.close()
        conexao.close()


@veiculos_bp.route("/api/veiculos", methods=["GET"])
def listar_veiculos():
    conexao = conectar()
    cursor = conexao.cursor(dictionary=True)
    cursor.execute("SELECT * FROM veiculo WHERE Disponibilidade = 'Disponível'")
    resultado = cursor.fetchall()
    cursor.close()
    conexao.close()
    return jsonify(resultado)

@veiculos_bp.route("/api/veiculos", methods=["POST"])
def cadastrar_veiculo():
    dados = request.get_json()
    tipo = dados.get("tipo")
    ano = dados.get("ano")
    valor = dados.get("valor")
    modelo = dados.get("modelo")  
    descricao = dados.get("descricao")
    
    try:
        conexao = conectar()
        cursor = conexao.cursor()
        sql = """
            INSERT INTO veiculo (Tipo, Ano, Valor, Modelo, Descricao, Disponibilidade)
            VALUES (%s, %s, %s, %s, %s, 'Disponível')
        """
        valores = (tipo, ano, valor, modelo, descricao) 
        cursor.execute(sql, valores)
        conexao.commit()
        return jsonify({"mensagem": "Veículo cadastrado com sucesso!"})
    except Exception as e:
        return jsonify({"erro": str(e)})