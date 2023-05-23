import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import SaluTitle from '../saluComponents/SaluTitle';
import SaluText from '../saluComponents/SaluText';
import styles from './styles';

const Options = (item, index) => {
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
  )
}

export default Options
