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

    const { data } = useQuery(course_query, {
        variables: { id: props.id }
    });

    let videoTopic

    if (data) { 
        console.log(data.CourseById)
        console.log(data.CourseById.sections[0].lessons[0])
        videoTopic = <VideoTopic id={data.CourseById.sections[0].lessons[0].topics[0].id}/>
    }    

    return (
        <div>
            <NavBar/>
            { videoTopic }
            <Footer/>
        </div>
    );
}


export { Video };