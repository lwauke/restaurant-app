# Restaurants app

This is a [React Native](https://reactnative.dev/) project built with [Expo](https://expo.dev/) and [React Native Reusables](https://reactnativereusables.com).

It was initialized using the following command:

```bash
npx @react-native-reusables/cli@latest init -t restaurant-app
```

## Getting Started

Before installing your deps, run:

```
nvm use
```

To run the development server:

```bash
    npm run dev
```

This will start the Expo Dev Server. Open the app in:

- **iOS**: press `i` to launch in the iOS simulator _(Mac only)_
- **Android**: press `a` to launch in the Android emulator
- **Web**: press `w` to run in a browser

You can also scan the QR code using the [Expo Go](https://expo.dev/go) app on your device. This project fully supports running in Expo Go for quick testing on physical devices.

## Additional steps

- run the mock server

```
npm run server
```

- add a `.env` file with your mock API url

```bash
hostname -I | awk '{print $1}' | xargs -I % echo "EXPO_PUBLIC_API_URL=http://%:3000" > .env
```

## Adding components

You can add more reusable components using the CLI:

```bash
npx react-native-reusables/cli@latest add [...components]
```

> e.g. `npx react-native-reusables/cli@latest add input textarea`

If you don't specify any component names, you'll be prompted to select which components to add interactively. Use the `--all` flag to install all available components at once.

## Project Features

- List restaurants with names, cuisine types, and average ratings
- View restaurant details with existing reviews
- Write and submit new reviews with 1-5 star ratings
- Search restaurants by name or cuisine type
- Simple navigation between screens
- Add "Loading..." feedback while fetching data
- Auto-refresh data when app comes to foreground
- dark mode toggle

### Requirements in progress

- linter (in progress)
- tests (in progress)
- git hooks for testing and linting on pre-push and commit; commit linter
- pull to request (in progress)
