import express from 'express';
import cors from 'cors'
const servidor = express()
servidor.use(cors())
servidor.use(express.json())

const registros = [] // ""DB"" em tempo de execução

servidor.post('/registros', (req, res) => {
    const dados = req.body //pega o corpo da requisição




    if(!dados.nome){
       return res.status(400).json({ 
        erro: "Campo de nome é obrigatorio!"
    }
    )}

        if(!dados.telefone){
       return res.status(400).json({ 
        erro: "Campo de Telefone é obrigatorio!"
    }
    )}

        if(!dados.email){
       return res.status(400).json({ 
        erro: "Campo de E-mail é obrigatorio!"
    }
    )}

    dados.nome = dados.nome.trim();
    dados.email = dados.email.trim();
    dados.telefone = dados.telefone.trim();

    for (let i = 0; i <registros.length; i++){
        if(registros[i].email.toLowerCase() === dados.email.toLowerCase()){
            return res.status(409).json({
                erro: "Email Repetido"
            })
        }

    }
   
    if (dados.telefone.length !== 11) {
    return res.status(400).json({
        erro: "Telefone repetido. Deve  conter 11 digitos"
    });
    }


 for (let i = 0; i <registros.length; i++){  
        if(registros[i].telefone === dados.telefone){
            return res.status(409).json({
                erro:"Telefone Repetido"
            })
        }

    }



    console.log("dados da requisicao que o frontend me mandou:", (dados));
    
    registros.push(dados); // simulando salvar dados no banco 

    res.status(201).json({
        sucesso: true, 
        mensagem: "Registro criado com sucesso!",
        dados: dados
    });
});

servidor.get('/registros', (req, res) => {
    res.status(200).json(registros)
}) 



servidor.listen(3000, () => {
    console.log("app tá ouvindo na porta padrão (3000)")
})


servidor.get('/', (req, res) => { 
    res.status(200).json({ 
        mensagem: "servidor no ar", 
        status: "ok 100%" 
    }); 
});


servidor.delete("/registros/:id", (req, res) => {
    const id = parseInt(req.params.id)

    if (id < 0 || id>= registros.length) {
        return res.status(404).json({erro: 'registro nao encontrado'})
    }

    registros.splice(id, 1)
    res.status(200).json({mensagem: 'registro removido'})
})


servidor.put("/registros/:id", (req, res) =>{
    const id = parseInt(req.params.id)
    const dados = req.body;

    if(id<0 || id>= registros.length) {
        return res.status(404).json({erro: 'Regitro nao encontrado'})
    }
    if (!dados.nome || dados.nome.trim() === '') {
        return res.status(400).json({erro: 'Nome é obrigatorio'})
    }
    registros[id] = dados; //substituindo o antifo array
    res.status(200).json({mensagem: 'Registro atualizado', dados: registros[id]})
})