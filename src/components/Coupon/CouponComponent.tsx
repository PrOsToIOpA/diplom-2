import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  Platform,
  Alert,
} from 'react-native';

import {calcFontSize, calcHeight, calcWidth} from '../../utils/dimensions';
import Clipboard from '@react-native-clipboard/clipboard';
import Share from 'react-native-share';
import {black, linearGradient, red, white} from '../../utils/constants/colors';
import LinearGradient from 'react-native-linear-gradient';

import Kopier from '../../../assets/svg/Kopier.svg';
import WhatsappIcon from '../../../assets/svg/Wapsapp.svg';
import QuestionSvg from '../../../assets/svg/question-cicrle.svg';
import Email from '../../../assets/svg/email.svg';
import {useNavigation} from '../../utils/navigation';

interface ICouponComponentProps {
  copierText?: string;
  isShownIcon?: boolean;
  code?: string;
  couponText?: string;
  margin?: number;
}

const CouponComponent = ({
  code,
  // copierText = `Registreer je nu gratis met code ${code} via https://raboomapp.com/SigningScreen/${code} en raboomapp://SigningScreen/${code} krijg tot 75% korting bij jouw favoriete webshops`,
  copierText = `Registreer je nu gratis met code ${code} via www.raboom.nl/registreren en krijg tot 75% korting bij jouw favoriete webshops`,
  isShownIcon,
  couponText = 'Deel jouw code en krijg €2,50!',
  margin = 0,
}: ICouponComponentProps) => {
  const shareWhatsappHandle = () => {
    const shareWhatsappOptions = {
      title: 'Share via',
      message: `Registreer je nu gratis met code ${code} via www.raboom.nl/registreren en krijg tot 75% korting bij jouw favoriete webshops`,
      url: '',
      social: Share.Social.WHATSAPP, // country code + phone number
      filename: 'test', // only for base64 file in Android
    };
    const handle = Platform.select({
      android: () => {
        if (Share.isPackageInstalled('com.whatsapp')) {
          Share.shareSingle(shareWhatsappOptions);
        } else {
          Alert.alert('Je hebt geen Whatsapp op je telefoon geïnstalleerd');
        }
      },
      ios: () => {
        Linking.canOpenURL('whatsapp://')
          .then(() => {
            Share.shareSingle(shareWhatsappOptions);
          })
          .catch(() => {
            Alert.alert('Je hebt geen Whatsapp op je telefoon geïnstalleerd');
          });
      },
    });
    if (handle) {
      handle();
    }
  };

  const shareEmailHandle = () => {
    const emailBodyIOS = `Registreer je nu gratis met code ${code} via www.raboom.nl/registreren en krijg tot 75% korting bij jouw favoriete webshops`;
    const emailBodyAndroid = `Registreer je nu gratis met code ${code} via www.raboom.nl/registreren en krijg tot 75%25 korting bij jouw favoriete webshops`;
    const emailSubject = 'Kom bij RABOOM!';
    const handle = Platform.select({
      android: () => {
        Linking.openURL(
          `mailto:?subject=${emailSubject}&body=${emailBodyAndroid}`,
        ).catch(e => console.log('error', e));
      },
      ios: () => {
        Linking.openURL(
          `mailto:?subject=${emailSubject}&body=${emailBodyIOS}`,
        ).catch(e => console.log('error', e));
      },
    });
    if (handle) {
      handle();
    }
  };

  return (
    <View style={[styles.itemContainer, {marginHorizontal: margin}]}>
      <LinearGradient
        start={{x: 0, y: 1}}
        end={{x: 1, y: 1}}
        locations={linearGradient.main.locations}
        colors={linearGradient.main.colors}
        style={styles.backgroundGradient}
      >
        {isShownIcon && (
          <TouchableOpacity
            onPress={() => {
              Linking.openURL('https://raboom.nl/account#deel').catch(e =>
                console.log('error', e),
              );
            }}
          >
            <QuestionSvg
              width={calcWidth(18)}
              height={calcWidth(18)}
              margin={calcWidth(8)}
            />
          </TouchableOpacity>
        )}
        <View style={styles.leftColumn}>
          <Text style={styles.couponTitle}>{couponText}</Text>
          <Text style={styles.couponNumber}>{code}</Text>
        </View>
        <View style={styles.rightColumn}>
          <View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => Clipboard.setString(`${copierText}`)}
            >
              <View style={{flexDirection: 'row'}}>
                <Kopier
                  width={calcWidth(14)}
                  height={calcWidth(14)}
                  alignSelf="center"
                />
                <Text style={styles.text}>Kopieer link</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={shareWhatsappHandle}
            >
              <View style={{flexDirection: 'row'}}>
                <WhatsappIcon
                  width={calcWidth(14)}
                  height={calcWidth(14)}
                  alignSelf="center"
                />
                <Text style={styles.text}>Whatsapp</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={shareEmailHandle}>
              <View style={{flexDirection: 'row'}}>
                <Email
                  width={calcWidth(14)}
                  height={calcWidth(14)}
                  alignSelf="center"
                />
                <Text style={styles.text}>E-mail</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    paddingTop: calcHeight(10),
  },
  backgroundGradient: {
    flexDirection: 'row',
    borderRadius: 20,
    width: '100%',
  },
  leftColumn: {
    flex: 3,
    paddingVertical: calcHeight(15),
    paddingRight: calcWidth(28),
    alignItems: 'center',
  },
  rightColumn: {
    flex: 2,
    paddingTop: calcHeight(10),
    paddingRight: calcWidth(20),
    marginBottom: calcHeight(20),
  },
  couponTitle: {
    fontSize: calcFontSize(14),
    color: white,
    textAlign: 'center',
  },
  couponNumber: {
    fontSize: calcFontSize(22),
    marginTop: calcHeight(18),
    fontWeight: 'bold',
    color: white,
  },
  button: {
    height: calcHeight(24),
    backgroundColor: white,
    color: red,
    justifyContent: 'center',
    borderRadius: 10,
    marginBottom: calcHeight(5),
    paddingLeft: calcWidth(10),
  },
  container: {
    height: calcHeight(24),
    marginBottom: 2,
  },
  text: {
    color: red,
    fontSize: calcFontSize(12),
    marginTop: calcHeight(-2),
    flex: 1,
    textAlign: 'center',
  },

  image: {
    width: 13,
    height: 13,
    borderWidth: 2,
    borderColor: black,
    marginLeft: 0,
  },
});

export default CouponComponent;
