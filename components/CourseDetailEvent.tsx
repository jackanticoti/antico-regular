import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Course, Meeting } from '@thoughtindustries/content/src/graphql/global-types';
import { usePageContext } from '../renderer/usePageContext';
import NavBar from './Navigation/NavBar';
import Footer from './Footer/Footer';

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
        button = <h1
            className='bg-gray-400 rounded-lg w-full mt-8 text-center hover:bg-gray-300 border-2 cursor-pointer text-xl'
            onClick={() => {
                location.href = `https://anticoregular.thoughtindustries.com/learn/${course?.slug}`
            }}>
                Start Course
        </h1>
    } else {
        button = <div className='my-3 bg-slate-100 p-5'>
            <h1 className='text-2xl'>ENROLL TODAY</h1>
            <h1 className='text-sm my-4'>Enter your email address to access this course:</h1>
            <input
                className='bg-gray-50 border border-gray-300 w-5/6
                text-gray-900 text-sm rounded-lg px-2'
                placeholder='Email Address'
                type="text"
                value={email}
                onChange={e => setEmail(e.target.value)}/>
            <div></div>
            <h1
                className=''
                onClick={() => {
                    console.log("You clicked enroll")
                }}>
                Submit Email
            </h1>
        </div>
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
                className={`inline-flex flex-row hover:cursor-pointer hover:bg-slate-200
                ${index == i ? 'font-bold' : ''}`}
                key={i}>
                    <h1 className={'w-60 border-2'}>{session.title}</h1>
                    <h1 className='w-36 border-2'>{startPretty}</h1>
                    <h1 className='w-36 border-2'>{endPretty}</h1>
                </div>
            })
        }
    }

    let meetings
    if (sessions) {
        meetings = sessions[index].meetings?.map((meeting, i) => {
            return <div
            className='w-60 h-60 bg-slate-100 rounded-lg shadow-lg m-2'
            key={i}>
                <h1 className='text-center text-lg'>{meeting.title}</h1>
                <h1>Start date:</h1>
                <h1>Instructors: {meeting.instructors?.join(", ")}</h1>
            </div>
        })
    }

    return (
        <div>
            <NavBar/>
            <div className='flex flex-row justify-between'>
                <div className='ml-10 mt-8 w-2/3'>
                    <h1 className='t text-3xl'>Meetings</h1>
                    <div className='flex flex-row flex-wrap'>
                        { meetings }
                    </div>
                </div>
                <div className='mr-10 mt-10 w-2/3'>
                    { button }
                    <div className='mt-4'>
                        <div className='flex flex-row'>
                            <h1 className='w-60 border-2'>Title</h1>
                            <h1 className='w-36 border-2'>Start Date</h1>
                            <h1 className='w-36 border-2'>End Date</h1>
                        </div>
                        { sessionSelection }
                    </div>
                    <div className='mt-10'>
                        <h1 className='text-xl h-10 border-b-2 border-slate-400'>
                            What's Included
                        </h1>
                        <div className='pl-10 mt-5'>
                        <h1 className='my-3'>Access your courses anytime, anywhere, with a computer, tablet or smartphone</h1>
                        <h1 className='my-3'>Videos, quizzes and interactive content designed for a proven learning experience</h1>
                        <h1 className='my-3'> Unlimited access. Take your courses at your time and pace</h1>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}


export { CourseDetailEvent };