import React, {useEffect, useState, useRef} from 'react';
import {useLazyQuery} from '@apollo/client';
import {GET_QUESTIONNAIRES} from '../apollo/questionnaire';
import {View, Text} from 'react-native';
import styles from './styles';
import Card from './Options';
import Swiper from 'react-native-deck-swiper';
import {Smiley} from '../utils/images';
import ProgressBar from './ProgressBar';
import {resultData} from '../utils/constant';
import Result from './Result';
import {GET_QUESTIONNAIRE_ANSWERS} from '../apollo/questionnaire_answer';
import { useQuery } from '@apollo/client';

const QuestionnaireFastingProtocol = ({route}) => {
  const {programDay} = route.params || {};
  const [getQuestionnaires, {data: questionnaire_data}] =
    useLazyQuery(GET_QUESTIONNAIRES);
  const [getAnswers, {data: questionnaire_ans}] = useLazyQuery(
    GET_QUESTIONNAIRE_ANSWERS,
  );
  const [showResult, setShowResult] = useState(false);
  const [cardIdx, setCardIdx] = useState(false);
  const [nowShow, setNowShow] = useState(false);
  const swiper = useRef(0);
  const swiper1 = useRef(0);

  const {data} = useQuery(GET_QUESTIONNAIRE_ANSWERS, {
    variables: {
      whereQuestionnaireAnswers: {
        _or: [
          {id: {_eq: "1"}},
          
        ],
      },
    },
  });

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

  return (
    <View style={styles.testContainer}>
      {showResult ? (
        <Result
          title={resultData[1]?.title}
          description={resultData[1]?.description}
          image={Smiley}
        />
      ) : (
        <View style={styles.questNum}>
          {!nowShow && (
            <View style={styles.cardNum}>
              {cardIdx <= 4 ? (
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
              swipeBackCard={true}
              disableLeftSwipe={true}
              disableTopSwipe={true}
              disableBottomSwipe={true}
              cards={fastingProtocolQuestionnaire?.question_v2s || []}
              renderCard={card => {
                setCardIdx(swiper?.current?.state?.firstCardIndex);
                return (
                  <Card
                    item={card}
                    ref={swiper}
                    multiple={card?.allow_multiple_answers}
                  />
                );
              }}
              onSwipedAll={() => {
                if (programDay === 0 || programDay === 6) {
                  setNowShow(true);
                  setShowResult(false);
                } else setShowResult(true);
              }}
              stackSize={5}
            />
          </View>
          {nowShow && (
            <View>
              <Swiper
                ref={swiper1}
                disableLeftSwipe={true}
                disableTopSwipe={true}
                swipeAnimationDuration={0}
                disableBottomSwipe={true}
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
                    />
                  );
                }}
                onSwipedAll={() => {
                  setShowResult(true);
                }}
              />
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default QuestionnaireFastingProtocol;
