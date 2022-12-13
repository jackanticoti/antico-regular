import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import NavBar from '../Navigation/NavBar';
import Footer from '../Footer/Footer';

function Scorm(props: { id: string }) {

    const [url, setUrl] = useState("");

    const course_query = gql`
    query RusticiLaunchScorm(
        $isPreview: Boolean!,
        $topicOrCourseId: ID!,
      ) {
        RusticiLaunchScorm(
          isPreview: $isPreview,
          topicOrCourseId: $topicOrCourseId
        ) {
          courseTitle
          fullscreenEmbed
          height
          isRusticiCourse
          registrationCheckerEndpoint
          registrationCheckerJWT
          registrationId
          url
          width
        }
      }`

    const { data, error } = useQuery(course_query, {
        variables: { topicOrCourseId: props.id, isPreview: false }
    });

    if (data) { 
        console.log(data)
    } if (error) {
        console.log(error)
    }


    useEffect(() => {
        if (data) { 
            setUrl(data.RusticiLaunchScorm.url)
        } 
    })   

    return (
        <div>
            <NavBar/>
            <h1
                className='bg-gray-400 text-2xl p-4 rounded-lg w-72 h-32 hover:bg-gray-100 border-2 cursor-pointer'
                onClick={() => {
                    window.open(url, '_blank', 'location=yes,height=570,width=520');
                }}
                >Click here to launch your SCORM</h1>
            <Footer/>
        </div>
    );
}


export { Scorm };