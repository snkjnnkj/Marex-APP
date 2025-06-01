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
        // 设置上传目录（建议放在 public 目录外）
        $this->uploadDirectory = __DIR__ . '/../../uploads';
        // 确保上传目录存在
        if (!file_exists($this->uploadDirectory)) {
            mkdir($this->uploadDirectory, 0755, true);
        }
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
    // 上传图片
    public function uploadImage(Request $request, Response $response)
    {
        try {
            // 获取上传的文件
            $uploadedFiles = $request->getUploadedFiles();
            if (empty($uploadedFiles['image'])) {
                $response->getBody()->write(json_encode(['error' => '没有上传文件']));
                return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
            }
            $image = $uploadedFiles['image'];
            // 验证文件是否上传成功
            if ($image->getError() !== UPLOAD_ERR_OK) {
                $response->getBody()->write(json_encode(['error' => '文件上传失败']));
                return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
            }
            // 验证文件类型（仅允许图片类型）
            $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
            if (!in_array($image->getClientMediaType(), $allowedTypes)) {
                $response->getBody()->write(json_encode(['error' => '不支持的文件类型']));
                return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
            }
            // 生成唯一文件名并保存文件
            $filename = uniqid() . '-' . $image->getClientFilename();
            $filePath = $this->uploadDirectory . DIRECTORY_SEPARATOR . $filename;
            $image->moveTo($filePath);
            // 返回成功响应
            $response->getBody()->write(json_encode(['message' => '文件上传成功', 'filename' => $filename]));
            return $response->withHeader('Content-Type', 'application/json');
        } catch (Exception $e) {
            $response->getBody()->write(json_encode(['error' => '文件上传过程中发生错误']));
            return $response->withStatus(500)->withHeader('Content-Type', 'application/json');
        }
    }
    //读取图片
    public function getUploadedImages(Request $request, Response $response)
    {
        try {
            // 获取上传目录中的所有文件
            $files = array_diff(scandir($this->uploadDirectory), ['.', '..']);
            $images = array_values($files); // 返回文件名数组

            $response->getBody()->write(json_encode($images));
            return $response->withHeader('Content-Type', 'application/json');
        } catch (Exception $e) {
            $response->getBody()->write(json_encode(['error' => '无法获取文件列表']));
            return $response->withStatus(500)->withHeader('Content-Type', 'application/json');
        }
    }
    //删除文件
    public function deleteImage()
    {
        // 设置响应头为 JSON 格式
        header('Content-Type: application/json; charset=utf-8');
        try {
            // 读取并解析 JSON 请求体
            $inputJSON = file_get_contents('php://input');
            $data = json_decode($inputJSON, true);  // 将 JSON 转为关联数组:contentReference[oaicite:4]{index=4}
            if (!isset($data['filename'])) {
                throw new Exception('Missing filename', 400);
            }

            // 防止路径遍历：只保留文件名部分，去除可能的目录成分:contentReference[oaicite:5]{index=5}
            $filename = basename($data['filename']);
            // 构造完整文件路径
            $filePath = rtrim($this->uploadDirectory, '/\\') . DIRECTORY_SEPARATOR . $filename;

            // 检查文件是否存在于上传目录
            if (!file_exists($filePath) || !is_file($filePath)) {
                throw new Exception('File not found', 404);
            }

            // 删除文件
            if (!unlink($filePath)) {
                throw new Exception('Failed to delete file', 500);
            }

            // 返回成功的 JSON 响应
            echo json_encode([
                'status' => 'success',
                'message' => 'File deleted successfully'
            ]);
        } catch (Exception $e) {
            // 出错时返回错误信息及对应的 HTTP 状态码
            http_response_code($e->getCode() ?: 500);
            echo json_encode([
                'status' => 'error',
                'message' => $e->getMessage()
            ]);
        }
    }

}
