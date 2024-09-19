# ToDo Web App (React + Electron)

---

## Requirements

Before you can run this app, make sure the following are installed on your computer:

### 1. **Node.js**

- Download and install **Node.js** from [https://nodejs.org/](https://nodejs.org/).
- Choose the **LTS** version (long-term support) for stability.
- After installation, verify it by opening your terminal (Command Prompt or PowerShell on Windows, Terminal on Mac) and typing:
  ```bash
  node -v
  ```
  You should see the version of Node.js installed, something like `v14.x.x` or newer.

### 2. **Git**

- Install **Git** from [https://git-scm.com/](https://git-scm.com/).
- This allows you to download the code from GitHub.

---

## Steps to Download and Run the App

### 1. Clone the Repository (Download the App)

1. Open **Terminal** (Mac/Linux) or **Command Prompt/PowerShell** (Windows).
2. Run the following command to download the app code from GitHub:
   ```bash
   git clone https://github.com/yourusername/todowebapp.git
   ```
   This will download the app's code to your computer.

### 2. Navigate to the App Folder

Once the download is complete, you need to go into the app's folder. In your terminal, type:

```bash
cd todowebapp
```

### 3. Install App Dependencies

The app needs certain "packages" (or libraries) to run. These are managed by **Node.js** and listed in the file `package.json`. Since these packages are not included in the code, you need to install them by running:

```bash
npm install
```

This may take a few minutes, depending on your internet speed.

---

## How to Open and Run the App

### 1. Start the App as a Desktop Application

This app is built with **Electron**, so you can run it like any other desktop app. Once everything is installed, simply run the following command:

```bash
npm run electron
```

This will open the app in an **Electron window**, and you'll be able to use it as a desktop application.

---

## Alternative: Run in Browser (React App Only)

If you don't want to open it as a desktop app and just want to view it in a browser, you can start the app in development mode (in your browser). To do this, run:

```bash
npm start
```

- This will open the app in your default web browser.
- The app will be running at `http://localhost:3000/`. You can open your browser and visit that address to see the app in action.

---

## Troubleshooting

### 1. Node.js not installed?

If you see an error about `node` or `npm` not being recognized, make sure Node.js is installed by visiting [Node.js](https://nodejs.org/). After installation, restart your terminal.

### 2. Missing dependencies or errors?

If you see errors when running `npm install`, try deleting the `node_modules` folder (if it exists) and run `npm install` again:

```bash
rm -rf node_modules
npm install
```

---

## Development

### File Structure Overview

- **src/assets**: Contains images, colors, and textures used in the app.
- **src/components**: Contains all the React components like `Sidebar`, `TodoList`, and `Task`.
- **electron.js**: This is where the Electron configuration is set up to run the app as a desktop application.
- **package.json**: This file contains the list of all the packages (dependencies) the app needs.

---

## Contributing

If you’d like to improve the app or fix any bugs, feel free to open a pull request or submit issues on GitHub. Contributions are welcome!

---

## License

This project is licensed under the **MIT License**. See the `LICENSE` file for more details.
