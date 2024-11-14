/*
  Realizado por Francisco José Jaraba Estévez
*/
import '../feedComic.css'
import { useRef,useEffect,useState } from "react";
import FeedComicDescripcion from './FeedComicDescripcion';

export default function Comics({item, añadirFavoritos}){
    const dialogRef = useRef(null);
    const[favoritos,setFavoritos]=useState([]);
    const [esFavorito, setEsFavorito] = useState(false);
    const comicImageUrl = `${item.thumbnail.path}.${item.thumbnail.extension}`;


    //Cargar datos desde la caché.
    useEffect(() => {
        const favoritosCache=localStorage.getItem('favoritosComics');
        if(favoritosCache){
            const favoritosCacheParseado = JSON.parse(favoritosCache);
            setFavoritos(favoritosCacheParseado);

            favoritosCacheParseado.forEach(item =>{
                const comicComponent = (
                    <Comics
                        key={item.id}
                        item={item}
                        añadirFavoritos={añadirFavoritos}
                    />
                );
                añadirFavoritos(comicComponent);
            })
        }
    }, []);

    //Guardar los datos en la Caché
    useEffect(() => {
        localStorage.setItem('favoritosComics', JSON.stringify(favoritos));
    }, [favoritos]);

    const handleFavorito = () => {
        setEsFavorito(anterior => !anterior);

        const existeFavorito=favoritos.find(item => item.id != item.id);
        let nuevosFavoritos;

        if(existeFavorito){
            nuevosFavoritos= favoritos.filter(item => item.id != item.id);
        }else{
            nuevosFavoritos =[...favoritos, item]
        }

        setFavoritos(nuevosFavoritos);

        const comicComponent = (
            <Comics
                key={item.id}
                item={item}
                añadirFavoritos={añadirFavoritos}
            />
        );
        añadirFavoritos(comicComponent);
    };
    const openDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.showModal();
        }
    };

    const closeDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.close();
        }
    };
    return(
        <div key={item.id} style={{ backgroundImage: `url(${comicImageUrl})`}} className="comic">
            <button onClick={handleFavorito}  className="boton-comic-favorito">
                <span className="icono-comic-favorito">
                    <svg viewBox="0 0 24 24" width="40px" height="40px" xmlns="http://www.w3.org/2000/svg" className={esFavorito ? "icono-lleno" : "icono-vacio"}>
                        <path fill="none" d="M0 0H24V24H0z"></path>
                        <path d="M16.5 3C19.538 3 22 5.5 22 9c0 7-7.5 
                        11-10 12.5C9.5 20 2 16 2 9c0-3.5 2.5-6 5.5-6C9.36 
                        3 11 4 12 5c1-1 2.64-2 4.5-2zm-3.566 15.604c.881-.556 
                        1.676-1.109 2.42-1.701C18.335 14.533 20 11.943 20 
                        9c0-2.36-1.537-4-3.5-4-1.076 0-2.24.57-3.086 1.414L12 
                        7.828l-1.414-1.414C9.74 5.57 8.576 5 7.5 5 5.56 5 4 6.656 4 
                        9c0 2.944 1.666 5.533 4.645 7.903.745.592 1.54 1.145 2.421
                        1.7.299.189.595.37.934.572.339-.202.635-.383.934-.571z"></path>
                    </svg>
                </span>
            </button>
            <p>{item.title}</p>
            <button className="boton-abrir-comics" onClick={openDialog}>
                Leer más
            </button>
            <dialog ref={dialogRef}>
                <FeedComicDescripcion datos={item} añadirFavoritos={añadirFavoritos}></FeedComicDescripcion>
                <button onClick={closeDialog}>Cerrar</button>
            </dialog>
        </div>
    )

}