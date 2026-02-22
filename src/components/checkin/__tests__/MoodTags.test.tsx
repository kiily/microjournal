import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { MoodTags } from '../MoodTags';
import type { MoodTag } from '../../../types';

describe('MoodTags', () => {
  it('renders all 12 tags', () => {
    const { getAllByRole } = render(
      <MoodTags selectedTags={[]} onTagsChange={jest.fn()} />,
    );
    // Each pill has role "button"
    expect(getAllByRole('button').length).toBe(12);
  });

  it('shows selected state for selected tags', () => {
    const { getByTestId } = render(
      <MoodTags selectedTags={['calm']} onTagsChange={jest.fn()} />,
    );
    expect(getByTestId('mood-tag-calm').props.accessibilityState?.selected).toBe(true);
  });

  it('calls onTagsChange with new tag when unselected tag pressed', () => {
    const onTagsChange = jest.fn();
    const { getByTestId } = render(
      <MoodTags selectedTags={[]} onTagsChange={onTagsChange} />,
    );

    fireEvent.press(getByTestId('mood-tag-grateful'));
    expect(onTagsChange).toHaveBeenCalledWith(['grateful']);
  });

  it('removes tag when selected tag is pressed', () => {
    const onTagsChange = jest.fn();
    const { getByTestId } = render(
      <MoodTags selectedTags={['calm', 'tired']} onTagsChange={onTagsChange} />,
    );

    fireEvent.press(getByTestId('mood-tag-calm'));
    expect(onTagsChange).toHaveBeenCalledWith(['tired']);
  });

  it('enforces maximum of 3 tags', () => {
    const onTagsChange = jest.fn();
    const { getByTestId } = render(
      <MoodTags
        selectedTags={['calm', 'tired', 'grateful']}
        onTagsChange={onTagsChange}
      />,
    );

    // Pressing a 4th tag should not call onTagsChange
    fireEvent.press(getByTestId('mood-tag-hopeful'));
    expect(onTagsChange).not.toHaveBeenCalled();
  });
});
