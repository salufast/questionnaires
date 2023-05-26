import {Text, View, TouchableOpacity, Image, Animated} from 'react-native';
import React, {useState, useRef, useEffect } from 'react';
import SaluTitle from '../saluComponents/SaluTitle';
import SaluText from '../saluComponents/SaluText';
import styles from './styles';
import {Checkbox, Checkmark, Radio} from '../utils/images';

const Card = React.forwardRef(({item, multiple}, swiper) => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const [selectedOption, setSelectedOption] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [multiSelect, setMultiSelect] = useState([]);

  const titleAnim = new Animated.Value(70);
 
  useEffect(() => {
    setTimeout(function () {
      titleAnimation();
    }, 400);
  },[]);

  const handleSelectOption = option => {
    setSelectedOption(option);
  };
  const isCorrectOption = option => {
    return selectedOption === option.index;
  };

  const handleButtonClick = () => {
    Animated.timing(scaleValue, {
      toValue: 0.5,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      setIsChecked(!isChecked);
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  const trans = {
    transform: [
      {
        translateY: titleAnim,
      },
    ],
  };

  const titleAnimation = () => {
    Animated.spring(titleAnim, {
      toValue: 1.5,
      friction: 6,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const handleOptionSelection = option => {
    if (multiSelect?.includes(option)) {
      setMultiSelect(multiSelect?.filter(item => item !== option));
    } else {
      setMultiSelect(prevState => [...prevState, option]);
    }
  };

  return (
    <View style={styles.card}>
      <View>
        <Animated.View style={trans}>
      <SaluText style={{color: '#808080'}}>Choose an answer</SaluText>
      <SaluTitle>{item?.title}</SaluTitle>
      </Animated.View>
      <Animated.View style={[styles.questOpt, trans]}>
        {item?.answer_v2s.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.7}
              style={[
                styles.options,
                {
                  backgroundColor: isCorrectOption(item)
                    ? '#4CB5AB'
                    : '#FAFAFA',
                },
                multiSelect.includes(index) && {
                  backgroundColor: '#4CB5AB',
                },
              ]}
              onPress={() => {
                multiple
                  ? handleOptionSelection(index)
                  : handleSelectOption(index);
                handleButtonClick();
              }}>
              <Animated.View
                style={[
                  {
                    transform: [
                      {scale: isCorrectOption(item) ? scaleValue : 0.75},
                    ],
                  },
                ]}>
                <Image source={multiple ? Checkbox : Radio} />
                {isCorrectOption(item) && (
                  <Image
                    source={Checkmark}
                    style={{position: 'absolute', top: '10%', left: '18%'}}
                  />
                )}
                {multiSelect.includes(index) && (
                  <Image
                    source={Checkmark}
                    style={{position: 'absolute', top: '10%', left: '18%'}}
                  />
                )}
              </Animated.View>
              <SaluText style={[styles.padSpace, isCorrectOption(item) && {color: 'white'}]}>{item?.text}</SaluText>
            </TouchableOpacity>
          );
        })}
      </Animated.View>
      </View>
      <View style={styles.mainButton}>
          <TouchableOpacity
            style={styles.m_button}
            onPress={() => swiper.current.swipeBack()}>
            <Text style={[styles.backText, { opacity: item?.index < 1 ? 0 : 1 }]}>BACK</Text>
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
