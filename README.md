# **Demo App**

Experiments using MERN stack for an app designed to help users store and manage documents like text (or links to Google Docs) for blog and social media posts. 

- create account, login / logout (JSON Web Tokens)
- protected API routes = after succesful login, user may now access just their own set of documents 
- create new document, on submit added to the database and renders to the "dashboard" table, with links to edit page and a delete button on each row
- dotenv module and .env file for sensitive data

## **Stack:**
MongoDB with Mongoose 
Express
Node.js 
React.js (using Create React App)

Testing requests: Postman API Platform
Original design files: Figma


## **Next ToDos: work in progress** 

### **Globally**
1) Upgrade to latest version of react-router in future
2) Migrate from Create React App to Vite in future 


### **Components**
Merge feature branches when all are complete to add to current main branch:

### **Home Page** 

1) Add a table with pagination, sort, column filtering and link to Read view (which links to Edit page), chips column and delete button (complete) and all styling (WIP)
    
2) Add a Global filter to find individual user documents by text search, in conjunction with column filters (complete)

### **Edit Page**

1) Add a form control field to the edit page that displays all user-created tags from their entire document collection. Users can select any tag via a checkbox to add it to the document they're currently editing. This feature is a work in progress (WIP)

### **Read Page**
1) Add chips to the 'tags' form field render. 

### **Login Page**
1) Replace email and password log in with Single Sign On feature 


### **Earlier concepts**

 Earlier concepts and frontend designs [here](https://github.com/rhw-repo/content_simple).




