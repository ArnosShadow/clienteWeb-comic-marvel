/*
  Realizado por Francisco José Jaraba Estévez
*/
import { useRef, useState } from "react";
import Formulario from "./Formulario";
import FeedComicDescripcion from './FeedComicDescripcion'
import '../navbar.css'


export default function NavBar({datos, añadirFavoritos}){
    const [busqueda, setBusqueda] = useState("");
    const [comic,setComic] = useState([]);
    const dialogRef = useRef(null);
    const dialogRefFormulario = useRef(null);

    const encontrar= ()=>{
        if(datos.length >0){
            datos.map((item) => {
                if(busqueda.toLowerCase() === item.title.toLowerCase()){
                    console.log("se ha encontrado");
                    setComic(item);
                }
            })
        }
    }
    const handleSubmit = (item) => {
        // Evitamos que se vaya enviando de manera automatica
        item.preventDefault();  
        encontrar(item);
        openDialog();
        setBusqueda("");
    };
    const handleSearch = (item) => {
        setBusqueda(item.target.value);
    };
    const closeDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.close();
        }
    };
    const openDialog = () => {
        if (dialogRef.current) {
            dialogRef.current.showModal();
        }
    };
    const closeDialogFormulario = () => {
        if (dialogRefFormulario.current) {
            dialogRefFormulario.current.close();
        }
    };
    const openDialogFormulario = () => {
        if (dialogRefFormulario.current) {
            dialogRefFormulario.current.showModal();
        }
    };
    
    return(
            <nav>
                <div className="buscador">
                    <svg viewBox="0 0 24 24" aria-hidden="true" className="search-icon">
                        <g>
                        <path
                            d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 
                            11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 
                            0 4.24-.804 5.808-2.13l3.66 
                            3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 
                            11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 
                            7.5-7.5-3.365-7.5-7.5z"
                        ></path>
                        </g>
                    </svg>

                    <form className="formulario-buscador" onSubmit={handleSubmit}>
                        <input
                            id="query"
                            className="input"
                            type="search"
                            placeholder="Search..."
                            name="searchbar"
                            value={busqueda}
                            onChange={handleSearch}
                        />
                    </form>
                </div>
                <dialog ref={dialogRef}>
                    {comic.length === 0 && <h2>No se ha encontrado el comic</h2>}
                    {comic && <FeedComicDescripcion datos={comic}></FeedComicDescripcion>}
                    <button onClick={closeDialog}>Cerrar</button>
                </dialog>
                
                <button className="boton-contacto" onClick={openDialogFormulario}>Contactanos</button>
                <dialog ref={dialogRefFormulario}>
                    <Formulario closeDialog={closeDialogFormulario}></Formulario>
                </dialog>
            </nav>
    )

}
