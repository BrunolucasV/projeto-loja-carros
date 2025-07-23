import mysql.connector

def conectar():
    try:
        conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="Tef576689@",
            database="lojacarros"
        )
        print("Conexão com o banco estabelecida!")
        return conn
    except Exception as e:
        print("Erro ao conectar:", e)
        raise
