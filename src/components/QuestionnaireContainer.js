import React, { useState, useCallback } from 'react';
import { View, FlatList, TouchableOpacity, Text, Button } from 'react-native';
import SaluPaper from '../saluComponents/SaluPaper';
import SaluText from '../saluComponents/SaluText';
import SaluButton from '../saluComponents/SaluButton';

const QuestionnaireContainer = ({ navigation }) => {
  const [currentProgramDay, setCurrentProgramDay] = useState(0);

  const handleLarkOwlPress = useCallback(() => {
    navigation.navigate('larkOwlQuestionnaire');
  }, []);

  const handleWHO5Press = useCallback(() => {
    navigation.navigate('who5Questionnaire');
  }, []);

  const handleFastingProtocolPress = useCallback(() => {
    navigation.navigate('fastingProtocolQuestionnaire', {
      programDay: currentProgramDay,
    });
  }, [currentProgramDay]);

  const renderProgramDay = useCallback(({ item: programDay, index }) =>
    <TouchableOpacity
      key={programDay}
      onPress={() => setCurrentProgramDay(programDay)}
      style={{ margin: 5 }}>
      <SaluPaper
        style={{
          padding: 10,
          backgroundColor: programDay === currentProgramDay ? '#4cb5ab' : '#fafafa',
        }}>
        <SaluText
          style={{
            color: programDay === currentProgramDay ? '#fafafa' : '#4d4d4d',
          }}>
          Day {programDay}
        </SaluText>
      </SaluPaper>
    </TouchableOpacity>,
    [currentProgramDay]
  );

  return <View style={{ padding: 20, flexGrow: 1, backgroundColor: '#eee' }}>
    <SaluText style={{ textAlign: 'center' }}>
      Generally available questionnaires
    </SaluText>

    <SaluButton
      onPress={handleLarkOwlPress}
      style={{ marginTop: 20 }}>
      Lark Owl Test
    </SaluButton>

    <SaluButton
      onPress={handleWHO5Press}
      style={{ marginTop: 20 }}>
      WHO-5 Well-Being Index
    </SaluButton>

    <View
      style={{
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#4d4d4d',
      }}
    />

    <SaluText style={{ marginTop: 20, textAlign: 'center' }}>
      Questionnaires based on one day progress during a digital program
    </SaluText>

    <View style={{ marginTop: 20 }}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={[0, 1, 2, 3, 4, 5, 6]}
        renderItem={renderProgramDay}
      />
    </View>

    <SaluButton
      title={'Fasting Protocol of day ' + currentProgramDay}
      onPress={handleFastingProtocolPress}
      style={{ marginTop: 20 }}>
      {'Fasting Protocol of day ' + currentProgramDay}
    </SaluButton>
  </View>
};

export default QuestionnaireContainer;