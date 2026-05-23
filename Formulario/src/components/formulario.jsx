import { useEffect, useState, useRef } from "react";
import InputField from "./inputField";
import Botao from "./BotaoEnviar";

function FormularioCadastro() {
  const nomeRef = useRef(null) 
  const [user, setUser] = useState({ nome: "", email: "", telefone: "", nomeMae: "" });
  const [verificacao, setVerificacao] = useState({ erro: "", sucesso: false });
  const [indiceEditando, setIndiceEditando] = useState(null) 
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
    console.log(registros)
  }, [registros])

  useEffect(() => {
    BuscarRegistros() 
    nomeRef.current.focus()
  }, [])

  const handlerSubmit = async (e) => {
    e.preventDefault();

    if (user.telefone.length !== 11) {     
      setVerificacao({ erro: "O campo de Telefone deve ter 11 dígitos", sucesso: false });
 
      return;
    }

  


    try {
      const url = indiceEditando !== null 
      ? `http://localhost:3000/registros/${indiceEditando}`
      : 'http://localhost:3000/registros';

      const method = indiceEditando !== null ? 'PUT' : 'POST'

      const resposta = await fetch(url, {
        method: method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user) 
      });
      
      const resultado = await resposta.json();
      console.log(resultado);

      setVerificacao({ erro: "", sucesso: true });
      setUser({ nome: "", email: "", telefone: "", nomeMae: "" }); // Limpa o formulário
      
      

      setVerificacao({ erro: "", sucesso: true });
      setUser({ nome: "", email: "", telefone: "", nomeMae: "" }); // Limpa todos os campos de vez
      setIndiceEditando(null);

      BuscarRegistros(); // Atualiza a lista após cadastrar

    } catch (erro) {
      console.log("Erro ao conectar ao servidor", erro);
      setVerificacao({ erro: "Erro ao conectar ao servidor", sucesso: false });
    }


  }
    
    const handlerDeletar = async (index) => {
  const confirmou = window.confirm('Deseja remover esse registro?')
  if (!confirmou) return


  try{
    const resposta = await fetch(`http://localhost:3000/registros/${index}`, { method: 'DELETE' })
    if (!resposta.ok){
      const dados = await resposta.json()
        setVerificacao({erro: dados.erro, sucesso: false})
      return
    }
    BuscarRegistros() //atualiza a array
  } catch {
      setVerificacao({erro: "Erro ao remover. Verifique o servidor", sucesso: false})
  }
};



      const handlerEditar = async (index) => {
        const registro = registros [index]
        setUser({
        nome: registro.nome,
        email: registro.email,
        telefone:registro.telefone,
        nomeMae: registro.nomeMae || ""
        });

        setIndiceEditando(index)
        nomeRef.current.focus()
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
          inputRef = {nomeRef}
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

        <Botao texto={indiceEditando !== null ? 'Atualizar' : 'Cadastrar'} />
        {indiceEditando !== null && (
          <button 
            type="button" 
            onClick={() => {
              setIndiceEditando(null); // Desliga a edição e volta ao modo criação
              setUser({ nome: '', email: '', telefone: '', nomeMae: '' }); // Limpa os campos
            }}           >
            Cancelar edição
          </button>
        )}   

        </form>
        
        
        <div> 
        {registros.length > 0 && (
          <ul>
            {registros.map((item, index) => (
            <li key = {index}>
              {item.nome} - {item.email}

              <div style={{border: '2px solid #F4FF5B',
              borderRadius: '4px', padding: '4px',
              boxShadow: '0 0 10px #F4FF5B'}}>
              <button onClick={() => handlerDeletar(index)}>
              Deletar
              </button>
              <button onClick={() => handlerEditar(index)}>
                Editar
              </button>
              </div>

             
            </li>
            ))}
          </ul>

        )}
      </div>



    </div>

  );
}

export default FormularioCadastro;