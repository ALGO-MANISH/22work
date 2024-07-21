CREATE TABLE student_leave (
    sl INT PRIMARY KEY AUTO_INCREMENT,
    appliedDate DATE,
    scholarid INT,
    name VARCHAR(100),
    hostel_name VARCHAR(100),
    room_no VARCHAR(100),
    leave_from DATE,
    leave_to DATE,
    total_day INT,
    reason_of_leave TEXT
);
INSERT INTO student_leave (appliedDate, scholarid, name, hostel_name,room_no, leave_from, leave_to, total_day, reason_of_leave) 
VALUES ('2024-07-21', 1913105, 'MANISH KR PODDAR', 'hostel-0','s-213','2024-08-01', '2024-08-05', 5, 'I need to attend a family function in my hometown, which will require me to be away for a few days.');
SELECT * FROM  student_leave

TRUNCATE TABLE student_leave;
