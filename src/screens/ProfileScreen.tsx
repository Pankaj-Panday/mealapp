import { ScrollView, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MainRoutes, MainStackParamList } from '../types/routes';
import { useAuthStore } from '../store/useAuthStore';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import Header from '../components/profile-screen/Header';
import Footer from '../components/profile-screen/Footer';
import Divider from '../components/profile-screen/Divider';
import { MenuItem as MenuItemType } from '../types/common';
import MenuItem from '../components/profile-screen/MenuItem';

type Props = NativeStackScreenProps<MainStackParamList, MainRoutes.Profile>;

const menuItems: MenuItemType[] = [
  {
    type: 'item',
    icon: 'gift-outline',
    title: 'Earn Rewards',
    subtitle: 'Invite friends and earn rewards',
  },
  {
    type: 'item',
    icon: 'call-outline',
    title: 'Contact Us',
    subtitle: 'Help regarding your recent purchases',
  },

  { type: 'divider' },

  {
    type: 'item',
    icon: 'help-circle-outline',
    title: 'FAQs',
    subtitle: 'Frequently Asked Questions',
  },
  { type: 'item', icon: 'document-text-outline', title: 'Terms & Conditions' },
  { type: 'item', icon: 'shield-checkmark-outline', title: 'Privacy Policy' },
  {
    type: 'item',
    icon: 'information-circle-outline',
    title: 'Seller Information',
  },
  { type: 'item', icon: 'log-in-outline', title: 'Login' },
  { type: 'item', icon: 'earth-outline', title: 'Change Country' },
];

export default function ProfileScreen({ navigation, route }: Props) {
  const user = useAuthStore(state => state.user);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const logout = useAuthStore(state => state.logout);
  const insets = useSafeAreaInsets();

  return (
    <SafeAreaView className="flex-1 bg-white" edges={['top', 'left', 'right']}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: Math.max(insets.bottom, 24),
          paddingHorizontal: 16,
        }}
      >
        <Header
          user={user}
          isAuthenticated={isAuthenticated}
          onLogoutBtnClick={logout}
        />

        <View>
          {menuItems.map((item, index) => {
            if (item.type === 'divider') {
              return <Divider key={index} />;
            }

            return <MenuItem key={index} menuItem={item} />;
          })}
        </View>

        <Footer />
      </ScrollView>
    </SafeAreaView>
  );
}
