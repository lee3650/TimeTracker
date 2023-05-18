import './home.css'

const CodeBlock = (props) => {
    return (
        <div className='codeBlock relative'>
            {props.children}
            <p className='inter white absolute right topHigh'>
                {props.filename}
            </p>
        </div>
    );
}

export default CodeBlock; 
