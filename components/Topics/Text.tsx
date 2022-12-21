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
        <div className='grid gap-4'>
            <h1 className='text-2xl font-sans font-bold text-textPrimary-300'>{title}</h1>
            <p className='text-sm leading-loose text-textPrimary-200'>{body.replace(/<[^>]+>/g, '')}</p>
        </div>
    );
};

export default Text;