import React, { useState, useRef } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { NOTE_PLACEHOLDER } from '../../constants/copy';

interface NoteInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onSubmit?: (text: string) => void;
}

export function NoteInput({ value, onChangeText, onSubmit }: NoteInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const heightAnim = useRef(new Animated.Value(44)).current;
  const inputRef = useRef<TextInput>(null);

  const handleFocus = () => {
    setIsFocused(true);
    Animated.spring(heightAnim, {
      toValue: 100,
      useNativeDriver: false,
      damping: 20,
      stiffness: 200,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (!value) {
      Animated.spring(heightAnim, {
        toValue: 44,
        useNativeDriver: false,
        damping: 20,
        stiffness: 200,
      }).start();
    }
  };

  const handleSubmit = () => {
    onSubmit?.(value);
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={() => inputRef.current?.focus()}>
      <Animated.View
        style={[
          styles.container,
          { height: heightAnim },
          isFocused && styles.containerFocused,
        ]}
        testID="note-input-container"
      >
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={NOTE_PLACEHOLDER}
          placeholderTextColor="#B8ADA4"
          multiline
          textAlignVertical="top"
          onSubmitEditing={handleSubmit}
          returnKeyType="done"
          accessibilityLabel="Journal note"
          testID="note-input"
        />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8E0D8',
    paddingHorizontal: 14,
    paddingVertical: 12,
    overflow: 'hidden',
  },
  containerFocused: {
    borderColor: '#D4845A',
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#2C2420',
    lineHeight: 22,
  },
});
