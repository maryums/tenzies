import React from 'react'
import Leaderboard from '../components/Leaderboard';

function Popup(props) {
    console.log(props)
    return (
        <div className='modal'>
            <div className="modal_content">
                <span className="close" onClick={props.handleExit}>
                    &times;
                </span>
                <div className='popup_info'>


                    <h2>You Won in {props.attempts} Attempts!</h2>
                    <button onClick={() => props.addToLeaderboard(props.attempts)}> Add your score to the leaderboard</button>

                    <Leaderboard
                        leaderboard={props.leaderboard} />
                </div>

            </div>
        </div>

    )
}

export default Popup