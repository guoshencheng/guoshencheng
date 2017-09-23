CREATE TABLE IF NOT EXISTS `gsc_mock_project` (
	`id` BIGINT(20) NOT NULL AUTO_INCREMENT COMMENT '主键',
	`project_name` VARCHAR(200) DEFAULT '' NOT NULL COMMENT '应用名称',
	`project_describe` VARCHAR(200) DEFAULT '' COMMENT '应用描述',
	`base_path` VARCHAR(200) DEFAULT '' NOT NULL COMMENT '基础api path,其他所有的path都会拼在这个之后',
	`owner_id` BIGINT(20) COMMENT '所属者id',
	PRIMARY KEY (`id`), INDEX `idx_owner_id` (`owner_id`)
) ENGINE=INNODB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8
