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
import { cn } from '../utils/cn';

type Props<T extends FieldValues> = {
  label: string;
  name: Path<T>;
  control: Control<T>;
  icon?: React.ReactNode;
  rules?: RegisterOptions<T, Path<T>>;
  containerClassName?: string;
  labelClassName?: string;
  inputContainerClassName?: string;
  inputClassName?: string;
  errorClassName?: string;
} & TextInputProps;

export default function FormInput<T extends FieldValues>({
  label,
  name,
  control,
  icon,
  rules,
  containerClassName = '',
  labelClassName = '',
  inputContainerClassName = '',
  inputClassName = '',
  errorClassName = '',
  ...textInputProps
}: Props<T>) {
  return (
    <View className={cn('mb-2', containerClassName)}>
      <Text
        className={cn('mb-1 text-sm text-gray-500 font-bold', labelClassName)}
      >
        {label}
      </Text>

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value }, fieldState }) => (
          <>
            <View
              className={cn(
                'flex-row items-center border-b border-gray-300',
                inputContainerClassName,
              )}
            >
              {icon && <View className="mr-2">{icon}</View>}

              <TextInput
                className={cn('flex-1 py-2', inputClassName)}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholderTextColor="#9ca3af"
                {...textInputProps}
              />
            </View>

            {fieldState.error && (
              <Text className={cn('text-red-500 text-xs mt-1', errorClassName)}>
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
