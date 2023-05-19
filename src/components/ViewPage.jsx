import Spinner from './Spinner'
import DataDisplay from "./DataDisplay";
import { useLocation } from "react-router-dom";

const ViewPage = (props) => {
    const location = useLocation()

    const state = location.state 

    return (<>
        {state != null ? <DataDisplay data={state}/> : <Spinner/>}
    </>)
}

export default ViewPage; 
