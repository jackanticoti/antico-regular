import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import ReactPlayer from 'react-player'

interface Variant {
    label: String;
    title: String;
    subtitle: String;
    body: String;
}

function VideoTopic(props: { id: string }) {

    const [wistiaId, setWistiaId] = useState("")
    const [variants, setVariants] = useState<Variant[]>([])
    const [index, setIndex] = useState(0)

    const course_query = gql`
    query Pages($identifiers: [String!]!) {
        Pages(identifiers: $identifiers) {
            ...on ArticlePage {
                videoAsset
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
            setWistiaId(data.Pages[0].videoAsset)
            let newVariants: Variant[] = []
            for (let i = 0; i < data.Pages[0].languages.length; i++) {
                let newVariant: Variant = {
                    label: data.Pages[0].languages[i].label,
                    title: data.Pages[0].languages[i].title,
                    subtitle: data.Pages[0].languages[i].subtitle,
                    body: data.Pages[0].languages[i].body
                }
                newVariants.push(newVariant)
            }
            setVariants(newVariants)
        }
    }, [])

    let selection = variants.map((variant, i) => {
        return <h1
            onClick={() => {
                setIndex(i)
            }}
            className={`hover:cursor-pointer my-2 text-xl
            ${i == index ? 'font-bold' : ''}`}
            key={i}>
            {variant.label}
        </h1>
    })

    let article
    if (variants.length > 0) {
        article = <div className='w-2/3'>
            <h1> {variants[index].title} </h1>
            <h1> {variants[index].body} </h1>
        </div>
    }

    return (
        <div className='flex flex-row my-10'>
            <div className='w-1/3 ml-10'>
                { selection }
            </div>
            <div>
                <ReactPlayer url={`https://getleda.wistia.com/medias/${wistiaId}`}/>
                { article }
            </div>
        </div>
    );
}


export { VideoTopic };