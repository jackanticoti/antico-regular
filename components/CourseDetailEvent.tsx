import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Course, Meeting } from '@thoughtindustries/content/src/graphql/global-types';
import { usePageContext } from '../renderer/usePageContext';
import NavBar from './Navigation/NavBar';
import Footer from './Footer/Footer';
import { ListDashes, CalendarBlank, Ticket, Heart, Share, ChalkboardTeacher } from "phosphor-react";

// This is the course detail page

function CourseDetailEvent(props: { id: string }) {

    const pageContext = usePageContext();
    const { currentUser } = pageContext;

    const [course, setCourse] = useState<Course>();
    const [email, setEmail] = useState("");
    const [sessions, setSessions] = useState<Course[]>();
    const [index, setIndex] = useState(0)

    const course_query = gql`
    query CourseById($id: ID!) {
        CourseById(id: $id) {
            title
            slug
            courseGroup {
                description
                asset
                courses {
                    title
                    priceInCents
                    courseStartDate
                    courseEndDate
                    meetings {
                        title
                        startDate
                        endDate
                        instructors
                        attendeeInfo
                    }
                }
            }
        }    
    }`

    const { data } = useQuery(course_query, {
        variables: { id: props.id }
    });

    useEffect(() => {
        if (data) {
            console.log(data)
            setCourse(data.CourseById)
            setSessions(data.CourseById.courseGroup.courses)
        }
    })

    let button;
    if (currentUser?.firstName) {
        button = <div className=''>
            <h1 className='text-sm font-sans font-bold text-textPrimary-300'>Event Registration</h1>
            <p className='text-sm my-4 font-sans font-light text-textPrimary-200'>Enter your email address to access this Event:</p>
            <input
                className='bg-gray-50 border border-gray-300 w-full
                text-gray-900 text-sm rounded-lg px-4 mb-8 h-14'
                placeholder='Email Address'
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}/>
            <div></div>
            <button
                className="bg-brandPrimary-600 hover:bg-brandPrimary-900 text-white font-sans font-bold h-10 w-full md:h-14 rounded"
                onClick={() => {
                    console.log("You clicked enroll")
                }}>
                Enroll Today
            </button>
        </div>
        
    } else {
        button = <button
        className="bg-brandPrimary-600 hover:bg-brandPrimary-900 text-white font-sans font-bold h-10 w-full md:h-14 rounded"
            onClick={() => {
                location.href = `https://anticoregular.thoughtindustries.com/learn/${course?.slug}`
            }}>
                Start Course
        </button>

        
    }

    let sessionSelection
    if (sessions) {
        if (sessions.length > 1) {
            sessionSelection = sessions.map((session, i) => {
                let startDate = new Date(session.courseStartDate ?? "")
                let startPretty = startDate.toLocaleDateString()
                let endDate = new Date(session.courseEndDate ?? "")
                let endPretty = endDate.toLocaleDateString()
                return <div
                onClick={() => {
                    setIndex(i)
                }}
                className={`'', 
                ${index == i ? ' bg-interface-300 text-textPrimary-100 rounded-full px-4 py-2' : ' px-4 py-2 hover:bg-slate-200 hover:cursor-pointer rounded-full'}`}
                key={i}>
                    <p className={'text-xs font-sans'}>{session.title}</p>
                    {/*
                    <h1 className='w-36 border-2'>{startPretty}</h1>
                    <h1 className='w-36 border-2'>{endPretty}</h1>
                    */}
                </div>
            })
        }
    }

    let meetings
    if (sessions) {
        meetings = sessions[index].meetings?.map((meeting, i) => {
            let startDate = new Date(meeting.startDate ?? "")
            let endDate = new Date(meeting.endDate ?? "")
            let startPretty = startDate.toLocaleString() + " — " + endDate.toLocaleTimeString()

            return <div
            className='w-full h-auto bg-surface-100 rounded-lg shadow my-4 p-10'
            key={i}>
                
                
                <p className=' font-sans font-light text-xs text-sky-700 flex flex-row flex-auto align-middle w-full gap-2'><Ticket size={24} weight="duotone" /> {startPretty}</p>
                <h2 className='text-base font-sans text-textPrimary-300 font-bold'>{meeting.title}</h2>
                <p className='text-sm font-sans text-textPrimary-200 font-light leading-relaxed py-4'>{meeting.attendeeInfo}</p>
                <h3 className='flex flex-row flex-auto align-middle gap-2 text-textPrimary-200'><ChalkboardTeacher size={24} />Instructor <small className='py-1 px-4 bg-sky-200 rounded-full text-textPrimary-300 font-sans font-bold'>{meeting.instructors?.join(", ")}</small></h3>
            </div>
        })
    }

    return (
        <div className='h-full bg-bgDefault-100'>
            <NavBar/>
            <div className='max-w-screen-xl min-h-screen grid grid-flow-col-dense rid-rows-2 grid-cols-8 gap-8 py-10 mx-auto px-4 md:px-8 '>
                <div className='col-span-full  bg-surface-100 shadow-2xl rounded md:col-span-4 overflow-hidden sticky top-0 left-0'>
                    <div className='p-16 w-full flex flex-col gap-4  '>
                    <div className='h-10 flex flex-row items-center gap-2 justify-end'>
                                <Heart size={24} />
                                <Share size={24} />
                            </div>
                        <div className='flex flex-row flex-auto align-middle gap-1 w-fit items-center '>
                            <Ticket size={40} weight="duotone" />
                            <h1 className='text-lg font-sans text-textPrimary-300 font-bold w-full'> Events in  Austin</h1>
                        </div>
                        <p className='text-sm text-textPrimary-200 font-sans font-light leading-relaxed'>Analytics is the process of examining data to gain insights and inform business decisions. It involves collecting, storing, and analyzing data to understand patterns, trends, and relationships.  </p>
                        <div className='flex flex-col gap-8 '>
                        { button }
                        <h1 className='border-b border-border-200 text-textPrimary-300 font-sans font-bold text-sm h-10'>
                            Key Concepts included
                        </h1>
                        <ul className=' text-textPrimary-300 leading-8 list-disc text-sm ml-4 gap-2 flex flex-col'>
                            <li className='text-textPrimary-200 font-light '>Analytics can be used to improve a wide range of business processes, including marketing, sales, operations, and customer service.</li>
                            <li className='text-textPrimary-200 font-light '> With the increasing availability of data and advances in technology, analytics has become an essential tool for organizations of all sizes and industries.</li>
                            <li className='text-textPrimary-200 font-light '>By using analytics, businesses can make more informed decisions, optimize their operations, and gain a competitive advantage.</li>
                        </ul>
                        
                    </div>
                    </div>
                </div>
                <div className='col-span-full px-6 flex flex-col gap-8 md:col-span-4'>

                    <div className='flex flex-row'>
                        <h3 className='flex-auto text-sm font-bold font-sans text-textPrimary-300 '>Upcoming Sessions</h3>
                        <div className="w-16 h-10 flex flex-auto border rounded-lg overflow-hidden divide-x">
                            <a href="#" className="w-1/2 flex justify-center items-center gap-1 hover:bg-interface-300 active:bg-gray-200 text-textPrimary-100 bg-interface-300 transition duration-100"><ListDashes size={20} /> List</a>
                            
                            <a href="#" className="w-1/2 flex justify-center items-center gap-1 hover:bg-interface-300 hover:text-textPrimary-100 active:bg-gray-200 text-gray-500 bg-surface-100 transition duration-100"><CalendarBlank size={20} />Calendar</a>
                        </div>
                    </div>
                    <div className=''>
                        <div className='flex flex-row gap-4'>
                            {sessionSelection}
                        </div>
                        
                        
                        { meetings }

                    </div>
                    
                </div>
            </div>
            <Footer/>
        </div>
    );
}


export { CourseDetailEvent };