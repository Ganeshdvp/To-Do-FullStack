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