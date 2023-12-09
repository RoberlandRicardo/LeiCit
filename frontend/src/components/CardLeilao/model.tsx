
export interface CardLeilaoProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    name: string,
    creator: string,
    dateInit: Date,
    rounds: number,
    onClickDetail: Function,
}