import React, { useEffect, useCallback } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_QUESTIONNAIRES } from '../apollo/questionnaire';
import { FlatList, View } from 'react-native';

import SaluTitle from '../saluComponents/SaluTitle';
import SaluText from '../saluComponents/SaluText';

const QuestionnaireLarkOwl = () => {
  const [getQuestionnaires, {
    data: questionnaires,
  }] = useLazyQuery(GET_QUESTIONNAIRES);

  useEffect(() => {
    getQuestionnaires({
      variables: {
        whereQuestionnaires: {
          type: {
            _eq: 'lark_owl',
          },
        },
      },
    });
  }, []);

  const larkOwlQuestionnaire = questionnaires?.questionnaires?.[0] || { };

  const renderQuestion = useCallback(({ item: question }) => <View
    style={{ marginTop: 20, marginHorizontal: 20 }}>
    <SaluTitle style={{ marginBottom: 10 }}>{question.title}</SaluTitle>
    {question.answer_v2s.map((answer) => <SaluText key={answer.id}>
      - {answer.text}
    </SaluText>)}
  </View>);

  return <View style={{ flexGrow: 1, backgroundColor: '#eee' }}>
    <FlatList
      data={larkOwlQuestionnaire.question_v2s || []}
      keyExtractor={item => item.id}
      renderItem={renderQuestion}
    />
  </View>;
};

export default QuestionnaireLarkOwl;