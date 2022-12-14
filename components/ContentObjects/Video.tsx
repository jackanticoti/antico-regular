import React from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import NavBar from '../Navigation/NavBar';
import Footer from '../Footer/Footer';
import { VideoTopic } from '../Topics/VideoTopic';

function Video(props: { id: string }) {

    const course_query = gql`
    query CourseById($id: ID!) {
        CourseById(id: $id) {
            title
            sections {
                lessons {
                    topics {
                        ... on ArticlePage {
                            id
                          }
                    }
                }
            }
        }    
    }`

    const { data, error } = useQuery(course_query, {
        variables: { id: props.id }
    });

    let content

    if (data) { 
        console.log(data.CourseById)
        console.log(data.CourseById.sections[0].lessons[0])
        content = <VideoTopic id={data.CourseById.sections[0].lessons[0].topics[0].id}/>
    }
    
    if (error) {
        content = <h1>User does not have access</h1>
    }

    return (
        <div>
            <NavBar/>
            { content }
            <Footer/>
        </div>
    );
}


export { Video };