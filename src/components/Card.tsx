import CardBack from "../assets/back.jpg";
import React, {FC} from "react";
import {CardData} from "../interfaces.ts";

interface Props {
    data: CardData;
    handleCard: (event:  React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}
const Card: FC<Props> = ({data, handleCard}) => {
    return <div className={"grid__item"}>
        <div className={`card ${data.revealed ? 'flip' : ''}`} onClick={handleCard}>
            <img
                data-cell-index={data.id}
                className="card__back"
                src={CardBack}/>
            <img
                data-cell-index={data.id}
                className="card__front"
                src={data.image}
                alt={data.name}/>

        </div>
    </div>
}

export default Card