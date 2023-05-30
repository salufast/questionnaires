import React, {useEffect, useRef, useState} from 'react';
import {useLazyQuery} from '@apollo/client';
import {GET_QUESTIONNAIRES} from '../apollo/questionnaire';
import {View, Text} from 'react-native';
import styles from './styles';
import Swiper from 'react-native-deck-swiper';
import {Owl} from '../utils/images';
import Card from './Options';
import ProgressBar from './ProgressBar';
import Result from './Result';
import {resultData} from '../utils/constant';

const QuestionnaireLarkOwl = () => {
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
            _eq: 'lark_owl',
          },
        },
      },
    });
  }, []);

  return (
    <View style={styles.testContainer}>
      {showResult ? (
        <Result
          title={resultData[0]?.title}
          description={resultData[0]?.description}
          image={Owl}
        />
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
              showSecondCard={false}
              disableTopSwipe={true}
              disableLeftSwipe={true}
              disableBottomSwipe={true}
              swipeBackCard={true}
              swipeAnimationDuration={cardIdx === 4 ? 0 : 350}
              cards={questionnaires?.questionnaires?.[0]?.question_v2s || []}
              renderCard={(card) => {
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
              stackSize={5}/>
          </View>
        </>
      )}
    </View>
  );
};

export default QuestionnaireLarkOwl;
