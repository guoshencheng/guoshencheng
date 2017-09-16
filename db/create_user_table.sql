CREATE TABLE IF NOT EXISTS `gsc_user` (
  `id` BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
  `nickname` VARCHAR(200) NOT NULL COMMENT '登陆类型',
  `email` VARCHAR(200) NOT NULL COMMENT '第三方登陆access_token',
  `password` VARCHAR(200) COMMENT '刷新第三方access_token的凭证',
  `created_at` DATETIME COMMENT '创建时间',
  `updated_at` DATETIME COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=INNODB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
