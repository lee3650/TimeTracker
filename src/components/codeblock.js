import './home.css'

const CodeBlock = (props) => {
    return (
        <div className='codeBlock relative'>
            {props.children}
            <p className='inter white absolute right topHigh normalFont'>
                {props.filename}
            </p>
        </div>
    );
}

export default CodeBlock; 
