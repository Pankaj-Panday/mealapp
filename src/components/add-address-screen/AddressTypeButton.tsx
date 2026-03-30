import { Pressable, Text } from 'react-native';
import { AddressType } from '../../types/address';
import { cn } from '../../utils/cn';

type Props = {
  label: AddressType;
  selected: boolean;
  onPress: () => void;
};

export default function AddressTypeButton({ label, selected, onPress }: Props) {
  return (
    <Pressable
      className={cn(
        'py-2 px-4 rounded-lg items-center',
        selected ? 'bg-green-600' : 'bg-gray-200',
      )}
      onPress={onPress}
    >
      <Text
        className={cn(
          'font-semibold',
          selected ? 'text-white' : 'text-gray-500',
        )}
      >
        {label}
      </Text>
    </Pressable>
  );
}
