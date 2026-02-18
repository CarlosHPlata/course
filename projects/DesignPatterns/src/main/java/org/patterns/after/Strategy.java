package org.patterns.after;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Function;
import java.util.function.Predicate;

public class Strategy {

    public static int sumValues(List<Integer> values, Predicate<Integer> filter) {
        var total = 0;

        for(int value : values) {
            if (filter.test(value)) continue;
            total += value;
        }

        return total;
    }

    public static void main(String[] args) {
        var values = List.of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11);

        System.out.println(sumValues(values, e -> true));
        System.out.println(sumValues(values, e -> e %2 == 0));
        System.out.println(sumValues(values, e -> e %3 == 0));
    }
}
