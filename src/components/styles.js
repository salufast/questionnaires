import {Platform, StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../utils/colors';

export default StyleSheet.create({
  regularFont: {
    fontSize: 16,
    fontFamily: 'OpenSans-Regular',
    color: colors.darkGrey,
    width: wp(56),
  },
  container: {
    flex: 1,
    backgroundColor: colors.lightRed,
  },
  card: {
    paddingVertical: hp(1),
    borderRadius: hp(3),
    height: hp(70),
    paddingHorizontal: wp(5),
    borderColor: colors.silver,
    backgroundColor: colors.grey98,
    justifyContent: 'flex-start',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  testContainer: {
    flexGrow: 1,
    backgroundColor: colors.whiteSmoke,
    paddingVertical: hp(3),
  },
  progressView: {
    height: hp(5),
    marginVertical: hp(2),
    marginHorizontal: wp(4),
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  progressBar: {
    height: hp(1.4),
    width: wp(15),
    borderRadius: hp(3),
  },
  swiperView: {
    bottom: hp(8),
  },
  questOpt: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    height: hp(38),
    marginBottom: hp(3),
  },
  options: {
    width: wp(77),
    height: hp(6),
    flexDirection: 'row',
    borderRadius: hp(1.5),
    alignItems: 'center',
    paddingHorizontal: wp(3),
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    marginTop: hp(1.2),
    marginHorizontal: wp(1)
  },
  padSpace: {
    paddingHorizontal: wp(2.5),
    fontFamily: 'OpenSans-Regular',
    fontSize: 16,
  },
  mainButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: hp(1.5),
  },
  m_button: {
    height: hp(6),
    width: wp(30),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: hp(2.8),
    paddingHorizontal: wp(2),
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  m_button_back: {
    height: hp(6),
    width: wp(30),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: hp(3),
    paddingHorizontal: 10,
  },
  backText: {
    color: colors.darkGrey,
    fontFamily: 'OpenSans-Regular',
    fontSize: 17,
    alignSelf: 'flex-start',
  },
  resultView: {
    width: wp(85),
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: colors.grey98,
    borderRadius: hp(3),
    padding: wp(6),
    paddingVertical: hp(6),
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  resultText: { marginVertical: hp(1),fontFamily: 'OpenSans-Regular', textAlign: 'center'},
  resultButton: {
    borderRadius: hp(8),
    backgroundColor: colors.teal,
    width: wp(70),
    height: hp(5),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp(1),
  },
  resultButtonText: {fontSize: 14, color: colors.white, fontFamily: 'OpenSans-SemiBold'},
  cardNum: {
    marginTop: hp(1.5),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: (Platform.OS = 'ios' ? wp(1) : wp(3)),
  },
  resultProgress: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {width: 1, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 5,
  },
  midVal: {
    alignSelf: 'center',
    bottom: Platform.OS === 'ios' ? hp(37) : hp(31),
    fontSize: hp(7),
    color: colors.teal,
  },
  graphVal: {
    alignSelf: 'flex-end',
    fontSize: hp(4),
    color: colors.grey,
  },
  graphValView: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: wp(85),
    top: hp(22),
    right: wp(3),
  },
  questNum: {backgroundColor: colors.whiteSmoke, flex: 1},
  resultPage: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOffset: {width: 2, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  itemCenter: {alignItems: 'center', width: wp(80)},
  itemCenter1: {alignItems: 'center', marginVertical: hp(5)},
  checkMark: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? hp(0.75) : hp(0.5),
    left: wp(0.8),
  },
  semiCircle: {flex: 0.5, alignItems: 'center'},
  resultPic: {height: hp(35), alignItems: 'center'},
  lastTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: hp(-2),
    width: wp(30),
    justifyContent: 'space-evenly',
  },
  titleText: {color: '#4CB5AB', fontSize: hp(2.4), fontFamily: 'OpenSans-regular'},
  finishedText: {
    color: colors.white,
    fontFamily: 'OpenSans-SemiBold',
    fontSize: 17,
  },
  chooseAns: {color: colors.grey, marginVertical: hp(1), fontSize: 14},
});
