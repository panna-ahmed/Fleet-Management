# Vehicle Authenticated Routes

### Table of Content

- **Description**
- **Technologies**
- **Structure of Code**
- **How to run**

---

#### Description :
##### Node part:
-APIs:
        Login, ALL Vehicles, Vehicle By ID, Vehicle Fuel By ID, Vehicle Odometer By ID,(all data fetched through Mongo DB)
-Cron job:
        Which gets data from Client API and save in Mongo, if already present in Mongo update that, 
        Also compare data if present in Mongo but not in  Client API update column in Mongo (deletedAt) with the current date and time
##### React Part:
-List of all Vehicles (will be displayed on landing page) with authentication
-Vehicle details (will be shown when clicked on any one of the vehicles list) with authentication
-Vehicle odometer (to be displayed through chart on details page)with authentication
-Vehicle fuel (will be displayed through chart on details page)with authentication

---

#### Techonologies :

- Node js
- Mongoose
- React
- VS Code

---

#### Structure of Code :

**src** folder contains main code of the application. All the folders and what they contains is described:

- ##### "controller" Folder
  -User:  
            **user.js** for controlling user request. (e.g. Login, Register)
  -Vehicles:  
            **fuel.js** for controlling vehicle fuel related request. (e.g. getById )
            **odometer.js** for controlling vehicle odometer related request. (e.g. getById )
            **vehicle.js** for controlling vehicle related request. (e.g. getAllVehicles, getVehicleById )
- ##### "middlewares" Folder
  - **auth.js** handles authentication and authorization
  - **errorHanlder.js** which handles error for the server
- ##### "models" Folder
  - **Vehicle.js** Mongo Model for Vehicle
  - **User.js** Mongo Model for User
- ##### "routes" Folder
  - **index.js** handles the homepage route. (/)
  - **userRoutes.js** handles routes for users module. (/login)
  - **userRoutes.js** handles routes for Vehicle module. ( /vehicles, /vehicles/:id , /vehicles/:id/fuel, /vehicles/:id/odometer)
- ##### "utils" Folder
  - **db.js** cotains database connection.
  - **helper.js** cotains jwt token generation.
  - Cron Job: 
            **fetchApiData.js** this fetch data from the Client API and return the response.
            **mongoScheduler.js** this fetch data from the Client API and perform the scheduling.
- ##### app.js
  - This is the server file of the application.

---

#### How to run :

- Download and install [node js](https://nodejs.org/en/download)
- Verify Installation of [Node on window](https://phoenixnap.com/kb/install-node-js-npm-on-windows)
- run **npm install** to install dependencies
- run **npm start** to start the server or manually start by running **app.js**

---
