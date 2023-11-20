# React Native Project - Art Institute of Chicago

This React Native project showcases artworks from the Art Institute of Chicago API. It includes features such as local push notifications and the ability to add artworks to favorites, stored locally on the device.

![alt text](https://github.com/santiagoapp/ChicagoArt/blob/main/src/assets/images/landing.png?raw=true)
![alt text](https://github.com/santiagoapp/ChicagoArt/blob/main/src/assets/images/listimage.png?raw=true)

## Installation

Follow these steps to install and run the project in your local environment:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/santiagoapp/ChicagoArt.git
    cd ChicagoArt
    ```

2. **Install React Native:**

    Make sure you have React Native installed. If not, follow the official documentation to set up React Native and its dependencies: [React Native - Getting Started](https://reactnative.dev/docs/environment-setup)

3. **Install project dependencies:**

    ```bash
    npm install
    ```

    This will install the necessary Node.js modules.

4. **Install iOS dependencies (if using macOS):**

    ```bash
    cd ios
    pod install
    cd ..
    ```

    This will install CocoaPods dependencies for iOS.

5. **Run the application:**

    ```bash
    npx react-native run-android
    ```

    or for iOS:

    ```bash
    npx react-native run-ios
    ```

    This will start the application on your emulator or physical device.

## Main Features

### Artwork List

- The application displays a list of artworks from the Art Institute of Chicago obtained through its API.

### Local Notifications

- Utilizes the React Native local notification library for displaying notifications.
- Local notifications are triggered based on user interactions or specific events in the app.

### Favorites

- Users can mark, remove and handle artworks as favorites.
- The list of favorite artworks is stored locally on the device.

## Project Structure

- `src/`: Contains the application source code.
- `src/assets/`: Stores resources such as images and fonts.
- `src/components/`: Reusable components.
- `src/screens/`: Application screens.
- `src/hooks/`: Application hooks.
- `src/store/`: Logic for services such as managing favorites and local notification integration.
- `src/utils/`: Extra functionalities and API fetching.

## Contributions

Contributions are welcome! If you encounter any issues or have suggestions for improving the application, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).