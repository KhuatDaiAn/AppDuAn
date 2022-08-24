import {Block, Text} from '@components';
import React, {useState} from 'react';
import {
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  TouchableOpacity,
} from 'react-native';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {useDispatch, useSelector} from 'react-redux';
import actions from '@redux/actions';
import messaging from '@react-native-firebase/messaging';
import auth from '@react-native-firebase/auth';
import API from '@utils/api';

const Login = () => {
  const dispatch = useDispatch();

  GoogleSignin.configure({
    webClientId:
      '1078600024718-r4kttklrp4av6li4mqs9b5ctnhbm6aob.apps.googleusercontent.com',
  });

  async function getToken() {
    return await messaging().getToken();
  }

  const _signIn = async () => {
    await GoogleSignin.signOut();
    const currentUser = await GoogleSignin.getCurrentUser();
    // await GoogleSignin.revokeAccess();
    if (currentUser) await GoogleSignin.revokeAccess();
    try {
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();
      // get fcm token
      const fcmToken = await getToken();

      _handleLogin(idToken, fcmToken);

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      return auth().signInWithCredential(googleCredential);
    } catch (error) {
      console.log('=========> id error login', error);

      // await API.post('logs/write', {message: error});
    }
  };

  const _handleLogin = (token, fcmToken) => {
    const body = {
      token: token,
      token_fcm: fcmToken,
    };
    dispatch({type: 'LOGIN', body: body});
  };

  return (
    <Block flex alignCenter paddingTop={56} backgroundColor={'white'}>
      <Image
        style={styles.logo}
        source={require('../../../assets/images/logo.png')}
      />
      {/* <Text h1 bold size={30} style={styles.textWelcomLogin}>
        {' '}
        Chào Mừng Trở Lại{' '}
      </Text>
      <Text paddingHorizontal={61} size={13} lineHeight={20} center>
        {' '}
        Bạn phải đăng nhập để sử dụng ứng dụng Chúng tôi có hỗ trợ đăng nhập
        bằng số điện thoại hoặc gmail{' '}
      </Text> */}
      {/* <TextInput placeholder={'Số điện thoại'} style={styles.textInput} />
      <TextInput placeholder={'Mật khẩu'} style={styles.textInput2} />
      <Text bold size={15} style={styles.textRemember}>
        {' '}
        Quên mật khẩu ?{' '}
      </Text> */}
      {/* <Pressable style={styles.buttomLogin}>
        <Text style={styles.textButtomLogin}>Đăng nhập</Text>
      </Pressable> */}
      {/* <Block marginTop={22}>
        <Text size={12}> Hoặc </Text>
      </Block> */}
      <Block>
        <TouchableOpacity onPress={_signIn}>
          <Block style={styles.loginContainer}>
            <Image
              style={styles.iconLogin}
              source={require('../../../assets/images/GG.png')}
            />
            <Text style={styles.text} size={16}>
              Đăng nhập bằng Google
            </Text>
          </Block>
        </TouchableOpacity>
        <Block marginTop={32} style={styles.loginContainer}>
          <Image
            style={styles.iconLogin}
            source={require('../../../assets/images/Facbook.png')}
          />
          <Text style={styles.text} size={16}>
            Đăng nhập bằng Facebook
          </Text>
        </Block>
      </Block>
    </Block>
  );
};

export default Login;

const styles = StyleSheet.create({
  text: {
    fontWeight: '700',
  },
  logo: {
    width: '70%',
    height: '50%',
  },
  loginContainer: {
    paddingHorizontal: 30,
    height: 60,
    justifyContent: 'center',
    flexDirection: 'row',
    borderRadius: 52,
    borderColor: 'red',
    borderWidth: 1,
    alignItems: 'center',
  },
  Ellip: {
    width: 47,
    height: 47,
    borderRadius: 52,
    borderColor: '#923D47',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ECE9EC',
  },
  image: {
    marginTop: 42,
  },
  gradients1: {
    position: 'absolute',
    width: 157,
    height: 10,
    backgroundColor: '#DD4455',
  },
  gradients: {
    position: 'absolute',
    width: 157,
    height: 10,
    backgroundColor: '#DD4455',
  },
  textButtomLogin: {
    fontSize: 22,
    lineHeight: 50,
    alignItems: 'center',
    fontWeight: '700',
    fontFamily: 'Poppins',
    color: '#FFFFFF',
  },
  buttomLogin: {
    width: '88%',
    height: 59,
    marginTop: 28,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    backgroundColor: '#DD4455',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 1,
    shadowRadius: 6,

    elevation: 7,
  },
  textRemember: {
    fontFamily: 'Poppins',
    lineHeight: 23,
    color: '#2D2626',
    fontWeight: '700',
    marginTop: 22,
    marginLeft: '57%',
  },
  textInput2: {
    borderRadius: 15,
    width: '88%',
    color: '#818181',
    height: 59,
    fontWeight: '600',
    backgroundColor: '#F3F3F3',
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    paddingLeft: 18,
    shadowOpacity: 1,
    shadowRadius: 6,

    elevation: 7,
  },
  textInput: {
    borderRadius: 15,
    width: '88%',
    color: '#818181',
    height: 59,
    fontWeight: '600',
    backgroundColor: '#F3F3F3',
    marginTop: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    paddingLeft: 18,
    shadowOpacity: 1,
    shadowRadius: 6,

    elevation: 7,
  },
  textWelcomLogin: {
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    lineHeight: 45,
    color: '#464444',
  },
  textDescribe: {
    marginTop: 12,
    fontWeight: '500',
  },
  iconLogin: {
    width: 25,
    height: 25,
    marginRight: 30,
    // marginHorizontal: 20,
  },
});