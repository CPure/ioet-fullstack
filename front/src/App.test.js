import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

describe('App component', () => {
  test('renders the upload input and error message', async () => {
    const { getByRole, getByText } = render(<App />);
    const inputElement = getByRole('uploadInput');
    expect(inputElement).toBeInTheDocument();

    fireEvent.change(inputElement, { target: { files: [new File(['test'], 'test.txt', { type: 'text/plain' })] } });
    await waitFor(() => {
      const errorMessage = getByText('The text is not formatted well');
      expect(errorMessage).toBeInTheDocument();
    });
  });

  test('renders the salaries list', async () => {
    const { getByRole, getByText } = render(<App />);
    const inputElement = getByRole('uploadInput');
    expect(inputElement).toBeInTheDocument();
    fireEvent.change(inputElement, { target: { files: [new File(['RENE=MO10:00-12:00,TU10:00-12:00,TH01:00-03:00,SA14:00-18:00,SU20:00-21:00'], 'test.txt', { type: 'text/plain' })] } });
    await waitFor(() => {
      const salaries = getByText('The amount to pay RENE is: 215 USD');
      expect(salaries).toBeInTheDocument();
    });
  });

  test('renders the error message for invalid file type', async () => {
    const { getByRole, getByText } = render(<App />);
    const inputElement = getByRole('uploadInput');
    expect(inputElement).toBeInTheDocument();

    fireEvent.change(inputElement, { target: { files: [new File(['test'], 'test.png')] } });
    await waitFor(() => {
      const errorMessage = getByText('The file must be .txt');
      expect(errorMessage).toBeInTheDocument();
    });
  });
});