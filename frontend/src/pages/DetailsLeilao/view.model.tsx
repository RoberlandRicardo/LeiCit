import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MainContext } from "../../stores/mainContext";
import abiContract from '../../contracts/leicit/abi.json';
import { DetailedLeilao } from "../../@types/entities";

const useDetailsLeilaoViewModel = ({}) => {

    const { address } = useParams();

    const { web3Instance, accounts } = useContext(MainContext);

    if (web3Instance == null) throw "Not instanced web3";

    const loadedContract = new web3Instance.eth.Contract(abiContract, address);

    const mockLeilao: DetailedLeilao = {
        name: "Carregando...",
        buyerName: "",
        description: "Descrevendo",
        durationBetweenRounds: 4,
        numberRounds: 2,
        actualRound: 1,
        dateEnd: new Date,
    }

    const [loadedLeilao, setLoadedLeilao] = useState<DetailedLeilao | null>(mockLeilao);
    const [valueBid, setValueBid] = useState<number>();

    useEffect(() => {
        loadContract()
    }, [])

    async function loadContract() {

        const aux: Array<any> = await loadedContract.methods.getAuctionData.call([]).call();

        setLoadedLeilao({
            name: aux[3],
            description: aux[4],
            buyerName: "",
            actualRound: aux[1],
            numberRounds: 3,
            dateEnd: aux[5],
            durationBetweenRounds: aux[6],
        })
    }

    async function doBid() {
        const methods = loadedContract.methods.doBid as any;
        
        const gas = await methods(valueBid).estimateGas({
            from: accounts[0],
        });

        console.log(gas)

        await methods(valueBid).send({
            from: accounts[0],
            gas: gas.toString(),
            gasPrice: (await web3Instance!.eth.getGasPrice()).toString(),
        })

        setValueBid(undefined);
    }

    return {
        loadedLeilao,
        address,
        valueBid,
        setValueBid,
        doBid
    }
}

export default useDetailsLeilaoViewModel;