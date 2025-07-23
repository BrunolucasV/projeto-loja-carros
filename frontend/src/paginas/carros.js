import React, { useState } from "react";

function CadastroVeiculo() {
  const [veiculo, setVeiculo] = useState({ marca: "", modelo: "", preco: "", tipo: "", descricao: "" });

  const handleChange = (e) => {
    setVeiculo({ ...veiculo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resposta = await fetch("http://localhost:5000/api/veiculos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(veiculo),
    });
    const dados = await resposta.json();
    alert(dados.mensagem);
    setVeiculo({ marca: "", ano: "", valor: "", tipo: "", descricao: "", modelo: "" });
  };

  return (
    <div>
      <h2>Cadastrar Veículo</h2>
      <form onSubmit={handleSubmit}>
        <input name="marca" placeholder="Marca" value={veiculo.marca} onChange={handleChange} />
        <input name="modelo" placeholder="modelo" value={veiculo.modelo} onChange={handleChange} />
        <input name="ano" placeholder="ano" value={veiculo.ano} onChange={handleChange} />
        <input name="valor" placeholder="valor" value={veiculo.valor} onChange={handleChange} />
        <input name="tipo" placeholder="Tipo (carro/moto)" value={veiculo.tipo} onChange={handleChange} />
        <textarea name="descricao" placeholder="Descrição" value={veiculo.descricao} onChange={handleChange} />
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default CadastroVeiculo;
