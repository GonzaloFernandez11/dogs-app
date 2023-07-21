// Bueno, LandingPage es un componente más visual, así que solo va a tener una imagen de fondo representativa del proyecto oscurecida y quizás con algo de blur, un h1 con la leyenda 'Welcome to the DOGS-APP' (ya veré con que fuente, color y tamaño), y un botón (encerrado en otro div y en un <Link />) para redirigir a /home.  

import { Link } from 'react-router-dom';
import styles from './LandingPage.module.css'

export default function LandingPage() {
    return (
        <div className={styles.container}>
            <div className={styles.welcomeContainer}>
                <div className={styles.LandingInfo}>
                <Link to={'/home'} className={styles.customLink}>
                    <h1 className={styles.welcome}>WELCOME TO THE <br/>DOG APP!</h1>
                </Link>
                </div>
            </div>
        </div>
    )
}