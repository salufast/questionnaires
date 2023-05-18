import React, {useEffect, useState} from 'react';
import {useLazyQuery} from '@apollo/client';
import {GET_QUESTIONNAIRES} from '../apollo/questionnaire';
import {View, Text, Image, TouchableOpacity, Alert} from 'react-native';
import SaluTitle from '../saluComponents/SaluTitle';
import SaluText from '../saluComponents/SaluText';
import styles from './styles';
import Swiper from 'react-native-deck-swiper';
import { Checkmark, Radio} from '../utils/images';

const QuestionnaireLarkOwl = () => {
  const [getQuestionnaires, {data: questionnaires}] =
    useLazyQuery(GET_QUESTIONNAIRES);
  const [rightAns, setRightAns] = useState(false);
  
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

  const handleComponentClick = index => {
    setRightAns(true);
  };
  
  const RenderCard = (data) => {
    return (
      <View style={styles.card}>
        <SaluText style={{color: '#808080'}}>Choose an answer</SaluText>
        <SaluTitle>{data?.data?.title}</SaluTitle>
        <View style={styles.questOpt}>
          {data?.data?.answer_v2s.map((item, index) => {
            return (
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  handleComponentClick(index);
                }}
                style={[
                  styles.options,
                  {backgroundColor: rightAns ? '#4CB5AB' : '#FAFAFA'},
                ]}>
                <Image source={Radio} />
                <SaluText style={styles.padSpace}>{item?.text}</SaluText>
                {/* // implementing animation */}
                {/* {rightAns && (
                  <Image
                    source={Checkmark}
                    style={{position: 'absolute', left: '5%'}}
                  />
                )}  */}
              </TouchableOpacity>
            );
          })}
        </View>
        <View style={styles.mainButton}>
          <TouchableOpacity style={styles.m_button}>
            <Text style={styles.backText}>BACK</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
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
      <View style={{marginTop: 10, alignItems: 'center'}}>
        <Text>
          1 of 5
        </Text>
      </View>
      <View style={styles.progressView}>
        {questionnaires?.questionnaires?.[0]?.question_v2s.map(
          () => <View style={styles.progressBar} />
        )}
      </View>
      <View style={styles.swiperView}>
        <Swiper
          disableLeftSwipe={true}
          disableTopSwipe={true}
          cards={questionnaires?.questionnaires?.[0]?.question_v2s || []}
          renderCard={card => {
            return <RenderCard data={card}/>;
          }}
          onSwiped={cardIndex => {
            console.log(cardIndex);
          }}
          onSwipedAll={() => {
            console.log('onSwipedAll');
          }}
          cardIndex={0}
          stackSize={5}></Swiper>
      </View>
    </View>
  );
};

export default QuestionnaireLarkOwl;
