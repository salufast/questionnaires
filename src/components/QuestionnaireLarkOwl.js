import React, {useEffect, useRef, useState, useMemo} from 'react';
import {useLazyQuery, useMutation, useApolloClient} from '@apollo/client';
import {GET_QUESTIONNAIRES} from '../apollo/questionnaire';
import {INSERT_QUESTIONNAIRE_ANSWER} from '../apollo/questionnaire_answer';
import {View, Text, TouchableOpacity, Image, Alert} from 'react-native';
import styles from './styles';
import Swiper from 'react-native-deck-swiper';
import {Back, Owl} from '../utils/images';
import Card from './Options';
import ProgressBar from './ProgressBar';
import Result from './Result';
import {buttonData, resultData} from '../utils/constant';
import {useNavigation} from '@react-navigation/native';
import SaluText from '../saluComponents/SaluText';

const QuestionnaireLarkOwl = () => {
  const [getQuestionnaires, {data: questionnaires}] =
    useLazyQuery(GET_QUESTIONNAIRES);
  const [insert_questionnaire_answer_one] = useMutation(
    INSERT_QUESTIONNAIRE_ANSWER,
  );
  const swiper = useRef();
  const [cardIdx, setCardIdx] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const navigation = useNavigation();

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
        if (insert_questionnaire_answer_one.id !== '2938283-2938473') {
          const obj = {
            typeId: questionnaires?.questionnaires?.[0].id,
            id: item.id,
            answerId: response.id,
            questionId: questionnaireAnswerValues.questionnaire_id,
            questionnaire_id: insert_questionnaire_answer_one.id,
          };
        }
        const questionAnswerV2Id = cache.identify(
          insert_questionnaire_answer_one.question_answer_v2s[0],
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

  return (
    <View style={styles.testContainer}>
      {showResult ? (
        <Result
          title={resultData[0]?.title}
          description={resultData[0]?.description}
          image={Owl}
          type={0}
        />
      ) : (
        <>
          <View style={styles.cardNum}>
            <TouchableOpacity
              style={styles.lastTitle}
              onPress={() => {
                navigation.goBack();
              }}>
              <Image source={Back} />
              <SaluText style={styles.titleText}>
                {buttonData.lastTitle_small}
              </SaluText>
            </TouchableOpacity>
            {cardIdx <= 4 ? (
              <Text style={styles.regularFont}>
                {cardIdx + 1} of {''}
                {questionnaires?.questionnaires?.[0]?.question_v2s?.length}
              </Text>
            ) : (
              <></>
            )}
          </View>
          <View style={styles.progressView}>
            <ProgressBar
              data={questionnaires?.questionnaires?.[0]?.question_v2s}
              cardIdx={cardIdx}
            />
          </View>
          <View style={styles.swiperView}>
            <Swiper
              ref={swiper}
              stackSeparation={20}
              showSecondCard={true}
              horizontalSwipe={false}
              verticalSwipe={false}
              swipeBackCard={true}
              swipeAnimationDuration={cardIdx === 4 ? 0 : 350}
              cards={questionnaires?.questionnaires?.[0]?.question_v2s || []}
              renderCard={card => {
                return (
                  <Card
                    item={card}
                    ref={swiper}
                    multiple={card?.allow_multiple_answers}
                    __typename={questionnaires?.questionnaires?.[0].__typename}
                    id={questionnaires?.questionnaires?.[0]?.id}
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
              stackSize={3}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default QuestionnaireLarkOwl;
