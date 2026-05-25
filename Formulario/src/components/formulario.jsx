import { useEffect, useState, useRef } from "react";
import InputField from "./inputField";
import Botao from "./BotaoEnviar";
import { useRegistros } from "../hooks/useRegistros";

function FormularioCadastro() {
  const nomeRef = useRef(null)
  const [user, setUser] = useState({ nome: "", email: "", telefone: "", nomeMae: "" });
  const [verificacao, setVerificacao] = useState({ erro: "", sucesso: false });
  const [indiceEditando, setIndiceEditando] = useState(null)
  const [registros, setRegistros] = useState([]);
  const { registros, carregando, criar, atualizar, deletar } = useRegistros


  const handlerSubmit = async (e) => {
    e.preventDefault();


    if (user.telefone.length !== 11) {
      setVerificacao({ erro: "O campo de Telefone deve ter 11 dígitos", sucesso: false });

      return;
    }

    try {
      if (indiceEditando !== null) {
        await atualizar(indiceEditando, { nome, email, telefone });
      } else {
        await criar({ nome, email, telefone, nomeMae});
      }
    } catch (e) {
      setErroForm(e.message);
    }











    const resultado = await resposta.json();
    console.log(resultado);



  }







  const handlerEditar = async (index) => {
    const registro = registros[index]
    setUser({
      nome: registro.nome,
      email: registro.email,
      telefone: registro.telefone,
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
          inputRef={nomeRef}
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
              <li key={index}>
                {item.nome} - {item.email}

                <div style={{
                  border: '2px solid #F4FF5B',
                  borderRadius: '4px', padding: '4px',
                  boxShadow: '0 0 10px #F4FF5B'
                }}>
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