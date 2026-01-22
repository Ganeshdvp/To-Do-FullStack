# To-Do App


------------ Frontend ------------

# Task1
- Installation of vite with React
- Install TailwindCSS and setUp
- Install Shadcn/ui (vite+react)
   - created jsconfig.json file and paste below code
      - { 
           "compilerOptions": {
           "baseUrl": ".",
            "paths": {
                   "@/*": ["src/*"]
            }
            }
        }
    - In vite.config.js file
       - import path from "path"
       - import { fileURLToPath } from "url"

       - const __filename = fileURLToPath(import.meta.url)
       - const __dirname = path.dirname(__filename)

       - resolve: {
                alias: {
                    "@": path.resolve(__dirname, "./src"),
                }
        }
        

# Task-2
- Created Components folder and created NavBar.jsx and HomePage.jsx files
- Installed React-Router-Dom and configure
- create Main.jsx file
- create Form.jsx file
- created SelectDropDown.jsx file
- create AllTasks.jsx file 

# Task-3
- Install Axios
- installed tenstack query and setup
- fetch data for /all-tasks
- POST Api call /add-task
- created BadgeUI.jsx file for badges
- created EditForm.jsx file for Edit task
- PATCH Api call /update-task/:id
- DELETE Api call /delete-task/:id
- Implemented ShimmerUI, loading, errors stats
- Implemented Toast notifications




------------ Backend ------------

# Task-1
- npm init
- npm install express

- create the server in server.js file
      - import express from 'express';

        const app = express();
        const PORT = 3000;


        app.listen(PORT, ()=>{
              console.log(`Server is running on port ${PORT}`);
        })

- npm install nodemon
- Install mongodb and setup
- create config>database.js file
- create models>tasks.js file

# Task-2
- Install express.json()
- Install cors()
- Implemented API logics
- created .env file for sensitive data.