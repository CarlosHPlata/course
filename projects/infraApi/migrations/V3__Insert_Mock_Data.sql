-- Insert Mock Data for USERS
INSERT INTO USERS (name, email) VALUES 
('John Doe', 'john.doe@example.com'),
('Jane Smith', 'jane.smith@example.com'),
('Alice Johnson', 'alice.johnson@example.com'),
('Bob Brown', 'bob.brown@example.com');

-- Insert Mock Data for Flight
INSERT INTO Flight (flightNumber, baseprice, departure, destination, departureDate, arrivalDate) VALUES 
('AA101', 25000, 'New York', 'Los Angeles', '2023-12-01', '2023-12-01'),
('BA202', 45050, 'London', 'New York', '2023-12-05', '2023-12-05'),
('AF303', 30000, 'Paris', 'Berlin', '2023-12-10', '2023-12-10'),
('DL404', 15075, 'Atlanta', 'Miami', '2023-12-15', '2023-12-15'),
('UA505', 55025, 'San Francisco', 'Tokyo', '2023-12-20', '2023-12-21');
