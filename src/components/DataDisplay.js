import './general.css'
import ActivityStats from './ActivityStats'

const DataDisplay = (props) => {
    const data = props.data 
    const activities = props.data.stats 

    return (<div>
        Filename: {data.fileName}
        {activities.map((a, i) => (<ActivityStats activity={a} key={i}/>))}
    </div>); 
}

export default DataDisplay; 
