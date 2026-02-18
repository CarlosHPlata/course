package org.patterns.before;

import java.util.List;
import java.util.function.Function;
import java.util.function.Predicate;

public class Strategy {

    public static int sumValues(List<Integer> values, Predicate<Integer> conditional) {
        var total = 0;

        for(int value : values) {
            var conditionalResult = conditional.test(value);
            if (conditionalResult) {
                total += value;
            }
        }

        return total;
    }

    public static void main(String[] args) {
        var values = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);

        System.out.println(sumValues(values, (number) -> number %2 == 0 )); // suma los pares
        System.out.println(sumValues(values, (number) -> number %2 != 0 )); // suma impares
        System.out.println(sumValues(values, (number) -> true)); // suma todos
    }
}