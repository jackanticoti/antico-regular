import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { UserSquare } from "phosphor-react";

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
        return <li
                    onClick={() => {
                        setIndex(i)
                    }}
                    className={`hover:cursor-pointer text-sm leading-none px-6 py-4 flex w-full hover:bg-sky-100  before:text-sm before:mr-4 before:leading-none
                    ${i == index ? 'font-bold before:font-bold bg-sky-400 text-textPrimary-300' : 'font-light before:font-light before:text-textPrimary-200 text-textPrimary-200'}`}
                    key={i}>
                    {variant.label}
                </li>
                
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
        article = <div className='w-full flex flex-col gap-8'>
                    <div className='w-full flex flex-row-reverse'>{audioPlayer}</div> 
                    <div className='flex flex-col gap1'>
                        <h1 className='text-2xl font-bold font-sans w-full'> {variants[index].title} </h1>
                        <h4 className='text-xl font-light font-sans w-full'> {variants[index].subtitle} </h4>
                    </div>
                    <p className='text-base font-light text-textPrimary-200 leading-relaxed w-full'> {variants[index].body.replace(/<[^>]+>/g, '')} </p>
                </div>
    }

    return (
        <div className='h-full bg-bgDefault-100 p-16'>

            <section className="min-h-96 flex justify-center items-center flex-1 shrink-0 bg-gray-100 overflow-hidden shadow-lg rounded-lg relative py-16 md:py-20 xl:py-48">
                
                <img src="https://images.unsplash.com/photo-1601608512488-0681104cb0fa?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3267&q=80" loading="lazy" alt="Photo by " className="w-full h-full object-cover object-center absolute inset-0" />
              

                
                <div className=" bg-interface-200 mix-blend-multiply absolute inset-0"></div>
                
                
                <div className="sm:max-w-3xl flex flex-col items-center relative p-4">
                    <h1 className=" text-gray-50 text-4xl font-sans font-bold text-center leading-tight mb-4  md:mb-8">Rich History and Cultural Attractions of Boston</h1>
                <div className=' text-textPrimary-200 text-base text-center max-w-3xl m-auto leading-relaxed font-light mb-4 md:mb-8'>
                    <p className=' text-gray-300'>Exploring the Freedom Trail, Cultural Institutions, and World-Class Universities of the City on the Hill</p>
                    <p className=' text-gray-50 text-sm text-center m-auto leading-relaxed font-light flex flex-row w-full justify-center content-center gap-1 pt-8'><UserSquare size={28} /> Written By Peter Parker • February 28, 2023</p>
                </div>                 

                  
                </div>
              
            </section>
 
            <div className='grid grid-flow-col-dense rid-rows-2 grid-cols-8 gap-8 py-10 mx-auto px-4 md:px-8 sticky top-0 '> 
                <div className='col-span-full bg-surface-100 rounded overflow-clip shadow-xl pb-8 gap-8 sticky top-0 h-fit md:col-span-2'>
                    <h3 className='text-sans text-xs text-textPrimary-300 px-6 py-8 m-0 font-bold'>In this Article:</h3>
                    <ol className='flex flex-wrap custom_counter'>
                    { selection }
                    </ol>
                </div>
                <div className='col-span-full bg-surface-100 rounded shadow p-16 flex flex-col gap-8 sticky top-0 h-fit md:col-span-6'>
                    { article }
                </div>
            </div>
        </div>
    );
}


export { Article };