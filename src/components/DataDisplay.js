import './general.css'
import ActivityStats from './ActivityStats'
import { Link } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const DataDisplay = (props) => {
    const data = props.data
    const activities = props.data.stats
    console.log(JSON.stringify(activities))

    return (<><div className='centerDiv fade-in'>
        <div className='top left absolute'>
            <Link to={'/'} className='cleanLink bold inter'>Home</Link>
        </div>
        <h1 className='inter titleFont'>
            {data.startDate + ' - ' + data.endDate}
        </h1>

        <p className='courier'>{data.fileName}</p>
        <BarChart
            width={500}
            height={400}
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
            <Tooltip />
            <Legend />
            <Bar dataKey="totalTime" fill="#4A4063" />
            <Bar dataKey="streak" fill="#5C6B73" />
        </BarChart>
    </div>
        <div className='leftDiv marginBottom'>
            <h1 className='inter'>Activities</h1>
        {activities.map((a, i) => (<ActivityStats activity={a} key={i} />))}
        </div>
    </>);
}

export default DataDisplay; 
