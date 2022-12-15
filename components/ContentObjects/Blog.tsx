import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import NavBar from '../Navigation/NavBar';
import Footer from '../Footer/Footer';
import { Article } from '../Topics/Article';
import { Content } from '@thoughtindustries/content/src/graphql/global-types';

function Blog(props: { id: string }) {

    const [topicId, setTopicId] = useState("");

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

    const { data, error } = useQuery(course_query, {
        variables: { id: props.id }
    });

    let content = <h1>Page not found</h1>
    let article

    // this isn't great vaidation but there is currently a bug
    if (data) { 
        article = <Article id={data.CourseById.sections[0].lessons[0].topics[0].id}/>
        let contentItems: Content[] = data.UserContentItems
        for (let i = 0; i < contentItems.length; i++) {
            if (contentItems[i].id == props.id) {
                content = <Article id={data.CourseById.sections[0].lessons[0].topics[0].id}/>
            }
        }
    }

    return (
        <div>
            <NavBar/>
            {article}
            <Footer/>
        </div>
    );
}


export { Blog };