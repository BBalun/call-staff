#ifndef WEBSITES_H
#define WEBSITES_H

const char ok_html[] PROGMEM = R"rawliteral(
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Trying to connect</title>
  </head>
  <body>
    <p>Trying to connect... Wait until LED on gateway turns on</p>
  </body>
</html>)rawliteral";

const char index_html[] PROGMEM = R"rawliteral(
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>WiFi credentials</title>
    <style>
      body {
        padding: 0;
        margin: 0;
        font-size: 18px;
        font-family: Verdana;
      }

      main {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100vw;
        height: 100vh;
      }

      form {
        display: flex;
        flex-direction: column;
        padding: 1rem;
        border-radius: 1rem;
        width: 365px;
      }

      input {
        line-height: 1.2rem;
        padding: 0.4rem;
        margin: 0.3rem 0;
        border-width: 0;
        border-radius: 0.4rem;
        background-color: rgba(250, 250, 250, 1);
        padding: 0.375rem 0.75rem;
        font-size: 1rem;
        line-height: 1.5;
        color: #495057;
        background-color: #fff;
        background-clip: padding-box;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
      }

      button {
        background-color: #007bff;
        color: white;
        display: inline-block;
        font-weight: 400;
        text-align: center;
        white-space: nowrap;
        vertical-align: middle;
        user-select: none;
        border: 1px solid transparent;
        padding: 0.375rem 0.75rem;
        font-size: 1rem;
        line-height: 1.5;
        border-radius: 0.25rem;
      }

      label {
        font-size: 1rem;
        display: inline-block;
        margin-bottom: 0.5rem;
      }
      .form-group {
        margin-bottom: 1rem;
        display: flex;
        flex-direction: column;
      }
    </style>
  </head>
  <body>
    <main>
      <form action="/wifi" method="get" class="container">
        <div class="form-group">
          <label for="name">Name:</label>
          <input type="text" name="name" id="name" placeholder="Enter WiFi name" />
        </div>

        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" name="password" id="password" placeholder="Enter WiFi password" />
        </div>

        <button type="submit">Save</button>
      </form>
    </main>
  </body>
</html>
)rawliteral";

#endif
