import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Course, Content } from '@thoughtindustries/content/src/graphql/global-types';
import { usePageContext } from '../renderer/usePageContext';
import NavBar from './Navigation/NavBar';
import Footer from './Footer/Footer';

function CourseDetail(props: { id: string }) {

    const pageContext = usePageContext();
    const { currentUser } = pageContext;

    const [content, setContent] = useState<Content>();
    const [email, setEmail] = useState("");
    const [access, setAccess] = useState(false)

    const course_query = gql`
    {
        CatalogContent(page: 1) {
          contentItems {
            title
            displayCourse
            description
            asset
            slug
          }
        }
        UserContentItems {
            id
        }
    }`

    const { data, error } = useQuery(course_query);

    useEffect(() => {
        if (data) { 
            let contentItems: Content[] = data.CatalogContent.contentItems
            for (let i = 0; i < contentItems.length; i++) {
                if (contentItems[i].displayCourse == props.id) {
                    setContent(contentItems[i])
                }
            }
            let userContent: Content[] = data.UserContentItems
            for (let i = 0; i < userContent.length; i++) {
                if (userContent[i].id == props.id) {
                    setAccess(true)
                }
            }
        }
    })

    let button;
    if (access) {
        button = <h1
            className='bg-gray-400 rounded-lg w-full mt-8 text-center hover:bg-gray-300 border-2 cursor-pointer text-xl'
            onClick={() => {
                location.href = `https://anticoregular.thoughtindustries.com/learn/${content?.slug}`
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
                    <h1 className='t text-3xl'>{content?.title}</h1>
                    <h1>{content?.description}</h1>
                    <img className='h-96' src={content?.asset}></img>
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