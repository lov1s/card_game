import {BasicData} from "../interfaces.ts";

const shuffleCards = (arr: BasicData[]) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const randomPos = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[randomPos]] = [arr[randomPos], arr[i]];
    }
    return arr.map((card: BasicData, index: number) => ({
        ...card,
        id: index,
        revealed: false,
    }));
}

export default shuffleCards