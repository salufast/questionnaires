import React, {useEffect, useState, useRef} from 'react';
import {useLazyQuery, useMutation} from '@apollo/client';
import {GET_QUESTIONNAIRES} from '../apollo/questionnaire';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import styles from './styles';
import Card from './Options';
import Swiper from 'react-native-deck-swiper';
import {Smiley, Back} from '../utils/images';
import ProgressBar from './ProgressBar';
import {buttonData, resultData} from '../utils/constant';
import Result from './Result';
import {INSERT_QUESTIONNAIRE_ANSWER} from '../apollo/questionnaire_answer';
import {useNavigation} from '@react-navigation/native';
import {Loader} from './Loader';

const QuestionnaireFastingProtocol = ({route}) => {
  const {programDay} = route.params || {};
  const [getQuestionnaires, {data: questionnaire_data, loading}] =
    useLazyQuery(GET_QUESTIONNAIRES);
  const [insert_questionnaire_answer_one] = useMutation(
    INSERT_QUESTIONNAIRE_ANSWER,
  );
  const [showResult, setShowResult] = useState(false);
  const [cardIdx, setCardIdx] = useState(false);
  const [nowShow, setNowShow] = useState(false);
  const swiper = useRef(0);
  const swiper1 = useRef(0);
  const navigation = useNavigation();

  useEffect(() => {
    getQuestionnaires({
      variables: {
        whereQuestionnaires: {
          _or: [
            {type: {_eq: 'fasting_protocol'}},
            ...((programDay === 0 && [
              {
                type: {_eq: 'fasting_goals'},
              },
            ]) ||
              []),
            ...((programDay === 6 && [
              {
                type: {_eq: 'fasting_goals_reached'},
              },
            ]) ||
              []),
          ],
        },
      },
    });
  }, [programDay]);

  const fastingProtocolQuestionnaire =
    questionnaire_data?.questionnaires?.find(
      questionnaire => questionnaire.type === 'fasting_protocol',
    ) || {};
  const fastingGoalsQuestionnaire =
    questionnaire_data?.questionnaires?.find(
      questionnaire => questionnaire.type === 'fasting_goals',
    ) || {};
  const fastingGoalsReachedQuestionnaire =
    questionnaire_data?.questionnaires?.find(
      questionnaire => questionnaire.type === 'fasting_goals_reached',
    ) || {};

  const onNext = () => {
    setCardIdx(prev => prev + 1);
  };
  const onBack = () => {
    setCardIdx(prev => prev - 1);
  };

  const caching = async (questionnaireAnswerValues, response, item) => {
    const optimisticResponse = {
      __typename: 'Mutation',
      insert_questionnaire_answer_one: {
        __typename: 'questionnaire_answer',
        id: '2938283-2938473',
        question_answer_v2s: [
          {
            __typename: 'question_answer_v2',
            id: '23453-34434',
            answer_text: response?.text,
            question_v2: {
              __typename: item.__typename,
              id: item.id,
              title: item.title,
              index: item.index,
              allow_multiple_answers: item.allow_multiple_answers,
              type: item.type,
            },
            answer_v2: {
              __typename: 'answer_v2',
              id: response.id,
              text: response?.text,
              index: response?.index,
            },
          },
        ],
      },
    };
    await insert_questionnaire_answer_one({
      variables: {questionnaireAnswerValues},
      optimisticResponse,
      update: async (cache, {data: {insert_questionnaire_answer_one}}) => {
        const cacheId = cache.identify(insert_questionnaire_answer_one);

        const questionAnswerV2Id = cache.identify(
          insert_questionnaire_answer_one.question_answer_v2s[0],
        );
        const questionV2Id = cache.identify(
          insert_questionnaire_answer_one.question_answer_v2s[0].question_v2,
        );
        const answerV2Id = cache.identify(
          insert_questionnaire_answer_one.question_answer_v2s[0].answer_v2,
        );
        // Update the cache for the question_answer_v2 entity
        cache.modify({
          id: cacheId,
          fields: {
            question_answer_v2s(existingQuestionAnswerV2s = []) {
              const updatedQuestionAnswerV2s = [
                ...existingQuestionAnswerV2s,
                questionAnswerV2Id,
              ];
              return updatedQuestionAnswerV2s;
            },
          },
        });
      },
    });
  };

  const keyExtractor = item => {
    return item?.id;
  };

  return (
    <View style={styles.testContainer}>
      {showResult ? (
        <Result
          title={resultData[1]?.title}
          description={resultData[1]?.description}
          image={Smiley}
          type={2}
        />
      ) : (
        <View style={styles.questNum}>
          {!nowShow && (
            <View style={styles.cardNum}>
              <TouchableOpacity
                style={styles.lastTitle}
                onPress={() => navigation.goBack()}>
                <Image source={Back} />
                <Text style={styles.titleText}>
                  {'  '}
                  {buttonData.lastTitle_small}
                </Text>
              </TouchableOpacity>
              {cardIdx <= 2 ? (
                <Text style={styles.regularFont}>
                  {cardIdx + 1} of {''}
                  {fastingProtocolQuestionnaire?.question_v2s?.length}
                </Text>
              ) : ( 
                <></>
              )}
            </View>
          )}
          {!nowShow && (
            <View style={styles.progressView}>
              <ProgressBar
                data={fastingProtocolQuestionnaire?.question_v2s}
                cardIdx={cardIdx}
              />
            </View>
          )}
          <View style={styles.swiperView}>
            <Swiper
              showSecondCard={true}
              ref={swiper}
              stackSeparation={20}
              swipeBackCard={true}
              horizontalSwipe={false}
              verticalSwipe={false}
              cards={fastingProtocolQuestionnaire?.question_v2s || []}
              renderCard={card => {
                return (
                  <Card
                    item={card}
                    ref={swiper}
                    multiple={card?.allow_multiple_answers}
                    __typename={fastingProtocolQuestionnaire?.__typename}
                    id={fastingProtocolQuestionnaire?.id}
                    {...{onNext}}
                    {...{onBack}}
                    {...{cardIdx}}
                    {...{caching}}
                  />
                );
              }}
              onSwipedAll={() => {
                if (programDay === 0 || programDay === 6) {
                  setNowShow(true);
                  setShowResult(false);
                } else setShowResult(true);
              }}
              stackSize={3}
              keyExtractor={keyExtractor}
            />
          </View>
          {nowShow && (
            <View>
              <Swiper
                ref={swiper1}
                horizontalSwipe={false}
                verticalSwipe={false}
                swipeAnimationDuration={0}
                cards={
                  programDay === 0
                    ? fastingGoalsQuestionnaire?.question_v2s
                    : programDay === 6
                    ? fastingGoalsReachedQuestionnaire?.question_v2s
                    : []
                }
                renderCard={card => {
                  return (
                    <Card
                      item={card}
                      ref={swiper1}
                      multiple={card?.allow_multiple_answers}
                      id={questionnaire_data?.questionnaires?.[0]?.id}
                      __typename={
                        questionnaire_data?.questionnaires?.[0].__typename
                      }
                      {...{onNext}}
                      {...{onBack}}
                      {...{cardIdx}}
                      {...{caching}}
                    />
                  );
                }}
                onSwipedAll={() => {
                  setShowResult(true);
                }}
                keyExtractor={keyExtractor}
              />
            </View>
          )}
        </View>
      )}
      <Loader show={loading} />
    </View>
  );
};

export default QuestionnaireFastingProtocol;
