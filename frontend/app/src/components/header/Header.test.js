import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from './Header';

describe('Header Component', () => {
  test('renders the header when isVisible is true', () => {
    render(<Header isVisible={true} />);
    const headerElement = screen.getByText(/Transformez vos pensées en sagesse/i);
    expect(headerElement).toBeInTheDocument();
    expect(headerElement).toHaveClass('glow-filter');
  });

  test('displays an error message if isVisible prop is not a boolean', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
    render(<Header isVisible="notBoolean" />);
    const errorElement = screen.getByText(/Une erreur est survenue dans l'affichage de l'en-tête/i);
    expect(errorElement).toBeInTheDocument();
    expect(consoleSpy).toHaveBeenCalledWith("Invalid prop: 'isVisible' must be a boolean");
    consoleSpy.mockRestore();
  });

  test('renders the container with the correct CSS class', () => {
    render(<Header isVisible={true} />);
    const containerElement = screen.getByText(/Transformez vos pensées en sagesse/i).closest('.header-container');
    expect(containerElement).toBeInTheDocument();
  });
});
