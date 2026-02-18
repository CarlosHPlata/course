package org.patterns.before;

import java.awt.*;
import java.util.function.Function;

class Camera {
    private Function<Color, Color> filters;

    public Camera(Function<Color, Color>... filters) {
        this.filters = Function.identity(); // (color) -> color
        for (var aFilter : filters) {
            this.filters = this.filters.andThen(aFilter); // () -> {} -> () -> {} -<
        }
    }


    public Color snapEdit(Color color) {
//        var result = filter.apply(color);
        return color;
    }
}

public class CameraDecorator {
    public static void print(Camera camera) {
        System.out.println(camera.snapEdit(new Color(125, 125, 125)));
    }

    public static void main(String[] args) {
        print(new Camera(
                (color) -> color.brighter(),
                (color) -> color.darker(),
                (color) -> color.brighter(),
                (color) -> color.brighter(),
                (color) -> color.brighter()
        ));
    }
}
