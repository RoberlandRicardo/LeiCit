import CustomButton from '../../components/CustomButton';
import foxWallet from '../../assets/fox_wallet.png';
import styles from './styles.module.css';

function RequestPage() {
    return (
        <main className={styles.requestPage}>
            <div className={styles.card} >
                <h1 className={styles.title}>Bem vindo ao LeiCit</h1>
                <div className={styles.container}>
                    <h3 className={styles.subtitle}>
                        Precisamos acessar informações sobre sua conta 
                        para prosseguir, garanta que está com o metamask
                        instalado e logue em sua carteira.</h3>
                    <img src={foxWallet} className={styles.imageFox} />
                </div>
                <CustomButton style={{
                    width: '50%',
                    height: 40,
                    minWidth: 130,
                    fontSize: 14
                }}> 
                    Fornecer acesso
                </CustomButton>
            </div>
        </main>
    )
}

export default RequestPage;