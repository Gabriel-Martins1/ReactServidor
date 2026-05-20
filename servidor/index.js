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
   
 if(dados.telefone.length !== 11 ){
 for (let i = 0; i <registros.length; i++){  
        if(registros[i].telefone === dados.telefone){
            return res.status(409).json({
                erro:"Telefone Repetido"
            })
        }

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
        mensagem: "vamos nessa, servidor no ar", 
        status: "ok 100%" 
    }); 
});
