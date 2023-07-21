// Este componente se va a renderizar cuando las rutas sean /*, o sea, cuando la búsqueda sea a cualquier cosa que no exista dentro de las rutas ya configuradas, o con ID's que no corresponden a ningún perro (ni de API ni de DB), o con un nombre que no corresponda tampoco, entonces se renderizará el componente pagenotfound, que ostrará un mensaje.
import { Link } from 'react-router-dom';
import styles from './PageNotFound.module.css'; 

export default function PageNotFound() {
    return (
        <div className={styles.container}>
            <div className={styles.NotFound}>
                <div className={styles.message}>
                    <h1>ERROR 404</h1>
                    <h2>PAGE NOT FOUND</h2>
                    <div className={styles.backButton}>
                        <Link to='/home'>
                            <button className={styles.botoncito}>Back to Home</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}