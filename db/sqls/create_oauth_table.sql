CREATE TABLE IF NOT EXISTS `gsc_oauth` (
 `id` BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
	`auth_id` BIGINT(20) NOT NULL COMMENT '第三方登陆的id',
	`auth_type` VARCHAR(200) NOT NULL COMMENT '登陆类型',
	`access_token` VARCHAR(200) NOT NULL COMMENT '第三方登陆access_token',
	`refresh_token` VARCHAR(200) COMMENT '刷新第三方access_token的凭证',
	`user_id` BIGINT COMMENT '绑定的用户',
  `created_at` DATETIME COMMENT '创建时间',
  `updated_at` DATETIME COMMENT '更新时间',
	PRIMARY KEY (`id`)
) ENGINE=INNODB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
