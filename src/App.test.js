import React from 'react';
import { render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

beforeEach(() => {
    render(<App />);
    });

describe('On Home Page', () => {

test('see welcome', () => {
  const welcomeElement = screen.getByText(/Welcome to Image Viewer/i);
  expect(welcomeElement).toBeInTheDocument();
});

test('see button to upload images', () => {
    const imageButton = screen.getByLabelText(/Upload Image/);
    expect(imageButton).toBeInTheDocument();
    })

test('see div saying no image', () => {
    const emptyImageDiv = screen.getByText(/No Image/);
    expect(emptyImageDiv).toBeInTheDocument();
    })

});

describe('Adding/Deleting Images', () => {
    beforeEach(() => {
    global.URL.createObjectURL = jest.fn(() => 'test.jpg');
    });

test('can upload image', () => {
    const file = new File(['hello'], 'test.png', {type: 'image/png'});
    const imageButton = screen.getByLabelText(/Upload Image/);
    userEvent.upload(imageButton, file);
    expect(imageButton.files[0]).toStrictEqual(file);

    const uploadedImage = screen.getByAltText(/uploaded/);
    expect(uploadedImage).toHaveAttribute('src', 'test.jpg');
    })

test('can remove image', () => {
    const file = new File(['hello'], 'test.png', {type: 'image/png'});
    const imageButton = screen.getByLabelText(/Upload Image/);
    userEvent.upload(imageButton, file);

    userEvent.click(screen.getByText('Delete Image'));
    const emptyImageDiv = screen.getByText(/No Image/);
    expect(emptyImageDiv).toBeInTheDocument();   

    })
});
