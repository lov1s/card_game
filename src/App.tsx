import React, {useState} from "react";
import './App.css'
import shuffleArray from "./scripts/shuffleArray.ts"

import IconReact from "./assets/react.svg"
import IconNginx from "./assets/nginx.svg"
import IconCss from "./assets/css3.svg"
import IconHtml from "./assets/html5.svg"
import IconJs from "./assets/javascript.svg"
import IconRedux from "./assets/redux.svg"
import IconTs from "./assets/typescript.svg"
import IconWebpack from "./assets/webpack.svg"
import Card from "./components/Card.tsx";
import Modal from "./components/Modal.tsx";
import {CardData} from "./interfaces.ts";

function App() {
    const cardData = [
        {name: "Nginx", image: IconNginx},
        {name: "TS", image: IconTs},
        {name: "React", image: IconReact},
        {name: "HTML", image: IconHtml},
        {name: "Redux", image: IconRedux},
        {name: "JS", image: IconJs},
        {name: "Webpack", image: IconWebpack},
        {name: "CSS", image: IconCss}]
    const cardsDataWithCopy:CardData[] = shuffleArray([...cardData, ...cardData])
    const [cards, setCards] = useState<CardData[]>(cardsDataWithCopy)
    console.log({cards})
    const [matched, setMatched] = useState<number[]>([]);
    const [focused, setFocused] = useState<number[]>([]);
    const [steps, setSteps] = useState<number>(0);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const resetGame = () => {
        setMatched([]);
        setFocused([]);
        setSteps(0);
        setCards((shuffleArray([...cardData, ...cardData])))
    };
    const handleCard = (event: React.MouseEvent) => {

        const cardEle: string | null = (event.target as HTMLElement).getAttribute("data-cell-index");
        const cardPosition: number = parseInt(cardEle !== null ? cardEle : '');
        if (focused.length > 1) return;
        if (isNaN(cardPosition)) return;
        if (
            focused.indexOf(cardPosition) === -1 &&
            matched.indexOf(cardPosition) === -1
        ) {
            if (!focused.length) {
                const selection = [cardPosition];
                setCards(
                    cards.map((ele: CardData) =>
                        ele.id === cardPosition || matched.indexOf(ele.id) > -1
                            ? {...ele, revealed: true}
                            : {...ele}
                    )
                );
                setFocused(selection);
            }else if(focused.length === 1){
                const prevSelection: number = focused[0];
                const selection: number[] = [prevSelection, cardPosition];
                setFocused(selection);
                setSteps(perv => perv + 1)
                if(cards[prevSelection].name === cards[cardPosition].name){
                    const paired = matched.concat(...selection);
                    setCards(
                        cards.map((ele: CardData) =>
                            paired.indexOf(ele.id) > -1
                                ? { ...ele, revealed: true }
                                : { ...ele, revealed: false }
                        )
                    );
                    setMatched(paired);
                    setFocused([]);
                    if(paired.length == 16) {
                        setModalOpen(true)
                    }
                } else {
                    setCards(
                        cards.map((ele: CardData) =>
                            selection.indexOf(ele.id) > -1 || matched.indexOf(ele.id) > -1
                                ? { ...ele, revealed: true }
                                : { ...ele, revealed: false }
                        )
                    );
                    setTimeout(() => {
                        setCards(
                            cards.map((ele: CardData) =>
                                matched.indexOf(ele.id) > -1
                                    ? { ...ele, revealed: true }
                                    : { ...ele, revealed: false }
                            )
                        );
                        setFocused([]);
                    }, 1000)
                }
            }
        }
    }


    return (
        <>
            <div className={"main"}>
                <div className={"main__wrapper"}>
                    <h1 className={"main__title"}>Memory</h1>
                    <div className="main__steps"><p>Steps made {steps}</p></div>
                    <div className={"cards__grid"}>
                        {cards.map((card: CardData, index: number) => (
                             <Card
                                key={card.name + index}
                                data={card}
                                handleCard={handleCard}
                            />
                        ))}
                    </div>
                    <div className="main__attempts"><p>Tries left {40 - steps}</p></div>
                </div>
                {modalOpen && <Modal setOpenModal={setModalOpen} resetGame={resetGame}/>}
            </div>
        </>
    )
}

export default App
