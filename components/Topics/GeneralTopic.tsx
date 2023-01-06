import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { TopicType } from '@thoughtindustries/content/src/graphql/global-types';
import Text from './Text';
import { Video } from './Video';
import { ScormTopic } from './ScormTopic';
import Quiz from './Quiz';

const GeneralTopic = (props: { course_id: string, topic_id: string }) => {

    const [pageType, setPageType] = useState<TopicType>() 

    const page_query = gql`
    query Pages($identifiers: [String!]!) {
        Pages(identifiers: $identifiers) {
            ... on TextPage {
                type
            } ... on QuizPage {
      		    type
    	    } ... on VideoPage {
                type
            }
            ... on ScormPage {
                type
            }
        }
    }`

    const { data, error, loading } = useQuery(page_query, {
        variables: { identifiers: [props.topic_id] }
    });


    useEffect(() => {
        if (data) {
            setPageType(data.Pages[0].type)
            console.log(pageType)
        }
    })

    let pageComponent
    if (pageType == TopicType.Text) {
        pageComponent = <Text id={props.topic_id}/>
    } else if (pageType == TopicType.Quiz) {
        pageComponent = <Quiz course_id={props.course_id} topic_id={props.topic_id}/>
    } else if (pageType == TopicType.ShareableContentObject) {
        pageComponent = <ScormTopic id={props.topic_id}/>
    } else if (pageType == TopicType.Video) {
        pageComponent = <Video id={props.topic_id}/>
    }

    return (
        <div>
            { pageComponent }
        </div>
    );
};

export { GeneralTopic };