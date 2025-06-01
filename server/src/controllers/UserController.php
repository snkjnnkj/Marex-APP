<?php
namespace App\Controllers;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use PDO;
use PDOException;
class UserController
{
    private $pdo;
    private $uploadDirectory;
    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }
    // 获取所有用户
    public function getAllUsers(Request $request, Response $response)
    {
        try {
            $stmt = $this->pdo->query("SELECT * FROM user");
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $response->getBody()->write(json_encode($users));
            return $response->withHeader('Content-Type', 'application/json');
        } catch (PDOException $e) {
            $response->getBody()->write(json_encode(['error' => $e->getMessage()]));
            return $response->withStatus(500)->withHeader('Content-Type', 'application/json');
        }
    }
    // 根据 ID 获取单个用户
    public function getUserById(Request $request, Response $response)
    {
        try {
            $id = $request->getAttribute('id');
            if (!$id) {
                $response->getBody()->write(json_encode(['error' => '缺少 ID 参数']));
                return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
            }
            $stmt = $this->pdo->prepare("SELECT * FROM user WHERE id = :id");
            $stmt->execute(['id' => $id]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            if (!$user) {
                $response->getBody()->write(json_encode(['error' => '用户不存在']));
                return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
            }
            $response->getBody()->write(json_encode($user));
            return $response->withHeader('Content-Type', 'application/json');
        } catch (PDOException $e) {
            $response->getBody()->write(json_encode(['error' => '数据库查询失败']));
            return $response->withStatus(500)->withHeader('Content-Type', 'application/json');
        }
    }
    // 根据id查询某一个的值，用于账号封禁功能，权限变更
    // 根据 ID 获取单个用户
    public function getUserByIdStatus(Request $request, Response $response)
    {
        try {
            $id = $request->getAttribute('id');
            if (!$id) {
                $response->getBody()->write(json_encode(['error' => '缺少 ID 参数']));
                return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
            }
            $stmt = $this->pdo->prepare("SELECT status, user_role FROM user WHERE id = :id");
            $stmt->execute(['id' => $id]);
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            if (!$user) {
                $response->getBody()->write(json_encode(['error' => '用户不存在']));
                return $response->withStatus(404)->withHeader('Content-Type', 'application/json');
            }
            $response->getBody()->write(json_encode($user));
            return $response->withHeader('Content-Type', 'application/json');
        } catch (PDOException $e) {
            $response->getBody()->write(json_encode(['error' => '数据库查询失败']));
            return $response->withStatus(500)->withHeader('Content-Type', 'application/json');
        }
    }
    // 根据 权限来获取工作人员的用户数据
    public function getStaff(Request $request, Response $response)
    {
        try {
            $id = $request->getAttribute('id');
            if (!$id) {
                $response->getBody()->write(json_encode(['error' => '缺少角色参数']));
                return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
            }
            // 修改SQL查询，查询所有具有特定 user_role 的用户
            $stmt = $this->pdo->prepare("SELECT * FROM user WHERE user_role = :user_role");
            $stmt->execute(['user_role' => $id]);
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC); // 使用 fetchAll 获取所有匹配的用户
            $response->getBody()->write(json_encode($users));
            return $response->withHeader('Content-Type', 'application/json');
        } catch (PDOException $e) {
            $response->getBody()->write(json_encode(['error' => '数据库查询失败']));
            return $response->withStatus(500)->withHeader('Content-Type', 'application/json');
        }
    }
    //根据账号加权限来查询
    public function getStaffByEmail(Request $request, Response $response)
    {
        try {
            // 获取参数并记录日志
            $id = $request->getAttribute('id');
            $email = $request->getAttribute('email');
            error_log("Received parameters - id: $id, email: $email");

            // 验证参数
            if (!$id || !$email) {
                $response->getBody()->write(json_encode([
                    'error' => '缺少必要参数',
                    'message' => '需要提供角色ID和邮箱'
                ]));
                return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
            }

            // SQL查询（使用预处理语句和显式类型绑定）
            $stmt = $this->pdo->prepare("
                SELECT * FROM user 
                WHERE user_role = :user_role 
                AND email = :email
            ");

            $stmt->bindValue(':user_role', $id, PDO::PARAM_INT);
            $stmt->bindValue(':email', $email, PDO::PARAM_STR);
            $stmt->execute();

            // 获取查询结果
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
            error_log("Query results: " . json_encode($users));

            // 返回查询结果（添加更多调试信息）
            $response->getBody()->write(json_encode([
                'message' => empty($users) ? '未找到匹配记录' : '查询成功',
                'data' => $users,
            ]));

            return $response->withHeader('Content-Type', 'application/json');
        } catch (PDOException $e) {
            error_log("Database error: " . $e->getMessage());
            $response->getBody()->write(json_encode([
                'error' => '数据库查询失败',
                'message' => $e->getMessage()
            ]));
            return $response->withStatus(500)->withHeader('Content-Type', 'application/json');
        }
    }
    //根据当前账号的权限加真实姓名来查找工作人员（必须要管理员权限才能查询）
    public function getStaffByReal_name(Request $request, Response $response)
    {
        try {
            // 获取参数并记录日志
            $id = $request->getAttribute('id');
            $Real_name = $request->getAttribute('Real_name');
            error_log("Received parameters - id: $id, Real_name: $Real_name");
            // 验证参数
            if (!$id || !$Real_name) {
                $response->getBody()->write(json_encode([
                    'error' => '缺少必要参数',
                    'message' => '需要提供角色ID和邮箱'
                ]));
                return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
            }

            // SQL查询（使用预处理语句和显式类型绑定）
            $stmt = $this->pdo->prepare("
                SELECT * FROM user 
                WHERE user_role = :user_role 
                AND real_name = :real_name
            ");

            $stmt->bindValue(':user_role', $id, PDO::PARAM_INT);
            $stmt->bindValue(':real_name', $Real_name, PDO::PARAM_STR);
            $stmt->execute();

            // 获取查询结果
            $users = $stmt->fetchAll(PDO::FETCH_ASSOC);
            error_log("Query results: " . json_encode($users));

            // 返回查询结果（添加更多调试信息）
            $response->getBody()->write(json_encode([
                'message' => empty($users) ? '未找到匹配记录' : '查询成功',
                'data' => $users,
            ]));

            return $response->withHeader('Content-Type', 'application/json');
        } catch (PDOException $e) {
            error_log("Database error: " . $e->getMessage());
            $response->getBody()->write(json_encode([
                'error' => '数据库查询失败',
                'message' => $e->getMessage()
            ]));
            return $response->withStatus(500)->withHeader('Content-Type', 'application/json');
        }
    }
}
