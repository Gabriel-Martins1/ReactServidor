import { useEffect, useState } from "react";
import InputField from "./inputField";
import Botao from "./BotaoEnviar";

function FormularioCadastro() {
  const [user, setUser] = useState({ nome: "", email: "", telefone: "", nomeMae: "" });
  const [verificacao, setVerificacao] = useState({ erro: "", sucesso: false });
  const [registros, setRegistros] = useState([]);
  // Função para buscar os registros no servidor backend
  const BuscarRegistros = async () => {
    try {
      const response = await fetch('http://localhost:3000/registros');
      const dados = await response.json();
      setRegistros(dados);
    } catch (error) {
      console.error('Erro ao buscar registros:', error);
    }
  };

  useEffect(() => {
    BuscarRegistros()
  }, [])

  useEffect(() => {
    console.log(registros)
  }, [registros])

  useEffect(() => {
    BuscarRegistros();
  }, []);

  const handlerSubmit = async (e) => {
    e.preventDefault();

    if (user.nome.trim() === "") {
      setVerificacao({ erro: "O campo nome não pode ser vazio", sucesso: false });
      return;
    }

    if (user.telefone.length !== 11) {     
      setVerificacao({ erro: "O campo de Telefone deve ter 11 dígitos", sucesso: false });
      return;
    }

    try {
      const resposta = await fetch("http://localhost:3000/registros", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user) 
      });
      
      const resultado = await resposta.json();
      console.log(resultado);

      setVerificacao({ erro: "", sucesso: true });
      setUser({ nome: "", email: "", telefone: "", nomeMae: "" }); // Limpa o formulário
      BuscarRegistros(); // Atualiza a lista após cadastrar

    } catch (erro) {
      console.log("Erro ao conectar ao servidor", erro);
      setVerificacao({ erro: "Erro ao conectar ao servidor", sucesso: false });
    }
  };

  return (
    <div style={{ padding: '20px', color: '#fff' }}>
      <h2>Formulário de Cadastro</h2>
      <form onSubmit={handlerSubmit}>
        {verificacao.erro && <p style={{ color: 'red' }}>{verificacao.erro}</p>}
        {verificacao.sucesso && <p style={{ color: 'green' }}>Cadastrado com sucesso!</p>}

        <InputField
          label="Nome"
          type="text"
          name="nome"
          placeholder="Gabriel..."
          value={user.nome}
          onChange={(e) => setUser(dados => ({ ...dados, nome: e.target.value }))}
        />

        <InputField
          label="Telefone"
          type="tel"
          name="telefone"
          placeholder="11999999999"
          value={user.telefone}
          onChange={(e) => setUser(dados => ({ ...dados, telefone: e.target.value }))}
        />

        <InputField
          label="E-mail"
          type="email"
          name="email"
          placeholder="exemplo@email.com"
          value={user.email}
          onChange={(e) => setUser(dados => ({ ...dados, email: e.target.value }))}
        />

        <InputField
          label="Nome da Mãe"
          type="text"
          name="nomeMae"
          placeholder="Roberta..."
          value={user.nomeMae}
          onChange={(e) => setUser(dados => ({ ...dados, nomeMae: e.target.value }))}
        />

        <Botao texto="Cadastrar" />
      </form>

      <div style={{ marginTop: '20px' }}>
        <p><strong>Nome digitado:</strong> {user.nome}</p>
        <p><strong>Telefone digitado:</strong> {user.telefone}</p>
      </div>
    </div>
  );
}

export default FormularioCadastro;
