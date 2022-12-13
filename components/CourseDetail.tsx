import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Course } from '@thoughtindustries/content/src/graphql/global-types';
import { usePageContext } from '../renderer/usePageContext';
import NavBar from './Navigation/NavBar';
import Footer from './Footer/Footer';

// This is the course detail page

function CourseDetail(props: { id: string }) {

    const pageContext = usePageContext();
    const { currentUser } = pageContext;

    const [course, setCourse] = useState<Course>();
    const [email, setEmail] = useState("");

    const course_query = gql`
    query CourseById($id: ID!) {
        CourseById(id: $id) {
            title
            slug
            courseGroup {
                description
                asset
            }
        }    
    }`

    const { data } = useQuery(course_query, {
        variables: { id: props.id }
    });

    useEffect(() => {
        if (data) { 
            setCourse(data.CourseById)
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

    return (
        <div>
            <NavBar/>
            <div className='flex flex-row justify-between'>
                <div className='ml-10 mt-8'>
                    <h1 className='t text-3xl'>{course?.title}</h1>
                    <h1>{course?.courseGroup?.description}</h1>
                    <img className='h-96' src={course?.courseGroup?.asset}></img>
                </div>
                <div className='mr-10 mt-10'>
                    { button }
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


export { CourseDetail };