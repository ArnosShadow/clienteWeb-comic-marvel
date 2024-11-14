/*
  Realizado por Francisco José Jaraba Estévez
*/
import { useState, useEffect } from "react";
import Comics from "./Comics";

export default function FeedComicReciente({ comics, añadirFavoritos }) {
    const [indiceActual, setIndiceActual] = useState(0);
    const [comicsRecientes, setComicsRecientes] = useState([]);
    
    useEffect(() => {
        console.log("Datos recibidos:", comics);
        const comicsRecientes = comics
            .filter((comic) => {
                const onsaleDate = comic.dates.find((date) => date.type === "focDate");
                return onsaleDate?.date;
            })
            .sort((a, b) => {
                const dateA = a.dates.find((date) => date.type === "focDate")?.date;
                const dateB = b.dates.find((date) => date.type === "focDate")?.date;
                return dateB.localeCompare(dateA);
            })
            .slice(0, 5);
            setComicsRecientes(comicsRecientes);
    }, [comics]);

    const siguienteComic = () => {
        setIndiceActual((prevIndice) =>
            prevIndice === comicsRecientes.length - 1 ? 0 : prevIndice + 1
        );
    };

    const anteriorComic = () => {
        setIndiceActual((prevIndice) =>
            prevIndice === 0 ? comicsRecientes.length - 1 : prevIndice - 1
        );
    };

    return (
        <div className="comics-recientes-contenedor">
            <h1 className="titulo-comic-reciente">Comics Recientes</h1>
            {comicsRecientes.length === 0 && <h3>Cargando cómics...</h3>}
            {comicsRecientes.length !== 0 && (
                <>
                    <div className="carrusel-comics">
                        <button className="boton-carrusel" onClick={anteriorComic}>
                            ←
                        </button>

                        <div className="comic-carrusel">
                            <Comics
                                key={comicsRecientes[indiceActual].id}
                                item={comicsRecientes[indiceActual]}
                                añadirFavoritos={añadirFavoritos}
                            />
                        </div>

                        <button className="boton-carrusel" onClick={siguienteComic}>
                            →
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
