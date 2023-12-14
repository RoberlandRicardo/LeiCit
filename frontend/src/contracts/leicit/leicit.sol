// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "./JsmnSolLib.sol";

contract LeiCit {
    //detalhes do contrato
    address public auctionOwner;
    uint256 public auctionDuration; 
    uint256 public durationBetweenRounds;
    uint256 public numberOfRounds;
    string public itemName;
    string public itemDescription;
    string public buyerName;

    //mapeamento para armazenar o endereço da empresa que fez os deploys
    mapping(address => address[]) public deployedContracts;

    //estado do leilão
    enum auctionState { inProgress, finished }
    auctionState public currentState;

    //struct para armazenar as informações dos lances
    struct bid {
        address enterprise;
        uint256 value;
    }

    //mapeamento dos lances por rodada e informações de quem  venceu a rodada
    mapping(uint256 => bid[]) public roundBids;
    uint256 public currentRound;
    uint256 public roundStartTime;
    uint256 public bestRoundValue;
    address enterpriseRoundWinning;

    //eventos para a comunicação com o front end
    event newBid(address indexed enterprise, uint256 value, uint256 round);
    event bestValue(uint256 value, uint256 round);
    event auctionFinished(address enterprise, uint256 value);
    event confirmBidRequest(address indexed enterprise, uint256 value);

    //mapeamento para armazenar as respostas das empresas
    mapping(address => bool) public bidConfirmations;
    
    modifier onlyOwner() {
        require(msg.sender == auctionOwner, "Only the contract owner can call this function");
        _;
    }

    modifier auctionInProgress() {
        require(currentState == auctionState.inProgress, "Auction in progress");
        _;
    }

    //construtor
    constructor(
        string memory _itemName,
        string memory _buyerName,
        string memory _itemDescription,
        uint256 _auctionDuration, 
        uint256 _durationBetweenRounds,
        uint256 _numberOfRounds
    ) {
        auctionOwner = msg.sender;
        auctionDuration = _auctionDuration; 
        durationBetweenRounds = _durationBetweenRounds;
        numberOfRounds = _numberOfRounds;
        currentState = auctionState.inProgress;
        currentRound = 1;
        roundStartTime = block.timestamp;
        itemName = _itemName;
        buyerName = _buyerName;
        itemDescription = _itemDescription;
        deployedContracts[msg.sender].push(address(this));
    }

    // Função auxiliar para converter enum auctionState para string
    function auctionStateToString(auctionState _state) internal pure returns (string memory) {
        if(_state == auctionState.inProgress) {
            return "inProgress";
        }

        return "finished";
    }

    //função para o lance
    function doBid(uint256 _value) external auctionInProgress {
        require(msg.sender != auctionOwner, "The auction owner can not bid");
        // require(block.timestamp < roundStartTime + durationBetweenRounds, "The current round has expired");
        // require(currentRound == 1, "Only the first round is open for bidding");

        roundBids[currentRound].push(bid({
            enterprise: msg.sender,
            value: _value
        }));

        emit newBid(msg.sender, _value, currentRound);
    }

    //função para encerrar a rodada
    function endRound() external onlyOwner auctionInProgress {
        require(block.timestamp >= roundStartTime + durationBetweenRounds, "It is not time to end the round yet");

        bid memory lowestBid; 
        for(uint256 i = 0; i < roundBids[currentRound].length; i++) {
            if(i == 0 || roundBids[currentRound][i].value < lowestBid.value) {
                lowestBid = roundBids[currentRound][i];
            }
        }

        bestRoundValue = lowestBid.value;
        enterpriseRoundWinning = lowestBid.enterprise;

        emit bestValue(bestRoundValue, currentRound);

        if(currentRound == numberOfRounds) {
            currentState = auctionState.finished;
            emit auctionFinished(enterpriseRoundWinning, bestRoundValue);
        }
        else {
            currentRound++;
            roundStartTime = block.timestamp + durationBetweenRounds;
        }
    }

    //função para confirmar a empresa que venceu o leiCit
    function confirmWinner() external onlyOwner auctionInProgress {
        require(currentRound == numberOfRounds, "Confirmation can only be done after the final round");

        address winningEnterprise = enterpriseRoundWinning;

        // Pergunta à empresa vencedora da última rodada
        bool accepted = confirmBid(winningEnterprise, bestRoundValue);

        if (accepted) {
            currentState = auctionState.finished;
            emit auctionFinished(winningEnterprise, bestRoundValue);
        } else {
            for (uint256 i = 1; i < numberOfRounds; i++) {
                address nextEnterprise = roundBids[numberOfRounds - i][0].enterprise;
                uint256 nextBidValue = roundBids[numberOfRounds - i][0].value;

                accepted = confirmBid(nextEnterprise, nextBidValue);

                if (accepted) {
                    currentState = auctionState.finished;
                    emit auctionFinished(nextEnterprise, nextBidValue);
                    break;
                }
            }

            // Se nenhuma aceitar, o leilão não é concluído
        }
    }

    // Função para confirmar o lance e solicitar resposta da empresa via frontend
    function confirmBid(address enterprise, uint256 bidValue) internal returns (bool) {
        emit confirmBidRequest(enterprise, bidValue);

        bool response = bidConfirmations[enterprise];

        return response;
    }

    // Função para as empresas responderem ao pedido de confirmação
    function respondToConfirmBid(bool response) external {
        require(msg.sender != auctionOwner, "Auction owner cannot respond");
        require(currentState == auctionState.inProgress, "Auction must be in progress");

        // Armazenar a resposta da empresa no mapeamento
        bidConfirmations[msg.sender] = response;
    }

    // Definir a função getAuctionData
    function getAuctionData() public view returns (string memory) {
        // Criar um array de tokens com o tamanho suficiente para armazenar os dados
        Token[] memory tokens = new Token;

        // Preencher o array de tokens com os dados
        tokens[0] = Token(uint8(jsmnType.OBJECT), 0, 0, 6); // Objeto JSON com 6 pares chave-valor
        tokens[1] = Token(uint8(jsmnType.STRING), 1, 13, 0); // Chave "currentState"
        tokens[2] = Token(uint8(jsmnType.STRING), 16, uint(uint8(currentState) + 48), 0); // Valor do currentState como string
        tokens[3] = Token(uint8(jsmnType.STRING), 19, 31, 0); // Chave "currentRound"
        tokens[4] = Token(uint8(jsmnType.STRING), 34, uint(uint8(currentRound) + 48), 0); // Valor do currentRound como string
        tokens[5] = Token(uint8(jsmnType.STRING), 37, 51, 0); // Chave "bestRoundValue"
        tokens[6] = Token(uint8(jsmnType.STRING), 54, uint(uint8(bestRoundValue) + 48), 0); // Valor do bestRoundValue como string
        tokens[7] = Token(uint8(jsmnType.STRING), 57, 65, 0); // Chave "itemName"
        tokens[8] = Token(uint8(jsmnType.STRING), 68, 68 + bytes(itemName).length, 0); // Valor do itemName como string
        tokens[9] = Token(uint8(jsmnType.STRING), 71 + bytes(itemName).length, 86 + bytes(itemName).length, 0); // Chave "auctionDuration"
        tokens[10] = Token(uint8(jsmnType.STRING), 89 + bytes(itemName).length, uint(uint8(auctionDuration) + 48), 0); // Valor do auctionDuration como string
        tokens[11] = Token(uint8(jsmnType.STRING), 92 + bytes(itemName).length, 111 + bytes(itemName).length, 0); // Chave "durationBetweenRounds"
        tokens[12] = Token(uint8(jsmnType.STRING), 114 + bytes(itemName).length, uint(uint8(durationBetweenRounds) + 48), 0); // Valor do durationBetweenRounds como string

        // Retornar o array de tokens como uma string JSON usando a função stringify
        return jsmnSol.stringify(tokens);
    }

    function selfDestruct() external onlyOwner auctionInProgress {
        currentState = auctionState.finished;
    }
}