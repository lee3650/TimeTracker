import './general.css'
import ActivityStats from './ActivityStats'
import { Link } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useEffect, useState } from 'react';

const DataDisplay = (props) => {
    const data = props.data
    const activities = props.data.stats
    console.log(JSON.stringify(activities))

    const [graphWidth, setGraphWidth]= useState("30%")

    if (graphWidth !== "100%" && window.innerWidth <= 800) {
        setGraphWidth("100%")
    }

    useEffect(() => {

        const onResize = () => {
            if (window.innerWidth <= 800) {
                setGraphWidth("100%")
            }
            else {
                setGraphWidth("30%")
            }
        }

        const cleanupWindowEvent = () => {
            window.removeEventListener('resize', onResize)
        }

        window.addEventListener('resize', onResize)

        return cleanupWindowEvent
    })

    return (<><div className='centerDiv fade-in'>
        <div className='top left absolute'>
            <Link to={'/'} className='cleanLink bold inter normalFont'>Home</Link>
        </div>
        <h1 className='inter titleFont'>
            {data.startDate + ' - ' + data.endDate}
        </h1>

        <p className='courier normalFont'>{data.fileName}</p>
        <ResponsiveContainer width={graphWidth} aspect={1.2}>
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
            <Tooltip />
            <Legend />
            <Bar dataKey="totalTime" fill="#4A4063" />
            <Bar dataKey="streak" fill="#5C6B73" />
        </BarChart>
        </ResponsiveContainer>
    </div>
        <div className='leftDiv marginBottom'>
            <h1 className='inter activityTitle'>Activities</h1>
        {activities.map((a, i) => (<ActivityStats activity={a} key={i} />))}
        </div>
    </>);
}

export default DataDisplay; 
