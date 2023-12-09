
export interface ProgressBarProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
    actualIndex: number,
    totalItens: number,
}