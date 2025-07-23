import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // 👈 importa o hook

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate(); // 👈 inicializa o hook

  const handleLogin = async (e) => {
    e.preventDefault();

    // Lógica simples de verificação (substitua por chamada real ao backend depois)
    if (email === "admin@email.com" && senha === "123") {
      setMensagem("Login bem-sucedido!");
      navigate("/carros"); // 👈 redireciona para /carros
    } else {
      setMensagem("Email ou senha inválidos.");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
        />
        <br />
        <button type="submit">Entrar</button>
      </form>
      {mensagem && <p>{mensagem}</p>}
    </div>
  );
}

export default Login;
