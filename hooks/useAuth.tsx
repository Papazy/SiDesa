import { useNavigation, useRouter } from "expo-router";
import React, { createContext, ReactNode, useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from "react-native";

type loginType = {
  username: string;
  password: string;
};

type registerType = {
  email: string;
  name: string;
  password: string;
};

interface ProviderProps {
  user: string | null;
  token: string;
  login(data: loginType): Promise<void>;
  logout(): Promise<void>;
  register: (data: registerType) => Promise<void>;
  verifikasiOtp(otp: string, email: string): Promise<void>;
  sendOtp(email: string): Promise<void>;
  getLoginUser(): Promise<any>;
}

const AuthContext = createContext<ProviderProps>({
  user: null,
  token: '',
  login: async () => {},
  logout: async () => {},
  register: async () => {},
  verifikasiOtp : async () => {},
  sendOtp: async () => {},
  getLoginUser: async () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<any | null>(null);
  const [token, setToken] = useState<string>('');
  const router = useRouter();

  useEffect(() => {
    const loadStoredData = async () => {
      
      const storedUser = await AsyncStorage.getItem('user');
      const storedToken = await AsyncStorage.getItem('token');
      if (storedUser) setUser(JSON.parse(storedUser));
      if (storedToken) setToken(storedToken);
    };
    loadStoredData();
  }, []);

  // ------------------------------- Login ---------------------------
  const login = async (data: loginType) => {
    const response = await fetch(process.env.EXPO_PUBLIC_API_URL + '/users/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(data).toString(),
     
    });

    const responseData = await response.json();
    console.log("Response Data: ", responseData);
    if (response.ok) {
      setUser({ email: data.username });
      setToken(responseData.access_token);
      // await AsyncStorage.setItem('user', JSON.stringify({email: data.username}));
      await AsyncStorage.setItem('token', responseData.access_token);
      const userData = await getLoginUser();
      console.log("login: ", userData)  
      if(userData){
        setUser(userData);
        await AsyncStorage.setItem('user', JSON.stringify(userData))
      }
      router.replace({pathname:'/main'});
    } else {
      throw new Error("error");
    }
    throw new Error("error");
  };
  // ---------------------------------------- Logout --------------------------------------
  const logout = async () => {
    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('token');
    setUser(null);
    setToken('');
    console.log("logout ditekan");
    router.replace('/login');
  };


  const verifikasiOtp = async (otp: string, email: string) => {

    const url = `${process.env.EXPO_PUBLIC_API_URL}/users/auth/register/verify-otp?email=${email}&otp=${otp}`
    console.log("URL: ", url);

    try {
      const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
      });

      const resData = await res.json();
      if (!res.ok) {
          throw new Error(`HTTP error! status: ${resData.detail}`);
      }
      console.log("resData: ", resData);
      Alert.alert("Registrasi Berhasil", "Silahkan login untuk melanjutkan");
      router.push({pathname:'/login'});
  } catch (error) {
      console.error("Error verifying OTP:", error);
      throw error;
  }

  };

  const sendOtp = async (email: string) => {
    const url = `${process.env.EXPO_PUBLIC_API_URL}/otp/send-otp?email=${email}`
    console.log("URL: ", url);

    try {
      const res = await fetch(url, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
      });

      const resData = await res.json();
      if (!res.ok) {
          throw new Error(`HTTP error! status: ${resData.detail}`);
      }
      alert('OTP sudah terkirim ke email '+email);
  } catch (error) {
      console.error("Error verifying OTP:", error);
      throw error
    };
  };

  const register = async (data: registerType) => {
    console.log("Masuk kedalam fungsi register");
    const body = {
      "name": data.name,
      "email": data.email,
      "is_admin": false,
      "photo_url": "",
      "password": data.password,
    };

    const response = await fetch(process.env.EXPO_PUBLIC_API_URL + '/users/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const responseData = await response.json();
    if (response.ok) {
      router.push({pathname:'/otp', params: {email: data.email}});
      return 
    } else {
      if(responseData.detail === 'Email already registered'){
        await sendOtp(data.email);
        
        router.push({pathname:'/otp', params: {email: data.email}});
      }else{
        throw new Error("error");
      }
    }
    throw new Error("error");
  };


  const getLoginUser = async() => {
    let availableToken = await AsyncStorage.getItem("token");
    console.log('available : ', availableToken)
    if(token){
      availableToken = token;
    }
   
      try{
        const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/users/auth/me`,
          {
            method: 'GET',
            headers: {
               Authorization: `Bearer ${availableToken}`
            }
          }
        );
        const resData = await res.json();
        if(res.ok){
          if(resData.photo_url === ""){
            resData.photo_url = null
          }
          console.log(resData);
          return resData;
        }else{
          if(resData.detail === "Inactive user"){
            alert("User tidak aktif, silahkan verifikasi email anda");
            await logout();
            router.replace({pathname:'/(auth)/sendEmailToVerify', params: {email: resData.email}});
            throw new Error("User tidak aktif");
          }
          console.log("tidak ada user")
          return null
        }
      }catch(err){
        console.log(err);
        alert("terjadi kesalahan ketika mendapatkan data user login");
        
        throw new Error("Tidak bisa login");
      }
      
    
  }


  const value = { user, token, login, logout, register, verifikasiOtp, sendOtp, getLoginUser };
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>

  );
};

export const useAuth = () => React.useContext(AuthContext);

export default AuthProvider;
