import React, { useState, useReducer, useContext, useEffect } from 'react';

interface MainContextProps {
    accounts: Array<string> 
    setAccounts: React.Dispatch<React.SetStateAction<Array<string>>>,
}

const initialValue: MainContextProps = {
    accounts: [],
    setAccounts: () => [],
}

export const MainContext = React.createContext<MainContextProps>(initialValue);

interface ProviderProps {
    children: React.ReactNode
}

function MainContextProvider({children}: ProviderProps) {

    const [accounts, setAccounts] = useState<Array<string>>([]);

    const valueProvider = {
        accounts,
        setAccounts,
    }

    return (
        <MainContext.Provider value={valueProvider} >
            {children}
        </MainContext.Provider>
    )
}

export default MainContextProvider;