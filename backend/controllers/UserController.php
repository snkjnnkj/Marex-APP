<?php
require_once '../utils/ResponseHelper.php';

class UserController
{
    public function getUsers()
    {
        $users = [
            ['id' => 1, 'name' => 'Alice'],
            ['id' => 2, 'name' => 'Bob']
        ];
        echo ResponseHelper::json($users);
    }
}
