import { useState, useEffect } from "react";

const BASE_URL = 'http://localhost:3000/registros';

export function useRegistros() {
    const [registros, setRegistros] = useState([]);
    const [carregando, setCarregando] = useState(false); 
    const [erroForm, setErroForm] = useState('');

  
    const buscar = async () => {
        setCarregando(true);
        setErro('');
        try {
            const res = await fetch(BASE_URL);
            const dados = await res.json();
            setRegistros(dados);
        } catch {
            setErro('Erro ao carregar registros');
        } finally {
            setCarregando(false);
        }
    };

    useEffect(() => {
        buscar();
    }, []);

  
    const criar = async (dados) => {
        try {
            const res = await fetch(BASE_URL, {
                method: 'POST',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(dados)
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.erro || 'Erro ao criar');
            }
            await buscar();
        } catch (e) {
            setErro(e.message);
            throw e;
        }
    };

    const atualizar = async (index, dados) => {
        try {
            const res = await fetch(`${BASE_URL}/${index}`, {
                method: 'PUT',
                headers: { 'Content-type': 'application/json' },
                body: JSON.stringify(dados)
            });
            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.erro || 'Erro ao atualizar registro');
            }
            await buscar(); 
        } catch (e) {
            setErro(e.message);
            throw e;
        }
    };

    const deletar = async (index) => {
        try {
            const resposta = await fetch(`${BASE_URL}/${index}`, { method: 'DELETE' }); 
            if (!resposta.ok) {
                const dados = await resposta.json();
                throw new Error(dados.erro || 'Erro ao remover');
            }
            await buscar(); 
        } catch (e) {
            setErro(e.message || "Erro ao remover. Verifique o servidor");
            throw e;
        }
    };


    return { 
        registros, carregando, erro, buscar,  criar, atualizar, deletar 
    };
}
