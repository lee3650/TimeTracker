import './home.css'
import clockimg from './clockimg.jpg'
import { useRef } from 'react'

export const Homepage = (props) => {

    const tutRef = useRef(null)

    const scrollToRef = () => tutRef.current.scrollIntoView() 

    return (
        <div className='rootdiv'>
            <div className='homediv'>
                <div className='flexdiv'>
                    <div className='textParent'>
                        <h1 className='titleText'>Time Tracker</h1>
                        <p className='copyText'>Track your time declaratively using plain text files. Upload your time data files and visualize them with time tracker. Free and open source, forever.</p>
                        <div className='buttonParent'>
                            <button className='button colorPurple'>Upload file</button>
                            <br />
                            <button className='button colorGreen' onClick={scrollToRef}>How it works</button>
                        </div>
                    </div>
                    <div className='imagediv'>
                        <img src={clockimg} alt='clock graphic' className='image'/>
                    </div>
                </div>
            </div>
            <span className='dot top left'/>
            <a className='bottom left cleanLink lightText textCenter' href="https://www.freepik.com/free-vector/flat-hand-drawn-time-management-concept-with-couple_12067480.htm#query=time%20management&position=18&from_view=search&track=ais">
            .    _         Image by Freepik
            </a>
            <span className='dot bottom left'/>
            <span className='dot bottom right onTop'/>
            <div className='top right onTop'>
                <a href='https://paypal.me/isaaclee58?country.x=US&locale.x=en_US' className='interFont boldText largeText cleanLink'>Donate ❤</a>
                <br/>
                <span/>
                <a href='https://github.com/lee3650/TimeTracker' className='interFont largeText cleanLink lightText'>github</a>
            </div>
            {/* Start the "how it works" section */}
            <div>
                <h1 ref={tutRef}>
                    How it works
                </h1>
                <p>
                    1. Create a text file 
                </p>
                <p>
                    2. Declare activities
                </p>
            </div>
        </div>
    )
}
