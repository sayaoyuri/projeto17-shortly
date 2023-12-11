# Shortly-API

Shortly is a URL shortner API. Shortly makes it possible for users to group and share their usefull links.

## Deploy
Production API URL: https://shortly-api-loji.onrender.com

## Documentation
Detailed technical documentation is available on [POSTMAN - Documentation](https://documenter.getpostman.com/view/26857298/2s9Ykhg4aT)

## Technologies
This project was built using:

- Node (Version 18.16.1);
- Express - Node framework for building backend API;
- PostgreSQL - Database;
- Joi - Schema validation;
- JWT - Encrypt authorization data;
- ESlint + Prettier - Tools for mantaning code pattern.

## How to run for development

1. Clone this repository
2. Install all dependencies

```bash
npm install
```

3. Create a PostgreSQL database with whatever name you want and execute scripts the available on the dump.sql file
4. Configure the `.env` file based on the `.env.example` file

5. Run the back-end in a development environment:

```bash
npm run dev
```


## Building and starting for production

1. Follow the steps in the How to Run for development section.
2. Configure the `.env` file using the `.env.example` file

3. Run the back-end in a production environment:

```bash
npm start
```
