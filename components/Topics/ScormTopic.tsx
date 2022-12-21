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
        <div className='flex flex-col gap-4 '>
            <h1 className='text-2xl font-sans font-bold text-textPrimary-300'>SCORM content</h1>
            <button
                className="text-white bg-indigo-700 hover:bg-indigo-600 inline-block font-normal text-sm text-center no-underline py-2 w-1/4 rounded-md disabled:bg-indigo-300 disabled:cursor-default"
                onClick={() => {
                  window.open(url, '_blank', 'location=yes,height=570,width=520');
                }}
              >
                Launch
              </button>
        </div>
    );
}


export { ScormTopic };