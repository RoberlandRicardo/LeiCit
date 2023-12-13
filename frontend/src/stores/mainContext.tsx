import React, { useState, useReducer, useContext, useEffect } from 'react';
import Web3 from 'web3';
import { RegisteredSubscription } from 'web3/lib/commonjs/eth.exports';

interface MainContextProps {
    accounts: Array<string> 
    setAccounts: React.Dispatch<React.SetStateAction<Array<string>>>,
    web3Instance: Web3<RegisteredSubscription> | null,
    setWeb3Instance: React.Dispatch<React.SetStateAction<Web3<RegisteredSubscription> | null>>
}

const initialValue: MainContextProps = {
    accounts: [],
    setAccounts: () => [],
    web3Instance: null,
    setWeb3Instance: () => {},
}

export const MainContext = React.createContext<MainContextProps>(initialValue);

interface ProviderProps {
    children: React.ReactNode
}

function MainContextProvider({children}: ProviderProps) {

    const [accounts, setAccounts] = useState<Array<string>>([]);
    const [web3Instance, setWeb3Instance] = useState<Web3<RegisteredSubscription> | null>(null);

    const valueProvider = {
        accounts,
        setAccounts,
        web3Instance,
        setWeb3Instance,
    }

    return (
        <MainContext.Provider value={valueProvider} >
            {children}
        </MainContext.Provider>
    )
}

export default MainContextProvider;