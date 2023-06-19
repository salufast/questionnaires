import React, {useEffect, useState, useRef} from 'react';
import {useLazyQuery, useMutation} from '@apollo/client';
import {GET_QUESTIONNAIRES} from '../apollo/questionnaire';
import {INSERT_QUESTIONNAIRE_ANSWER} from '../apollo/questionnaire_answer';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import Swiper from 'react-native-deck-swiper';
import Card from './Options';
import ProgressBar from './ProgressBar';
import {buttonData, resultData} from '../utils/constant';
import Result from './Result';
import {useNavigation} from '@react-navigation/native';
import {Back} from '../utils/images';
import {Loader} from './Loader';

const QuestionnaireWHO5 = () => {
  const [getQuestionnaires, {data: questionnaires, loading}] =
    useLazyQuery(GET_QUESTIONNAIRES);
  const [insert_questionnaire_answer_one] = useMutation(
    INSERT_QUESTIONNAIRE_ANSWER,
  );
  const swiper = useRef();
  const [cardIdx, setCardIdx] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const navigation = useNavigation();

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

  const onNext = () => {
    setCardIdx(prev => prev + 1);
  };
  const onBack = () => {
    setCardIdx(prev => prev - 1);
  };

  const keyExtractor = item => {
    return item?.id;
  };

  return (
    <View style={styles.testContainer}>
      {showResult ? (
        <Result
          title={resultData[2].title}
          description={resultData[2].description}
          image={false}
          type={1}
        />
      ) : (
        <>
          <View style={styles.cardNum}>
            <TouchableOpacity
              style={styles.lastTitle}
              onPress={() => navigation.goBack()}>
              <Image source={Back} />
              <Text style={{color: '#4CB5AB', fontSize: 17}}>
                {'  '}
                {buttonData.lastTitle_small}
              </Text>
            </TouchableOpacity>
            {cardIdx <=
              questionnaires?.questionnaires?.[0]?.question_v2s?.length - 1 ? (
                <Text style={styles.regularFont}>
                  {cardIdx > 0 ? cardIdx + 1 : '1'} of {''}
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
              keyExtractor={keyExtractor}
            />
          </View>
        </>
      )}
      <Loader show={loading} />
    </View>
  );
};

export default QuestionnaireWHO5;
