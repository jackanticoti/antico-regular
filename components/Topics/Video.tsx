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
        <div className='flex flex-col gap-4'>
            
                <h1 className='text-2xl font-sans font-bold text-textPrimary-300'>{title}</h1>
                <div className='w-full h-0 relative pt-[56.25%]'>
                <ReactPlayer width={"100%"} height={"100%"} className=" absolute top-0 left-0" url={`https://getleda.wistia.com/medias/${wistiaId}`}/>
                </div>
            
        </div>
    );
}


export { Video };