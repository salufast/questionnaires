import { gql } from '@apollo/client';

export const QUESTIONNAIRE_FRAGMENT = gql`
  fragment questionnaireFields on questionnaire {
    id
    title
    description
    type
    question_v2s {
      id
      title
      index
      allow_multiple_answers
      type
      answer_v2s {
        id
        text
        index
      }
    }
  }
`;

export const GET_QUESTIONNAIRES = gql`
  query GetQuestionnaires(
    $whereQuestionnaires: questionnaire_bool_exp,
  ) {
    questionnaires: questionnaire (
      where: $whereQuestionnaires,
    ) {
      ...questionnaireFields
    }
  }
  ${QUESTIONNAIRE_FRAGMENT}
`;
