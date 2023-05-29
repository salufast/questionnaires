import {
  Text,
  View,
  Animated,
  TouchableOpacity,
  Image,
  Easing,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import SaluText from '../saluComponents/SaluText';
import SaluTitle from '../saluComponents/SaluTitle';
import SemiCircleProgressBar from './ProgressSvg';

const Result = ({title, description, image = null}) => {
  const [animation] = useState(new Animated.Value(0));
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  console.log('image', image);
  useEffect(() => {
    // Define the animation configuration
    const animationConfig = {
      toValue: 1,
      duration: 1200,
      useNativeDriver: false,
    };

    // Start the animation
    setTimeout(() => {
      Animated.timing(animation, animationConfig).start();
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.in,
        useNativeDriver: true,
      }).start();
    }, 200);
  }, [fadeAnim]);

  // Define the interpolated height based on the animation value
  const interpolatedHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['85%', '40%'], // Adjust the output range as needed
  });

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        shadowOffset: {width: 2, height: 4},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5,
      }}>
      <Animated.View style={{opacity: fadeAnim, alignItems: 'center'}}>
        {image === false ? (
          <View style={{height: '50%'}}>
            <SemiCircleProgressBar percentage={90} />
            <Text style={styles.midVal}>23</Text>
            <View style={styles.graphValView}>
              <Text style={styles.graphVal}>0</Text>
              <Text style={styles.graphVal}>25</Text>
            </View>
          </View>
        ) : (
          <Image source={image} />
        )}
      </Animated.View>
      <Animated.View style={[styles.resultView, {height: interpolatedHeight}]}>
        <Animated.View style={{opacity: fadeAnim, alignItems: 'center'}}>
          <SaluTitle>{title}</SaluTitle>
          <SaluText style={styles.resultText}>{description}</SaluText>
        </Animated.View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('questionnaires');
          }}
          style={[styles.resultButton]}>
          <Animated.View style={{opacity: fadeAnim, alignItems: 'center'}}>
            <SaluTitle style={styles.resultButtonText}>
              BACK TO LAST TITLE
            </SaluTitle>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default Result;
