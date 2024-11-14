/*
  Realizado por Francisco José Jaraba Estévez
*/
export default function FeedComicFavoritos({favoritos}){
    return(
        <>
        <div className="comics-favoritos-contenedor">
            <h1 className="titulo-comic-favoritos">Comics Favoritos</h1>
            {favoritos.length === 0 && <h3>No tienes favoritos</h3>}
            {favoritos.length != 0 && (
                <div className="comics-favoritos">
                    {favoritos.map((comic) => (
                        comic
                    ))}
                </div>
            )}
           
        </div>
        </>
    )
}