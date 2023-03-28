import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import UploadInput from './UploadInput';

describe('UploadInput component', () => {
  test('renders the input element', () => {
    const { getByRole } = render(<UploadInput onChange={() => {}} />);
    const inputElement = getByRole('uploadInput');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'file');
  })
})