## Script:

-    npm install
-    npx prisma migrate dev --name init
-    npm start

## Nodejs Typescript project

Follow these steps to create a new nodejs project with Typescript

-    npm init
-    tsc --init
-    configure tsconfig.json file:
     -    "outDir": "./build", ( Redirect output structure to the directory. )
     -    "rootDir": "./src", ( Specify the root directory of input files. Use to control the output directory structure with outDir.)
