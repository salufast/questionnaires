import React, {useEffect, useCallback, useState, useRef} from 'react';
import {useLazyQuery} from '@apollo/client';
import {GET_QUESTIONNAIRES} from '../apollo/questionnaire';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import Swiper from 'react-native-deck-swiper';
import {Checkmark, Owl, Radio} from '../utils/images';
import {useNavigation, useRoute} from '@react-navigation/native';
import SaluTitle from '../saluComponents/SaluTitle';
import SaluText from '../saluComponents/SaluText';
import {VictoryPie} from 'victory-native';
import SemiCircleProgressBar from './ProgressSvg';

const QuestionnaireWHO5 = () => {
  const [getQuestionnaires, {data: questionnaires}] =
    useLazyQuery(GET_QUESTIONNAIRES);
  const swiper = useRef();
  const navigation = useNavigation();
  const [cardIdx, setCardIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [rightAns, setRightAns] = useState(false);
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

  const handleOptionPress = option => {
    setSelectedOption(option);
  };

  const renderCard = (item, index) => {
    return (
      <View style={styles.card}>
        <SaluText style={{color: '#808080'}}>Choose an answer</SaluText>
        <SaluTitle>{item?.title}</SaluTitle>
        <View style={styles.questOpt}>
          {item?.answer_v2s.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.7}
                onPress={() => {
                  handleOptionPress(index);
                }}
                style={[
                  styles.options,
                  {
                    backgroundColor:
                      selectedOption === index ? '#4CB5AB' : '#FAFAFA',
                  },
                ]}>
                <Image source={Radio} />
                <SaluText style={styles.padSpace}>{item?.text}</SaluText>
                {/* implementing animation */}
                {rightAns && (
                  <Image
                    source={Checkmark}
                    style={{position: 'absolute', left: '5%'}}
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.mainButton}>
          <TouchableOpacity
            style={styles.m_button}
            onPress={() => swiper.current.swipeBack()}>
            <Text style={styles.backText}>BACK</Text>
          </TouchableOpacity>
          {/* <AnimatedButton /> */}
          <TouchableOpacity
            onPress={() => swiper.current.swipeLeft()}
            style={[
              styles.m_button,
              {backgroundColor: '#008888', borderRadius: 10},
            ]}>
            <Text style={[styles.backText, {color: 'white'}]}>NEXT</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={{flexGrow: 1, backgroundColor: '#eee'}}>
      {showResult ? (
        <View
          style={styles.resultProgress}>
          <View style={styles.graphView}>
            <SemiCircleProgressBar percentage={winPercent} />
            <Text
              style={styles.midVal}>
              23
            </Text>
            <View
              style={styles.graphValView}>
              <Text
                style={styles.graphVal}>
                0
              </Text>
              <Text
                style={styles.graphVal}>
                25
              </Text>
            </View>
            <View></View>
          </View>
          <View
            style={styles.tile}>
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
              <Text style={styles.regularFont}>{cardIdx + 1} of 5</Text>
            ) : (
              <></>
            )}
          </View>
          <View style={styles.progressView}>
            {questionnaires?.questionnaires?.[0]?.question_v2s.map(
              (item, index) => (
                <View
                  key={index}
                  style={[
                    styles.progressBar,
                    {
                      backgroundColor: false ? '#4CB5AB' : '#D3D3D3',
                    },
                  ]}
                />
              ),
            )}
          </View>
          <View style={styles.swiperView}>
            <Swiper
              ref={swiper}
              disableLeftSwipe={true}
              disableTopSwipe={true}
              disableBottomSwipe={true}
              cards={questionnaires?.questionnaires?.[0]?.question_v2s || []}
              renderCard={renderCard}
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
