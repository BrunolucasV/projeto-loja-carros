import React, { useState } from "react";

function App() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const fazerLogin = async (e) => {
    e.preventDefault();

    const resposta = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, senha }),
    });

    const dados = await resposta.json();
    setMensagem(dados.mensagem);
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h2>Login</h2>
      <form onSubmit={fazerLogin}>
        <div>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu e-mail"
            required
          />
        </div>
        <div style={{ marginTop: "10px" }}>
          <label>Senha:</label><br />
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            placeholder="Digite sua senha"
            required
          />
        </div>
        <button type="submit" style={{ marginTop: "15px" }}>Entrar</button>
      </form>
      {mensagem && <p style={{ marginTop: "20px" }}>{mensagem}</p>}
    </div>
  );
}

export default App;
