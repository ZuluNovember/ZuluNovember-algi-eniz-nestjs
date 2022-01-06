# Nest.js Task API
Now that you read about Nest.js it's time to build a REST API using it. The objectives of this assignment are:
1. Understand the workflow of Nest.js
2. Get familiar with the Nest.js CLI
3. Learn about DTOs and Decorators
4. Use Validation pipes

## Setup
1. Run `npm i -g @nestjs/cli` to install the Nest.js cli globally on your machine
2. Run `npm install` to install all the packages listed in the `package.json` file

Now you can run `npm start` to run the server.

## Requirements
1. Create an API endpoint to return all Tasks.
2. Create an API endpoint to return a single task based on its ID.
3. Create an API endpoint to filter tasks by status and search using keywords.
4. Create an API endpoint to add a new task.
5. Create an API endpoint to update an existing task's status.
6. Create an API endpoint to delete a task based on its ID.

You will find some more guidelines for each of these requirements below.

### Part 0: Initial workflow setup
Nest.js follows best practices, each route has its folder where all the files related lives there, for our `tasks` route we will need to create 3 different files (Module, Controller, and Service) each one of them will have its job, now let's go ahead and start setting up these files to start working, we will utilize the Nest.js CLI to help us create these files.

1. run `nest g mo tasks` to generate the folder and module file for our tasks route
2. run `nest g co tasks` to generate the controller file for our tasks, you will see that it is automatically imported and used in the `tasks.module.ts` file
3. run `nest g se tasks --no-spec` to generate the service file, again the CLI helps us with importing the service file automatically in our `tasks.module.ts` file this saves us a lot of time!
4. create `task.model.ts` we will use this file to write the schema for our tasks include the following code in it

```js
export interface Task{
    id: string;
    title: string;
    description: string;
    status: TaskStatus;
}

export enum TaskStatus{
    OPEN = "OPEN",
    IN_PROGRESS = "IN_PROGRESS",
    DONE = "DONE",
}
```

### Part 1: API endpoint to return all tasks
When you send a **GET request** to the endpoint `/tasks`, your server must return all the tasks as an array in the response.

***NOTE***: since we are not persisting the data you can create a private property called `tasks` with the type `Task[]`  inside our `TasksService` class in our `tasks.service.ts` file

### Part 2: API endpoint to return a single task
For example, if you send a **GET request** to the endpoint `/tasks/1` your server must be able to identify the ID 1 from the request URL.
- In case the ID does not exist throw an error using `NotFoundException()` function from Nest.js

### Part 3: API endpoint to filter tasks by genre
In this request, we will use a query parameter called search or/and status. For example, you may send a **GET request** to the endpoint `/tasks?search=randomstring`. Your server must identify the query value of "randomstring" from the request URL, then we will search our list of tasks and return the matching list of tasks as an array in the response.

If the query parameter is not provided, then the server must respond with all the tasks.

NOTE: Create a [dto](https://docs.nestjs.com/controllers#request-payloads) folder inside our `tasks` folder and create a dto file for this you can call it `get-tasks-filter.dto.ts` this file should include the following code
```js
import { TaskStatus } from '../task.model';

export class GetTasksFilterDto {
  status?: TaskStatus;
  search?: string;
}
```
This dto can be used in the params for the `/tasks` as the type of `@Query` that can be passed to this API endpoint.

### Part 4: API endpoint to add a new task
When you send a **POST request** to the endpoint `/tasks` and your request body includes the details of a new task, the id should be auto-generated using uuid package, as for status it should be `OPEN`.
- For this endpoint we will need to create a DTO to define the schema of our parameters:
    1. In our dto folder create a new file `create-task.dto.ts`
    2. Inside this file write this code 
    ```js
    export class CreateTaskDto {
        title: string;
        description: string;
    }
    ```
    You can use this dto as a type in your controller and your service functions that receive the params via the `@Body`


### Part 5: API endpoint to update an existing task's status
For example, if you send a **PATCH request** to the endpoint `/tasks/:id/status` and your request body includes a new status, your server must be able to identify the `:id` from the request URL and the new task status from the request body.
- Make sure to use the `TaskStatus` enum that we created in the `task.model.ts`

### Part 6: API endpoint to delete a task based on its ID
For example, if you send a **DELETE request** to the endpoint `/tasks/1` your server must be able to identify the ID 1 from the request URL.


### Part 7: Validation pipes walkthrough
You did great! now you have created your first REST API using Nest.js, but looking at our endpoint there's no validation happening, for example: if someone sends a `POST` request with body fields it will go through lets fix that!

1. First we need to install a couple of packages that will help us run `npm install class-validator class-transformer you can check class-validator [github page](https://github.com/typestack/class-validator) out it shows us the different validation decorators that we can use
2. Looking at the list we can see the `@IsNotEmpty` decorator that can be helpful in our case, head to our `create-task.dto.ts` and edit it to look like this:
```js
import { IsNotEmpty } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  description: string;
}

```

3. For these validation decorators to work we have to use a validation pipe that runs every time a request is sent, go to our `main.ts` file import `ValidationPipe` from `@nestjs/common`, and add the following line before `await app.listen(3000)`
```  
app.useGlobalPipes(new ValidationPipe());
``` 
Now, go ahead and try to send a `POST` request with one of the body fields empty and it should respond with `400` status code and a message stating either the title or the description is empty

### Part 8 Validation challange!
In our query filter, we are not validating the status or the search keywords that the user is sending us so here's what you need to do
1. `status`: the user input needs to be one of the 3 options we have in the enum.
2. `search`: make sure that the keyword provided is a string.

***NOTE***: for these 2 make sure to add the `@IsOptional()` decorator because we have cases where users do not need to pass these queries, search this [page](https://github.com/typestack/class-validator) for the other decorators u will use

---
The above guidelines are to help you understand how the tasks REST API will function, covering the most commonly used request methods. Some endpoints will use a path parameter, some will use a query parameter and some will include a request body.

Throughout the implementation, you will be using Postman to test if your API endpoints are working as intended.

## Submission
Once you're ready to submit the assignment, follow these steps on your terminal:
1. Stage your changes to be committed: `git add .`
2. Commit your final changes: `git commit -m "solve assignment"`
3. Push your commit to the main branch of your assignment repo: `git push origin main`

After your changes are pushed, return to this assignment on Canvas for the final step of submission.

---
## References
- https://docs.nestjs.com/
- https://github.com/typestack/class-validator
