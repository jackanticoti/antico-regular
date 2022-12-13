import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import NavBar from '../Navigation/NavBar';
import Footer from '../Footer/Footer';
import { Article } from '../Topics/Article';

function Blog(props: { id: string }) {

    const [topicId, setTopicId] = useState("");

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

    let article

    if (data) { 
        console.log(data.CourseById)
        console.log(data.CourseById.sections[0].lessons[0])
        article = <Article id={data.CourseById.sections[0].lessons[0].topics[0].id}/>
    }    

    return (
        <div>
            <NavBar/>
            { article }
            <Footer/>
        </div>
    );
}


export { Blog };