from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Simulação de usuário cadastrado
usuario_mock = {
    "email": "admin@gmail.com",
    "senha": "123456"
}

@app.route("/api/login", methods=["POST"])
def login():
    dados = request.json
    if dados["email"] == usuario_mock["email"] and dados["senha"] == usuario_mock["senha"]:
        return jsonify({"status": "sucesso", "mensagem": "Login realizado com sucesso!"})
    else:
        return jsonify({"status": "erro", "mensagem": "Credenciais inválidas!"}), 401

if __name__ == "__main__":
    app.run(debug=True)
