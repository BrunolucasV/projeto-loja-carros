import React, { useState } from "react";

function CadastroCliente() {
  const [cliente, setCliente] = useState({
    cpf: "",
    nome: "",
    email: "",
    telefone: "",
  });

  const [mensagem, setMensagem] = useState("");

  const handleChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resposta = await fetch("http://localhost:5000/api/cadastrar_cliente", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cpf: cliente.cpf,
        nome: cliente.nome,
        email: cliente.email,
        telefone: cliente.telefone,
      }),
    });

    const dados = await resposta.json();

    if (resposta.ok) {
      setMensagem(dados.mensagem);
      setCliente({ cpf: "", nome: "", email: "", telefone: "" });
    } else {
      setMensagem(dados.erro || "Erro ao cadastrar.");
    }
  };

  return (
    <div>
      <h2>Cadastro de Cliente</h2>
      <form onSubmit={handleSubmit}>
        <input name="nome" value={cliente.nome} onChange={handleChange} placeholder="Nome" required />
        <input name="cpf" value={cliente.cpf} onChange={handleChange} placeholder="CPF" required />
        <input name="email" value={cliente.email} onChange={handleChange} placeholder="Email" required />
        <input name="telefone" value={cliente.telefone} onChange={handleChange} placeholder="Telefone" required />
        <button type="submit">Cadastrar</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default CadastroCliente;
