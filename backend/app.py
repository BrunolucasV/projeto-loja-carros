from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Simulando banco com lista
carros = []
contador = 1

@app.route("/api/cadastro", methods=["POST"])
def cadastrar_usuario():
    dados = request.json
    print("Usuário cadastrado:", dados)
    return jsonify({"mensagem": "Cadastro realizado com sucesso!"})

@app.route("/api/carros", methods=["GET"])
def listar_carros():
    return jsonify(carros)

@app.route("/api/carros", methods=["POST"])
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

@app.route("/api/carros/<int:carro_id>", methods=["DELETE"])
def deletar_carro(carro_id):
    global carros
    carros = [c for c in carros if c["id"] != carro_id]
    return jsonify({"mensagem": "Carro removido com sucesso!"})

if __name__ == "__main__":
    app.run(debug=True)
