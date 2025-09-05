package org.design.patterns;

import java.util.List;
import java.util.function.Predicate;

public class Strategy {

    // Predicate es una interfaz funcional que recibe un parametro y devuelve un boolean
    public static int totalValues(List<Integer> numbers, Predicate<Integer> filterStrategy) {
        // hace un for y va sumando los valores
        return numbers.stream()
                .filter(filterStrategy)
                .reduce(0, Integer::sum);
    }

    public static void main(String[] args) {
        var numbers = List.of(1, 2, 3, 4, 5);
        System.out.println(totalValues(numbers, e -> true)); // suma todos los valores
        System.out.println(totalValues(numbers, e -> e % 2 == 0)); // suma los pares
        System.out.println(totalValues(numbers, e -> e % 2 != 0)); // suma los impares
        System.out.println(totalValues(numbers, e -> e % 3 != 0)); // suma los impares
    }
}
