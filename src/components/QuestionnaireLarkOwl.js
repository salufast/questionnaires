import React, {useEffect, useRef, useState} from 'react';
import {useLazyQuery} from '@apollo/client';
import {GET_QUESTIONNAIRES} from '../apollo/questionnaire';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import SaluTitle from '../saluComponents/SaluTitle';
import SaluText from '../saluComponents/SaluText';
import styles from './styles';
import Swiper from 'react-native-deck-swiper';
import {Owl} from '../utils/images';
import Card from './Options';
import ProgressBar from './ProgressBar';

const QuestionnaireLarkOwl = ({navigation}) => {
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
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Image source={Owl} />
          <View style={styles.resultView}>
            <SaluTitle>You are an Owl!</SaluTitle>
            <SaluText style={styles.resultText}>
              Skip breakfast and make lunch your largest meal of the day. Your
              last meal of the day should be at least 3 hours before going to
              bed.
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
              <Text style={styles.regularFont}>{cardIdx + 1} of {""}{questionnaires?.questionnaires?.[0]?.question_v2s?.length}</Text>
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