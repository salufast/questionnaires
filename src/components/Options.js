import {Text, View, TouchableOpacity, Image, Animated} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import SaluTitle from '../saluComponents/SaluTitle';
import SaluText from '../saluComponents/SaluText';
import styles from './styles';
import {Checkbox, Checkmark, Radio} from '../utils/images';
import {buttonData} from '../utils/constant';
import colors from '../utils/colors';
import {useMutation} from '@apollo/client';
import {INSERT_QUESTIONNAIRE_ANSWER} from '../apollo/questionnaire_answer';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const Card = React.forwardRef(({item, multiple}, swiper) => {
  const scaleValue = useRef(new Animated.Value(1)).current;
  const [selectedOption, setSelectedOption] = useState(null);
  const [multiSelect, setMultiSelect] = useState([]);
  const [response, setResponse] = useState(null);

  const handleSelectOption = option => {
    setSelectedOption(option);
  };
  const isCorrectOption = option => {
    return selectedOption === option.id;
  };
  useEffect(() => {
    if (selectedOption) handleButtonClick();
  }, [selectedOption]);

  const [insert_questionnaire_answer_one] = useMutation(
    INSERT_QUESTIONNAIRE_ANSWER,
    {
      update(cache, {data: {insert_questionnaire_answer_one}}) {
        cache.modify({
          fields: {
            answer(answerQuest = []) {
              const newAnswer = cache.writeFragment({
                data: insert_questionnaire_answer_one,
                fragment: gql`
                  fragment NewAnswer on Answer {
                    id
                    text
                    index
                  }
                `,
              });
              return [...answerQuest, newAnswer];
            },
          },
        });
      },
    },
  );

  const handleButtonClick = () => {
    Animated.timing(scaleValue, {
      toValue: 0.5,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  const handleOptionSelection = option => {
    if (multiSelect?.includes(option)) {
      setMultiSelect(multiSelect?.filter(item => item !== option));
    } else {
      setMultiSelect(prevState => [...prevState, option]);
    }
  };

  const caching = (questionnaireAnswerValues, response) => {
    insert_questionnaire_answer_one({
      variables: {questionnaireAnswerValues},
      optimisticResponse: {
        insert_questionnaire_answer_one: {
          id: response?.id,
          text: response?.text,
          index: response?.index,
        },
      },
    });
  };

  return (
    <View style={styles.card}>
      <View>
        <SaluText style={styles.chooseAns}>
          {buttonData?.chooseAnswer}
        </SaluText>
        <SaluTitle style={{height: hp(12)}}>{item?.title}</SaluTitle>
        <View style={styles.questOpt}>
          {item?.answer_v2s.map((item, index) => {
            return (
              <TouchableOpacity
                key={index}
                activeOpacity={0.7}
                style={[
                  styles.options,
                  {
                    backgroundColor: isCorrectOption(item)
                      ? colors.greenCorrect
                      : colors.grey98,
                  },
                  multiSelect.includes(index) && {
                    backgroundColor: colors.greenCorrect,
                  },
                ]}
                onPress={() => {
                  setResponse(item);
                  multiple
                    ? handleOptionSelection(index)
                    : handleSelectOption(item.id);
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
                    <Image source={Checkmark} style={styles.checkMark} />
                  )}
                  {multiSelect.includes(index) && (
                    <Image source={Checkmark} style={styles.checkMark} />
                  )}
                </Animated.View>
                <SaluText
                  style={[
                    styles.padSpace,
                    isCorrectOption(item) && {color: colors.white},
                  ]}>
                  {item?.text}
                </SaluText>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
      <View style={styles.mainButton}>
        <TouchableOpacity
          style={styles.m_button_back}
          onPress={() => swiper.current.swipeBack()}>
          <Text
            style={[
              styles.backText,
              {opacity: swiper?.current?.state?.firstCardIndex < 1 ? 0 : 1},
            ]}>
            {buttonData?.back}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            {
              isCorrectOption(item);
            }
            swiper?.current?.swipeLeft();
            const questionnaireAnswerValues = {
              question_answer_v2s: {
                data: [
                  {
                    answer_text: response?.text,
                    answer_v2_id: response?.id,
                    question_v2_id: item?.id,
                  },
                ],
              },
              questionnaire_id: "",
            };
            // caching(questionnaireAnswerValues, response);
          }}
          style={[styles.m_button, {backgroundColor: colors.teal}]}>
          <Text
            style={styles.finishedText}>
            {swiper?.current?.state?.firstCardIndex === 4
              ? buttonData?.finished
              : buttonData?.next}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

export default Card;
