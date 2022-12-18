import React from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import NavBar from '../Navigation/NavBar';
import Footer from '../Footer/Footer';
import { VideoTopic } from '../Topics/VideoTopic';
import { Content } from '@thoughtindustries/content/src/graphql/global-types';

function Video(props: { id: string }) {

    const course_query = gql`
    query CourseById($id: ID!) {
        UserContentItems {
            id
        }
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

    let content = <h1>Page not found</h1>
    let vid

    if (data) { 
        let contentItems: Content[] = data.UserContentItems
        vid = <VideoTopic id={data.CourseById.sections[0].lessons[0].topics[0].id}/>
        for (let i = 0; i < contentItems.length; i++) {
            if (contentItems[i].id == props.id) {
                content = <VideoTopic id={data.CourseById.sections[0].lessons[0].topics[0].id}/>
            }
        }
    }

    return (
        <div>
            <NavBar/>
            { vid }
            <Footer/>
        </div>
    );
}


export { Video };