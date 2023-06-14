import {
  Text,
  View,
  Animated,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import styles from './styles';
import {useNavigation} from '@react-navigation/native';
import SaluText from '../saluComponents/SaluText';
import SaluTitle from '../saluComponents/SaluTitle';
import SemiCircleProgressBar from './ProgressSvg';
import {buttonData} from '../utils/constant';
import colors from '../utils/colors';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useApolloClient} from '@apollo/client';

const Result = ({title, description, image = null, type}) => {
  const [animation] = useState(new Animated.Value(0));
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const result = ['Owl', '92%', 'high Spirits'];
  const navigation = useNavigation();
  const apolloClient = useApolloClient();

  useEffect(() => {
    const animationConfig = {
      toValue: 1,
      duration: 1200,
      useNativeDriver: false,
    };
    setTimeout(() => {
      Animated.timing(animation, animationConfig).start();
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start();
    }, 200);
  }, [fadeAnim]);

  // Define the interpolated height based on the animation value
  const interpolatedHeight = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [hp(70), hp(35)], // Adjust the output range as needed
  });

  return (
    <View style={styles.resultPage}>
      <Animated.View style={[{opacity: fadeAnim}, styles.itemCenter1]}>
        {image === false ? (
          <View style={styles.semiCircle}>
            {/* <SemiCircleProgressBar percentage={90} /> */}
            <Text style={styles.midVal}>23</Text>
            <View style={styles.graphValView}>
              <Text style={styles.graphVal}>0</Text>
              <Text style={styles.graphVal}>25</Text>
            </View>
          </View>
        ) : (
          <Image source={image} resizeMode="contain" style={styles.resultPic} />
        )}
      </Animated.View>
      <Animated.View style={[styles.resultView, {height: interpolatedHeight}]}>
        <Animated.View style={[{opacity: fadeAnim}, styles.itemCenter]}>
          <SaluTitle>
            {title}
            {<Text style={{color: colors.greenCorrect}}>{result[type]}</Text>}!
          </SaluTitle>
          <SaluText style={styles.resultText}>{description}</SaluText>
        </Animated.View>
        <TouchableOpacity
          onPress={async () => {
            navigation.navigate('questionnaires');
            await apolloClient.clearStore();
          }}
          style={styles.resultButton}>
          <Animated.View style={[{opacity: fadeAnim}, styles.itemCenter]}>
            <SaluText style={styles.resultButtonText}>
              {buttonData?.lastTitle}
            </SaluText>
          </Animated.View>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

export default Result;
