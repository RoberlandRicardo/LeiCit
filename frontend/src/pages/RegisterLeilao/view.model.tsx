import { useContext, useEffect, useState } from "react";
import { RegisterLeilaoProps } from "./model";
import { Leilao } from "../../@types/entities";
import abiContract from '../../contracts/leicit/abi.json';
import bytecodeContract from '../../contracts/leicit/bytecode.bin';
import Web3 from "web3";
import { MainContext } from "../../stores/mainContext";

const useRegisterLeilaoViewModel = ({}: RegisterLeilaoProps) => {

    const {accounts} = useContext(MainContext);
    const [indexRegister, setIndexRegister] = useState<number>(0);
    const [newLeilao, setNewLeilao] = useState<Leilao>({
        name: '',
        buyerName: '',
        description: '',
        durationBetweenRounds: 0,
        numberRounds: 0,
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
                0,
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
            console.log('Contract deployed at address: ' + tx.options.address);

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