import React, { useEffect, useCallback } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_QUESTIONNAIRES } from '../apollo/questionnaire';
import { FlatList, View } from 'react-native';

import SaluTitle from '../saluComponents/SaluTitle';
import SaluText from '../saluComponents/SaluText';

const QuestionnaireWHO5 = () => {
  const [getQuestionnaires, {
    data: questionnaires,
  }] = useLazyQuery(GET_QUESTIONNAIRES);

  useEffect(() => {
    getQuestionnaires({
      variables: {
        whereQuestionnaires: {
          type: {
            _eq: 'who5_well_being_index',
          },
        },
      },
    });
  }, []);

  const who5Questionnaire = questionnaires?.questionnaires?.[0] || { };

  const extractKey = useCallback(item => item.id, []);
  
  const renderQuestion = useCallback(({ item: question }) => <View
    style={{ marginTop: 20, marginHorizontal: 20 }}>
    <SaluTitle style={{ marginBottom: 10 }}>{question.title}</SaluTitle>
    {question.answer_v2s.map((answer) => <SaluText key={answer.id}>
      - {answer.text}
    </SaluText>)}
  </View>);

  return <View style={{ flexGrow: 1, backgroundColor: '#eee' }}>
    <FlatList
      data={who5Questionnaire.question_v2s || []}
      keyExtractor={extractKey}
      renderItem={renderQuestion}
    />
  </View>;
};

export default QuestionnaireWHO5;