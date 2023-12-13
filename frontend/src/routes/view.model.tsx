import { useContext, useEffect, useState } from "react";
import Web3 from "web3";
import { MainContext } from "../stores/mainContext";


const useRoutesViewModel = ({}) => {

    const { accounts } = useContext(MainContext)

    return {
        accounts
    }
}

export default useRoutesViewModel;