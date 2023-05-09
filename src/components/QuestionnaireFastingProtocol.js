import React, { useEffect, useCallback } from 'react';
import { useLazyQuery } from '@apollo/client';
import { GET_QUESTIONNAIRES } from '../apollo/questionnaire';
import { FlatList, View } from 'react-native';

import SaluTitle from '../saluComponents/SaluTitle';
import SaluText from '../saluComponents/SaluText';

const QuestionnaireFastingProtocol = ({ route }) => {
  const { programDay } = route.params || { };

  const [getQuestionnaires, {
    data: questionnaire_data,
  }] = useLazyQuery(GET_QUESTIONNAIRES);

  useEffect(() => {
    getQuestionnaires({
      variables: {
        whereQuestionnaires: {
          _or: [
            { type: { _eq: 'fasting_protocol' } },
            ...(programDay === 0 && [{
              type: { _eq: 'fasting_goals' }
            }] || []),
            ...(programDay === 6 && [{
              type: { _eq: 'fasting_goals_reached' }
            }] || []),
          ],
        },
      },
    });
  }, [programDay]);

  const fastingProtocolQuestionnaire = questionnaire_data?.questionnaires?.find(questionnaire =>
    questionnaire.type === 'fasting_protocol'
  ) || { };
  const fastingGoalsQuestionnaire = questionnaire_data?.questionnaires?.find(questionnaire =>
    questionnaire.type === 'fasting_goals'
  ) || { };
  const fastingGoalsReachedQuestionnaire = questionnaire_data?.questionnaires?.find(questionnaire =>
    questionnaire.type === 'fasting_goals_reached'
  ) || { };

  const renderQuestion = useCallback(({ item: question }) => <View
    style={{ marginTop: 20, marginHorizontal: 20 }}>
    <SaluTitle style={{ marginBottom: 10 }}>{question.title}</SaluTitle>
    {question.answer_v2s.map((answer) => <SaluText key={answer.id}>
      - {answer.text}
    </SaluText>)}
  </View>);

  return <View style={{ flexGrow: 1, backgroundColor: '#eee' }}>
    {fastingGoalsQuestionnaire?.question_v2s?.length > 0 && <View>
      <FlatList
        data={fastingGoalsQuestionnaire.question_v2s}
        keyExtractor={item => item.id}
        renderItem={renderQuestion}
      />
    </View>}

    {fastingGoalsReachedQuestionnaire?.question_v2s?.length > 0 && <View>
      <FlatList
        data={fastingGoalsReachedQuestionnaire.question_v2s}
        keyExtractor={item => item.id}
        renderItem={renderQuestion}
      />
    </View>}

    <FlatList
      data={fastingProtocolQuestionnaire.question_v2s || []}
      keyExtractor={item => item.id}
      contentContainerStyle={{ flexGrow: 1 }}
      renderItem={renderQuestion}
    />
  </View>;
};

export default QuestionnaireFastingProtocol;