import './home.css'
import DataDisplay from "./DataDisplay";

// constructor(name, totalTime, streak, bestStreak, timePerDay, bestDayString)

const data = {
    startDate: 'May 15, 2023', 
    endDate: 'May 31, 2023', 
    fileName: 'exampletracking.md', 
    stats: [
        {
            name: 'Development', 
            totalTime: 16.8, 
            streak: 7, 
            bestStreak: 5, 
            timePerDay: 1.03, 
            bestDayString: 'May 21, 2023, 3.43 hours', 
        }, 
        {
            name: 'Reading', 
            totalTime: 12.2, 
            streak: 4, 
            bestStreak: 6, 
            timePerDay: 0.74, 
            bestDayString: 'May 30, 2023, 1.56 hours', 
        }, 
    ], 
}

const ExamplePage = (props) => {
    return (<>
        <DataDisplay data={data} />
    </>);
}

export default ExamplePage; 
