import React, { useState, useEffect } from 'react';
import { gql, useQuery, useMutation } from '@apollo/client';

type Choice = {
    value: string;
    correct: boolean;
  }
  
  type Question = {
    body: string;
    choices: Choice[];
  }

const Quiz = (props: { topic_id: string, course_id: string }) => {

    const [title, setTitle] = useState("");
    const [assesmentAttemptId, setAssesmentAttemptId] = useState("");
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<Number[]>([]);

    const page_query = gql`
    query Pages($identifiers: [String!]!) {
        Pages(identifiers: $identifiers) {
            ... on QuizPage {
                title
                questions {
                    body
                    choices {
                        value
                        correct
                    }
                }
            }
        }
    }`

    const { data: page_data, error: page_error, loading: page_loading } = useQuery(page_query, {
        variables: { identifiers: [props.topic_id]}
    })

    const create_assessment_attempt = gql`
    query LoadAssessmentAttemptWithQuestions(
        $id: ID!
        $courseId: ID
        $topicType: String!
      ) {
        LoadAssessmentAttemptWithQuestions(
          id: $id
          courseId: $courseId
          topicType: $topicType
        ) {
          id
          status
          grade
        }
    }`;

    const { data: attempt_data, } = useQuery(create_assessment_attempt, {
        variables: { 
            courseId: props.course_id,
            id: props.topic_id,
            topicType: "quiz"
         }
    });

    useEffect(() => {
        if (page_data) {
            console.log(page_data)
            setTitle(page_data.Pages[0].title)
            setQuestions(page_data.Pages[0].questions)   
        }
        if (attempt_data) {
            setAssesmentAttemptId(attempt_data.LoadAssessmentAttemptWithQuestions.id)
        }
    })

    const update_answer = gql`
    mutation UpdateAssessmentAttempt(
        $activeQuestion: QuestionInput,
        $assessmentAttempt: AssessmentAttemptInput
      ) {
        UpdateAssessmentAttempt(
          activeQuestion: $activeQuestion,
          assessmentAttempt: $assessmentAttempt
        ) {
            id
        }
    }
    `

    const [updateAnswer, { data, loading, error }] = useMutation(update_answer)

    let answerItems;
    let questionItems

    if (questions) {
      questionItems = questions.map((question, index) => {
        // let answersData
        answerItems = question.choices.map((answer, index_2) => {
          return <h2
            key={`key-${index_2}`}
            className={`hover:bg-slate-100 rounded-lg m-2 px-3 hover:cursor-pointer
            ${ answers[index] === index_2 ? 'bg-green-200' : 'bg-slate-200'}`}
            onClick={() => {
              updateAnswer({variables: {
                assessmentAttempt: {
                    id: assesmentAttemptId,
                    status: "started"
                  },
                  activeQuestion: {
                    body: question.body,
                    mustSelectAllCorrectChoices: true,
                    selectedChoice: {
                      value: answer.value,
                      correct: answer.correct
                    }
                  }
              }})
              let oldAnswers = answers
              oldAnswers[index] = index_2
              setAnswers([...oldAnswers])
            }}
            >{answer.value}</h2>
        })
        return <div className='p-4' key={`key-${index}`}>
          <h1
            className='text-xl'>{question.body.replace(/<[^>]+>/g, '')}</h1>
          {answerItems}
        </div>
      })
    }
    

    return (
        <div>
            <h1
              onClick={() => console.log(questions)}
              className='text-xl'
              >{title}</h1>
              { questionItems }
            <h1
                className='hover:bg-slate-100 bg-slate-400 rounded-lg 
                m-2 px-3 hover:cursor-pointer w-72 text-xl text-center'
                onClick={() => {
                  let newAnswers = []
                  for (let i = 0; i < answers.length; i++) {
                    newAnswers.push(-1)
                  }
                  setAnswers(newAnswers)
                }}
                >Submit Quiz</h1>
        </div>
    );
};

export default Quiz;