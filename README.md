Orco Financial Management App
We will be developing a personal finance app for Android mobile devices. The app will allow users to keep track of their savings and expenses as well as invest in the stock market and learn more about the financial world with up-to-date news articles that are uploaded into the app.

Description
Architecture
Design
External Requirements
In order to build this project you first have to install: 1. Node.js - This can be installed with Chocolately (if you have that installed) with the following command: > choco install -y node.js.install 2. [Java Development Kit] - This can also be installed using Chocolatey with the following command: > choco install -y node.js.install openjdk8 3. Android studio - Install the Android SDK and the Android Virtual Device

In order to build this project you first have to install:
Node.js install
This can be installed with Chocolately (if you have that installed) with the following command:
choco install -y node.js.install

Java Development Kit install
This can also be installed using Chocolatey with the following command:
choco install -y node.js.install openjdk8

Android Studio install
Install the Android SDK and the Android Virtual Device
Setup
Configure the ANDROID_HOME environment variable
Windows Control Panel
Click on User Accounts, then User Accounts again
Click Change my environment variables
Click on New… to create a new ANDROID_HOME variable that points to the path of your Android SDK.
Add platform-tools to Path
Open Windows Control Panel
Click on User Accounts, then User Accounts again
Click Change my environment variables
Select Path variable
Click Edit
Click New and add the path to the platform-tools to the list. The default is:
%LOCALAPPDATA%\Android\Sdk\platform-tools
Running
Clone the github repo and cd into the created directory \Orco
Run the following command to run the app on an android emulator:
npx react-native run-android

Deployment
We will provide a .apk binary file that can be run on an Android emulator.
Open Android Studio and select Profile or Debug APK
Select the APK file from where you have saved it on your computer and click OK.
Navigate through the login screen and start to use the app
You can either use sample login info that we will provide or create a new account to start using the app.
Authors
Edward Sitar: esitar@email.sc.edu
Joshua Arriba: jarriba@email.sc.edu
Andrew Knighton: andrewkm@email.sc.edu
Daneatrian Robinson: drr2@email.sc.edu
Larry Gunter: guntela@email.sc.edu
