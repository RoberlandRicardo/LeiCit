import { BrowserRouter, Routes, Route } from "react-router-dom";
import WelcomePage from "./pages/WelcomePage";
import { useContext, useEffect, useState } from "react";
import Web3 from "web3";
import RequestPage from "./pages/RequestPage";
import { MainContext } from "./stores/mainContext";

function App() {

    const { accounts, setAccounts } = useContext(MainContext)

    const [accessCount, setAccessCount] = useState<boolean>(false);

    useEffect(() => {
        searchWallet();
    }, [])

    useEffect(() => {
        if (accounts.length > 0)
            setAccessCount(true)
    }, [accounts])

    async function searchWallet() {
        window.addEventListener('load', async function () {
            if (window.ethereum) {
                const web3 = new Web3(window.ethereum);
                const accounts = await web3.eth.requestAccounts();
                setAccounts(accounts);
                
            }
        })
    }

    if (!accessCount)
        return (
            <RequestPage />
        )

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<WelcomePage />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App;