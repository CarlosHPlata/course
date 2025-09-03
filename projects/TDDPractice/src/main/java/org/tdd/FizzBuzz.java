package org.tdd;

import java.util.List;
import java.util.function.Function; //Predicate () -> boolean
// interface MyLambda implemts Function { void do() }
// solo tiene un metodo
// MyLambda variable = () -> {}

// escribir un codigo que reciba un numero entero ✅
// - si el numero no es multiplo de ninguno devolver solo el numero. ✅
// - si el numero es multiplo de 3 devolver "fizz" ✅
// - si el numero es multiplo de 5 devolver "buzz" ✅
// - si el numero es multiplo de 3 y 5 devolver "fizzbuzz" ✅
// - Si el numero es multiplo de 7 devolver "foo" ✅
// - Si es de 7, 3 o 5 "fizzfoo" "buzzfoo" "fizzbuzzfoo" ✅
// - Si es multiplo de 13 devolver "bar"
// - todas las combinaciones "fizzfoobar"

// Strategy (intefaz o una clas) [Attack -> attack]
// template y las cosas comunes
// Extienden e implementan el strategy. [FireAttack -> attack]

public class FizzBuzz {

    private final List<Function<Integer, String>> strategies = List.of(
            (Integer number) -> number % 3 == 0 ? "fizz" : "",
            (Integer number) -> number % 5 == 0 ? "buzz" : "",
            (Integer number) -> number % 7 == 0 ? "foo" : "",
            (Integer number) -> number % 13 == 0 ? "bar" : "");

    public String convert(int number) {
        String value = getValue(number);

        return value != "" ? value : String.valueOf(number);
    }

    public String getValue(int number) {
        StringBuilder value = new StringBuilder();

        for (Function<Integer, String> strategy : strategies) {
            value.append(strategy.apply(number));
        }

        return value.toString();
    }
}