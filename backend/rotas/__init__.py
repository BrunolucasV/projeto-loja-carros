from .carros import carros_bp
from .veiculos import veiculos_bp
from .cadastro import cadastro_bp
from rotas.cadastrar_cliente import cadastro_bp as cadastro_cliente_bp


rotas = [carros_bp, veiculos_bp, cadastro_bp, cadastro_cliente_bp]
