import React, { useState, useEffect } from "react";

function Carros() {
  const [carros, setCarros] = useState([]);
  const [novoCarro, setNovoCarro] = useState({ marca: "", modelo: "", preco: "" });
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api/carros")
      .then((res) => res.json())
      .then((dados) => setCarros(dados));
  }, []);

  const handleChange = (e) => {
    setNovoCarro({ ...novoCarro, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resposta = await fetch("http://localhost:5000/api/carros", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(novoCarro),
    });
    const dados = await resposta.json();
    setMensagem(dados.mensagem);
    setNovoCarro({ marca: "", modelo: "", preco: "" });
  };

  const removerCarro = async (id) => {
    const resposta = await fetch(`http://localhost:5000/api/carros/${id}`, {
      method: "DELETE"
    });
    const dados = await resposta.json();
    alert(dados.mensagem);
    setCarros(carros.filter((carro) => carro.id !== id));
  };

  return (
    <div>
      <h2>Cadastrar Carro</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="marca" value={novoCarro.marca} onChange={handleChange} placeholder="Marca" />
        <input type="text" name="modelo" value={novoCarro.modelo} onChange={handleChange} placeholder="Modelo" />
        <input type="number" name="preco" value={novoCarro.preco} onChange={handleChange} placeholder="Preço" />
        <button type="submit">Cadastrar</button>
      </form>

      <h2>Carros</h2>
      <ul>
        {carros.map((carro) => (
          <li key={carro.id}>
            {carro.marca} {carro.modelo} – R$ {Number(carro.preco).toLocaleString()}
            <button onClick={() => removerCarro(carro.id)}>Remover</button>
          </li>
        ))}
      </ul>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default Carros;
