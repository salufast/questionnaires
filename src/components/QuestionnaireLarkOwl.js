import React, {useEffect, useRef, useState} from 'react';
import {useLazyQuery} from '@apollo/client';
import {GET_QUESTIONNAIRES} from '../apollo/questionnaire';
import {View, Text, Image, TouchableOpacity, Animated} from 'react-native';
import SaluTitle from '../saluComponents/SaluTitle';
import SaluText from '../saluComponents/SaluText';
import styles from './styles';
import Swiper from 'react-native-deck-swiper';
import {Checkmark, Owl, Radio} from '../utils/images';

const QuestionnaireLarkOwl = ({navigation}) => {
  const [getQuestionnaires, {data: questionnaires}] =
    useLazyQuery(GET_QUESTIONNAIRES);
  const swiper = useRef();
  const [cardIdx, setCardIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [rightAns, setRightAns] = useState(false);
  const [clicked, setClicked] = useState(false);
  // const an = new Animated.Value(0);
  // const scale = an.interpolate({ inputRange: [0, 1], outputRange: [1, 0.8] });

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


  // useEffect(() => {
  //   inOutAnimation(-2, true);
  // }, [clicked]);

  // const faddIn = () => {
  //     inOutAnimation(5, false);
  // };

  // const inOutAnimation = (Value, frictionValue) => {
  //   Animated.spring(an, {
  //     toValue: Value,
  //     friction: frictionValue ? 4 : 7,
  //     useNativeDriver: true,
  //   }).start();
  // };

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
    <View style={styles.testContainer}>
      {showResult ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Image source={Owl} />
          <View
            style={styles.resultView}>
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
              <SaluTitle
                style={styles.resultButtonText}
              >
                BACK TO LAST TITLE
              </SaluTitle>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <View style={styles.cardNum}>
            {cardIdx <= 4 ? <Text>{cardIdx + 1} of 5</Text> : <></>}
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

          {/* ---- */}
          {/* <Animated.View>
            <View style={{backgroundColor: 'yellow'}}>
              <TouchableOpacity onPress={() => faddIn()}>
              </TouchableOpacity>
            </View>
          </Animated.View> */}
          
          <View style={styles.swiperView}>
            <Swiper
              showSecondCard={false}
              ref={swiper}
              disableLeftSwipe={true}
              disableTopSwipe={true}
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

export default QuestionnaireLarkOwl;
