import {StyleSheet} from 'react-native';

export default StyleSheet.create({
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
    backgroundColor: '#4CB5AB',
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
  },
  options: {
    width: '100%',
    height: '16%',
    flexDirection: 'row',
    borderRadius: 10,
    alignItems: 'center',
    paddingHorizontal: 10,
    shadowOffset: { width: 0, height: 2 },
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
});
