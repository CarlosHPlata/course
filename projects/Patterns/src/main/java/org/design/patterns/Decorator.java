package org.design.patterns;

import java.awt.*;
import java.util.function.Function;
import java.util.stream.Stream;

public class Decorator {




    static class Camera {
        private final Function<Color, Color> filter;

        // Function es una interfaz funcional que representa una función que toma un argumento de tipo T y devuelve un resultado de tipo R.
        // En este caso, toma un Color y devuelve un Color.
        public Camera(Function<Color, Color>... filters) {
//            Function<Color, Color> filterA = input -> input; // identidad Function.identity()
//
//            for (Function<Color, Color> f : filters) {
//                filterA = filterA.andThen(f);
//            }
            Function<Color, Color> filterA = Stream.of(filters)
                    .reduce(Function.identity(), Function::andThen);

            this.filter = filterA;
        }

        public Color snap(Color input) {
           return filter.apply(input);
        }
    }

    public static void main(String[] args) {
        print(new Camera(
                Color::darker,
                Color::darker,
                Color::brighter
        ));
    }

    public static void print(Camera camera) {
        System.out.println(camera.snap(new Color(255, 0, 0)));
    }
}
