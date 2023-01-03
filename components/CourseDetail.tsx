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
            // let userContent: Content[] = data.UserContentItems
            // for (let i = 0; i < userContent.length; i++) {
            //     if (userContent[i].id == props.id) {
            //         setAccess(true)
            //     }
            // }
        }
    })

    let button;
    // this isn't great authentication but there is a bug with UserContentItems
    if (currentUser?.firstName) {
        button = 
        
        <button
        className="bg-brandPrimary-600 hover:bg-brandPrimary-900 text-white font-sans font-bold h-10 w-full md:h-14 rounded"
            onClick={() => {
                location.href = `https://anticoregular.thoughtindustries.com/learn/${content?.slug}`
            }}>
                Start Course
        </button>
        
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
        <div className='h-full bg-bgDefault-100'>
            <NavBar/>
            <div className='max-w-screen-xl min-h-screen grid grid-flow-col-dense rid-rows-2 grid-cols-8 gap-8 py-10 mx-auto px-4 md:px-8 '>
                <div className='col-span-full  bg-surface-100 shadow-sm rounded md:col-span-5 overflow-hidden'>
                    
                    <div className='p-16 w-full flex flex-col gap-4'>
                        <h1 className='text-4xl font-sans font-bold'>{content?.title}</h1>
                        <p className=' text-textPrimary-200'>{content?.description}</p>
                    </div>
                    <img className='w-full' src={content?.asset}></img>
                </div>
                <div className='col-span-full p-16 bg-surface-100 rounded shadow-xl flex flex-col gap-8 sticky top-0 md:col-span-3'>
                    { button }
                    
                    <div className='flex flex-col gap-8 '>
                        <h1 className='border-b border-border-200 text-textPrimary-300 font-sans font-bold text-xs h-10'>
                            What's Included
                        </h1>
                        <ul className=' text-textPrimary-300 leading-8 list-disc'>
                            <li className='text-textPrimary-200 font-light '>Access your courses anytime, anywhere, with a computer, tablet or smartphone</li>
                            <li className='text-textPrimary-200 font-light '>Videos, quizzes and interactive content designed for a proven learning experience</li>
                            <li className='text-textPrimary-200 font-light '>Unlimited access. Take your courses at your time and pace</li>
                        </ul>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}


export { CourseDetail };