import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import ReactPlayer from 'react-player'

function Video(props: { id: string }) {

    const [wistiaId, setWistiaId] = useState("")
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

    const course_query = gql`
    query Pages($identifiers: [String!]!) {
        Pages(identifiers: $identifiers) {
            ...on VideoPage {
                title
                body
                asset
            }
        }
    }`

    const { data, error } = useQuery(course_query, {
        variables: { identifiers: [props.id] }
    });

    useEffect(() => {
        if (data) {
            setWistiaId(data.Pages[0].asset)
            setTitle(data.Pages[0].title)
            setBody(data.Pages[0].body)
        }
    })
    

    return (
        <div className='flex flex-row'>
            <div className='w-3/4 mr-24 mb-10'>
                <h1 className='text-center text-2xl mb-5'>{title}</h1>
                <ReactPlayer url={`https://getleda.wistia.com/medias/${wistiaId}`}/>
                {/* <h1>{body}</h1> */}
            </div>
        </div>
    );
}


export { Video };