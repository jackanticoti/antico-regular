import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

function ScormTopic(props: { id: string }) {

    const [variants, setVariants] = useState("")

    const course_query = gql`
    query Pages($identifiers: [String!]!) {
        Pages(identifiers: $identifiers) {
            ...on VideoPage {
                languages {
                    language
                    label
                    title
                    subtitle
                    body
                    copyright
                }
            }
        }
    }`

    const { data, error } = useQuery(course_query, {
        variables: { identifiers: [props.id] }
    });

    useEffect(() => {
        if (data) {
            console.log(data)
        }
    })

    return (
        <div className='flex flex-row my-10'>
            <h1>Hi</h1>
        </div>
    );
}


export { ScormTopic };