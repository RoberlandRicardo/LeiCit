
import { useEffect, useRef } from 'react';
import TopBar from '../../components/TopBar';
import RegisterLeilao from '../RegisterLeilao';
import SearchLeilao from '../SearchLeilao';
import StartSection from '../StartSection';
import styles from './styles.module.css';

function WelcomePage() {

    const startSectionRef = useRef(null);
    const searchLeilaoRef = useRef(null);
    const registerLeilaoRef = useRef(null);

    return (
        <main>
            <TopBar 
                startSectionRef={startSectionRef}
                searchLeilaoRef={searchLeilaoRef}
                registerLeilaoRef={registerLeilaoRef}
            />
            <StartSection innerRef={startSectionRef}/>
            <SearchLeilao innerRef={searchLeilaoRef} />
            <RegisterLeilao innerRef={registerLeilaoRef} />
        </main>
    )
}

export default WelcomePage;