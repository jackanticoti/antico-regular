import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

interface Variant {
    label: string;
    title: string;
    subtitle: string;
    body: string; 
    audioAssetUrl: string;
}

function Article(props: { id: string }) {

    const [variants, setVariants] = useState<Variant[]>([])
    const [index, setIndex] = useState(0)

    const course_query = gql`
    query Pages($identifiers: [String!]!) {
        Pages(identifiers: $identifiers) {
            ...on ArticlePage {
                languages {
                    language
                    label
                    title
                    subtitle
                    body
                    copyright
                    audioAssetUrl
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
            let newVariants: Variant[] = []
            for (let i = 0; i < data.Pages[0].languages.length; i++) {
                let newVariant: Variant = {
                    label: data.Pages[0].languages[i].label,
                    title: data.Pages[0].languages[i].title,
                    subtitle: data.Pages[0].languages[i].subtitle,
                    body: data.Pages[0].languages[i].body,
                    audioAssetUrl: data.Pages[0].languages[i].audioAssetUrl
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
        let audioPlayer;
        if (variants[index].audioAssetUrl) {
            audioPlayer = <audio controls>
                <source src={variants[index].audioAssetUrl} type="audio/mpeg"/>
                Your browser does not support the audio element.
            </audio>
        }
        article = <div className='w-3/4 mr-32'>
            <div className='flex flex-row justify-between'>
                <h1 className='text-4xl'> {variants[index].title} </h1>
                {audioPlayer}
            </div>
            <h1 className='text-xl mt-10'> {variants[index].body.replace(/<[^>]+>/g, '')} </h1>
        </div>
    }

    return (
        <div className='flex flex-row my-10'>
            <div className='w-1/4 ml-10'>
                { selection }
            </div>
            { article }

        </div>
    );
}


export { Article };