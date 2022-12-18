import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import ReactPlayer from 'react-player'

function Video(props: { id: string }) {

    const [wistiaId, setWistiaId] = useState("")

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
        }
    })
    

    return (
        <div className='flex flex-row my-10'>
            <div className='w-3/4 mr-24'>
                <ReactPlayer url={`https://getleda.wistia.com/medias/${wistiaId}`}/>
            </div>
        </div>
    );
}


export { Video };