 import './layout.css'
import './general.css'

const shuffleArray = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

const ActivityStats = (props) => {

    const activity = props.activity

    const remaining = [1,2,3,4,5]

    shuffleArray(remaining)

    const getNextColor = () => { 
        const result = remaining[0]
        remaining.splice(0, 1)
        return result
    }

    return (<div className='flexHorLeft'>
        <div className='flexLeft marginTop marginRight'>
            <div className={'square color' + getNextColor()}></div>
            <div className={'square color' + getNextColor()}></div>
            <div className={'square color' + getNextColor()}></div>
        </div>
        <div>
            <h2 className='inter normalText'>
                {activity.name}
            </h2>
            <ul>
                <li className='inter lightText'>
                    {'🕒 ' + activity.totalTime + ' hours'}
                </li>
                <li className='inter lightText'>
                    {'🔥 ' + activity.streak + ' current streak'}
                </li>
                <li className='inter lightText'>
                    {Number(activity.timePerDay).toFixed(1) + ' hours / day'}
                </li>
                <li className='inter lightText'>
                    {'Highest streak: ' + activity.bestStreak}
                </li>
                <li className='inter lightText'>
                    {'Best day: ' + activity.bestDayString}
                </li>
            </ul>
        </div>
    </div>);
}

export default ActivityStats 