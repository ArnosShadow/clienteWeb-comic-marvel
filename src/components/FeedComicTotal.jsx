/*
  Realizado por Francisco José Jaraba Estévez
*/
import Comics from "./Comics";
import '../feedComic.css'
//Las llaves desestructuran el objeto que se pasa en la funcion
//Tambien se podria a traves de props ir extrayendo de dicho objeto
function FeedComicTotal({datos, añadirFavoritos}){


    return(
        <>
            <div className="contenedor-comic-total">
                <h1 className="titulo-comic-total">Comics totales</h1>
                <div className="comics-totales">
                    {datos.length === 0 && <h3>Cargando cómics...</h3>}
                    {datos.map((item) => (
                        <Comics key={item.id} item={item} añadirFavoritos={añadirFavoritos}></Comics>
                    ))}
                </div>
            </div>
        </>
    )
}

export default FeedComicTotal
