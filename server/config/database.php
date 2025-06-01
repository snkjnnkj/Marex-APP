<?php
// config/database.php
return [
    'driver' => 'mysql',
    'host' => 'localhost',
    'database' => 'xsh',
    'username' => 'root',
    'password' => 'Acq335.5',
    'charset' => 'utf8mb4',
    'options' => [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]
];