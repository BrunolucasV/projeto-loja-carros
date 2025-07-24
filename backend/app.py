from flask import Flask
from flask_cors import CORS
from rotas import rotas 

app = Flask(__name__)
CORS(app)

for rota in rotas:
    app.register_blueprint(rota)



if __name__ == "__main__":
    app.run(debug=True)
