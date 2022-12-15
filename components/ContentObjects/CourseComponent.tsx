import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import NavBar from '../Navigation/NavBar';
import Footer from '../Footer/Footer';
import { Lesson, Section, Course } from '@thoughtindustries/content/src/graphql/global-types';
import { Content } from '@thoughtindustries/content/src/graphql/global-types';

interface Topic {
    id: String
    title: String
}

function CourseComponent(props: { id: string }) {

    const [access, setAccess] = useState(false)
    const [course, setCourse] = useState<Course>();
    const [pageIndex, setPageIndex] = useState(0);
    const [selectedPage, setSelectedPage] = useState<String>("641a8013-4213-49be-9783-60ccff32e85a");
    const [topics, setTopics] = useState<Topic[]>([])

    const course_query = gql`
    query CourseById($id: ID!) {
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
            setCourse(data.CourseById)
            let contentItems: Content[] = data.UserContentItems
            for (let i = 0; i < contentItems.length; i++) {
                if (contentItems[i].id == props.id) {
                    setAccess(true)
                }
            }
            let newTopics: Topic[] = []
            data.CourseById.sections.map((section) => {
                section.lessons.map((lesson) => {
                    lesson.topics.map((topic) => {
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
        return <h1
            className={`hover:cursor-pointer my-2 text-xl
            ${i == pageIndex ? 'font-bold' : ''}`}
            onClick={() => {
                setPageIndex(i)
                setSelectedPage(topic.id)
            }}
            key={i}>
            {topic.title}
        </h1>
    })


    return (
        <div className='h-full'>
            <NavBar/>
            <h1
                className='text-2xl text-center'>
                {course?.courseGroup?.title}
            </h1>
            <div className='flex flex-row h-full'>
                <div className='mr-10 h-full w-1/3 -mt-10'>
                    <div className='mt-10 ml-5'> 
                    { topicDisplay }
                    </div>
                </div>
                <div className='w-full h-full flex flex-col justify-between'>
                    {/* <GeneralPage id={selectedPage}/> */}
                    <div className='flex flex-row justify-between mb-14'>
                        <h1
                            className='hover:bg-slate-100 bg-slate-400 rounded-lg 
                            m-2 px-3 hover:cursor-pointer w-60 text-lg text-center'
                            onClick={() => {
                                setSelectedPage(topics[(pageIndex - 1) % topics.length].id)
                                setPageIndex((pageIndex - 1) % topics.length )
                            }}
                            >Last Page</h1>
                        <h1
                            className='hover:bg-slate-100 bg-slate-400 rounded-lg 
                            m-2 px-3 hover:cursor-pointer w-60 text-lg text-center'
                            onClick={() => {
                                setSelectedPage(topics[(pageIndex + 1) % topics.length].id)
                                setPageIndex((pageIndex + 1) % topics.length)
                            }}
                            >Next Page</h1>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export { CourseComponent };