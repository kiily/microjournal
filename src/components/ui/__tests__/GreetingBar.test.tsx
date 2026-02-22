import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { GreetingBar } from '../GreetingBar';

describe('GreetingBar', () => {
  it('renders the correct greeting for morning', () => {
    const { getByTestId } = render(
      <GreetingBar displayName="Maya" timeOfDay="morning" />,
    );
    expect(getByTestId('greeting-text').props.children).toBe('Morning, Maya');
  });

  it('renders the correct greeting for evening', () => {
    const { getByTestId } = render(
      <GreetingBar displayName="Maya" timeOfDay="evening" />,
    );
    expect(getByTestId('greeting-text').props.children).toBe('Evening, Maya');
  });

  it('renders the correct greeting for night', () => {
    const { getByTestId } = render(
      <GreetingBar displayName="Alex" timeOfDay="night" />,
    );
    expect(getByTestId('greeting-text').props.children).toBe('Hey, Alex');
  });

  it('uses fallback when displayName is empty', () => {
    const { getByTestId } = render(
      <GreetingBar displayName="" timeOfDay="morning" />,
    );
    expect(getByTestId('greeting-text').props.children).toBe('Morning, there');
  });

  it('calls onSettingsPress when settings button is pressed', () => {
    const onSettingsPress = jest.fn();
    const { getByTestId } = render(
      <GreetingBar
        displayName="Maya"
        timeOfDay="morning"
        onSettingsPress={onSettingsPress}
      />,
    );
    fireEvent.press(getByTestId('settings-button'));
    expect(onSettingsPress).toHaveBeenCalledTimes(1);
  });

  it('calls onFocusPress when focus button is pressed', () => {
    const onFocusPress = jest.fn();
    const { getByTestId } = render(
      <GreetingBar
        displayName="Maya"
        timeOfDay="morning"
        onFocusPress={onFocusPress}
      />,
    );
    fireEvent.press(getByTestId('focus-button'));
    expect(onFocusPress).toHaveBeenCalledTimes(1);
  });

  it('does not render settings button if no handler provided', () => {
    const { queryByTestId } = render(
      <GreetingBar displayName="Maya" timeOfDay="morning" />,
    );
    expect(queryByTestId('settings-button')).toBeNull();
  });
});
