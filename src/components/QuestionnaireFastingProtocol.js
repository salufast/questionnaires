import React, {useEffect, useState, useRef} from 'react';
import {useLazyQuery} from '@apollo/client';
import {GET_QUESTIONNAIRES} from '../apollo/questionnaire';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import SaluTitle from '../saluComponents/SaluTitle';
import SaluText from '../saluComponents/SaluText';
import Card from './Options';
import Swiper from 'react-native-deck-swiper';
import {Smiley} from '../utils/images';
import { useNavigation } from '@react-navigation/native';
import ProgressBar from './ProgressBar';

const QuestionnaireFastingProtocol = ({route}) => {
  const {programDay} = route.params || {};
  const [getQuestionnaires, {data: questionnaire_data}] =
    useLazyQuery(GET_QUESTIONNAIRES);
  const [showResult, setShowResult] = useState(false);
  const [cardIdx, setCardIdx] = useState(false);
  const swiper = useRef(0);
  const navigation = useNavigation();

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
        <View style={styles.fastingProt}>
          <Image source={Smiley} />
          <View style={styles.resultView}>
            <SaluTitle>You are in high Spirits!</SaluTitle>
            <SaluText style={styles.resultText}>
              Congratulations! Your mood today is excellent. This could be the
              effect of the known effect called “fasting high” by the experts.
              Keep it up.
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
              <Text style={styles.regularFont}>{cardIdx + 1} of {""}{fastingProtocolQuestionnaire?.question_v2s?.length}</Text>
            ) : (
              <></>
            )}
          </View>
          <View style={styles.progressView}>
          <ProgressBar
              data={fastingProtocolQuestionnaire?.question_v2s}
              cardIdx={cardIdx}
            />
          </View>
          <View style={styles.swiperView}>
            <Swiper
              showSecondCard={false}
              ref={swiper}
              disableLeftSwipe={true}
              disableTopSwipe={true}
              disableBottomSwipe={true}
              cards={fastingProtocolQuestionnaire?.question_v2s || []}
              renderCard={(card) => {
                return <Card item={card} ref={swiper} multiple={card?.allow_multiple_answers}/>;
              }}
              onSwiped={cardIndex => {
                setCardIdx(cardIndex + 1);
              }}
              onSwipedAll={() => {
                console.log('onSwipedAll');
                setShowResult(true);
              }}
              stackSize={5}/>
          </View>
        </>
      )}
    </View>
  );
};

export default QuestionnaireFastingProtocol;
