To run web application:
- docker-compose up -d
- app should be available at http://localhost/
- default admin credentials:
  - email: admin@admin.com
  - pw: admin
- create new user
- logout
- login as new user

To simulate press of a button:
- make a POST request to http://localhost/api/request
  - example of body of request: 
    ```
      {
        "batteryLevel": 100,
        "button": 1,
        "deviceAddress": "aa:aa:aa:aa:aa:aa"
      }
    ```