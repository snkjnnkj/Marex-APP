<?php
$request = $_SERVER['REQUEST_URI'];
$method = $_SERVER['REQUEST_METHOD'];

require_once '../controllers/UserController.php';
require_once '../utils/ResponseHelper.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($request === '/api/users' && $method === 'GET') {
    $controller = new UserController();
    $controller->getUsers();
} else {
    echo ResponseHelper::json(['message' => 'Not Found'], 404);
}
