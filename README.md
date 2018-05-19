DDoS Thesis:  
1. [Installation:](#installation)
2. [Running The Server:](#running-the-server)
3. [View Served Files:](#view-served-files)

## Installation:
1. Clone the repository:  
    ```
    $ git clone https://github.com/YinonMaor/BigDataEx3.git
    ```
2. Enter the project's directory:
    ```
    $ cd BigDataEx3
    ```
3. Install dependent packages:
    ```
    $ npm install
    ```
    Or, if you have yarn installed:
    ```
    $ yarn
    ```
## Running The Server:
In order to run the server, run the following command within the command-line:
```
  $ npm run start
```
The server will start running immediately within port 3300. If you would like to run on other port, change the default port within `package.json` file.  

You might also run the server yourself:
```
  $ cd Server
  $ node Server --port <your_port>
```  
The default port if not given is 3300.
## View Served Files:
Open a browser and navigate to:
```
  <YOUR_IP>:<SERVER'S_PORT>
```
Your IP and port are described after running the server as the last part described.  
An index.html file would be served and you might use its functionality which will be served from the server.