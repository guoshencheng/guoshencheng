CREATE TABLE IF NOT EXISTS `gsc_post_tag_map` (
  `id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '主键',
  `post_id` BIGINT NOT NULL COMMENT '文章的主键',
  `post_tag_id` BIGINT NOT NULL COMMENT '文章标签的主键',
  `created_at` DATETIME COMMENT '创建时间',
  `updated_at` DATETIME COMMENT '更新时间',
  PRIMARY KEY (`id`), INDEX `idx_post_id` (`post_id`), INDEX `idx_post_tag_id` (`post_tag_id`)
) ENGINE=INNODB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;
