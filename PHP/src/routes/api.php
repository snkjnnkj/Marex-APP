<?php

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use App\Controllers\UserController;

return function ($app, $pdo) {
    $app->group('/api', function ($group) use ($pdo) {
        $userController = new UserController($pdo);

        // 用户相关路由
        $group->get('/users', [$userController, 'getAllUsers']);
        $group->get('/getUserById/{id}', [$userController, 'getUserById']);

        // 图片相关路由
        $group->post('/uploadImage', [$userController, 'uploadImage']);
        $group->get('/uploadedImages', [$userController, 'getUploadedImages']);
        $group->delete('/deleteImage', [$userController, 'deleteImage']);  // 添加这一行
    });
};
