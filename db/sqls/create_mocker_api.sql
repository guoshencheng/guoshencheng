CREATE TABLE IF NOT EXISTS `gsc_mock_api` (
	`id` BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
	`api_method` TINYINT(8) NOT NULL COMMENT '请求类型',
	`api_path` VARCHAR(200) UNIQUE NOT NULL COMMENT '请求的路径',
	`api_describe` VARCHAR(200) DEFAULT '' COMMENT '请求描述',
	`project_id` BIGINT(20) COMMENT '所属的项目id',
  `created_at` DATETIME COMMENT '创建时间',
  `updated_at` DATETIME COMMENT '更新时间',
	`template` LONGTEXT NOT NULL COMMENT 'mock.js的template',
	PRIMARY KEY (`id`), INDEX `idx_project_id` (`project_id`)
) ENGINE=INNODB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8
