<?php

use App\Controllers\UserController;
use App\Controllers\uploading;
use App\Controllers\repairs;
use App\Controllers\workPersonnel;

return function ($app, $pdo) {
    $app->group('/api', function ($group) use ($pdo) {
        $userController = new UserController($pdo);
        $uploading = new uploading($pdo);
        $Repairs = new repairs($pdo);
        $WorkPersonnel = new workPersonnel($pdo);
        //一建查询所有用户id
        $group->get('/users', [$userController, 'getAllUsers']);
        //查询所有工作人员的数据
        $group->get('/getStaff/{id}', [$userController, 'getStaff']);
        // 根据有邮箱查询工作人员的信息
        $group->get('/getStaffByEmail/{id}/{email}', [$userController, 'getStaffByEmail']);
        // 根据真实姓名来查询工作人员的信息
        $group->get('/getStaffByRealName/{id}/{Real_name}', [$userController, 'getStaffByReal_name']);
        //单个查询用户信息
        $group->get('/getUserById/{id}', [$userController, 'getUserById']);
        //查询用户的封禁状态
        $group->get('/getUserByIdStatus/{id}', [$userController, 'getUserByIdStatus']);
        // 图片相关路由
        $group->post('/uploadImage', [$uploading, 'uploadImage']); //上传图片
        $group->get('/uploadedImages', [$uploading, 'getUploadedImages']); //获取上传目录的图片列表 
        $group->get('/getStaticState', [$uploading, 'getStaticState']); // 获取静态目录的图片列表
        $group->post('/uploadMultipleImages', [$uploading, 'uploadMultipleImages']); // 多张图片上传路由
        // 报修相关路由
        $group->post('/addRepairRequest', [$Repairs, 'addRepairRequest']); //为普通用户添加报修记录
        $group->get('/getRepairsByUser_id/{user_id}', [$Repairs, 'getRepairsByUser_id']); // 实时获取报修记录
        $group->get('/getRepairs', [$Repairs, 'getRepairs']); // 获取所有报修记录
        $group->post('/StaffRepairReportRecord', [$WorkPersonnel, 'StaffRepairReportRecord']); // 添加工作人员的额报修表
        $group->post('/updateRepairStatus', [$Repairs, 'updateRepairStatus']); // 修改报修记录的status状态
        $group->post('/updateRepairServiceman', [$Repairs, 'updateRepairServiceman']); // 修改报修记录的status状态
        $group->get('/getStaffRepairReport/{email}', [$WorkPersonnel, 'getStaffRepairReport']);
        $group->post('/rejection_notice', [$Repairs, 'rejection_notice']); // 添加驳回原因
        $group->post('/deleteRepairById', [$Repairs, 'deleteRepairById']); // 根据ID获取报修记录
        $group->post('/deleteStaff', [$WorkPersonnel, 'deleteStaff']); // 根据ID删除工作人员收到的报修记录
    });
};
