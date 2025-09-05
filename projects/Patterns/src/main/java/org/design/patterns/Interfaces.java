package org.design.patterns;

public class Interfaces {
    interface Pet {
        void speak();

        default void jump() {
            System.out.println("Jumping");
        }

        //const arr = [1,2,3];
        //arr.forEach(e => console.log(e));
        //arr.map(e => e * 2);
        //arr.filter(e => e % 2 == 0);
        //arr.reduce((acc, e) => acc + e, 0);
        //arr.find(e => e == 2);
        //arr.some(e => e % 2 == 0);
    }

    interface WalkingAnimal {
        void walk();
        default void jump2() {
            System.out.println("Jumping from WalkingAnimal");
        }
    }

    static class Dog implements Pet, WalkingAnimal {
        @Override
        public void speak() {
            System.out.println("Woof");
        }

        @Override
        public void walk() {
            System.out.println("Dog walking");
        }
    }

    public static void main(String[] args) {
        var myDog = new Dog();
        myDog.jump();
        myDog.jump2();
    }
}
