import { useContext, useEffect, useState } from "react";
import Web3 from "web3";
import { MainContext } from "../../stores/mainContext";


const useRequestPageViewModel = ({}) => {


    const { setAccounts, setWeb3Instance } = useContext(MainContext)

    const [accessCount, setAccessCount] = useState<boolean>(false);
    const [waitingRequest, setWaitingRequest] = useState<boolean>(false);

    useEffect(() => {
        searchWallet();
    }, [])

    async function searchWallet() {

        window.addEventListener('load', async function () {
            if (window.ethereum) {
                const web3 = new Web3(window.ethereum);
                setWaitingRequest(true)
                try {
                    const accounts = await web3.eth.requestAccounts();
                    setWeb3Instance(web3)
                    setAccounts([...accounts]);
                } catch (e) {
                    
                    setWaitingRequest(false);
                }
            }
        })
    }

    return {
        waitingRequest,
        searchWallet,
    }
}

export default useRequestPageViewModel;