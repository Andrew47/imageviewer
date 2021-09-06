import { render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('start with Welcome Page', () => {
  render(<App />);
  const welcomeElement = screen.getByText(/Welcome to Image Viewer/i);
  expect(welcomeElement).toBeInTheDocument();
});

test('Image upload button exists', () => {
    render(<App />);
    const imageButton = screen.getByLabelText(/Upload Image/);
    expect(imageButton).toBeInTheDocument();
    })

test('At start see no image', () => {
    render(<App />);
    const emptyImageDiv = screen.getByText(/No Image/);
    expect(emptyImageDiv).toBeInTheDocument();
    })

test('Can upload image', () => {
    render(<App />);
    global.URL.createObjectURL = jest.fn(() => 'test.jpg');
    const file = new File(['hello'], '../exampleImages/20210906_173220.jpg', {type: 'image/jpg'})
    const imageButton = screen.getByLabelText(/Upload Image/);
    userEvent.upload(imageButton, file);
    expect(imageButton.files[0]).toStrictEqual(file);

    const uploadedImage = screen.getByAltText(/uploaded/);
    expect(uploadedImage).toHaveAttribute('src', 'test.jpg');
    })

test('Can remove image', () => {
    render(<App />);
    global.URL.createObjectURL = jest.fn(() => 'test.jpg');
    const file = new File(['hello'], '../exampleImages/20210906_173220.jpg', {type: 'image/jpg'})
    const imageButton = screen.getByLabelText(/Upload Image/);
    userEvent.upload(imageButton, file);

    userEvent.click(screen.getByText('Delete Image'));
    const emptyImageDiv = screen.getByText(/No Image/);
    expect(emptyImageDiv).toBeInTheDocument();   

    })
