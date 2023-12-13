import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MainContext } from "../../stores/mainContext";
import abiContract from '../../contracts/leicit/abi.json';

const useDetailsLeilaoViewModel = ({}) => {

    const { address } = useParams();

    const { web3Instance } = useContext(MainContext);

    useEffect(() => {
        loadContract()
    }, [])

    async function loadContract() {

        if (web3Instance == null) throw "Not instanced web3";

        const loadedContract = new web3Instance.eth.Contract(abiContract, address);

        // const aux = loadedContract.
    }

    return {
    }
}

export default useDetailsLeilaoViewModel;