import { useEffect, useState } from "react";
import InputField from "./inputField";
import Botao from "./BotaoEnviar";

function FormularioCadastro() {
  // const [nome, setnome] = useState('');
  // const [email, setemail] = useState('');
  // const [telefone, settelefone] = useState('');
  // const [erro, setErro] = useState('');
  // const [sucesso, setSucesso] = useState(false);
  const [user, setUser] = useState({ nome: "", email: "", telefone: "" });
  const [verificacao, setVerificacao] = useState({erro: "", sucesso:false})
  const [registros, setRegistros] = useState([])
  const BuscarRegistros = async() => {

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
  BuscarRegistros();
}, []);



  useEffect(() => {
  fetch('http://localhost:3000/registros')
  .then(res => res.json())
  .then(dados => console.log(dados))
}, [])

const handleSubmit = async (e) => {
    e.preventDefault();


    if (user.nome.trim() === "") {
      setVerificacao({erro: "O campo nome não pode ser vazio", sucesso: false})
      return
    }

    if (user.telefone.length !== 11) {     
      setVerificacao({erro: "O campo de Telefone deve ter 11 digitos", sucesso: false})
      return
    }



    setVerificacao({erro: "", sucesso: true});
    console.log (user)
    setUser({ nome: "", email: "", telefone: "" })  //envio para o banco

    try {
  const resposta = await fetch("http://localhost:3000/registros", {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(nome, email, telefone)
  });
  const resultado = await resposta.json()
  console.log(resultado)

} catch (erro) {
  console.log("erro ao conectar ao servidor", erro)
}

  };


  return (
    <div>
      <form onSubmit={handleSubmit}>
        { verificacao.erro && <p style={{ color: 'red' }}>{verificacao.erro }</p>}
        {verificacao.sucesso  && <p style={{ color: 'green' }}> {"cadastrado com sucesso!"}</p>}

        <InputField
          label="Nome"
          type="text"
          name="nome"
          placeholder="Gabriel..."
          value={user.nome}
          onChange={(e) => setUser(dados => ({
            ...dados,
            nome: e.target.value
          }))}
        />

        <div>
          <InputField
            label="Telefone"
            type="tel"
            name="telefone"
            placeholder="+55..."
            value={user.telefone}
            onChange={(e) => setUser(dados => ({
            ...dados,
            telefone: e.target.value
          }))}
          />
        </div>

        <InputField
          label="E-mail"
          type="email"
          name="email"
          placeholder="exemplo@email.com"
          value={user.email}
          onChange={(e) => setUser(dados => ({
            ...dados,
            email: e.target.value
          }))}
        />

          
        <InputField
          label="Nome da Mae"
          type="text"
          name="NomeMae"
          placeholder="ROberta"
          value={user.a}
          onChange={(e) => setUser(dados => ({
            ...dados,
            email: e.target.value
          }))}
        />
        <InputField label="Nome da mae" type="text" name="NomeMae" placeholder="Mãe..." />

        <Botao texto="Cadastrar" />
      </form>

      <div>nome: {user.nome}</div>
      <div>telefone: {user.telefone}</div>
    </div>
  );
}
}
export default FormularioCadastro;
