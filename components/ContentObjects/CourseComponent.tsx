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
           
        </div>
    );
}

export { CourseComponent };