<?php
namespace App\Controllers;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use PDO;
use PDOException;
use Exception;

class uploading
{
    private $pdo;
    private $uploadDirectory;
    private $staticState;
    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
        // 设置上传目录（建议放在 public 目录外）
        $this->uploadDirectory = __DIR__ . '/../../uploads';
        // 设置静态目录
        $this->staticState = __DIR__ . '/../../public';
        // 确保上传目录存在
        if (!file_exists($this->uploadDirectory)) {
            mkdir($this->uploadDirectory, 0755, true);
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
    // 读取静态图片目录的列表
    public function getStaticState(Request $request, Response $response)
    {
        try {
            // 获取上传目录中的所有文件
            $files = array_diff(scandir($this->staticState), ['.', '..']);
            $images = array_values($files); // 返回文件名数组
            $response->getBody()->write(json_encode($images));
            return $response->withHeader('Content-Type', 'application/json');
        } catch (Exception $e) {
            $response->getBody()->write(json_encode(['error' => '无法获取文件列表']));
            return $response->withStatus(500)->withHeader('Content-Type', 'application/json');
        }
    }
    // 上传多张图片
    public function uploadMultipleImages(Request $request, Response $response)
    {
        try {
            // 确保上传目录存在
            if (!file_exists($this->uploadDirectory)) {
                mkdir($this->uploadDirectory, 0755, true);
            }
            $uploadedFiles = $request->getUploadedFiles();
            // 检查文件字段是否存在
            if (!isset($uploadedFiles['images'])) {
                return $response->withJson(['error' => '请使用「images」作为文件字段名'], 400);
            }
            $images = $uploadedFiles['images'];
            $images = is_array($images) ? $images : [$images];
            $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
            $uploadedFilenames = [];
            $errors = [];
            foreach ($images as $image) {
                // 检查上传错误
                if ($image->getError() !== UPLOAD_ERR_OK) {
                    $errors[] = sprintf(
                        '文件 %s 上传失败 (错误代码: %d)',
                        $image->getClientFilename(),
                        $image->getError()
                    );
                    continue;
                }
                // 验证文件类型（通过扩展名）
                $allowedExtensions = ['jpg', 'jpeg', 'png', 'gif'];
                $extension = strtolower(pathinfo($image->getClientFilename(), PATHINFO_EXTENSION));
                if (!in_array($extension, $allowedExtensions)) {
                    $errors[] = sprintf(
                        '文件 %s 类型不允许 (%s)',
                        $image->getClientFilename(),
                        $extension
                    );
                    continue;
                }
                // 生成安全文件名
                $filename = sprintf(
                    '%s.%s',
                    bin2hex(random_bytes(8)), // 更安全的随机名
                    preg_replace('/[^a-z0-9]/i', '', $extension) // 过滤特殊字符
                );
                try {
                    $image->moveTo($this->uploadDirectory . DIRECTORY_SEPARATOR . $filename);
                    $uploadedFilenames[] = $filename;
                } catch (Exception $e) {
                    $errors[] = sprintf(
                        '文件 %s 保存失败: %s',
                        $image->getClientFilename(),
                        $e->getMessage()
                    );
                }
            }
            // 处理结果
            if (empty($uploadedFilenames)) {
                $response->getBody()->write(json_encode([
                    'error' => '所有文件上传失败',
                    'details' => $errors
                ]));
                return $response->withStatus(400)->withHeader('Content-Type', 'application/json');
            }

            $response->getBody()->write(json_encode([
                'message' => '文件上传成功',
                'saved_files' => $uploadedFilenames,
                'errors' => $errors
            ]));
            return $response->withHeader('Content-Type', 'application/json');
        } catch (Exception $e) {
            error_log('Upload Error: ' . $e->getMessage()); // 记录日志
            return $response->withJson([
                'error' => '服务器处理请求时发生错误'
            ], 500);
        }
    }
}
