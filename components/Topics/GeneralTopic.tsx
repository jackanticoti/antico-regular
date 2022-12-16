import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';
import { TopicType } from '@thoughtindustries/content/src/graphql/global-types';
import Text from './Text';

const GeneralTopic = (props: { id: string }) => {

    const [pageType, setPageType] = useState<TopicType>()

    const page_query = gql`
    query Pages($identifiers: [String!]!) {
        Pages(identifiers: $identifiers) {
            ... on TextPage {
                type
            } ... on QuizPage {
      		    type
    	    }
        }
    }`

    const { data, error, loading } = useQuery(page_query, {
        variables: { identifiers: [props.id] }
    });


    useEffect(() => {
        if (data) {
            setPageType(data.Pages[0].type)
            console.log(pageType)
        }
    })

    let pageComponent
    if (pageType == TopicType.Text) {
        pageComponent = <Text id={props.id}/>
    }

    return (
        <div>
            { pageComponent }
        </div>
    );
};

export { GeneralTopic };