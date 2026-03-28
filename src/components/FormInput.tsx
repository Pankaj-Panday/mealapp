import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';
import React from 'react';
import {
  Control,
  Controller,
  FieldValues,
  Path,
  RegisterOptions,
} from 'react-hook-form';

type Props<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  control: Control<T>;
  icon?: React.ReactNode;
  rules?: RegisterOptions<T, Path<T>>;
} & TextInputProps;

export default function FormInput<T extends FieldValues>({
  label,
  name,
  control,
  icon,
  rules,
  ...textInputProps
}: Props<T>) {
  return (
    <View className="mb-2">
      <Text className="mb-1 text-sm text-gray-500 font-bold uppercase">
        {label}
      </Text>

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <>
            <View className="flex-row items-center border-b border-gray-300">
              {icon && <View className="mr-2">{icon}</View>}

              <TextInput
                className="flex-1 py-2"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholderTextColor="#9ca3af"
                {...textInputProps}
              />
            </View>

            {fieldState.error && (
              <Text className="text-red-500 text-xs mt-1">
                {fieldState.error.message}
              </Text>
            )}
          </>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
