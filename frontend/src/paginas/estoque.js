import React, { useState, useEffect } from "react";

function Estoque() {
  const [veiculos, setVeiculos] = useState([]);
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    carregarVeiculos();
  }, []);

  const carregarVeiculos = async () => {
    try {
      const resposta = await fetch("http://localhost:5000/api/veiculos");
      const dados = await resposta.json();

      if (resposta.ok) {
        setVeiculos(dados);  // <-- Correto: carrega todos os veículos do banco
      } else {
        setMensagem("Erro ao carregar veículos.");
        console.error(dados.erro || dados);
      }
    } catch (erro) {
      setMensagem("Erro de conexão com o servidor.");
      console.error("Erro:", erro);
    }
  };

  const removerVeiculo = async (id) => {
    const confirmar = window.confirm("Tem certeza que deseja remover este veículo?");
    if (!confirmar) return;

    try {
      const resposta = await fetch(`http://localhost:5000/api/veiculos/${id}`, {
        method: "DELETE",
      });

      const resultado = await resposta.json();

      if (resposta.ok) {
        setMensagem(resultado.mensagem);
        // Remover o item da lista local
        setVeiculos(veiculos.filter((v) => v.Id_Veiculo !== id));
      } else {
        setMensagem(resultado.erro || "Erro ao deletar veículo.");
      }
    } catch (erro) {
      setMensagem("Erro ao se comunicar com o servidor.");
      console.error("Erro:", erro);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Veículos em Estoque</h2>

      {mensagem && <p style={{ color: "green" }}>{mensagem}</p>}

      {veiculos.length === 0 ? (
        <p>Nenhum veículo disponível no momento.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {veiculos.map((v) => (
              <li key={v.Id_Veiculo}>
                <strong>{v.Modelo}</strong> ({v.Tipo})<br />
                <span style={{ color: "green", fontWeight: "bold" }}>
                  R$ {Number(v.Valor).toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
                <p>{v.Descricao}</p>
                <button
                  onClick={() => removerVeiculo(v.Id_Veiculo)}
                  style={{
                    marginTop: "10px",
                    backgroundColor: "red",
                    color: "white",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Remover
                </button>
              </li>
            ))}

        </ul>
      )}
    </div>
  );
}

export default Estoque;
