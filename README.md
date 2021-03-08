# MbTest

This project was developed using Angular primarily for frontend part, PHP for a server side.

## To start project locally ...

1. Install Node.js if not present on system.
   https://nodejs.org/en/download/
   
2. Install Angular. You can do it using command line - npm install -g @angular/cli
  Or refer to official documentation: https://angular.io/guide/setup-local.
   
3. Create new Angular project in command lin - ng new my-dream-app

4.  Download and install XAMPP server solution to use as PHP and MySQL server in our case.
    https://www.apachefriends.org/download.html.
    
5. Download all content to Angular project directory.

6. From this directory move folder named 'mb' to XAMPP htdocs root directory.

7. Modify mb/connect.php settings to correspond to your server and mysql settings.

8. To run Apache and MySQL servers start XAMPPS admin panel and click start next to these services

9. Install the necessary database and table using scripts in install.sql
  You can use MySQL workbench to run them if you prefer.
   https://dev.mysql.com/downloads/workbench/
   
10. To start Angular server run in console - ng serve

11. If everything is done right you should be able to open project in http://localhost:4200/
    And access data administering in http://localhost:4200/data
    
System data, the project was tested on:

Angular CLI: 11.1.4
Node: 14.15.4
OS: win32 x64

Apache/2.4.46 (Win64) OpenSSL/1.1.1h PHP/8.0.2/
10.4.17-MariaDB
