# ForDev

## About

**ForDev** - it`s new age forum for developers and others IT staff united Reddit and Stack Overflow for given best expirience of comunicate with peoples.

## Tech stack

### Client side

> **React**
> **UI**: Antd Design, React Icons, Lucide React, Tailwind CSS
> **State management**: Zustand, Tanstack Query
> **Routing**: React Router DOM
> **Work with forms**: React Hook Form
> **Data fetching**: Axios, Tanstack Query

### Server side

> **Express.js**
> **Databases**: PostgreSQL, Firebase
> **Auth**: JSON Web Token (JWT)
> **ORM**: TypeORM
> **Email service**: Nodemailer
> **Validation**: Express Validator
> **DI**: Inversify.js, Inversify Express Utils
> **Tools**: Bcrypt, .env, Multer

# KPZ

Few word about project:

I write very pretty backend with libs which using in nest.js ( why i not using nest? Good question, because i'm teapot). I'm get focus on architectires and using **onion** for my backend (it's better version of layes). I'm using repos and services pattern, DI, using DTOs and types/interfaces. I have datamappers and helpers. Sorry, i can't give you strategy auth or observer in token service, because i'm playing with firebase and frontend (i not recoment see to 'client' folder, it's scarry...).

## Principles

### SRP

All my repositories, services, controllers working only with one entity. I also using **onion** architecture and decompose my app to layers.

### OCP

I using DI and decompose my app into layes for better flexability and simply adding new features.

### ISP

I'm using Service-Repository pattern and this segragate dependencies and interfaces for them.

### DIP

My app building in DI principles and using DI everywhere. Also i'm using this when create services and use inside interface of repository, implement it in DI container.

### YAGNI

I'm not adding libs or classes who don't need in my app. In example, recently i added mongoDB and mongo repos inside my add for liked and saved, but when i done 20% of this module, i understanded - this is don't need for my app, no metters what DB i'm using for haotic data. And i deleted this overengineering.

## Patterns

### Factory method

My backend building in express, express using base node.js module http for start node server. And i using inversify.js for DI, in conclution i using a lot of libs and methods in index file for starting my server app. I solved it when i created factory for my app, i can create apps with anothers containers that have inside more smaller containers like DB. Factory given me more flexability in my server app and simplified app startup procces.

[Factory method](server/src/app-factory.ts):

``` typescript
import { App } from './api/app';
import { interfaces } from 'inversify';

export class AppFactory {
  public static create(appContainer: interfaces.Container) {
    const app = new App(appContainer);
    return app;
  }
}
```

[I using this in my main file](server/src/main.ts):

``` typescript
import 'reflect-metadata';
import { AppFactory } from './app-factory';
import { appContainer } from './app.container';

const application = AppFactory.create(appContainer);
application.listen(Number(process.env.SERVER_PORT) || 3000);
```

### Chain of responsibility

I using express lib for building backend, and this lib using chain pattern for request object. In express we can use middlewares for doing smthng with request object. Global request object transpot from all middlewares using next function from express lib.

``` typescript
export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const tokenService = appContainer.get<TokenService>(
      TokenTypes.TokenService,
    );

    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError('header'));
    }
    const accessToken = authorizationHeader.split(' ')[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError('access'));
    }
    const userData = await tokenService.validateAccessToken(accessToken);

    req.user = userData;

    next();
  } catch (e) {
    return next(e);
  }
};
```

### Singleton

In my app all modules have DI container, and this container using singleton pattern, when we try to create [new user container](server/src/core/containers/user.container.ts) in another place of program, this return old object for us:

``` typescript
export const userContainer = new Container({ defaultScope: 'Singleton' });

userContainer.bind<UserService>(UserTypes.UserService).to(UserService);
userContainer
  .bind<UserRepository>(UserTypes.UserRepository)
  .to(PgUserRepository);
userContainer.bind<UserController>(UserTypes.UserController).to(UserController);
userContainer.bind<EmailService>(EmailTypes.EmailService).to(EmailService);
```

### Others

Also i'm using **Repository** and **Service** patterns, **DI** pattern, **DTO** pattern, i'm use **Data-mappers** and more and more nice patterns and tricks.

## Refactore methods

> Simplifying Method Calls
> Simplifying Conditional Expressions
> Organizing Data
> Moving Features between Objects
