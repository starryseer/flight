CREATE TABLE `client` (
  `user_id` bigint(20) unsigned NOT NULL COMMENT '登录服务器的userID',
  `login_account` varchar(128) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '登录名',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP  COMMENT '创建时间',
  `create_ip` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '创建ip',
  `create_channel` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '帐号渠道ID',
  `last_time` datetime DEFAULT CURRENT_TIMESTAMP  COMMENT '最后登录时间',
  `last_ip` varchar(20) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '最后登录IP',
  `count_login` int(11) NOT NULL DEFAULT '0' COMMENT '登录次数',
  `nickname` varchar(50) COLLATE utf8_unicode_ci DEFAULT NULL COMMENT '游戏昵称',
  `status` tinyint(3) unsigned NOT NULL DEFAULT '100' COMMENT '登录状态 100=可登 10=禁用',
  PRIMARY KEY (`user_id`),
  KEY `create_time` (`create_time`),
  KEY `last_time` (`last_time`),
  KEY `status` (`status`) USING BTREE,
  KEY `nickname` (`nickname`)
) ENGINE=INNODB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='用户表';

CREATE TABLE `client_ol` (
  `client_id` bigint(10) unsigned NOT NULL,
  `ip` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `last_time` datetime DEFAULT CURRENT_TIMESTAMP  NOT NULL,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP  NOT NULL,
  `token` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`client_id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='在线用户表';

CREATE TABLE `client_attr` (
  `client_id` bigint(20) unsigned NOT NULL COMMENT '玩家ID',
  `gold` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '金币',
  `diamond` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '钻石',
  `fatigue` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '疲劳',
  `mood` int(10) NOT NULL DEFAULT '0' COMMENT '心情',
  `last_time` datetime DEFAULT CURRENT_TIMESTAMP  NOT NULL,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP  NOT NULL,
  PRIMARY KEY (`client_id`),
  KEY `last_time` (`last_time`)
) ENGINE=INNODB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='玩家属性表';

CREATE TABLE `fatigue` (
  `client_id` bigint(20) unsigned NOT NULL,
  `nature_time` int(10) unsigned NOT NULL DEFAULT '0',
  `buy_day` int(10) unsigned NOT NULL DEFAULT '0',
  `buy_count` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`client_id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

CREATE TABLE `item_0` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `client_id` bigint(20) unsigned NOT NULL COMMENT '玩家ID',
  `item_id` int(10) unsigned NOT NULL COMMENT '物品ID',
  `item_type` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT '道具类型',
  `num` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '数量',
  `times` tinyint(4) unsigned NOT NULL DEFAULT '0' COMMENT '使用次数',
  `stack` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0=不可重复 1=可重复',
  `expire` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0=无限期 1=有限期',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP  NOT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP  NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `item_id` (`client_id`,`item_id`) USING BTREE,
  KEY `expire` (`client_id`,`expire`) USING BTREE,
  KEY `create_time` (`create_time`) USING BTREE
) ENGINE=INNODB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='道具表';

CREATE TABLE `item_1` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `client_id` bigint(20) unsigned NOT NULL COMMENT '玩家ID',
  `item_id` int(10) unsigned NOT NULL COMMENT '物品ID',
  `item_type` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT '道具类型',
  `num` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '数量',
  `times` tinyint(4) unsigned NOT NULL DEFAULT '0' COMMENT '使用次数',
  `stack` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0=不可重复 1=可重复',
  `expire` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0=无限期 1=有限期',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP  NOT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP  NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `item_id` (`client_id`,`item_id`) USING BTREE,
  KEY `expire` (`client_id`,`expire`) USING BTREE,
  KEY `create_time` (`create_time`) USING BTREE
) ENGINE=INNODB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='道具表';

CREATE TABLE `item_2` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `client_id` bigint(20) unsigned NOT NULL COMMENT '玩家ID',
  `item_id` int(10) unsigned NOT NULL COMMENT '物品ID',
  `item_type` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT '道具类型',
  `num` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '数量',
  `times` tinyint(4) unsigned NOT NULL DEFAULT '0' COMMENT '使用次数',
  `stack` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0=不可重复 1=可重复',
  `expire` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0=无限期 1=有限期',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP  NOT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP  NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `item_id` (`client_id`,`item_id`) USING BTREE,
  KEY `expire` (`client_id`,`expire`) USING BTREE,
  KEY `create_time` (`create_time`) USING BTREE
) ENGINE=INNODB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='道具表';

CREATE TABLE `item_3` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `client_id` bigint(20) unsigned NOT NULL COMMENT '玩家ID',
  `item_id` int(10) unsigned NOT NULL COMMENT '物品ID',
  `item_type` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT '道具类型',
  `num` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '数量',
  `times` tinyint(4) unsigned NOT NULL DEFAULT '0' COMMENT '使用次数',
  `stack` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0=不可重复 1=可重复',
  `expire` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0=无限期 1=有限期',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP  NOT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP  NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `item_id` (`client_id`,`item_id`) USING BTREE,
  KEY `expire` (`client_id`,`expire`) USING BTREE,
  KEY `create_time` (`create_time`) USING BTREE
) ENGINE=INNODB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='道具表';

CREATE TABLE `item_4` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `client_id` bigint(20) unsigned NOT NULL COMMENT '玩家ID',
  `item_id` int(10) unsigned NOT NULL COMMENT '物品ID',
  `item_type` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT '道具类型',
  `num` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '数量',
  `times` tinyint(4) unsigned NOT NULL DEFAULT '0' COMMENT '使用次数',
  `stack` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0=不可重复 1=可重复',
  `expire` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0=无限期 1=有限期',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP  NOT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP  NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `item_id` (`client_id`,`item_id`) USING BTREE,
  KEY `expire` (`client_id`,`expire`) USING BTREE,
  KEY `create_time` (`create_time`) USING BTREE
) ENGINE=INNODB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='道具表';

CREATE TABLE `item_5` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `client_id` bigint(20) unsigned NOT NULL COMMENT '玩家ID',
  `item_id` int(10) unsigned NOT NULL COMMENT '物品ID',
  `item_type` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT '道具类型',
  `num` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '数量',
  `times` tinyint(4) unsigned NOT NULL DEFAULT '0' COMMENT '使用次数',
  `stack` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0=不可重复 1=可重复',
  `expire` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0=无限期 1=有限期',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP  NOT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP  NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `item_id` (`client_id`,`item_id`) USING BTREE,
  KEY `expire` (`client_id`,`expire`) USING BTREE,
  KEY `create_time` (`create_time`) USING BTREE
) ENGINE=INNODB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='道具表';

CREATE TABLE `item_6` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `client_id` bigint(20) unsigned NOT NULL COMMENT '玩家ID',
  `item_id` int(10) unsigned NOT NULL COMMENT '物品ID',
  `item_type` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT '道具类型',
  `num` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '数量',
  `times` tinyint(4) unsigned NOT NULL DEFAULT '0' COMMENT '使用次数',
  `stack` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0=不可重复 1=可重复',
  `expire` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0=无限期 1=有限期',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP  NOT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP  NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `item_id` (`client_id`,`item_id`) USING BTREE,
  KEY `expire` (`client_id`,`expire`) USING BTREE,
  KEY `create_time` (`create_time`) USING BTREE
) ENGINE=INNODB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='道具表';

CREATE TABLE `item_7` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `client_id` bigint(20) unsigned NOT NULL COMMENT '玩家ID',
  `item_id` int(10) unsigned NOT NULL COMMENT '物品ID',
  `item_type` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT '道具类型',
  `num` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '数量',
  `times` tinyint(4) unsigned NOT NULL DEFAULT '0' COMMENT '使用次数',
  `stack` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0=不可重复 1=可重复',
  `expire` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0=无限期 1=有限期',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP  NOT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP  NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `item_id` (`client_id`,`item_id`) USING BTREE,
  KEY `expire` (`client_id`,`expire`) USING BTREE,
  KEY `create_time` (`create_time`) USING BTREE
) ENGINE=INNODB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='道具表';

CREATE TABLE `item_8` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `client_id` bigint(20) unsigned NOT NULL COMMENT '玩家ID',
  `item_id` int(10) unsigned NOT NULL COMMENT '物品ID',
  `item_type` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT '道具类型',
  `num` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '数量',
  `times` tinyint(4) unsigned NOT NULL DEFAULT '0' COMMENT '使用次数',
  `stack` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0=不可重复 1=可重复',
  `expire` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0=无限期 1=有限期',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP  NOT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP  NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `item_id` (`client_id`,`item_id`) USING BTREE,
  KEY `expire` (`client_id`,`expire`) USING BTREE,
  KEY `create_time` (`create_time`) USING BTREE
) ENGINE=INNODB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='道具表';

CREATE TABLE `item_9` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `client_id` bigint(20) unsigned NOT NULL COMMENT '玩家ID',
  `item_id` int(10) unsigned NOT NULL COMMENT '物品ID',
  `item_type` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT '道具类型',
  `num` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '数量',
  `times` tinyint(4) unsigned NOT NULL DEFAULT '0' COMMENT '使用次数',
  `stack` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0=不可重复 1=可重复',
  `expire` tinyint(4) NOT NULL DEFAULT '0' COMMENT '0=无限期 1=有限期',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP  NOT NULL COMMENT '创建时间',
  `update_time` datetime DEFAULT CURRENT_TIMESTAMP  NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`),
  KEY `item_id` (`client_id`,`item_id`) USING BTREE,
  KEY `expire` (`client_id`,`expire`) USING BTREE,
  KEY `create_time` (`create_time`) USING BTREE
) ENGINE=INNODB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='道具表';

CREATE TABLE `bag` (
  `client_id` bigint(20) unsigned NOT NULL COMMENT '玩家ID',
  `max_set` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '最大位置数',
  `last_time` datetime DEFAULT CURRENT_TIMESTAMP  NOT NULL COMMENT '更新时间',
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP  NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`client_id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='背包属性表';

CREATE TABLE `draw_bottom` (
  `client_id` bigint(10) unsigned NOT NULL,
  `drawBasic` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '基础池抽卡次数',
  `last_time` datetime DEFAULT CURRENT_TIMESTAMP  NOT NULL,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP  NOT NULL,
  PRIMARY KEY (`client_id`)
) ENGINE=INNODB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='卡池次数表';

CREATE TABLE `world_info` (
  `date_str` varchar(255) COLLATE utf8_unicode_ci NOT NULL COMMENT '日期',
  `mood` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '今日世界心情',
  `last_time` datetime DEFAULT CURRENT_TIMESTAMP  NOT NULL,
  `create_time` datetime DEFAULT CURRENT_TIMESTAMP  NOT NULL,
  PRIMARY KEY (`date_str`)
) ENGINE=INNODB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci COMMENT='世界信息';

