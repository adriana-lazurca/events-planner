# Events Planner

The project is an application where you can see some events, and also add new ones.

### Technologies:

- **ReactJS**
- **Json-server** for mocking the back-end
- **React-query** for API calls
- **Axios** for for calling back-end APIs
- **Ant-design** for styling
- **Concurrently** for running front-end and back-end in parallel

### Run project

```
npm start
```

### APIs

- **Get schema**<br />
  GET http://localhost:3001/schema

- **Get events**<br />
  GET http://localhost:3001/events

- **Search events**<br />
  GET http://localhost:3001/events/?q=<searchText>

- **Create events**<br />
  POST http://localhost:3001/events<br />
  Body:
  ```
  {
     "title": "Champions league",
     "type": "competitor",
     "startDate": "2020-07-01",
     "endDate": "2020-08-12",
     "description": "This is an event about the start of this year"
  }
  ```
