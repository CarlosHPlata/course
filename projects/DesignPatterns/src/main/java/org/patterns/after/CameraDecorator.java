package org.patterns.after;

import java.awt.*;
import java.util.function.Function;
import java.util.stream.Stream;

class Camera {
    private Function<Color, Color> filter;

    public Camera(Function<Color, Color>... filters) {
        this.filter = Stream.of(filters).reduce(
                Function.identity(),
                Function::andThen
        );
    }

    public Color snapEdit(Color color) {
        return filter.apply(color);
    }
}

public class CameraDecorator {
    public static void print(Camera camera) {
        System.out.println(camera.snapEdit(new Color(125, 125, 125)));
    }

    public static void main(String[] args) {
        print(new Camera(Color::brighter));
        print(new Camera());
        print(new Camera(Color::brighter, Color::darker));
    }
}
