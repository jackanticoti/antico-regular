import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

function ScormTopic(props: { id: string }) {

    const [url, setUrl] = useState("");

    const course_query = gql`
    query RusticiLaunchScorm(
        $isPreview: Boolean!,
        $topicOrCourseId: ID!,
        $type: ContentOrTopicEnum
      ) {
        RusticiLaunchScorm(
          isPreview: $isPreview,
          topicOrCourseId: $topicOrCourseId,
          type: $type
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
        variables: { topicOrCourseId: props.id, isPreview: false, type: "topic" }
    });


    useEffect(() => {
        if (data) { 
            setUrl(data.RusticiLaunchScorm.url)
            // fetch(data.RusticiLaunchScorm.registrationCheckerEndpoint, {
            //     method: 'POST',
            //     headers: {
            //         'jwt': data.RusticiLaunchScorm.registrationCheckerJWT,
            //         'Content-Type': 'application/x-www-form-urlencoded'
            //     }
            // })
            // .then((response) => response.json())
            // .then((data) => console.log(data));
        } 
    }) 

    return (
        <div className='flex flex-row my-10'>
            <h1
                className='bg-gray-400 text-2xl p-4 rounded-lg w-72 h-32 hover:bg-gray-100 border-2 cursor-pointer'
                onClick={() => {
                    window.open(url, '_blank', 'location=yes,height=570,width=520');
                }}
                >Click here to launch your SCORM</h1>
        </div>
    );
}


export { ScormTopic };