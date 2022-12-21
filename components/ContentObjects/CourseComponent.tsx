import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import NavBar from '../Navigation/NavBar';
import Footer from '../Footer/Footer';
import { Lesson, Section, Course } from '@thoughtindustries/content/src/graphql/global-types';
import { Content } from '@thoughtindustries/content/src/graphql/global-types';
import { GeneralTopic } from '../Topics/GeneralTopic'

interface Topic {
    id: String
    title: String
}

function CourseComponent(props: { id: string }) {

    const [access, setAccess] = useState(false)
    const [course, setCourse] = useState<Course>();
    const [pageIndex, setPageIndex] = useState(0);
    const [selectedPage, setSelectedPage] = useState<string>("641a8013-4213-49be-9783-60ccff32e85a");
    const [topics, setTopics] = useState<Topic[]>([])

    const course_query = gql`
    query CourseById($id: ID!) {
        UserContentItems {
            id
        }
        CourseById(id: $id) {
            courseGroup {
                asset
                title
                description
                rating
                ribbon
                tags {
                    label
                }
            }
            sections {
            title
            lessons {
                title
                  topics {
                  ...on TextPage {
                    title
                    id
                    type
                  }
                  ... on QuizPage {
                    title
                    id
                    type
                  }
                  ... on VideoPage {
                    title
                    id
                    type
                  }
                  ... on ScormPage {
                    title
                    id
                    type
                  }
                  ... on ListRollPage {
                    title
                    id
                    type
                  }
                }
            }
        }
      }
    }`

    const { data } = useQuery(course_query, {
        variables: { id: props.id }
    });

    let content = <h1>Page not found</h1>

    useEffect(() => {
        if (data) {
            console.log(data)
            setCourse(data.CourseById)
            let contentItems: Content[] = data.UserContentItems
            for (let i = 0; i < contentItems.length; i++) {
                if (contentItems[i].id == props.id) {
                    setAccess(true)
                }
            }
            let newTopics: Topic[] = []
            data.CourseById.sections.map((section: { lessons: any[]; }) => {
                section.lessons.map((lesson: { topics: any[]; }) => {
                    lesson.topics.map((topic: { title: any; id: any; }) => {
                        let newTopic: Topic = {
                            title: topic.title,
                            id: topic.id
                        }
                        newTopics.push(newTopic)
                    })
                })
            })
            console.log(newTopics)
            setTopics(newTopics)
        }
    }, [])

    let topicDisplay = topics.map((topic, i) => {
        return <p
            className={`font-sans hover:cursor-pointer my-2 text-xs
            transform transition-all hover:scale-110
            ${i == pageIndex ? 'font-bold text-brandPrimary-900' : ' '}`}
            onClick={() => {
                setPageIndex(i)
                setSelectedPage(topic.id)
            }}
            key={i}>
            {topic.title}
        </p>
    })


    return (
        <div className='h-full bg-bgDefault-100 '>
            <NavBar/>
            <div className='max-w-screen-xl min-h-screen grid grid-flow-col-dense rid-rows-2 grid-cols-8 gap-8 py-10 mx-auto px-4 md:px-8'>
                
                <nav className='bg-surface-100 rounded shadow-xl col-span-2'>
                        <div className='p-8 bg-surface-100 border-b border-border-200 grid grid-cols-1 gap-4'>
                            <a href='/catalog' className='text-xs text-brandPrimary-900'><span className='text-base'>&lsaquo;</span> COURSES</a>
                            <div className='grid grid-cols-1 gap-2
                            '>
                                <h1 className='text-sm font-bold text-textPrimary-300'>
                                    {course?.courseGroup?.title}
                                </h1>
                                <div className='bg-interface-100 rounded-full h-2 relative overflow-hidden '>
                                    <div className='bg-brandPrimary-900 rounded-full absolute top-0 bottom-0 w-1/4'></div>
                                </div>
                                <p className=' text-xs font-sans font-normal text-brandPrimary-900'>25% Complete</p>
                            </div>
                        </div>
                        <div className='p-8 text-textPrimary-200 sticky top-0'> 
                        { topicDisplay }
                        </div>          
                </nav>
                <main className='p-16 bg-surface-100 shadow-sm rounded col-span-4 '>
                        <GeneralTopic id={selectedPage}/>
                </main>
                <div className='col-start-3 row-start-2 col-span-4 flex flex-row items-center place-content-between sticky bottom-0 h-20 bg-brandPrimary-300 px-8 rounded-b'>
                    <button className="bg-brandPrimary-600 hover:bg-brandPrimary-900 text-white font-sans font-bold h-10 w-20 md:h-14 md:w-28 rounded" onClick={() => {
                                    setSelectedPage(topics[(pageIndex - 1) % topics.length].id)
                                    setPageIndex((pageIndex - 1) % topics.length )
                                }}>
                    Prev
                    </button>
                    <button className="bg-brandPrimary-600 hover:bg-brandPrimary-900 text-white font-sans font-bold h-10 w-20 md:h-14 md:w-28 rounded" onClick={() => {
                                    setSelectedPage(topics[(pageIndex + 1) % topics.length].id)
                                    setPageIndex((pageIndex + 1) % topics.length)
                                }}>
                    Next
                    </button>
                  
                </div>        
                
                <aside className=' row-start-1 col-span-2 font-sans p-10 sticky top-0'>
                    <ul className=' text-textPrimary-300 leading-8  font-bold'>
                        <li className='text-textPrimary-200 font-light '>Tools:</li>
                        <li className='hover:text-brandPrimary-600'>Resources</li>
                        <li className='hover:text-brandPrimary-600'>Assignments</li>
                        <li className='hover:text-brandPrimary-600'>Notes</li>
                        <li className='hover:text-brandPrimary-600'>Workbooks</li>
                    </ul>
                
                </aside> 
                   
            </div>
           
        </div>
    );
}

export { CourseComponent };