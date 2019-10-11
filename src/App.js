import React from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends React.Component {

  state={
    lista:[],
    itemPagina:0
  }

  async componentDidMount(){
    var dados = await this.pegarDados();
    this.setState({lista:dados.data})
  }

  async pegarDados(filtro){
    var requisicao = await axios
    .get('https://kitsu.io/api/edge/characters?page[limit]=5&'+
    'page[offset]='+this.state.itemPagina+
    (filtro ? '&filter[name]='+filtro : '') )
    return requisicao.data
  }

  async filtrar(filtro){
    var dados = await this.pegarDados(filtro);
    this.setState({lista:dados.data, itemPagina: filtro? 0:this.state.itemPagina})
  }

  voltarPagina(){
    this.setState({itemPagina:this.state.itemPagina-5},this.filtrar)
    
  }
  avancaPagina(){
    this.setState({itemPagina:this.state.itemPagina+5},this.filtrar)
    
  }

  render(){
    return (
    <div className="App">
      <header className="App-header">
      
        <input onChange={(acao)=>this.filtrar(acao.target.value)}
        style={{width:350}} />
      <ul>
        {this.state.lista.length > 0 ?
          this.state.lista.map(item=>(
            <li style={{
              height:75, 
            display:'flex'
            ,border:'1px solid white'
            ,padding:10,
            marginBottom:5}} >
              <div style={{display:'flex',flex:2}}>
              <img src={item.attributes.image ? 
                item.attributes.image.original:''}
              height='75' alt=''/>
              {item.attributes.name}
              </div>
              
              <div style={{overflow:'auto',flex:3}}>
              {item.attributes.description}

              </div>
             </li>
        )) : 'Não tem registros com esses filtros' }
      </ul>
      <div style={{display:'flex'}}>
      <button onClick={this.voltarPagina.bind(this)}
        disabled={this.state.itemPagina === 0}
      >
          Voltar
        </button>
        <div>
          {(this.state.itemPagina/5)+1}
        </div>
        <button onClick={this.avancaPagina.bind(this)}>
          Avançar
        </button>
      </div>
      </header>
    </div>
  );
  }
}

export default App;