import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  regularFont: {
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
    color: '#4D4D4D',
  },
  container: {
    flex: 1,
    backgroundColor: '#Faa',
  },
  card: {
    paddingVertical: 20,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#E8E8E8',
    justifyContent: 'flex-start',
    backgroundColor: 'white',
    height: '85%',
    paddingHorizontal: 20,
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  text: {
    textAlign: 'center',
    fontSize: 50,
    backgroundColor: 'transparent',
  },
  testContainer: {flexGrow: 1, backgroundColor: '#eee'},
  progressView: {
    height: 30,
    marginVertical: 15,
    marginHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  progressBar: {
    height: 14,

    width: 60,
    borderRadius: 10,
  },
  swiperView: {
    bottom: '8%',
  },
  questOpt: {
    marginVertical: 10,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    height: '60%',
    marginVertical: 16,
  },
  options: {
    width: '100%',
    height: '16%',
    flexDirection: 'row',
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  padSpace: {paddingHorizontal: 10},
  mainButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  m_button: {
    height: 40,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backText: {
    color: '#4D4D4D',
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 16,
  },
  resultView: {
    marginVertical: '8%',
    height: '40%',
    width: '85%',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    padding: '6%',
  },
  resultText: {textAlign: 'center', marginVertical: '3%'},
  resultButton: {
    borderRadius: 50,
    backgroundColor: '#008888',
    width: '90%',
    height: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  resultButtonText: {fontSize: 16, color: '#FFFFFF'},
  cardNum: {marginTop: 10, alignItems: 'center'},
  resultProgress: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  midVal: {
    alignSelf: 'center',
    bottom: 255,
    fontSize: 50,
    color: '#008888',
  },
  graphVal: {
    alignSelf: 'flex-end',
    bottom: 255,
    fontSize: 25,
    color: '#808080',
  },
  graphValView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 310,
    marginHorizontal: 50,
  },
  tile: {
    height: '40%',
    width: '85%',
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    padding: '6%',
  },
  box: {
    width: 200,
    height: 200,
    backgroundColor: 'yellow',
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: 'blue',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  fastingProt: {flex: 1, alignItems: 'center', justifyContent: 'center'},
});
