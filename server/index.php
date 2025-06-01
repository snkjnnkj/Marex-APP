<?php
use App\Middleware\CorsMiddleware;
use Slim\Factory\AppFactory;
require __DIR__ . '/vendor/autoload.php';
// 添加PSR-4自动加载（在初始化应用之前）
spl_autoload_register(function ($class) {
    $prefix = 'App\\';
    $base_dir = __DIR__ . '/src/';
    $len = strlen($prefix);
    if (strncmp($prefix, $class, $len) !== 0) {
        return;
    }
    $relative_class = substr($class, $len);
    $file = $base_dir . str_replace('\\', '/', $relative_class) . '.php';

    if (file_exists($file)) {
        require $file;
    }
});
// 加载数据库配置
$dbConfigPath = __DIR__ . '/config/database.php';
if (!file_exists($dbConfigPath)) {
    die("数据库配置文件缺失: config/database.php");
}
$dbConfig = require $dbConfigPath;
// 初始化应用
$app = AppFactory::create();
// 连接数据库
try {
    $dsn = "{$dbConfig['driver']}:host={$dbConfig['host']};" .
        "dbname={$dbConfig['database']};" .
        "charset={$dbConfig['charset']}";
    $pdo = new PDO(
        $dsn,
        $dbConfig['username'],
        $dbConfig['password'],
        $dbConfig['options']
    );
} catch (PDOException $e) {
    die("数据库连接失败: " . $e->getMessage());
}
// 配置 CORS 中间件
$app->add(new CorsMiddleware());
// 显式处理 OPTIONS 请求
$app->options('/{routes:.+}', function ($request, $response) {
    return $response
        ->withHeader('Access-Control-Allow-Origin', '*')
        ->withHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
        ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
});
// 加载路由配置
$apiRoutes = require __DIR__ . '/src/router/api.php';
$apiRoutes($app, $pdo);
// 启动应用
$app->run();
