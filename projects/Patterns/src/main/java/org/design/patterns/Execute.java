package org.design.patterns;

import java.lang.reflect.Constructor;
import java.util.function.Consumer;

class Mailer {
    public String from;
    public String to;
    public String subject;
    public String body;

    private Mailer() {

    }

    public Mailer from(String from) {
        this.from = from;
        return this;
    }
    public Mailer to(String to) {
        this.to = to;
        return this;
    }
    public Mailer subject(String subject) {
        this.subject = subject;
        return this;
    }
    public Mailer body(String body) {
        this.body = body;
        return this;
    }

    //Consumer es una interfaz funcional que representa una operación que acepta un solo argumento de entrada y no devuelve ningún resultado.
    // En este caso, acepta un Mailer y no devuelve nada.
    // (Mailer) -> void
    public static void send(Consumer<Mailer> block) {
        var mailer = new Mailer();
        block.accept(mailer);

        System.out.println("Sending email:");
        System.out.println("From: " + mailer.from);
        System.out.println("To: " + mailer.to);
        System.out.println("Subject: " + mailer.subject);
        System.out.println("Body: " + mailer.body);
    }
}
public class Execute {

    public static void main(String[] args) {
        Mailer.send(mailer -> {
            mailer
                .from("myemail@zmail.com")
                .to("youremail@zmail.com")
                .subject("Your code sucks")
                .body("Fix it, please");
        });
    }
}
