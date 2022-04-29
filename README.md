# WeightExchange

Exchange Weight App
This is a repository for a mobile app designed to help individuals keep track of weight changes as well as diet intakes. A continuation of the work done by Covid-NineTeam in 2021 and team Corrupt in 2020.

<h3>Client</h3>

Dr. Ramata Cisse

![cissePic](https://user-images.githubusercontent.com/59615199/132431432-4988b11b-3439-4a82-bc8d-cda5f2e3e4cf.png)


<h3>Team Structure</h3>

Steven: Code architecture/lead programmer

Agustin: UI/UX, Client Liason

Anya: Team manager, Documentation Lead

<img src="https://github.com/funkyalien48/CupOJavaScript/blob/3049253320ee4fa00ac1beb054d2424f49bba479/Screen%20Shot%202022-02-23%20at%2012.26.44%20PM.png" width="50%" height="50%">

Ashley: Data modeler

Chris: Testing Lead


# Description
<details><summary>Expand</summary>
Dr. Ramata and team Cup-O'JavaScript team up to create an app to encourage people to meet their weight management goals.
Users of the app should gain motivation from others with similar goals to encourage them to continue their goals.
Weight is “exchanged” between users to allow each other to reach their desired weight. Mass cannot be created or destroyed but is rather transferred from those with excess to those who require more.

 </details>


# Repo Location
<details><summary>Expand</summary>
  https://github.com/funkyalien48/CupOJavaScript
  </details>
  
  
# Jira
<details><summary>Expand</summary>
  https://jira.ggc.edu/projects/TCJ/summary
  </details>
  
# Communication Tools
<details><summary>Expand</summary>
  Microsoft Teams
  Zoom
  Discord
  </details>
  
  
# Requirements
<details><summary>Expand</summary>
  To run this app you will need a browser with Javascript, most do by default.
  To edit you will need a JS IDE such as Visual Studio Code.
  To run this on your phone you will need the Expo app.
  </details>
  

  
  
# Technologies
<details><summary>Expand</summary>
  React-Native
  NodeJS
  Firebase
  Expo CLI
  Edamam API
  </details>

# Developer Installation
<details><summary>Expand</summary>
 Clone this repository to your workspace.
 
 
<h3>Node.js</h3>
Windows 10 & Mac OS

1.Go to the site https://nodejs.org/en/
 
2.Download the Recommended version of Node (NOT THE LATEST OR CURRENT)
 
3.Follow all steps suggested by this installer that was downloaded
 
<h3>EXPO CLI</h3>
Windows 10 & Mac OS

1.In the terminal instal globally Expo CLI
 
 npm install -g expo-cli
 
 <h3> Firebase </h3>
Windows 10 & Mac OS

1.Got to https://firebase.google.com/
 
2.Make sure you are logged into your google account, and click on "Go to console" in the top right corner.
 
3.Click "Add Project"
 
4.Give your project a name & follow the steps to create a Firebase Project
 
5.Navigate to the project settings
 
6.Select the web platform under "Your Apps" section at the bottom
 
7.Enter "Weight Exchange App" as the name of your product to register your app.

8.Navigate to the "Authentication" page from the menu on the left side

9.Click "Get Started" and choose "Email/Password" as the sign-in method.

10.Enable Email/Password after choosing "Email/Password" and click Save

11.Now navigate to "Storage" from the menu and click Get Started

12.Select "Start in production mode" and click Next and confirm location and click Done

13.Once storage is setup navigate to the Rules section in Storage

14.Modify line 5 where it says "allow read, write: if false;" to "allow read, write: if request.auth != null;" (This will allow you to upload and retrieve profile photos)
 
15.You can double check that firebase has been added to the project successfully by checking the dependencies in the package.json file. package.json is in the root project folder.
 
 <h3>Edamam API</h3>
ONLY ONE PERSON NEEDS TO MAKE AN ACCOUNT

1.Go to https://developer.edamam.com/
 
2.Click on "APIs" on the navigation bar.
 
3.Click "Food Database API"
 
4.Click Start Now for the Developer option (The only free choice)
 
5.Sign up for an account
 
6.Once an account is made, sign in and click "Get an API Key Now!" on the navigation bar
 
7.Click "View" on top of the Food Database Box
 
8.Replace the APP_ID and API_KEY variables on the Edamam.js file with the given Application ID and Application Key
 
 
To run open a terminal and navigate to your project folder and enter:
 npm start
This should launch Expo in your browser where you can then run it as a web application, IOS app, or an android app.
  </details>
  
# License
<details><summary>Expand</summary>
 This software is protected under GNU (General Public License).You may use it, provided that any modifications you make to it are available for others to use and modify in a       similar manner.
 https://www.gnu.org/licenses/gpl-3.0.html
  </details>
