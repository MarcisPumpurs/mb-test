<?php

class Connect
{
// DB connection settings
    const HOST = 'localhost:3306';
    const USER = 'root';
    const PASS = '';
    const DB = 'mb_test';

// Connection to DB
    public static function create(): Mysqli
    {
        $conn = new mysqli(self::HOST, self::USER, self::PASS, self::DB);
        if ($conn->connect_error) {
            die("Could not connect to DB: " . $conn->connect_error);
        }
        $conn->set_charset("utf8mb4");
        return $conn;
    }

}
