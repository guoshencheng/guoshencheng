CREATE TABLE IF NOT EXISTS `gsc_tip` (
	`id` BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
	`tip_text` VARCHAR(250) NOT NULL COMMENT 'tip的内容',
  `created_at` DATETIME COMMENT '创建时间',
  `updated_at` DATETIME COMMENT '更新时间',
	PRIMARY KEY (`id`), INDEX `tip_text_idx` (`tip_text`)
) ENGINE=INNODB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8
