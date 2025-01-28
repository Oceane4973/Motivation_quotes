import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import MessagesContainer from './MessagesContainer';

describe('MessagesContainer Component', () => {
    let mockRef;

    beforeEach(() => {
        mockRef = {
            current: document.createElement('div'),
        };
        mockRef.current.classList.add('messages-box');
        document.body.appendChild(mockRef.current);
    });

    afterEach(() => {
        document.body.removeChild(mockRef.current);
    });

    it('renders without crashing and displays messages', () => {
        const messages = [
            { message: 'Hello', isFromUser: true },
            { message: 'Hi there!', isFromUser: false, author: 'John' },
        ];
    
        const mockRef = React.createRef();
    
        const { container } = render(
            <MessagesContainer messages={messages} isVisible={true} ref={mockRef} />
        );
    
        expect(screen.getByText('Hello')).toBeInTheDocument();
        expect(screen.getByText('Hi there!')).toBeInTheDocument();
        expect(screen.getByText('John')).toBeInTheDocument();
    
        expect(container.querySelector('.messages-box')).toBeInTheDocument();
    });
    

    it('applies correct opacity based on scroll position', () => {
        const messages = [
            { message: 'Message 1', isFromUser: true },
            { message: 'Message 2', isFromUser: false },
        ];

        const mockRef = React.createRef();

        render(<MessagesContainer messages={messages} isVisible={true} ref={mockRef} />);

        const messageElements = mockRef.current.querySelectorAll('.message');
        expect(messageElements).toHaveLength(2);

        fireEvent.scroll(mockRef.current);

        messageElements.forEach((message) => {
            expect(message.style.opacity).toBeTruthy();
        });
    });

    it('handles invalid messages array gracefully', () => {
        console.error = jest.fn();

        const mockRef = React.createRef();

        render(<MessagesContainer messages={null} isVisible={true} ref={mockRef} />);

        expect(
            screen.getByText('Une erreur est survenue lors de l\'affichage des messages.')
        ).toBeInTheDocument();
        expect(console.error).toHaveBeenCalledWith("Invalid prop: 'messages' must be an array");

        console.error.mockRestore();
    });

    it('ignores invalid message formats', () => {
        console.error = jest.fn();

        const messages = [
            { message: 'Valid message', isFromUser: true },
            { invalid: 'Invalid message' },
        ];

        const mockRef = React.createRef();

        render(<MessagesContainer messages={messages} isVisible={true} ref={mockRef} />);

        expect(screen.getByText('Valid message')).toBeInTheDocument();
        expect(console.error).toHaveBeenCalledWith(
            expect.stringContaining('Invalid message format at index 1')
        );

        console.error.mockRestore();
    });

    it('applies the correct class when isVisible is true or false', () => {
        const messages = [
            { message: 'Test message', isFromUser: true },
        ];

        const mockRef = React.createRef();

        const { rerender } = render(
            <MessagesContainer messages={messages} isVisible={false} ref={mockRef} />
        );

        expect(mockRef.current.parentElement).not.toHaveClass('visible');

        rerender(<MessagesContainer messages={messages} isVisible={true} ref={mockRef} />);

        expect(mockRef.current.parentElement).toHaveClass('visible');
    });
});
