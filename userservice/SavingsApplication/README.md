# SavingsApplication
The Savings Application is a full-stack microservices-based web application designed to help users plan and track their savings through various fixed return plans such as Fixed Deposits, Recurring Deposits, Gold, and Silver investments. It enables users to view trending plans, historical data for investments, calculate potential returns, and estimate income after taxes based on their country and annual income.

Frontend: React
The frontend of the application is built using React.js, which communicates with multiple backend microservices. The UI consists of several pages, including:

Home Page: Displays trending investment plans.
Gold and Silver Pages: Show historical price data in a tabular format fetched from the backend.
Login and Signup Pages: Allow user registration and login, with authentication handled via Spring Security.
Dashboard: After logging in, users can input their annual income and country, view income after taxes, and explore various investment plans.
Fixed Deposit Page: Users can calculate savings and total investment for different tenures based on their annual savings input.
The application uses Axios (or a similar HTTP client) to make RESTful API calls to the backend microservices and manage application state using React hooks (e.g., useState, useEffect).

Backend: Spring Boot
The backend is composed of several microservices, each responsible for a specific aspect of the application.
end points :
1. Plans Microservice
Base URL: /api/plans

This microservice is responsible for fetching and managing investment plans displayed on the homepage.

/trending-plans (GET)
Purpose: Fetches the trending investment plans for the home page.
Response: A list of trending plans with details such as name, return rates, and duration.
2. Investment Microservice
Base URL: /api/investment

Handles investment calculations and provides historical price data for investments like Gold and Silver.

/calculate-amount (POST)

Purpose: Calculates total investment amount and returns based on investment amount, years, and investment type.
Request Body:
investment: Amount invested.
year: Number of years.
type: Investment type (e.g., "GOLD", "SILVER").
Response: A map containing total invested amount and returns.
/historical-prices (GET)

Purpose: Fetches a list of historical prices for a specific investment type.
Query Parameter: type: Investment type (e.g., "GOLD", "SILVER").
Response: List of historical prices for the investment type.
/historical-price (GET)

Purpose: Fetches the historical price for a specific year and investment type.
Query Parameters:
year: The year of interest.
type: Investment type (e.g., "GOLD", "SILVER").
Response: Historical price of the investment type for the specified year.
3. Tax Microservice
Base URL: /api/tax

This microservice calculates the user's income after taxes based on their country and annual income.

/calculate-tax (POST)
Purpose: Calculates income after taxes based on user’s annual income and country.
Request Body:
IncomeRequest: Contains the user's country and annual income.
Response:
IncomeResponse: Contains the income after taxes.
4. User Authentication Microservice
Base URL: /api/auth

This microservice handles user authentication, registration, and login.

/register (POST)

Purpose: Registers a new user in the system.
Request Body:
User details like username, password, email, etc.
Response: Confirmation of successful registration.
/login (POST)

Purpose: Authenticates users and provides them with a JWT token for secure communication.
Request Body:
User's username and password.
Response: JWT token for authenticated sessions.
/logout (POST)

Purpose: Logs the user out by invalidating the JWT token.
Response: Confirmation of successful logout.
5. Dashboard Microservice
Base URL: /api/dashboard

This microservice manages the user’s personalized dashboard, showing their income after taxes and available investment plans.

/income-after-taxes (GET)

Purpose: Fetches the user's income after taxes based on their previous inputs.
Response: Income after taxes.
/available-plans (GET)

Purpose: Fetches a list of investment plans available to the user based on their income after taxes.
Response: List of available investment plans (Fixed Deposit, Recurring Deposit, Gold, Silver, etc.).
Summary
Plans Microservice:

Manages trending plans on the home page.
API: /trending-plans (GET)
Investment Microservice:

Handles investment calculations and historical price data for investments.
APIs:
/calculate-amount (POST)
/historical-prices (GET)
/historical-price (GET)
Tax Microservice:

Calculates the user's income after taxes.
API: /calculate-tax (POST)
User Authentication Microservice:

Handles user registration, login, and authentication.
APIs:
/register (POST)
/login (POST)
/logout (POST)
Dashboard Microservice:

Manages the user's dashboard, showing income after taxes and available investment plans.
APIs:
/income-after-taxes (GET)
/available-plans (GET)
Database:
Each microservice can have its own dedicated database, ensuring independent and decentralized data management following the microservices architecture. I have used MySql
Testing
All API endpoints for the microservices were thoroughly tested using Postman to ensure their functionality and correctness
Security:
Spring Security with JWT is used to handle authentication and authorization. The users’ login credentials are validated, and a token is issued upon successful authentication. This token is used for subsequent requests to secure endpoints.
Summary:
The Savings Application is a scalable, secure, and modular solution for managing savings and investments. It leverages modern technologies like React for the frontend, Spring Boot for the backend, and microservices for service isolation and scalability. The system provides a smooth and interactive experience for users to calculate returns on investments, manage income after taxes, and explore trending plans.
![image](https://github.com/user-attachments/assets/51206680-f8a4-43e9-811a-7d7da6b57fd9)
![image](https://github.com/user-attachments/assets/05e146c5-1678-4167-9d19-52cc2003c1eb)
![image](https://github.com/user-attachments/assets/4370f19d-9916-4688-8b7c-89abe50469e1)
![image](https://github.com/user-attachments/assets/63be336e-873e-4a11-b4db-a6fb73b00b38)
![image](https://github.com/user-attachments/assets/4e014a0a-faed-42d4-a660-c5a337407794)
![image](https://github.com/user-attachments/assets/42756b48-9f4e-4025-8906-3b5c5e23ac3a)
![image](https://github.com/user-attachments/assets/a659ca49-0c4e-4590-ac8e-adb31bc58dcc)
![image](https://github.com/user-attachments/assets/dcc98517-0df3-4bc9-94ca-db7a7574e452)
![image](https://github.com/user-attachments/assets/34a0521d-6a61-4517-b83b-33745edb11d7)
![image](https://github.com/user-attachments/assets/ac80fb4c-4cd6-4bdd-b3fa-b33b52705529)
![image](https://github.com/user-attachments/assets/150e5950-c13c-41f2-85a3-1ad381a6e20e)
![image](https://github.com/user-attachments/assets/9c28db97-0dbe-4b5a-a4b8-a31364bb6914)
![image](https://github.com/user-attachments/assets/8f24eff4-684a-423f-806d-4beca3453429)
![image](https://github.com/user-attachments/assets/a3305854-0983-4b9e-a62e-1464211c81bb)
![image](https://github.com/user-attachments/assets/c19e09eb-9573-4dc1-b523-21e3886bb486)
![image](https://github.com/user-attachments/assets/a8175201-69a7-4a88-b3a7-845c20aae069)


















