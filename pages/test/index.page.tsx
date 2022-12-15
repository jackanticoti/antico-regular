import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { Course, Content } from '@thoughtindustries/content/src/graphql/global-types';

function Page() {

    const [content, setContent] = useState<Content[]>();
    const [access, setAccess] = useState(false)

    const course_query = gql`
    {
        UserContentItems {
            id
            title
        }
    }`

    const { data, error } = useQuery(course_query);

    useEffect(() => {
        if (data) { 
            setContent(data.UserContentItems)
        }
    })

    let items
    items = content?.map((piece, i) => {
        return <h1 key={i}>{piece.title}</h1>
    })

    return (
        <div>
            {items}
        </div>
    );
}


export { Page };