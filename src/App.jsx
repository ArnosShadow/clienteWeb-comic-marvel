/*
  Realizado por Francisco José Jaraba Estévez
*/
import { useState, useEffect } from 'react'
import NavBar from './components/NavBar'
import './App.css'
import FeedComicTotal from './components/FeedComicTotal'
import FeedComicFavoritos from './components/FeedComicFavoritos'
import FeedComicReciente from './components/FeedComicReciente'

function App() {
  const [datos, setDatos]=useState([]);
  const[favoritos, setFavoritos] = useState([]);
  
  const añadirFavoritos = (comicComponent) => {
    setFavoritos((prevFavoritos) => {
        if (prevFavoritos.some((comic) => comic.key === comicComponent.key)) {
          return prevFavoritos.filter((comic) => comic.key !== comicComponent.key);
        }
        return [...prevFavoritos, comicComponent];
    }); 
  };
  useEffect(
    ()=>{
      fetch(`http://gateway.marvel.com/v1/public/comics?ts=1&apikey=3c4afa8db77bc819cb596e09cffb4629&hash=e931089b164f15f9384f51dcec32138e`)
      .then(response => response.json())
      .then(json=> {
        setDatos(json.data.results);
      })
     }
  , []);
  return (
    <>
      <NavBar datos={datos}  añadirFavoritos={añadirFavoritos}></NavBar>
      <FeedComicReciente comics={datos} añadirFavoritos={añadirFavoritos}></FeedComicReciente>
      <FeedComicFavoritos favoritos={favoritos}></FeedComicFavoritos>
      <FeedComicTotal datos={datos} añadirFavoritos={añadirFavoritos}></FeedComicTotal>
    </>
  )
}

export default App
 
 
/*
Se han extraido componentes de 
  https://uiverse.io/SalladShooter/hot-rattlesnake-30
  https://uiverse.io/LilaRest/lazy-lionfish-12
  https://uiverse.io/LightAndy1/tidy-pig-67
*/