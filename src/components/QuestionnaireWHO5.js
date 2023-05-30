import React, {useEffect, useState, useRef} from 'react';
import {useLazyQuery} from '@apollo/client';
import {GET_QUESTIONNAIRES} from '../apollo/questionnaire';
import {View, Text, Animated, Easing} from 'react-native';
import styles from './styles';
import Swiper from 'react-native-deck-swiper';
import Card from './Options';
import ProgressBar from './ProgressBar';
import { resultData } from '../utils/constant';
import Result from './Result';

const QuestionnaireWHO5 = () => {
  const [getQuestionnaires, {data: questionnaires}] =
    useLazyQuery(GET_QUESTIONNAIRES);
  const swiper = useRef();
  const [cardIdx, setCardIdx] = useState(false);
  const [showResult, setShowResult] = useState(false);

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

  return (
    <View style={styles.testContainer}>
      {showResult ? (
        <Result title={resultData[2].title} description={resultData[2].description} image={false} />
      ) : (
        <>
          <View style={styles.cardNum}>
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
              disableLeftSwipe={true}
              disableTopSwipe={true}
              swipeBackCard={true}
              disableBottomSwipe={true}
              cards={questionnaires?.questionnaires?.[0]?.question_v2s || []}
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
                setShowResult(true);
              }}
              stackSize={5}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default QuestionnaireWHO5;
