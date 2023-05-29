import React, {useEffect, useState, useRef} from 'react';
import {useLazyQuery} from '@apollo/client';
import {GET_QUESTIONNAIRES} from '../apollo/questionnaire';
import {View, Text, TouchableOpacity, Animated, Easing} from 'react-native';
import styles from './styles';
import Swiper from 'react-native-deck-swiper';
import {useNavigation} from '@react-navigation/native';
import Card from './Options';
import ProgressBar from './ProgressBar';
import { resultData } from '../utils/constant';
import Result from './Result';

const QuestionnaireWHO5 = () => {
  const [getQuestionnaires, {data: questionnaires}] =
    useLazyQuery(GET_QUESTIONNAIRES);
  const swiper = useRef();
  const navigation = useNavigation();
  const [cardIdx, setCardIdx] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [winPercent, setWinPercent] = useState(90);
  const [correctAns, setCorrectAns] = useState(23);
  const [animation] = useState(new Animated.Value(0));
  const fadeAnim = useRef(new Animated.Value(0)).current;

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

  console.log(
    'thisi s WHO question',
    questionnaires?.questionnaires?.[0]?.question_v2s,
  );
  console.log(
    'thisi s WHO 322432question',
    swiper?.current?.state?.firstCardIndex,
  );

  console.log(cardIdx, 'this is cardIndex-09080');



  useEffect(() => {
    // Define the animation configuration
    const animationConfig = {
      toValue: 1,
      duration: 1200,
      useNativeDriver: false,
    };

    // Start the animation
    setTimeout(() => {
      Animated.timing(animation, animationConfig).start();
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.in,
        useNativeDriver: true,
      }).start();
    }, 200);
  }, [fadeAnim]);

  // Define the interpolated height based on the animation value
  const interpolatedHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['85%', '40%'], // Adjust the output range as needed
  });

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
              disableBottomSwipe={true}
              cards={questionnaires?.questionnaires?.[0]?.question_v2s || []}
              renderCard={card => {
                return (
                  <Card
                    item={card}
                    ref={swiper}
                    multiple={card?.allow_multiple_answers}
                  />
                );
              }}
              onSwiped={cardIndex => {
                setCardIdx(swiper?.current?.state?.firstCardIndex + 1);
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
