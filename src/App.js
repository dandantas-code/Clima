import React, { useState } from "react";

const api = {
  key: "89249d4862ba8789bfed2ea25dbbd30c",
  base: "https://api.openweathermap.org/data/2.5/"
}

function App() {

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState ({});

  const search = evt => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
      .then(res => res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result);
      });
    }
  }

  const dateBuilder = (d) => {
    let meses = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
    let dias = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];

    let dia = dias[d.getDay()];
    let date = d.getDate();
    let mes = meses[d.getMonth()];
    let ano = d.getFullYear();

    return `${dia} ${date} ${mes} ${ano}`
  }
  return (
    <div className="App">
      <main>

        <div className="search-box"> 
          <input 
          type="text" 
          className="search-bar" 
          placeholder="Search..."
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          />
        </div>
        
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{dateBuilder(new Date())}</div>
          </div>

          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}ºC
            </div>
            
          </div>
        </div>
        ) : ('NÃO ENCONTRADO, DIGITE O LOCAL CORRETO!')}

      </main>
    </div>
  );
}

export default App;
