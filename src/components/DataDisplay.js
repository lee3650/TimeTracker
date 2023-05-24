import './general.css'
import ActivityStats from './ActivityStats'
import { Link } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import ErrorDisplay from './ErrorDisplay';

const DataDisplay = (props) => {
    const data = props.data
    const activities = props.data.stats
    console.log(JSON.stringify(activities))

    const CustomTooltip = ({ payload, label, active }) => {

        if (!active){
            return (<></>)
        }

        return (<div className='custom-tooltip'>
            <p className='inter normalFont'>
            {label}
            </p>
            <p className='inter lightText smallFont'>
            {'Total Time: ' + payload[0].payload.totalTime + ' hours'}
            </p>
            <p className='inter lightText smallFont'>
                {`Streak: ${payload[0].payload.streak} days`}
            </p>
        </div>
        )
    }

    return (<><div className='centerDiv fade-in'>
        <div className='top left absolute'>
            <Link to={'/'} className='cleanLink bold inter normalFont'>Home</Link>
        </div>
        <h1 className='inter titleFont'>
            {data.startDate + ' - ' + data.endDate}
        </h1>

        <p className='courier normalFont'>{data.fileName}</p>
        {activities.length > 0 && <ResponsiveContainer width={'30%'} aspect={1.2} minWidth={300}>
            <BarChart
                data={activities}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                className='marginBottomSmall'
            >
                { /*<CartesianGrid strokeDasharray="3 3" />*/}
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip/>}/>
                <Legend />
                <Bar dataKey="totalTime" fill="#4A4063" />
                <Bar dataKey="streak" fill="#5C6B73" />
            </BarChart>
        </ResponsiveContainer>}
    </div>
        <div className='leftDiv marginBottom'>
            <h1 className='inter activityTitle'>Activities</h1>
            {activities.map((a, i) => (<ActivityStats activity={a} key={i} />))}
        </div>
        <ErrorDisplay errors={props.data.errors}/>
    </>);
}

export default DataDisplay; 
