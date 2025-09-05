package org.design.patterns;

import java.util.Optional;

public class OptionalValues {
    public Optional<String> getName() {
        Optional.empty();
        Optional.ofNullable(null);

        var opt = Optional.of("John");
        opt.map(String::toUpperCase)
                .ifPresent(System.out::println);
        var list = opt.stream().toList().stream().map(e -> e + "!").toList();
        return Optional.of("John");
    }

    public void setName(String name){
        System.out.println(name.orElse("No name"));
    }

    public void setName() {

    }

    public static void main(String[] args) {
        new OptionalValues().setName("John");
        new OptionalValues().setName();
    }
}
