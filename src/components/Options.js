import {
  Text,
  View,
  TouchableOpacity,
  Image,
  Animated,
  ScrollView,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import SaluTitle from '../saluComponents/SaluTitle';
import SaluText from '../saluComponents/SaluText';
import styles from './styles';
import {Checkbox, Checkmark, Radio} from '../utils/images';
import {buttonData} from '../utils/constant';
import colors from '../utils/colors';
import {useApolloClient} from '@apollo/client';

import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const Button = ({
  cardIdx,
  swiper,
  disabled,
  onNext,
  onBack,
  response,
  id,
  item,
  caching,
}) => {
  const [disable, setDisable] = useState(false);

  useEffect(() => {
    if (disable) {
      setTimeout(() => {
        setDisable(false);
      }, 500);
    }
  }, [disable, cardIdx]);

  return (
    <>
      {cardIdx > 0 ? (
        <TouchableOpacity
          disabled={cardIdx === 0 || disable}
          style={styles.m_button_back}
          onPress={() => {
            if (cardIdx >= 0) {
              setDisable(true);
              onBack();
            }
            swiper.current.swipeBack();
          }}>
          <Text style={styles.backText}>{buttonData?.back}</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.m_button_back} />
      )}
      <TouchableOpacity
        disabled={disable}
        onPress={() => {
          if (response || disabled) {
            setDisable(true);
            onNext();
            swiper?.current?.swipeLeft();
          }
          if (response) {
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
              questionnaire_id: id,
            };
            caching(questionnaireAnswerValues, response, item);
          }
        }}
        style={[styles.m_button, {backgroundColor: colors.teal}]}>
        <Text style={styles.finishedText}>
          {swiper?.current?.state?.firstCardIndex === 4
            ? buttonData?.finished
            : buttonData?.next}
        </Text>
      </TouchableOpacity>
    </>
  );
};

const Card = React.forwardRef(
  ({item, id, caching, onNext, onBack, cardIdx, multiple}, swiper) => {
    const scaleValue = useRef(new Animated.Value(1)).current;
    const client = useApolloClient();
    const [selectedOption, setSelectedOption] = useState(null);
    const [multiSelect, setMultiSelect] = useState([]);
    const [response, setResponse] = useState(null);
    const [cacheAns, setCacheAns] = useState([]);
    const [disable, setDisable] = useState(false);

    useEffect(() => {
      if (disable) {
        setTimeout(() => {
          setDisable(false);
        }, 500);
      }
    }, [disable, cardIdx]);

    useEffect(() => {
      const cacheAnswer = [];
      const cachedData = Object.values(client?.cache?.data?.data);
      if (Array.isArray(cachedData) && typeof cachedData === 'object') {
        cachedData.map(item => {
          if (item.__typename === 'question_answer_v2') {
            let cachedId = item?.answer_v2.__ref?.split(':')?.[1];
            let questionCacheId = item?.question_v2?.__ref?.split(':')?.[1];
            if (cachedId && questionCacheId)
              cacheAnswer.push({cachedId, questionCacheId});
          }
        });
      }
      setCacheAns(cacheAnswer);
    }, [cardIdx]);

    const handleSelectOption = option => {
      const combinationExists = cacheAns.some(
        question => question.questionCacheId === item.id,
      );
      if (combinationExists) {
        // Filter out questionCacheIDs based on conditions
        let newCacheAns = cacheAns.filter(
          question => question.questionCacheId !== item.id,
        );
        setCacheAns(newCacheAns);
      }
      setSelectedOption(option);
    };

    const isCorrectOption = option => {
      // Function to filter question cache IDs based on selected option
      // Check if selected option is valid
      const combinationExists = cacheAns.some(
        question =>
          question.cachedId === option.id &&
          question.questionCacheId === item.id,
      );
      return (
        combinationExists ||
        selectedOption === option.id ||
        multiSelect.includes(option.id)
      );
    };

    useEffect(() => {
      if (selectedOption) handleButtonClick();
    }, [selectedOption]);

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

    const disabled = cacheAns.some(
      question => question?.questionCacheId === item?.id,
    );

    return (
      <View style={styles.card}>
        <View style={{flex: 1}}>
          <View style={{flex: 1}}>
            <SaluText style={styles.chooseAns}>
              {buttonData?.chooseAnswer}
            </SaluText>
            <SaluTitle
              style={{
                height: hp(14.8),
              }}>
              {item?.title}
            </SaluTitle>
            <View style={styles.questOpt}>
              <ScrollView
                contentContainerStyle={{flexGrow: 1}}
                showsVerticalScrollIndicator={false}>
                {item?.answer_v2s.map((item, index) => {
                  const optionSelected = isCorrectOption(item);
                  return (
                    <TouchableOpacity
                      disabled={disabled}
                      key={index}
                      activeOpacity={0.7}
                      style={[
                        styles.options,
                        {
                          backgroundColor: optionSelected
                            ? colors.greenCorrect
                            : colors.grey98,
                        },
                      ]}
                      onPress={() => {
                        setResponse(item);
                        multiple
                          ? handleOptionSelection(item.id)
                          : handleSelectOption(item.id);
                      }}>
                      <Animated.View
                        style={[
                          {
                            transform: [
                              {scale: optionSelected ? scaleValue : 0.75},
                            ],
                          },
                          {alignItems: 'center', justifyContent: 'center'},
                        ]}>
                        <Image source={multiple ? Checkbox : Radio} />
                        {optionSelected && (
                          <Image source={Checkmark} style={styles.checkMark} />
                        )}
                        {multiSelect.includes(item.id) && (
                          <Image source={Checkmark} style={styles.checkMark} />
                        )}
                      </Animated.View>
                      <SaluText
                        style={[
                          styles.padSpace,
                          optionSelected && {color: colors.white},
                        ]}>
                        {item?.text}
                      </SaluText>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            </View>
          </View>
          <View style={styles.mainButton}>
            <Button
              {...{cardIdx}}
              {...{onNext}}
              {...{onBack}}
              {...{disabled}}
              {...{swiper}}
              {...{response}}
              {...{id}}
              {...{item}}
              {...{caching}}
            />
          </View>
        </View>
      </View>
    );
  },
);

export default Card;
