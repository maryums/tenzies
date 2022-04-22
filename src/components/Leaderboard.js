import React from 'react'

function Leaderboard(props) {

    const leaderArr = props.leaderboard

    const generateArr = leaderArr
        .sort((a, b) => a.score > b.score ? 1 : -1)
        .map(item => (
            <p>{item.name}: {item.score} attempts</p>
        ))

    return (
        <div>
            <h3>Leaderboard: </h3>
            {generateArr}
        </div>
    )
}

export default Leaderboard