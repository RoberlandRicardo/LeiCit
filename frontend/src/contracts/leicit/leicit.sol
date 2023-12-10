// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

contract LeiCit {
    //detalhes do contrato
    address public auctionOwner;
    uint256 public auctionDuration; 
    uint256 public durationBetweenRounds;
    uint256 public numberOfRounds;
    string public itemName;
    string public itemDescription;
    string public buyerName;

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
    }

    //função para o lance
    function doBid(uint256 _value) external auctionInProgress {
        require(msg.sender != auctionOwner, "The auction owner can not bid");
        require(block.timestamp < roundStartTime + durationBetweenRounds, "The current round has expired");

        roundBids[currentRound].push(bid({
            enterprise: msg.sender,
            value: _value
        }));

        emit newBid(msg.sender, _value, currentRound);
    }

    //função para encerrar a rodada
    function endRound() external auctionInProgress {
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

    function selfDestruct() external onlyOwner auctionInProgress {
        currentState = auctionState.finished;
    }
}