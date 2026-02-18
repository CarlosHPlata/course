package org.patterns.before;

import java.util.function.Function;

//ARM
class MailService {

    private  MailService() {

    }

    public static void start(Function<MailService, MailService> proces) {
        var instance = new MailService();
        proces.apply(instance);
        instance.send();
        instance.close();
        System.out.println("starting service and connecting");
    }

    public MailService from(String name) {
        System.out.printf("From %s%n", name);
        return this;
    }

    public MailService to(String name) {
        System.out.printf("to %s%n", name);
        return this;
    }

    public MailService message(String message) {
        System.out.printf("message: %s%n", message);
        return this;
    }

    public MailService send() {
        System.out.println("Sending the mail");
        return this;
    }

    public void close() {
        System.out.println("closing the service");
    }
}
public class Evolve {
    public static void main(String[] args) {
            MailService.start((service) -> service
                    .from("Carlos")
                    .to("Luis")
                    .message("Hola"));
    }
}
