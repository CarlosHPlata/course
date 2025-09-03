package org.tdd;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class FizzBuzzTest {
    private FizzBuzz fizzBuzz;

    @BeforeEach
    void setup() {
        this.fizzBuzz = new FizzBuzz();
    }

    @Test
    void shouldReturnANumber() {
        String result = fizzBuzz.convert(2);
        assertEquals("2", result);
    }

    @Test
    void shouldReturnFizz() {
        String result = fizzBuzz.convert(3);
        assertEquals("fizz", result);
    }

    @Test
    void shouldReturnBuzz() {
        String result = fizzBuzz.convert(5);
        assertEquals("buzz", result);
    }

    @Test
    void shouldReturnFizzBuzz() {
        String result = fizzBuzz.convert(15);
        assertEquals("fizzbuzz", result);
    }

    @Test
    void shouldReturnFizzFooIfMultipleOfSevenAndThree() {
        String result = fizzBuzz.convert(21);
        assertEquals("fizzfoo", result);

    }

    @Test
    void shouldReturnBar() {
        String result = fizzBuzz.convert(13);
        assertEquals("bar", result);
    }

}