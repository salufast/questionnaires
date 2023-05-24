import {Text, View, TouchableOpacity, Image, Animated} from 'react-native';
import React, {useState, useRef} from 'react';
import SaluTitle from '../saluComponents/SaluTitle';
import SaluText from '../saluComponents/SaluText';
import styles from './styles';
import {Checkmark, Radio} from '../utils/images';

const Card = React.forwardRef(({item}, swiper) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const scaleValue = useRef(new Animated.Value(1)).current;
  const backgroundColorValue = useRef(new Animated.Value(0)).current;
  const [viewHeight] = useState(new Animated.Value(200)); // Initial height of the view
  const handleSelectOption = option => {
    setSelectedOption(option);
  };
  const isCorrectOption = option => {
    return selectedOption === option.index;
  };

  const handleButtonClick = () => {
    // Shrink animation
    Animated.timing(scaleValue, {
      toValue: 0.5,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      // Toggle checked state
      setIsChecked(!isChecked);

      // Restore original size animation
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };


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
                handleSelectOption(index);
                handleButtonClick();
              }}
              style={[
                styles.options,
                {
                  backgroundColor: isCorrectOption(item)
                    ? '#4CB5AB'
                    : '#FAFAFA',
                },
              ]}>
              <Animated.View
                style={[
                  {
                    transform: [
                      {scale: isCorrectOption(item) ? scaleValue : 0.75},
                    ],
                  },
                ]}>
                <Image source={Radio} />
                {isCorrectOption(item) && (
                  <Image
                    source={Checkmark}
                    style={{position: 'absolute', top: '10%', left: '18%'}}
                  />
                )}
              </Animated.View>
              <SaluText style={styles.padSpace}>{item?.text}</SaluText>
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
});

export default Card;
