<?php

namespace App\Controllers;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use PDO;
use PDOException;

class Repairs
{
    private $pdo;
    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }
    // 添加报修记录
    public function addRepairRequest(Request $request, Response $response)
    {
        try {
            // 尝试先获取解析后的数据
            $data = $request->getParsedBody();
            // 如果为空，可能需要手动解析 JSON 数据
            if (empty($data)) {
                $body = (string) $request->getBody()->getContents();
                $data = json_decode($body, true);
            }
            // 如果依然为空，返回错误提示
            if (empty($data)) {
                $response->getBody()->write(json_encode(['error' => '请求数据为空或格式不正确']));
                return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
            }
            // 处理 photo_urls 字段
            $photoUrls = isset($data['photo_urls']) ? $data['photo_urls'] : null;
            // 设置 location 的默认值
            $location = isset($data['location']) ? $data['location'] : '未指定位置';
            // 插入数据库
            $stmt = $this->pdo->prepare("
                INSERT INTO repair_requests 
                    (user_id, reporter_name, reporter_contact, location, issue_description, photo_urls, status)
                VALUES 
                    (:user_id, :reporter_name, :reporter_contact, :location, :issue_description, :photo_urls, :status)
            ");

            $stmt->execute([
                'user_id' => $data['user_id'],
                'reporter_name' => $data['reporter_name'],
                'reporter_contact' => $data['reporter_contact'],
                'location' => $location,  // 使用设置的默认值
                'issue_description' => $data['issue_description'],
                'photo_urls' => $data['photo_urls'],
                'status' => $data['status'] ?? '待处理', // 默认状态为 '待处理'
            ]);
            // 获取刚刚插入的 id
            $id = $this->pdo->lastInsertId();
            // 查询刚刚添加的数据
            $stmtSelect = $this->pdo->prepare("SELECT * FROM repair_requests WHERE id = :id");
            $stmtSelect->execute(['id' => $id]);
            $insertedData = $stmtSelect->fetch(PDO::FETCH_ASSOC);
            // 返回成功响应及添加的数据
            $response->getBody()->write(json_encode([
                'message' => '报修信息添加成功',
                'data' => $insertedData,
            ]));
            return $response->withStatus(201)->withHeader('Content-Type', 'application/json');
        } catch (PDOException $e) {
            $errorMessage = $e->getMessage();
            $errorResponse = ['error' => '数据库操作失败'];
            if (strpos($errorMessage, 'Data too long') !== false) {
                $errorResponse['detail'] = '某个字段值过长';
            }
            $response->getBody()->write(json_encode($errorResponse));
            return $response->withStatus(500)->withHeader('Content-Type', 'application/json');
        }
    }
    //根据用户id查询报修记录
    public function getRepairsByUser_id(Request $request, Response $response)
    {
        try {
            $user_id = $request->getAttribute('user_id');
            if (!$user_id) {
                $response->getBody()->write(json_encode(['error' => '缺少 ID 参数']));
                return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
            }
            $stmt = $this->pdo->prepare("SELECT * FROM repair_requests WHERE user_id = :user_id");
            $stmt->execute(['user_id' => $user_id]);
            $repairs = $stmt->fetchAll(PDO::FETCH_ASSOC);
            // 返回所有数据（即使为空数组）
            $response->getBody()->write(json_encode($repairs));
            return $response->withHeader('Content-Type', 'application/json');
        } catch (PDOException $e) {
            $response->getBody()->write(json_encode(['error' => '数据库查询失败']));
            return $response->withStatus(500)->withHeader('Content-Type', 'application/json');
        }
    }
    //查询所有报修记录
    public function getRepairs(Request $request, Response $response)
    {
        try {
            $stmt = $this->pdo->query("SELECT * FROM repair_requests");
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $response->getBody()->write(json_encode($users));
            return $response->withHeader('Content-Type', 'application/json');
        } catch (PDOException $e) {
            $response->getBody()->write(json_encode(['error' => $e->getMessage()]));
            return $response->withStatus(500)->withHeader('Content-Type', 'application/json');
        }
    }

    // 更新当前报修记录的维修状态
    public function updateRepairStatus(Request $request, Response $response)
    {
        try {
            // 获取请求体数据并解析 JSON
            $body = (string)$request->getBody();
            $data = json_decode($body, true);
            // 更新状态
            $stmt = $this->pdo->prepare("
                UPDATE repair_requests 
                SET status = :status 
                WHERE id = :id
            ");
            $stmt->execute([
                ':status' => $data['status'],
                ':id' => $data['repair_id']
            ]);
            // 返回成功响应
            $response->getBody()->write(json_encode([
                'message' => '状态更新成功',
                'code' => 200
            ]));
            return $response->withHeader('Content-Type', 'application/json');
        } catch (PDOException $e) {
            $response->getBody()->write(json_encode([
                'error' => '数据库操作失败',
                'detail' => $e->getMessage()
            ]));
            return $response->withStatus(500)->withHeader('Content-Type', 'application/json');
        }
    }
    // 更新当前报修记录的维修人员信息
    public function updateRepairServiceman(Request $request, Response $response)
    {
        try {
            // 获取请求体数据并解析 JSON
            $body = (string)$request->getBody();
            $data = json_decode($body, true);
            // 更新状态
            $stmt = $this->pdo->prepare("
                UPDATE repair_requests 
                SET serviceman = :serviceman 
                WHERE id = :id
            ");
            $stmt->execute([
                ':serviceman' => $data['serviceman'],
                ':id' => $data['repair_id']
            ]);
            // 返回成功响应
            $response->getBody()->write(json_encode([
                'message' => '状态更新成功',
                'code' => 200,
            ]));
            return $response->withHeader('Content-Type', 'application/json');
        } catch (PDOException $e) {
            $response->getBody()->write(json_encode([
                'error' => '数据库操作失败',
                'detail' => $e->getMessage()
            ]));
            return $response->withStatus(500)->withHeader('Content-Type', 'application/json');
        }
    }
    // 驳回当前的数据
    public function rejection_notice(Request $request, Response $response)
    {
        try {
            // 获取请求体数据并解析 JSON
            $body = (string)$request->getBody();
            $dataArray = json_decode($body, true);

            // 添加调试日志
            error_log('Received data: ' . print_r($dataArray, true));

            // 验证数据格式
            if (!is_array($dataArray) || empty($dataArray)) {
                $response->getBody()->write(json_encode([
                    'error' => '无效的数据格式',
                    'detail' => '请提供有效的数组数据'
                ]));
                return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
            }

            // 获取第一个对象（因为前端传入的是数组）
            $data = $dataArray[0];

            // 验证必需字段
            if (!isset($data['id']) || !isset($data['rejection_notice'])) {
                $response->getBody()->write(json_encode([
                    'error' => '缺少必要参数',
                    'detail' => '需要提供 id 和 rejection_notice'
                ]));
                return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
            }

            // 更新驳回通知
            $stmt = $this->pdo->prepare("
                UPDATE repair_requests 
                SET rejection_notice = :rejection_notice,
                    status = '已驳回'  -- 同时更新状态为已驳回
                WHERE id = :id
            ");

            $stmt->execute([
                ':rejection_notice' => $data['rejection_notice'],
                ':id' => $data['id']
            ]);

            // 检查是否更新成功
            if ($stmt->rowCount() === 0) {
                $response->getBody()->write(json_encode([
                    'error' => '更新失败',
                    'detail' => '未找到对应的报修记录'
                ]));
                return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
            }

            // 返回成功响应
            $response->getBody()->write(json_encode([
                'message' => '驳回信息更新成功',
                'code' => 200,
                'data' => [
                    'id' => $data['id'],
                    'rejection_notice' => $data['rejection_notice']
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
    // 根据ID删除报修记录
    public function deleteRepairById(Request $request, Response $response)
    {
        try {
            // 获取请求体数据并解析 JSON
            $body = (string)$request->getBody();
            $data = json_decode($body, true);
            // 先查询要删除的记录
            $selectStmt = $this->pdo->prepare("SELECT * FROM repair_requests WHERE id = :id");
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
            $deleteStmt = $this->pdo->prepare("DELETE FROM repair_requests WHERE id = :id");
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
