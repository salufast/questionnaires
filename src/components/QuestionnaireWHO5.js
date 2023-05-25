import React, {useEffect, useState, useRef} from 'react';
import {useLazyQuery} from '@apollo/client';
import {GET_QUESTIONNAIRES} from '../apollo/questionnaire';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import Swiper from 'react-native-deck-swiper';
import {Checkmark, Owl, Radio} from '../utils/images';
import {useNavigation, useRoute} from '@react-navigation/native';
import SaluTitle from '../saluComponents/SaluTitle';
import SaluText from '../saluComponents/SaluText';
import SemiCircleProgressBar from './ProgressSvg';
import Card from './Options';
import ProgressBar from './ProgressBar';

const QuestionnaireWHO5 = () => {
  const [getQuestionnaires, {data: questionnaires}] =
    useLazyQuery(GET_QUESTIONNAIRES);
  const swiper = useRef();
  const navigation = useNavigation();
  const [cardIdx, setCardIdx] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [winPercent, setWinPercent] = useState(90);
  const [correctAns, setCorrectAns] = useState(23);

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
    <View style={{flexGrow: 1, backgroundColor: '#eee'}}>
      {showResult ? (
        <View style={styles.resultProgress}>
          <View style={{height: '55%'}}>
            <SemiCircleProgressBar percentage={winPercent} />
            <Text style={styles.midVal}>23</Text>
            <View style={styles.graphValView}>
              <Text style={styles.graphVal}>0</Text>
              <Text style={styles.graphVal}>25</Text>
            </View>
          </View>
          <View style={styles.tile}>
            <SaluTitle>You've reached {winPercent}%!</SaluTitle>
            <SaluText style={styles.resultText}>
              Your WHO-5 raw score is {correctAns}. That means your wellbeing
              has been excellent the last two weeks.
            </SaluText>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('questionnaires');
              }}
              style={styles.resultButton}>
              <SaluTitle style={styles.resultButtonText}>
                BACK TO LAST TITLE
              </SaluTitle>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <View style={styles.cardNum}>
            {cardIdx <= 4 ? (
              <Text style={styles.regularFont}>
                {cardIdx + 1} of
                {questionnaires?.questionnaires?.[0]?.question_v2s?.length}
              </Text>
            ) : (
              <></>
            )}
          </View>
          <View style={styles.progressView}>
            <ProgressBar
              data={questionnaires?.questionnaires?.[0]?.question_v2s}
              cardIdx={swiper?.current?.state?.firstCardIndex}
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
                console.log('hellboy', cardIndex);
                setCardIdx(cardIndex + 1);
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

export default QuestionnaireWHO5;
