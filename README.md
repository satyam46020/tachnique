# Tachnique

## Introduction
User Management Dashboard is a webpage in which all the users with their id, name, email and website are being displayed in the form of cards. One can manupulate the data i.e perform CRUD operation onto the website.  

## Project Type

Frontend 

## Deployed Webpage

[Click here to visit webpage](https://user-rho-eight.vercel.app/)

## Directory Structure

├── src/

├──├── assets/

├──├── components/

├──├──├── UserList.jsx

├──├──├── UserListItem.jsx

├──├──├── UserModal.jsx

├──├── utils/

├──├──├── api.js

├──├── app.js

├──├── index.js

├── .gitignore

├── package-lock.json

├── package.json

├── README.md

## Video Walkthrough of the project

[Click here to open the video](https://drive.google.com/file/d/15Be3c8RmQCd9ftz6CxcLpzIF1W2LDzgg/view?usp=sharing)

## Features

- New user can be added.
- Every user is editable.
- One can delete any user.
- Pagination is being implemented with infinite scrolling feature.

## Installation & Getting started

```bash
npm install 
```

```bash
npm start
```

## Screenshots

### Dashboard

![DashBoard](./user/src/assets/DashBoard.png)

### Dashboard after scroll

![DashBoard after scroll](./user/src/assets/DashBoard_after_scroll.png)

### Add user modal

![Add user modal](./user/src/assets/Add_modal.png)

### Edit user modal

![Edit user modal](./user/src/assets/Edit_modal.png)

### Mobile Screen

![Mobile Screen](./user/src/assets/Mobile_screen.png)

## APIs Used

[JSON Server](https://jsonplaceholder.typicode.com/)

## API Endpoints

"/users" endpoint is being used for performing CRUD operation.

## Technology Stack

- React.js
- Chakra UI
