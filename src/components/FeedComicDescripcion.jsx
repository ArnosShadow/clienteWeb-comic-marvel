/*
  Realizado por Francisco José Jaraba Estévez
*/
import { useState, useEffect } from 'react'
import '../descripcion.css'
function FeedComicDescripcion({datos}){
    const[personajes, setPersonajes]=useState([]);
    const[creadores, setCreadores]=useState([]);
    const[historia, setHistoria]=useState("");
    useEffect(
        ()=>{
            const clave=`clave_${datos.id}`;
            const claveTiempo=`claveTiempo_${datos.id}`;
            const ahora= new Date().getTime();
            const TL= 24 * 60 * 60 * 1000;

            //Extraemos y parseamos datos
            const datosCache=localStorage.getItem(clave);
            const datosCacheParseados = JSON.parse(datosCache);
            const tiempoCache=localStorage.getItem(claveTiempo);

            if(datosCacheParseados &&  ahora - parseInt(tiempoCache,10) < TL){
                setHistoria(datosCacheParseados.historia);
                setPersonajes(datosCacheParseados.personajes);
                setCreadores(datosCacheParseados.creadores);
            }
            
            //Creamos un objeto para los nuevos datos
            const introducirNuevosDatos={
                personajes:[],
                creadores:[],
                historia:'',
            };

          fetch(`http://gateway.marvel.com/v1/public/comics/${datos.id}/characters?ts=1&apikey=3c4afa8db77bc819cb596e09cffb4629&hash=e931089b164f15f9384f51dcec32138e`)
          .then(response => response.json())
          .then(json=> {
            
            
            introducirNuevosDatos.personajes = json.data.results;
            setPersonajes(introducirNuevosDatos.personajes);
          })
          fetch(`http://gateway.marvel.com/v1/public/comics/${datos.id}/creators?ts=1&apikey=3c4afa8db77bc819cb596e09cffb4629&hash=e931089b164f15f9384f51dcec32138e`)
          .then(response => response.json())
          .then(json=> {
            introducirNuevosDatos.creadores = json.data.results;
            setCreadores(introducirNuevosDatos.creadores);
          })
          fetch(`http://gateway.marvel.com/v1/public/comics/${datos.id}/stories?ts=1&apikey=3c4afa8db77bc819cb596e09cffb4629&hash=e931089b164f15f9384f51dcec32138e`)
          .then(response => response.json())
          .then(json=> {
            console.log(json.data.results);
            introducirNuevosDatos.historia = json.data.results;
            setHistoria(introducirNuevosDatos.historia);
          })

          //Guardamos los datos
          localStorage.setItem(clave, JSON.stringify(introducirNuevosDatos));
          localStorage.setItem(claveTiempo, ahora.toString());
         }
      , [datos.id])
      
    return(
        <>
           <div className="contenedor-descripcion">
                <div className="imagen-descripcion">
                    <img src={datos.thumbnail?`${datos.thumbnail.path}.${datos.thumbnail.extension}`:''} alt={datos.title} />
                </div>
                <div className="informacion-descripcion">
                    <h2>{datos.title}</h2>
                    <h3>Creadores</h3>
                    {creadores.length ===0 && <p>No hay creadores</p>}
                    {creadores.length > 0 && 
                        creadores.map((creador) => (
                            <p key={creador.id}>{creador.fullName}</p>
                        ))
                    }
                    <h3>Personajes</h3>
                    {personajes.length ===0 && <p>No hay personajes</p>}
                    {personajes.length > 0 && personajes.map((personaje) => {
                        return (
                        <div key={personaje.id} className="personajes-descripcion">
                            <img
                                src={personaje.thumbnail ? `${personaje.thumbnail.path}.${personaje.thumbnail.extension}` : ''}
                                alt={personaje.name}
                            />
                            <p>{personaje.name}</p>
                        </div>
                        );
                    })}
                    <h3>Historia</h3>
                    {historia.length ===0 && <p>No hay historia</p>}
                    {<p> {historia[1]?.type} - {historia[1]?.description}</p>}
                </div>
            </div>
        </>
    )
}
export default FeedComicDescripcion