import React, {useEffect, useRef, useState} from 'react';
import {useLazyQuery} from '@apollo/client';
import {GET_QUESTIONNAIRES} from '../apollo/questionnaire';
import {View, Text, Image, TouchableOpacity, Animated} from 'react-native';
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
  const [animation] = useState(new Animated.Value(0));

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

  useEffect(() => {
    // Define the animation configuration
    const animationConfig = {
      toValue: 1,
      duration: 400,
      delay: 1000,
      useNativeDriver: false,
    };
    // Start the animation
    setTimeout(() => {
      Animated.timing(animation, animationConfig).start();
    }, 200);
  }, [showResult]);

  // Define the interpolated height based on the animation value
  const interpolatedHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['85%', '40%'], // Adjust the output range as needed
  });

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
              swipeAnimationDuration={cardIdx === 4 ? 0 : 350}
              cards={questionnaires?.questionnaires?.[0]?.question_v2s || []}
              renderCard={(card, index) => {
                setCardIdx(index);
                return (
                  <Card
                    item={card}
                    ref={swiper}
                    multiple={card?.allow_multiple_answers}
                  />
                );
              }}
              onSwipedAll={() => {
                console.log('onSwipedAll');
                setShowResult(true);
              }}
              stackSize={5}></Swiper>
          </View>
        </>
      )}
    </View>
  );
};

export default QuestionnaireLarkOwl;
