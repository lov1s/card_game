import "./Modal.css"
import React, {FC} from "react";

interface Props {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    resetGame: () => void;
}
const Modal: FC<Props> = ({ setOpenModal, resetGame  }) => {
    if (!open) return null;
    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <div className="titleCloseBtn">
                    <button
                        onClick={() => {
                            setOpenModal(false);
                        }}
                    >
                        X
                    </button>
                </div>
                <div className="title">
                    <h1>Congratulations</h1>
                </div>
                <div className="body">
                    <p>You found all of the matching cards.<br/>
                        Would you like to play again?</p>
                </div>
                <div className="footer">
                    <button
                        onClick={() => {
                            setOpenModal(false);
                        }}
                        id="cancelBtn"
                    >
                        Cancel
                    </button>
                    <button onClick={() => {
                        resetGame();
                        setOpenModal(false);
                    }}>
                        Yes</button>
                </div>
            </div>
        </div>
    );
}

export default Modal