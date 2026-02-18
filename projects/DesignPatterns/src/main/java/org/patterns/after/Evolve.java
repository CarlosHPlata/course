package org.patterns.after;

import java.util.function.Consumer;

class MailService {
    private MailService() {}

    public static void start(Consumer<MailService> consumer) {
        System.out.println("starting service and connecting");

        var service = new MailService();
        try {
            consumer.accept(service);
        } finally {
            service.send();
            service.close();
        }
    }

    public MailService from(String name) {
        System.out.printf("From %s%n", name);
        return this;
    }

    public MailService to(String name) {
        System.out.printf("to %s%n", name);
        return this;
    }

    private void send() {
        System.out.println("Sending the mail");
    }

    private void close() {
        System.out.println("closing the service");
    }
}
public class Evolve {
    public static void main(String[] args) {
         MailService.start( service -> service
                 .from("Carlos")
                 .to("Victor"));
    }
}
