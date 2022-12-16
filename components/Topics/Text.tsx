import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

const Text = (props: { id: string }) => {

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const page_query = gql`
    query Pages($identifiers: [String!]!) {
        Pages(identifiers: $identifiers) {
            __typename
            ... on TextPage {
                title
                body
            }
        }
    }`

    const { data: page_data, error: page_error, loading: page_loading } = useQuery(page_query, {
        variables: { identifiers: [props.id] }
    });


    
    useEffect(() => {
        if (page_data) {
            setTitle(page_data.Pages[0].title)
            setBody(page_data.Pages[0].body)
        }
    })
    

    return (
        <div>
            <h1 className='text-xl'>{title}</h1>
            <h1 className='mx-5'>{body.replace(/<[^>]+>/g, '')}</h1>
        </div>
    );
};

export default Text;