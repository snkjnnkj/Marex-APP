export const CommunicationProject = [
    {
        name: 'user',
        definition: `(
              id int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '用户唯一ID',
              username varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '用户名（唯一）',
              email varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '邮箱（唯一）',
              phone varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '手机号（唯一）',
              avatar varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '头像URL',
              status tinyint(1) NOT NULL DEFAULT 1 COMMENT '状态（1-正常，0-禁用）',
              user_role int(11) NOT NULL COMMENT '权限（1-普通用户，2-工作人员，3-普通管理员，4-超级管理（拥有所有权限））',
              created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
              updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
              sex varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '性别（唯一）',
              teacher varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL COMMENT '教师标识',
              PRIMARY KEY (id) USING BTREE,
              UNIQUE INDEX uniq_username(username) USING BTREE,
              UNIQUE INDEX uniq_email(email) USING BTREE,
              UNIQUE INDEX uniq_phone(phone) USING BTREE
        )ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '用户基础信息表' ROW_FORMAT = Dynamic;`
    },
    {
        name: 'user_auth',
        definition: `(
            id INT UNSIGNED NOT NULL AUTO_INCREMENT,
            user_id INT UNSIGNED NOT NULL COMMENT '关联用户ID',
            identity_type VARCHAR(20) NOT NULL COMMENT '认证类型（password/weixin/qq/apple）',
            identifier VARCHAR(255) NOT NULL COMMENT '唯一标识（如邮箱、微信openid）',
            credential VARCHAR(255) NOT NULL COMMENT '凭证（如密码哈希值、第三方token）',
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
            PRIMARY KEY (id),
            UNIQUE KEY uniq_identity (identity_type, identifier),
            CONSTRAINT fk_user_auth_user FOREIGN KEY (user_id) REFERENCES user (id) ON DELETE CASCADE
        )ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户认证表';`
    },
    {
        name: 'teachernuber',
        definition: `(
            id int(11) NOT NULL COMMENT 'id唯一',
            name varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '教师的姓名',
            nuber varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NULL DEFAULT NULL COMMENT '教师的员工工号',
            createTime datetime NULL DEFAULT NULL COMMENT '创建该数据的时间',
            unloadTime datetime NULL DEFAULT NULL COMMENT '更新该数据的时间',
            PRIMARY KEY (id) USING BTREE
        )ENGINE = MyISAM CHARACTER SET = utf8 COLLATE = utf8_unicode_ci ROW_FORMAT = Dynamic;`
    },
    {
        name: 'repair_requests',
        definition: ` (
            id int(10) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '主键ID',
            user_id int(10) UNSIGNED NOT NULL COMMENT '用户ID',
            reporter_name varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '联系人姓名',
            reporter_contact varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '联系方式（电话、微信、邮箱等）',
            issue_description varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL COMMENT '问题描述',
            photo_urls json NULL COMMENT '照片路径（JSON数组或逗号分隔）',
            serviceman json NULL COMMENT '维修人员信息（JSON对象）',
            status varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT 'pending' COMMENT '处理状态(0表示已经前往，1表示正在维修，2表示维修完成)',
            rejection_notice text NULL COMMENT '驳回通知',
            created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '提交时间',
            updated_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
            PRIMARY KEY (id) USING BTREE
        )ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci COMMENT = '报修表' ROW_FORMAT = Dynamic;`
    },
    {
        name: 'staffRepair_requests',
        definition: `( 
            id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY COMMENT '唯一标识ID',
            nickname VARCHAR(50) NOT NULL COMMENT '用户昵称', 
            email VARCHAR(100) NOT NULL COMMENT '邮箱账号',
            location VARCHAR(200) NOT NULL DEFAULT '' COMMENT '报修地点', 
            problem_description TEXT NOT NULL COMMENT '问题描述', 
            problem_images VARCHAR(500) NOT NULL DEFAULT '' COMMENT '问题图片路径/URL（多图用分号分隔）',
            reporter_name VARCHAR(50) NOT NULL COMMENT '报修人姓名', 
            reporter_phone VARCHAR(20) NOT NULL COMMENT '报修手机号',
            repair_time DATETIME NOT NULL COMMENT '报修时间（问题发生时间）', 
            created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '数据创建时间',
            status varchar(20) DEFAULT '待处理' COMMENT '处理状态（待处理/处理中/已完成/已取消）',
            INDEX idx_repair_time (repair_time),
            INDEX idx_created_at (created_at)
        )ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='设备报修信息表';`
    }
]