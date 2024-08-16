//Bloco de importações do código 
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import './style.css';
import api from "./services/api"

function App(){
  const [input, setInput] = useState('');
  const [cnpj, setCNPJ] = useState({});

  async function handleSearch (){

    if(input === ''){
      alert("Preencha algum CNPJ!")
      return;
    }
  
    //Try = executa o que você quer aconteça 
    //Catch = Caso o Try dê errado é utilizado o Catch
    try{
      const response = await api.get(`${input}`)
      setCNPJ(response.data)
      setInput("")
    }catch{
      alert("Erro ao buscar CNPJ!")
      setInput("")
    }
  }

return( 
  <div className="container">
  <h1 className="title">Consultar CPNJ</h1>

  <div className="containerInput">
    <input
    type="text"
    placeholder="Digite o CNPJ..."
    value={input} 
    //OnChange pega qualquer valor que for inserido em Input e altera o valor de Input 
    onChange={(e) => setInput(e.target.value)}
  /> 

  <button className="buttonSearch" onClick={handleSearch}>  
    <FiSearch size={25} color="#FFF"/> 
  </button>
  </div>

  {Object.keys(cnpj).length > 0 &&( //Faz um requisito que irá aparecer a barra de informações apenas quando ter alguma informação inserida
    <main className="main">
      <h2>Razão Social: {cnpj.razao_social}</h2>
      <span>Fundação: {cnpj.data_inicio_atividade}</span>
      <span>Situação Cadastral: {cnpj.descricao_situacao_cadastral}</span>
      <span>Contato: {cnpj.ddd_fax}</span>
      </main>
  )}
  </div>
)
}

  
export default App; //está exportando toda a função "App", para que ela seja utilizada em qualquer outra parte do código
