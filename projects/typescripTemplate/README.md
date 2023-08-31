# Configuring a Typescript project with must have Quality tools


In the realm of software development, several essential tools play a crucial role in shaping the quality, reliability, and maintainability of software architecture. These tools contribute significantly to the overall success of a project by streamlining processes and ensuring adherence to best practices. Let's explore each of these tools and their key roles and how to apply it to a real project.

## Summary

Collectively, the tools we will see, will significantly contribute to the shaping of software architecture in several pivotal ways:

- **Consistency:** Linters and style enforcement tools foster a uniform code style and adherence to quality benchmarks.
- **Quality Assurance:** Test tools ensure that software operates as expected, upholding reliability throughout its lifecycle.
- **Automation:** Workflows, pipelines, and Git hooks automate tasks, minimizing manual intervention and potential errors.
- **Collaboration:** These tools facilitate seamless collaboration among team members by reinforcing shared practices.
- **Maintenance:** By proactively identifying issues, these tools bolster the long-term maintainability of software architecture, forestalling the accrual of technical debt.

In essence, these tools stand as indispensable assets in the construction, care, and evolution of software architecture that stands resolute in its robustness, reliability, and scalability.

## Starting a new typescript project

The way you kick off a project depends on what you're trying to do. For instance, if you're working on a [React](https://react.dev/) project, tools like [Vite](https://vitejs.dev/) or [Next](https://nextjs.org/) can help you get started quickly with their own setups. As for every other framework usally came with their own CLI to start a new project.

But for now, let's keep things simple and start from scratch.

### Vanilla Typescript just for node or pure Typescript:

**Create a new folder wherever you want your project on**
```bash
mkdir myProject
cd myProject
```


**Init npm**
```bash
npm init
```
*Follow all the instructions to get the `package.json`*

**Init GIt**
```bash
git init
```

Let's install allthe dependencies for a typescript project:
```bash
npm install typescript ts-node
```

For `typescript` to work you need to add to the root of your project a file named:

`tsconfig.json`

> If you want to know more about typescript and tsconfig click [here](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)

You can copy the file from [here](./tsconfig.json). Or you can create your own file by running ```tsc --init```

Create a `src` folder, and create your first typescript file.

Modify the package.json scripts to add a start script to run your first typescript file.

```json
{
  "scripts": {
    "start": "ts-node ./src/index.ts",
  },
}
```

DONE!.
You can now enjoy running your project with:
```bash
npm start
```

## Linters

**Linters** are invaluable aids that scrutinize code for potential issues, style violations, and adherence to coding standards. They promote consistency in coding styles, making the codebase more readable, comprehensible, and maintainable. By identifying syntax errors, possible bugs, and conformity to established best practices, linters significantly enhance the quality of the codebase, preventing issues from surfacing later in the development lifecycle.

Many linters exists for different languages for example:

- JavaScript / Typescript:
  - [ESLint](https://eslint.org/)
  - [Prettier](https://prettier.io/)
- PHP
  - [StyleCI](https://styleci.io/)
- Python
  - [PyLint](https://pypi.org/project/pylint/)
- Java
  - [InteliJ buid in code stylings](https://www.jetbrains.com/help/idea/configuring-code-style.html)
  - [SonarQube](https://www.sonarsource.com/products/sonarqube/)

### ESLint

Let's jump and configure in our project the most popular one for Typescript [ESLint](https://eslint.org/).

[ESLint](https://eslint.org/) is a tool that checks your JavaScript and TypeScript code for errors, style problems, and best practice violations, helping you write cleaner and more reliable code.

[ESLint](https://eslint.org/) is wide use in the industry and many companies shared their own rules and configurations to make your code look professional and awesome like [Airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb), [Facebook](https://www.npmjs.com/package/eslint-config-fbjs), [and many more](https://github.com/dustinspecker/awesome-eslint#configs-by-well-known-companiesorganizations)


You can start your own configuration following [ESLint Get Started](https://eslint.org/docs/latest/use/getting-started) or by Reading [any other blog](https://blog.yogeshchavan.dev/how-to-configure-eslint-for-your-project-from-scratch)

Or you can use a well known configuration and use it. Like how we are going to do.
We are going to use [`ts-standard`](https://www.npmjs.com/package/ts-standard).

So let's install it:
```bash
npm install --save-dev ts-standard
```

Once installed we have to implement it on our project, by making a configuration to our project. There are many ways to configure ESLint, like with a json files or js file, or cjs file, or directly in the package.json you can check [here](https://eslint.org/docs/latest/use/configure/).
We will use the `package.json` form, because it's more easy but more messy.

So in our `package.json` we will add the following configs:
```json
{
  // ... the rest of the package.json
  "eslintConfig": {
    "extends": "./node_modules/ts-standard/eslintrc.json"
  },
}
```

once installed we can add a `lint` script in our `package.json`.

```json
{
  "scripts": {
    "lint": "eslint .",
  },
}
```

now if we run the following command we can check that the linter is running:
```bash
npm run lint
```

>  If you get an error related to `dotenv` is because ESLint is not fiding the right path to our `tsconfig.json`, you have to add that path to our eslint configurations in `package.json` as shown here
> ```json
> {
>  // ... the rest of the package.json
>  "eslintConfig": {
>    "extends": "./node_modules/ts-standard/eslintrc.json",
>    "parserOptions": {
>      "project": "./tsconfig.json"
>    },
>  },
>}
> ```

That's not enough, we will make our life easier by configuring our environment, if you are using [VS Code](https://code.visualstudio.com/). You can go to the packages store and find the [ESLint Package](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint).
If you activate this package you will be able to see the errors in your editor which make it better.

But not enough with that, if we want the errors to be fixed automatically by our editor, we can go to our `settings.json` and add the following lines:
```json
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
},
"eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
]
```

Now every time you save your code it will try to automatically fix the issues.

## Test Tools

**Test tools** encompass a diverse array of testing methodologies, encompassing unit tests, integration tests, and end-to-end tests. These tools are instrumental in verifying that software functions as intended and remains operational despite codebase modifications. Automated testing furnishes a safety net for code alterations, promptly detecting regressions and issues during the developmental cycle. This assumes heightened importance in safeguarding the stability and dependability of software architecture as it evolves over time.

Many tools exists to enforce testing for example:
- JavaScript / Typescript:
  - [Jest](https://jestjs.io/)
  - [Karma](https://karma-runner.github.io/latest/index.html)
  - [PlayWright](https://playwright.dev/)
- PHP
  - [PHPUnit](https://phpunit.de/)
- Python
  - [PyTest](https://docs.pytest.org/en/7.4.x/)
- Java
  - [JUnit](https://junit.org/junit5/)
  - [Spring Boot Test](https://www.baeldung.com/spring-boot-testing)

### Jest
We will use [Jest](https://jestjs.io/) for our project. We need to integrate it to our typescript environment.
First let's install jest and all required dependencies for our project:

```bash
npm install --save-dev jest @types/jest ts-jest
```

As with `typescript` [Jest](https://jestjs.io/) wil require a [configuration file](https://jestjs.io/docs/configuration) to work, you can also follow this [blog](https://basarat.gitbook.io/typescript/intro-1/jest).
[Or you can copy the file from this repo](./jest.config.ts).

Now we can add a script for testing in our `package.json`:
```json
{
  "scripts": {
    "test": "jest .",
  },
}
```

Don't forget to add tests to our project, write a file that ends `.spec.ts`, and add a test using jest.

Then you can run:
```bash
npm run test
```


## Git Hooks

**Git hooks** are dynamic scripts that activate at various stages of the Git workflow, such as prior to committing code, pushing changes, or merging branches. These hooks provide an automated means to enforce specific checks or actions, such as running tests, verifying linting standards, or maintaining consistent code formatting. By upholding code quality, preventing subpar code from infiltrating the repository, and enforcing team-specific development protocols, Git hooks streamline collaboration and elevate overall development practices.

Hooks are available directly with `Git` but you have to know that those are for **Personal Use** so they will not be commited to your repo and not able to be used across your team.

Let's check it:

```bash
ls .git/hooks
```

You will see that with git you already have some examples:
```bash 
applypatch-msg.sample      post-update.sample     pre-merge-commit.sample  pre-receive.sample
commit-msg.sample          pre-applypatch.sample  pre-push.sample          prepare-commit-msg.sample
fsmonitor-watchman.sample  pre-commit.sample      pre-rebase.sample        update.sample
```

> [Check here to know all about hooks](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks)

Too nice but we want to use hooks for all our teamates.


### Husky
The Most popular option for `Javascript / Typescript` is [Husky](https://typicode.github.io/husky/).
**I encourage you to use it in your JS/TS Projects and not the option I will show just follow the [getting started guide](https://typicode.github.io/husky/getting-started.html)**.

### Vanilla GitHooks

Since I know there are many of you working in projects that are not JS or TS, you can achieve the same as Husky but with vanilla Git.
Since Git version `2.9` is possible to achieve this.

> check your git version with: `git --version`

First we need to create a folder in our project called `.githooks`

```bash
mkdir .githooks
```

Next we will have to modify the default folder for git hooks in our git configuration for this specific project.
We need to run:

```bash
git config core.hooksPath .githooks
```

Once this we can start creating a new hook, let's try with a pre commit hook, which will check something before commiting our code.

Create a file inside `.githooks` called `pre-commit`

```bash
cd .githooks
touch pre-commit
```

**IMPORTANT** all hooks files are really just `bash` files, so in order for git to execute them we have to modify our OS permits for the file to run as executable.
Let's run:
```bash
chmod +x .githooks/pre-commit
```

> remember to run this every time you add a NEW file. No need if you only update the file.

Now inside the file we can run any command we want, let's check for example if the linter is passing before commiting our code, write inside the `pre-commit` file the following:

```bash
npm run lint
```

Try it yourself make a change and try to commit.

```
git add .
git commit -m "trying hooks for first time"
```

You will notice the linter being ran when you commit something, nice and done.

### Conventional commits.

Following with hooks, an important convention many companies follow are [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

[Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) is a format for writing consistent and categorized commit messages in Git. It helps with versioning and changelog creation, enhancing collaboration and release processes.

With enough imagination and git hooks you can even automate the creation of Change Logs.
**I encourage you to use Conventional Commits in your projects** you don't need anything to do it just make your commits right, but even better is to enforce it.

> [Check this blog to make Change Logs automatically with JS projects and Conventional Commits.](https://mokkapps.de/blog/how-to-automatically-generate-a-helpful-changelog-from-your-git-commit-messages)

You can enforce Conventional Commits with husky [with this library](https://github.com/conventional-changelog/commitlint).

or if you can't use Husky because you are not in a JS/TS project you can create inside your `.githooks` folder a new `commit-msg` file (Don't forget modify the file rights).

And copy the content from [here](./conventional-commit-hook).

## Workflows and Pipelines

**Continuous Integration (CI)** is a development practice where code changes from multiple contributors are frequently integrated into a shared repository. The main goal is to detect integration issues early by automatically building and testing the code as soon as changes are pushed. CI ensures that the new code integrates smoothly with the existing codebase, reducing integration headaches and identifying bugs and conflicts sooner. Automated tests are a key part of CI, providing fast feedback on code quality and functionality.

**Continuous Delivery (CD)** is an extension of CI. It involves automatically deploying code changes to production or staging environments after they pass through the CI pipeline and meet certain quality and testing criteria. CD minimizes manual interventions, reducing the risk of errors and making the deployment process more reliable. It's about having a production-ready codebase that can be deployed at any time with confidence.

Together, CI and CD create a streamlined and automated software development and deployment process. CI catches issues early, while CD automates the deployment process, leading to faster development cycles, higher code quality, and more reliable releases.

In order to make CI and CD available to our projects, many tools were created that creates **Workflows** and **pipelines**.

**Workflows** and **pipelines** delineate the sequence of steps required to build, test, and deploy software alterations. These mechanisms automate the integration of code changes, execution of tests, and deployment across diverse environments. By automating these essential tasks, workflows and pipelines mitigate human error, establish uniform processes, and offer a dependable, replicable approach to software management and release. This automation proves particularly indispensable in extensive projects involving numerous contributors, where manual processes could lead to disparities and delays.

The most famous tool for creating Pipelines is [Jenkins](https://www.jenkins.io/), unfornatelly we are not rich and most common tools for pipelines cost.

So instead we will use a free version that comes with Github, the [Github Actions](https://github.com/features/actions).

### Github Actions
First we need of course a github repository, go ahead to your own github account and create a repository, follow the github instructions to link your local repository to the github repo.

Once this done, we can create the follwing folders inside our project `.github/workflows`.

```bash
mkdir .github
cd .github
mkdir workflows
```

Inside the `workflows` folder we can create a `.yml` file, the name is not important so let's call it `test.yml`.

at the end your project should look something like:
```
| .githooks\
| .github
| |-- workflows
|   |-- test.yml
| src\ 
```

First our action has to have a name so let's add it inside `test.yml`:

```yml
name: Test
```

Next on we have to tell the action ro run on certain events, let's say we want to run our action every time somebody push to `master` or `main`, and every time somebody open a `Pull Request`.

So in our `test.yml`:

```yml
name: Test

on:
  push:
    branches: [master, main]
  pull_request:
    branches: [master, main]
```

> be carefull with identation, yml files are so sensitive to correct identation.

Now we want to run a certain job when the previous conditions are meet, Jobs will run in a container, so we need to [tell Github in which type of machine we want our job to run](https://docs.github.com/en/actions/using-jobs/running-jobs-in-a-container).
On our `test.yml` file:

```yml
name: Test

on:
  push:
    branches: [master, main]
  pull_request:
    branches: [master, main]

jobs:
  build:
    runs-on: ubuntu-latest
```

In this case we want to run it inside an ubuntu machine, we can declare multiple machines to run, so for example we can test our code works in [windows, ubuntu, etc...](https://docs.github.com/en/actions/using-github-hosted-runners/about-github-hosted-runners)

A job usually consists on many steps, that are executed secuentially to achieve something.
We want for example to run all tests for this job.
So let's make it and declare the steps for it:

```yml
name: Test

on:
  push:
    branches: [master, main]
  pull_request:
    branches: [master, main]

jobs:
  build:
    runs-on: ubuntu-latest
  
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v2
        with:
          node-version: 18
      - run: npm i
      - run: npm test
```

You may be wondering what all those steps means, let's dive into:

```yml
      - uses: actions/checkout@v3
```

This is a special step, Github actions let us choose [from many different libraries](https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions#jobsjob_idstepsuses) to perform common actions in our jobs.

`actions/checkout@v3` will allow Actions to pull our repository code into the container so it will be available for the job to work on.

```yml
      - uses: actions/setup-node@v2
        with:
          node-version: 18
```

As `actions/checkout@v3`, `actions/setup-node@v2` is a shared step from Github, this will tell the container to use a specific version of node and do all the things to make it available inside the container.
Additionally it let us tell it which version of node to use by passing `node-version` to it.

```yml
      - run: npm i
      - run: npm test
```

Once we use the shared steps to get our Container ready, we an tell the container to execute certain actions inside.
With this steps we are telling the container to run the installation process and then the testing script.


DONE!

Go ahead and commit then push your code, you will notice inside Github that the actions tab has a new action running.
Enjoy your new power of CI CD.

WIth enough imagination you can make Github Actions not only test your code, but virtually anything, from creating automatic documentation, to even build and deploy your code for you.
