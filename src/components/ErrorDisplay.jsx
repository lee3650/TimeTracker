import './general.css'

const ErrorDisplay = (props) => {

    const errors = props.errors 

    if (!errors || errors.length == 0){
        return (<></>)
    }

    return (
        <div className='marginBottom flexdiv'>
            <div className='errorPanel'>
                <p className='boldText activityLabel'>
                <span className='dot'>❗</span> Warnings
                </p>
                <ul>
                {errors.map(er => (<li className='normalFont lightText'>
                    {er}
                    <br/>
                    <br/>
                </li>))}
                </ul>
            </div>
        </div>
    )
}

export default ErrorDisplay 