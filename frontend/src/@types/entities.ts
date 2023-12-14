
export interface Leilao {
    name: string,
    description: string,
    buyerName: string,
    numberRounds: number,
    durationBetweenRounds: number,
    dateEnd: Date,
}

export interface DetailedLeilao extends Leilao {
    actualRound: number,
}