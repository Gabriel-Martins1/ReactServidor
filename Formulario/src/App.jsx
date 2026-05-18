import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Cabecalho from './components/Cabecalho'
import Footer from './components/Footer'
import InputField from './components/inputField'
import FormularioCadastro from './components/Formulario'
import { useEffect, useState } from 'react'
import Contador from './components/Contador'
function App() {
 useEffect(() => {
 //codigo executa aqui
 console.log("contador apareceu na tela!")
 }, [])
 
  return (
    <>
      <div>
        <Cabecalho></Cabecalho>
      </div>

      <div>
        <FormularioCadastro> </FormularioCadastro>
      </div>

      <div>
        <Footer /> 
      </div>

      <div>
        <Contador></Contador>
      </div>

    </>
  )
}





export default App

