/*
  Realizado por Francisco José Jaraba Estévez
*/
import { useForm } from "react-hook-form";
import '../descripcion.css';
export default function Formulario({closeDialog}) {
    const {register, handleSubmit, reset, formState: { errors }} = useForm();

    function onSubmit(data) {
        console.log(data);
        reset();
    }
    
    return (
        <>  
            <h2>Rellena el siguiente formulario</h2>
            <form className="formulario-contacto" onSubmit={handleSubmit(onSubmit)}>
                <input className="formulario-input" {...register('nombre',{required: 'Obligatorio'})} placeholder="Introduce el nombre"/>
                {errors.nombre && <p>{errors.nombre.message}</p>}
                <input className="formulario-input" {...register('email',{required: 'Obligatorio'})} placeholder="Introduce email"/>
                {errors.email && <p>{errors.email.message}</p>}
                <input className="formulario-input" {...register('peticion')} placeholder="Introduce su peticion"/>
                {errors.peticion && <p>{errors.peticion.message}</p>}
                <button className="boton-enviar">Enviar</button>
                <button className="boton-cancelar" onClick={closeDialog}>Cancelar</button>
            </form>
        </>
    );
}
