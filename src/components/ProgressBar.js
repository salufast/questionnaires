import {View} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';

const ProgressBar = ({data, cardIdx}) => {
  const [cardIndex, setCardIndex] = useState(1);

  useEffect(() => {
    setCardIndex(cardIdx+1)
    return () => {
      setCardIndex(1)
    }
  })

  return data?.map((item, index) => {
    return (
      <View
        key={item.index}
        style={[
          styles.progressBar,
          {
            backgroundColor:
              index < cardIndex ? colors?.greenCorrect : colors?.lightGray,
          },
        ]}
      />
    );
  });
};

export default ProgressBar;
