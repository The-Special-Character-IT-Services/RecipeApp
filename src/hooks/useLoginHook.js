import { getDeviceInfo, setToken } from '@utils/index';
import axios from '@utils/axios';
import analytics from '@react-native-firebase/analytics';
import Config from 'react-native-config';
import { FOODCOUTURE_TOKEN } from '@constants/';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { UserContext } from '@context/userContext';
import { useContext } from 'react';

const useLoginHook = () => {
  const { setUser } = useContext(UserContext);
  const loginProcess = async (res, loginMethod) => {
    try {
      await setToken(res.data);
      setUser(res.data.user);
      await Promise.all([
        analytics().setUserId(`${res.data.user.id}`),
        analytics().setUserProperty('username', res.data.user.username),
        analytics().logLogin({
          method: loginMethod,
        }),
      ]);
      const data = await Promise.all([
        getDeviceInfo(),
        axios.get(`device-infos?users_permissions_user=${res.data.user.id}`),
      ]);

      const deviceInfo = data[1].data.find(x => x.uniqueId === data[0].uniqueId);
      if (deviceInfo) {
        await axios.put(`device-infos/${deviceInfo.id}`, {
          ...data[0],
          users_permissions_user: res.data.user.id,
        });
      } else if (data[1].data.length < Config.NUMBER_OF_DIVECE_ALLOWED) {
        await axios.post('device-infos', {
          ...data[0],
          users_permissions_user: res.data.user.id,
        });
      } else {
        throw new Error(`Only ${Config.NUMBER_OF_DIVECE_ALLOWED} devices are allowed per login`);
      }
    } catch (error) {
      AsyncStorage.removeItem(FOODCOUTURE_TOKEN);
      throw error;
    }
  };
  return { loginProcess };
};

export default useLoginHook;
