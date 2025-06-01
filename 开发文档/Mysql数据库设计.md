# 后端数据库系统设计源码
```aiignore
## 用户数据库（user）用于存储用户的核心信息
CREATE TABLE `user` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '用户唯一ID',
  `username` VARCHAR(50) NOT NULL COMMENT '用户名（唯一）',
  `email` VARCHAR(100) DEFAULT NULL COMMENT '邮箱（唯一）',
  `phone` VARCHAR(20) DEFAULT NULL COMMENT '手机号（唯一）',
  `avatar` VARCHAR(255) DEFAULT NULL COMMENT '头像URL',
  `status` TINYINT(1) NOT NULL DEFAULT 1 COMMENT '状态（1-正常，0-禁用）',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_username` (`username`),
  UNIQUE KEY `uniq_email` (`email`),
  UNIQUE KEY `uniq_phone` (`phone`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户基础信息表';
```
```aiignore
## 用户认证表（user_auth）用于存储用户登录凭证（如密码、第三方登录信息
CREATE TABLE `user_auth` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NOT NULL COMMENT '关联用户ID',
  `identity_type` VARCHAR(20) NOT NULL COMMENT '认证类型（password/weixin/qq/apple）',
  `identifier` VARCHAR(255) NOT NULL COMMENT '唯一标识（如邮箱、微信openid）',
  `credential` VARCHAR(255) NOT NULL COMMENT '凭证（如密码哈希值、第三方token）',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_identity` (`identity_type`, `identifier`),
  CONSTRAINT `fk_user_auth_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户认证表';
```

## 权限表
```aiignore
## 角色定义表（role）`
CREATE TABLE `user_role` (
  `user_id` INT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '权限唯一ID',
  `name` VARCHAR(50) NOT NULL COMMENT '权限名称（唯一）',
  `code` VARCHAR(30) NOT NULL COMMENT '权限代码（唯一，如user:create）',
  `description` VARCHAR(255) DEFAULT NULL COMMENT '权限描述',
  `status` TINYINT(1) NOT NULL DEFAULT 1 COMMENT '状态（1-启用，0-禁用）',
  `created_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_name` (`name`),
  UNIQUE KEY `uniq_code` (`code`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='独立权限表';
```

## 教师认证表
```aiignore
    
```