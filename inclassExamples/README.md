# WELCOME TO IN CLASS EXERCISES 

first install the dependencies
```md
npm install
```

## Run a practice

To run a excercise use the following command:

```md
npm run practice -- $practiceName $codeName
```

The script will know if it's a code excercise or a TDD excercise and run the expected command.

## List of available examples:

| Practice Name | Source Path                  | Type        | Command Example                          |
|---------------|-----------------------------|-------------|------------------------------------------|
| cleanCode     | `./src/1_CleanCode/before`    | code        | `npm run practice -- cleanCode functionRules` |
| tdd         | `./src/3_TDD/functional`      | dojo        | `npm run practice -- tdd`     |