<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use PDO;
use PDOException;

class workPersonnel
{
    private $pdo;
    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }
    // 添加工作人员的报修表
    public function StaffRepairReportRecord(Request $request, Response $response)
    {
        try {
            // 获取请求体中的原始数据
            $body = (string)$request->getBody();
            $data = json_decode($body, true);
            // 添加调试日志
            error_log('Received data: ' . print_r($data, true));
            // 检查数据是否解析成功
            if (json_last_error() !== JSON_ERROR_NONE) {
                $response->getBody()->write(json_encode([
                    'error' => '无效的 JSON 数据',
                    'detail' => json_last_error_msg()
                ]));
                return $response
                    ->withStatus(400)
                    ->withHeader('Content-Type', 'application/json');
            }
            // 准备 SQL 语句
            $sql = "INSERT INTO staffRepair_requests (
                nickname, email, location, problem_description, 
                problem_images, reporter_name, reporter_phone, repair_time
            ) VALUES (
                :nickname, :email, :location, :problem_description,
                :problem_images, :reporter_name, :reporter_phone, :repair_time
            )";

            // 准备语句
            $stmt = $this->pdo->prepare($sql);
            // 绑定参数并执行
            $stmt->execute([
                ':nickname' => $data['nickname'],
                ':email' => $data['email'],
                ':location' => $data['location'],
                ':problem_description' => $data['problem_description'],
                ':problem_images' => $data['problem_images'] ?? '',
                ':reporter_name' => $data['reporter_name'],
                ':reporter_phone' => $data['reporter_phone'],
                ':repair_time' => $data['repair_time']
            ]);
            // 获取插入的ID
            $lastId = $this->pdo->lastInsertId();
            // 查询刚插入的数据
            $selectSql = "SELECT * FROM staffRepair_requests WHERE id = :id";
            $selectStmt = $this->pdo->prepare($selectSql);
            $selectStmt->execute([':id' => $lastId]);
            $insertedData = $selectStmt->fetch(PDO::FETCH_ASSOC);
            // 返回成功响应，包含刚插入的数据
            $response->getBody()->write(json_encode([
                'message' => '报修信息添加成功',
                'data' => $insertedData,     // 数据库中的实际数据
                'code' => 200
            ]));
            return $response
                ->withStatus(201)
                ->withHeader('Content-Type', 'application/json');
        } catch (PDOException $e) {
            $errorMessage = $e->getMessage();
            $errorResponse = ['error' => '数据库操作失败'];
            if (strpos($errorMessage, 'Data too long') !== false) {
                $errorResponse['detail'] = '某个字段值过长';
            } elseif (strpos($errorMessage, 'Duplicate entry') !== false) {
                if (strpos($errorMessage, 'idx_unique_nickname') !== false) {
                    $errorResponse['detail'] = '该用户昵称已存在';
                } elseif (strpos($errorMessage, 'idx_unique_email') !== false) {
                    $errorResponse['detail'] = '该邮箱已被使用';
                }
            }
            $response->getBody()->write(json_encode($errorResponse));
            return $response
                ->withStatus(500)
                ->withHeader('Content-Type', 'application/json');
        }
    }
    // 获取工作人员的报修表
    public function getStaffRepairReport(Request $request, Response $response)
    {
        try {
            // 获取邮箱参数
            $email = $request->getAttribute('email');
            if ($email) {
                // 如果提供了邮箱，按邮箱查询
                $sql = "SELECT * FROM staffRepair_requests WHERE email = :email";
                $stmt = $this->pdo->prepare($sql);
                $stmt->execute([':email' => $email]);
            } else {
                // 如果没有提供邮箱，获取所有记录
                $sql = "SELECT * FROM staffRepair_requests";
                $stmt = $this->pdo->prepare($sql);
                $stmt->execute();
            }

            // 获取查询结果
            $records = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // 判断是否找到记录
            if (empty($records) && $email) {
                $response->getBody()->write(json_encode([
                    'message' => '未找到该邮箱的报修记录',
                    'data' => [],
                    'code' => 200
                ]));
            } else {
                $response->getBody()->write(json_encode([
                    'message' => '获取报修记录成功',
                    'data' => $records,
                    'code' => 200
                ]));
            }

            return $response
                ->withStatus(200)
                ->withHeader('Content-Type', 'application/json');
        } catch (PDOException $e) {
            error_log('Database error: ' . $e->getMessage());
            $response->getBody()->write(json_encode([
                'error' => '数据库查询失败',
                'detail' => $e->getMessage()
            ]));
            return $response
                ->withStatus(500)
                ->withHeader('Content-Type', 'application/json');
        }
    }
    // 根据ID删除报修记录
    public function deleteStaff(Request $request, Response $response)
    {
        try {
            // 获取请求体数据并解析 JSON
            $body = (string)$request->getBody();
            $data = json_decode($body, true);
            // 先查询要删除的记录
            $selectStmt = $this->pdo->prepare("SELECT * FROM staffRepair_requests WHERE id = :id");
            $selectStmt->execute([':id' => $data['id']]);
            $record = $selectStmt->fetch(PDO::FETCH_ASSOC);
            // 如果记录不存在
            if (!$record) {
                $response->getBody()->write(json_encode([
                    'error' => '记录不存在',
                    'detail' => '未找到ID为 ' . $data['id'] . ' 的报修记录'
                ]));
                return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
            }
            // 执行删除操作
            $deleteStmt = $this->pdo->prepare("DELETE FROM staffRepair_requests WHERE id = :id");
            $deleteStmt->execute([':id' => $data['id']]);
            // 返回成功响应
            $response->getBody()->write(json_encode([
                'message' => '报修记录删除成功',
                'code' => 200,
                'data' => [
                    'id' => $data['id'],
                    'deleted_record' => $record
                ]
            ]));
            return $response->withHeader('Content-Type', 'application/json');
        } catch (PDOException $e) {
            error_log('Database error: ' . $e->getMessage());
            $response->getBody()->write(json_encode([
                'error' => '数据库操作失败',
                'detail' => $e->getMessage()
            ]));
            return $response->withStatus(500)->withHeader('Content-Type', 'application/json');
        }
    }
}
