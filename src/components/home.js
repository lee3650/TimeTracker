import './home.css'
import clockimg from './clockimg.jpg'
import { useRef, useState, useEffect } from 'react'
import CodeBlock from './codeblock'
import { Link } from 'react-router-dom'
import Spinner from './Spinner'

export const Homepage = (props) => {

    const tutRef = useRef(null)

    const [loading, setload] = useState(true)

    const scrollToRef = () => tutRef.current.scrollIntoView({ behavior: 'smooth'}) 

    const setLoadFalse = () => setload(false)
    const onLoad = () => {setTimeout(setLoadFalse, 500); console.log('on load!')}

    useEffect(() => {
        document.title = '🕑 Time Tracker';
    }, []);

    return (<> {loading && <Spinner/>} 
            <div className='rootdiv'>
            <div className={'homediv' + (loading ? '' : ' fade-in')}>
                <div className='flexdiv'>
                    <div className='textParent'>
                        <h1 className='titleText' rel='preload'>Time Tracker</h1>
                        <p className='copyText'>Track your time declaratively using plain text files. Upload your time data files and visualize them with time tracker. Free and open source, forever.</p>
                        <div className='buttonParent'>
                            <button className='button colorPurple'>Upload file</button>
                            <br />
                            <button className='button colorGreen' onClick={scrollToRef}>How it works</button>
                        </div>
                    </div>
                    <div className='imagediv'>
                        <img onLoad={onLoad} src={clockimg} alt='clock graphic' className='image'/>
                    </div>
                </div>
            </div>
            {loading ? null : <div className='top right onTop absolute'>
                <a href='https://paypal.me/isaaclee58?country.x=US&locale.x=en_US' className='interFont boldText largeText cleanLink'>Donate ❤</a>
                <br/>
                <span/>
                <a href='https://github.com/lee3650/TimeTracker' className='interFont largeText cleanLink lightText'>github</a>
                <br/>
                <a className='left largeText cleanLink lightText' href="https://www.freepik.com/free-vector/flat-hand-drawn-time-management-concept-with-couple_12067480.htm#query=time%20management&position=18&from_view=search&track=ais">
                freepik
                </a>
            </div>}
            {/* Start the "how it works" section */}
            <div className='tutorialDiv'>
                <h1 ref={tutRef} className='massiveText'>
                    How it works
                </h1>
                <h2 className='extraLargeText'>
                    1. Create a text file 
                </h2>
                <h2 className='extraLargeText'>
                    2. Declare activities
                </h2>
                <p className='interFont lightText'>
                    Declare the activities you're interested in tracking using the syntax “Activity: Activity name”. 
                </p>
                <div className='codeBlock relative'>
                    <p className='courierFont white'>
                        Activity: Web development
                    </p>
                    <p className='inter white absolute right topHigh'>
                        timetracking.md
                    </p>
                </div>
                <h2 className='extraLargeText'>
                    3. Track activities
                </h2>
                <p className='interFont lightText'>
                    First, type the date in the format “### YYYY/MM/DD”. Then, type the name and activity using the format `HH:MM [AM | PM] - HH:MM [AM | PM], activity name`. 
                </p>
                <div className='codeBlock relative'>
                    <p className='courierFont white'>
                        Activity: Web development
                    </p>
                    <p className='courierFont white'>
                        ### 2023/05/19
                    </p>
                    <p className='courierFont white'>
                    9:30 AM - 11:30 AM, web development // case insensitive
                    </p>
                    <p className='inter white absolute right topHigh'>
                        timetracking.md
                    </p>
                </div>
                <h2 className='extraLargeText'>
                    4. Visualize data
                </h2>
                <p className='interFont lightText'>
                    Upload the file on the main page, and see total times, streaks, and other stats for each activity you've declared. 
                </p>
                <Link to='/example' className='cleanLink interFont'>See an example</Link>
                <br/>
                <br/>
                <CodeBlock filename='timetracking.md'>
                    <p className='courierFont white'>
                        Activity: Web development
                    </p>
                    <p className='courierFont white'>
                        Activity: write; Rest Days: Mon, Wed // rest days don't affect streak
                    </p>
                    <p className='courierFont white'>
                        ### 2023/05/19
                    </p>
                    <p className='courierFont white'>
                    9:30 AM - 11:30 AM, web development // case insensitive
                    </p>
                    <p className='courierFont white'>
                    11:45 AM - 2:12 PM, write
                    </p>
                    <p className='courierFont white'>
                    ### 2023/05/18
                    </p>
                    <p className='courierFont white'>
                        9:17 AM - 11:15 AM, web development
                    </p>
                </CodeBlock>
                <br></br>
            </div>
        </div>)
    </>
    )
}
