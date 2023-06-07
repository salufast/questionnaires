import React, {useEffect, useState, useRef} from 'react';
import {useLazyQuery} from '@apollo/client';
import {GET_QUESTIONNAIRES} from '../apollo/questionnaire';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import Swiper from 'react-native-deck-swiper';
import Card from './Options';
import ProgressBar from './ProgressBar';
import {buttonData, resultData} from '../utils/constant';
import Result from './Result';
import {useNavigation} from '@react-navigation/native';
import {Back} from '../utils/images';

const QuestionnaireWHO5 = () => {
  const [getQuestionnaires, {data: questionnaires}] =
    useLazyQuery(GET_QUESTIONNAIRES);
  const swiper = useRef();
  const [cardIdx, setCardIdx] = useState(false);
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
                {'  '}{buttonData.lastTitle_small}
              </Text>
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
              disableLeftSwipe={true}
              disableTopSwipe={true}
              swipeBackCard={true}
              disableBottomSwipe={true}
              swipeAnimationDuration={cardIdx === 4 ? 0 : 350}
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
              stackSize={3}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default QuestionnaireWHO5;
