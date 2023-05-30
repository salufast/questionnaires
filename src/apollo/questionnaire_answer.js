import { gql } from '@apollo/client';

export const QUESTIONNAIRE_ANSWER_FRAGMENT = gql`
  fragment questionnaireAnswerFields on questionnaire_answer {
    id
    question_answer_v2s {
      id
      answer_text
      question_v2 {
        id
        title
        index
        allow_multiple_answers
        type
      }
      answer_v2 {
        id
        text
        index
      }
    }
  }
`;

export const GET_QUESTIONNAIRE_ANSWERS = gql`
  query GetQuestionnaireAnswers(
    $whereQuestionnaireAnswers: questionnaire_answer_bool_exp,
  ) {
    questionnaire_answers: questionnaire_answer (
      where: $whereQuestionnaireAnswers,
    ) {
      ...questionnaireAnswerFields
    }
  }
  ${QUESTIONNAIRE_ANSWER_FRAGMENT}
`;

export const INSERT_QUESTIONNAIRE_ANSWER = gql`
  mutation InsertQuestionnaireAnswer(
    $questionnaireAnswerValues: questionnaire_answer_insert_input!,
  ) {
    insert_questionnaire_answer_one (
      object: $questionnaireAnswerValues,
    ) {
      ...questionnaireAnswerFields
    }
  }
  ${QUESTIONNAIRE_ANSWER_FRAGMENT}
`;

// ...
