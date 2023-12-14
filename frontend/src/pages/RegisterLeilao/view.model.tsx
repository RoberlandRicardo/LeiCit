import { useContext, useEffect, useState } from "react";
import { RegisterLeilaoProps } from "./model";
import { Leilao } from "../../@types/entities";
import abiContract from '../../contracts/leicit/abi.json';
import bytecodeContract from '../../contracts/leicit/bytecode.bin';
import Web3 from "web3";
import { MainContext } from "../../stores/mainContext";
import { useNavigate } from "react-router-dom";

const useRegisterLeilaoViewModel = ({}: RegisterLeilaoProps) => {

    const navigate = useNavigate();

    const {accounts} = useContext(MainContext);
    const [indexRegister, setIndexRegister] = useState<number>(0);
    const [newLeilao, setNewLeilao] = useState<Leilao>({
        name: '',
        buyerName: '',
        description: '',
        durationBetweenRounds: 0,
        numberRounds: 0,
        dateEnd: new Date
    });

    async function registerLeilao() {
        let bytecode;
        let file = await fetch(bytecodeContract);
        bytecode = await file.text();

        const web3 = new Web3(window.ethereum);
        const newContract = new web3.eth.Contract(abiContract);

        const deployedContract = newContract.deploy({
            data: '0x' + bytecode,
            arguments: [
                newLeilao.name,
                newLeilao.buyerName,
                newLeilao.description,
                newLeilao.dateEnd.getTime(),
                newLeilao.durationBetweenRounds,
                newLeilao.numberRounds,
            ] as unknown as undefined
        })

        const gas = await deployedContract.estimateGas({
            from: accounts[0],
        });

        try {
            
            const tx = await deployedContract.send({
                from: accounts[0],
                gas: gas.toString(),
                gasPrice: (await web3.eth.getGasPrice()).toString(),
            });
            
            navigate(`/leilao/${tx.options.address}`);

        } catch (error) {
            console.error(error);
        }
    }

    return {
        indexRegister,
        setIndexRegister,
        newLeilao,
        setNewLeilao,
        registerLeilao,
    }
}

export default useRegisterLeilaoViewModel;