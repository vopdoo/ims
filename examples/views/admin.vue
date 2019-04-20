<template>
    <div>
        <ImsLayout :menus="nav_menus"></ImsLayout>
    </div>
</template>

<script>
    export default {
        name: "Admin",
        data() {
            return {
                nav_menus: [
                    {
                        "id": 1,
                        "pid": 0,
                        "type": 2,
                        "icon": "md-apps",
                        "name": "系统",
                        "code": "systems",
                        "options": {
                            "name": "systems_nodes",
                            "path": "systems/nodes",
                            "tree_path": "0"
                        },
                        "sort": 0,
                        "status": true,
                        "created_at": "2018-05-26 07:32:54",
                        "updated_at": "2019-03-07 16:09:56",
                        "children": [
                            {
                                "id": 3,
                                "pid": 1,
                                "type": 1,
                                "icon": "ios-code-working",
                                "name": "节点管理",
                                "code": "node",
                                "options": {
                                    "name": "systems_nodes",
                                    "path": "systems/nodes",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2018-05-26 07:32:54",
                                "updated_at": "2019-03-07 16:11:47"
                            },
                            {
                                "id": 93,
                                "pid": 1,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "用户管理",
                                "code": "systems_admins",
                                "options": {
                                    "name": "systems_admins",
                                    "path": "systems/admins",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-04 17:21:21",
                                "updated_at": "2019-03-07 16:14:24"
                            },
                            {
                                "id": 94,
                                "pid": 1,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "操作日志",
                                "code": "systems_actionlogs",
                                "options": {
                                    "name": "systems_actionlogs",
                                    "path": "systems/actionlogs",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-05 17:37:12",
                                "updated_at": "2019-03-12 11:43:05"
                            },
                            {
                                "id": 95,
                                "pid": 1,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "组织机构",
                                "code": "systems_departments",
                                "options": {
                                    "name": "systems_departments",
                                    "path": "systems/departments",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-07 16:55:50",
                                "updated_at": "2019-03-12 11:45:23"
                            },
                            {
                                "id": 104,
                                "pid": 1,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "角色管理",
                                "code": "roles",
                                "options": {
                                    "name": "systems_roles",
                                    "path": "systems/roles",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-12 11:55:43",
                                "updated_at": "2019-03-12 11:55:43"
                            },
                            {
                                "id": 116,
                                "pid": 1,
                                "type": 2,
                                "icon": "md-apps",
                                "name": "权限管理",
                                "code": "测试001",
                                "options": null,
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-14 22:26:45",
                                "updated_at": "2019-03-15 10:12:58",
                                "children": [
                                    {
                                        "id": 117,
                                        "pid": 116,
                                        "type": 2,
                                        "icon": "md-apps",
                                        "name": "比方说",
                                        "code": "123123",
                                        "options": null,
                                        "sort": 0,
                                        "status": true,
                                        "created_at": "2019-03-14 22:28:03",
                                        "updated_at": "2019-03-15 10:13:41",
                                        "children": [
                                            {
                                                "id": 118,
                                                "pid": 117,
                                                "type": 1,
                                                "icon": "md-apps",
                                                "name": "渠道管理",
                                                "code": "sdfsdfvvvv",
                                                "options": {
                                                    "name": "sdfsdfvvv",
                                                    "path": "prototypes/channel",
                                                    "tree_path": "1,116,117"
                                                },
                                                "sort": 0,
                                                "status": true,
                                                "created_at": "2019-03-14 22:30:24",
                                                "updated_at": "2019-03-15 10:14:42"
                                            },{
                                                "id": 118,
                                                "pid": 117,
                                                "type": 1,
                                                "icon": "md-apps",
                                                "name": "渠道管理",
                                                "code": "sdfsdfvvvv",
                                                "options": {
                                                    "name": "sdfsdfvvv",
                                                    "path": "prototypes/channel",
                                                    "tree_path": "1,116,117"
                                                },
                                                "sort": 0,
                                                "status": true,
                                                "created_at": "2019-03-14 22:30:24",
                                                "updated_at": "2019-03-15 10:14:42"
                                            },
                                            {
                                                "id": 118,
                                                "pid": 117,
                                                "type": 1,
                                                "icon": "md-apps",
                                                "name": "渠道管理3",
                                                "code": "sdfsdfvvvv",
                                                "options": {
                                                    "name": "sdfsdfvvv",
                                                    "path": "prototypes/channel",
                                                    "tree_path": "1,116,117"
                                                },
                                                "sort": 0,
                                                "status": true,
                                                "created_at": "2019-03-14 22:30:24",
                                                "updated_at": "2019-03-15 10:14:42"
                                            }

                                        ]
                                    },
                                    {
                                        "id": 117,
                                        "pid": 116,
                                        "type": 2,
                                        "icon": "md-apps",
                                        "name": "比方说",
                                        "code": "123123",
                                        "options": null,
                                        "sort": 0,
                                        "status": true,
                                        "created_at": "2019-03-14 22:28:03",
                                        "updated_at": "2019-03-15 10:13:41",
                                        "children": [
                                            {
                                                "id": 118,
                                                "pid": 117,
                                                "type": 1,
                                                "icon": "md-apps",
                                                "name": "渠道管理",
                                                "code": "sdfsdfvvvv",
                                                "options": {
                                                    "name": "sdfsdfvvv",
                                                    "path": "prototypes/channel",
                                                    "tree_path": "1,116,117"
                                                },
                                                "sort": 0,
                                                "status": true,
                                                "created_at": "2019-03-14 22:30:24",
                                                "updated_at": "2019-03-15 10:14:42"
                                            },{
                                                "id": 118,
                                                "pid": 117,
                                                "type": 1,
                                                "icon": "md-apps",
                                                "name": "渠道管理",
                                                "code": "sdfsdfvvvv",
                                                "options": {
                                                    "name": "sdfsdfvvv",
                                                    "path": "prototypes/channel",
                                                    "tree_path": "1,116,117"
                                                },
                                                "sort": 0,
                                                "status": true,
                                                "created_at": "2019-03-14 22:30:24",
                                                "updated_at": "2019-03-15 10:14:42"
                                            },
                                            {
                                                "id": 118,
                                                "pid": 117,
                                                "type": 1,
                                                "icon": "md-apps",
                                                "name": "渠道管理3",
                                                "code": "sdfsdfvvvv",
                                                "options": {
                                                    "name": "sdfsdfvvv",
                                                    "path": "prototypes/channel",
                                                    "tree_path": "1,116,117"
                                                },
                                                "sort": 0,
                                                "status": true,
                                                "created_at": "2019-03-14 22:30:24",
                                                "updated_at": "2019-03-15 10:14:42"
                                            }

                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": 121,
                        "pid": 0,
                        "type": 2,
                        "icon": "md-add",
                        "name": "会员1",
                        "code": "uses",
                        "options": {
                            "tree_path": "0"
                        },
                        "sort": 0,
                        "status": true,
                        "created_at": "2019-03-29 03:43:35",
                        "updated_at": "2019-03-29 03:43:35",
                        "children": [
                            {
                                "id": 122,
                                "pid": 121,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "会员档案",
                                "code": "users_lists",
                                "options": {
                                    "name": "users_lists",
                                    "path": "users/lists",
                                    "tree_path": "121"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-29 03:44:27",
                                "updated_at": "2019-04-01 03:55:29"
                            },
                            {
                                "id": 123,
                                "pid": 121,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "预约管理",
                                "code": "reservations",
                                "options": {
                                    "name": "users_reservations",
                                    "path": "users/reservations",
                                    "tree_path": "121"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-29 07:25:13",
                                "updated_at": "2019-03-29 07:25:13"
                            }
                        ]
                    },
                    {
                        "id": 1,
                        "pid": 0,
                        "type": 2,
                        "icon": "md-alarm",
                        "name": "系统2",
                        "code": "systems",
                        "options": {
                            "name": "systems_nodes",
                            "path": "systems/nodes",
                            "tree_path": "0"
                        },
                        "sort": 0,
                        "status": true,
                        "created_at": "2018-05-26 07:32:54",
                        "updated_at": "2019-03-07 16:09:56",
                        "children": [
                            {
                                "id": 3,
                                "pid": 1,
                                "type": 1,
                                "icon": "ios-code-working",
                                "name": "节点管理",
                                "code": "node",
                                "options": {
                                    "name": "systems_nodes",
                                    "path": "systems/nodes",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2018-05-26 07:32:54",
                                "updated_at": "2019-03-07 16:11:47"
                            },
                            {
                                "id": 93,
                                "pid": 1,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "用户管理",
                                "code": "systems_admins",
                                "options": {
                                    "name": "systems_admins",
                                    "path": "systems/admins",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-04 17:21:21",
                                "updated_at": "2019-03-07 16:14:24"
                            },
                            {
                                "id": 94,
                                "pid": 1,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "操作日志",
                                "code": "systems_actionlogs",
                                "options": {
                                    "name": "systems_actionlogs",
                                    "path": "systems/actionlogs",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-05 17:37:12",
                                "updated_at": "2019-03-12 11:43:05"
                            },
                            {
                                "id": 95,
                                "pid": 1,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "组织机构",
                                "code": "systems_departments",
                                "options": {
                                    "name": "systems_departments",
                                    "path": "systems/departments",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-07 16:55:50",
                                "updated_at": "2019-03-12 11:45:23"
                            },
                            {
                                "id": 104,
                                "pid": 1,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "角色管理",
                                "code": "roles",
                                "options": {
                                    "name": "systems_roles",
                                    "path": "systems/roles",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-12 11:55:43",
                                "updated_at": "2019-03-12 11:55:43"
                            },
                            {
                                "id": 116,
                                "pid": 1,
                                "type": 2,
                                "icon": "md-apps",
                                "name": "权限管理",
                                "code": "测试001",
                                "options": null,
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-14 22:26:45",
                                "updated_at": "2019-03-15 10:12:58",
                                "children": [
                                    {
                                        "id": 117,
                                        "pid": 116,
                                        "type": 2,
                                        "icon": "md-apps",
                                        "name": "比方说",
                                        "code": "123123",
                                        "options": null,
                                        "sort": 0,
                                        "status": true,
                                        "created_at": "2019-03-14 22:28:03",
                                        "updated_at": "2019-03-15 10:13:41",
                                        "children": [
                                            {
                                                "id": 118,
                                                "pid": 117,
                                                "type": 1,
                                                "icon": "md-apps",
                                                "name": "渠道管理",
                                                "code": "sdfsdfvvvv",
                                                "options": {
                                                    "name": "sdfsdfvvv",
                                                    "path": "prototypes/channel",
                                                    "tree_path": "1,116,117"
                                                },
                                                "sort": 0,
                                                "status": true,
                                                "created_at": "2019-03-14 22:30:24",
                                                "updated_at": "2019-03-15 10:14:42"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": 121,
                        "pid": 0,
                        "type": 2,
                        "icon": "md-at",
                        "name": "会员vvv",
                        "code": "uses",
                        "options": {
                            "tree_path": "0"
                        },
                        "sort": 0,
                        "status": true,
                        "created_at": "2019-03-29 03:43:35",
                        "updated_at": "2019-03-29 03:43:35",
                        "children": [
                            {
                                "id": 122,
                                "pid": 121,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "会员档案",
                                "code": "users_lists",
                                "options": {
                                    "name": "users_lists",
                                    "path": "users/lists",
                                    "tree_path": "121"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-29 03:44:27",
                                "updated_at": "2019-04-01 03:55:29"
                            },
                            {
                                "id": 123,
                                "pid": 121,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "预约管理",
                                "code": "reservations",
                                "options": {
                                    "name": "users_reservations",
                                    "path": "users/reservations",
                                    "tree_path": "121"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-29 07:25:13",
                                "updated_at": "2019-03-29 07:25:13"
                            }
                        ]
                    },
                    {
                        "id": 1,
                        "pid": 0,
                        "type": 2,
                        "icon": "md-boat",
                        "name": "系统3434",
                        "code": "systems",
                        "options": {
                            "name": "systems_nodes",
                            "path": "systems/nodes",
                            "tree_path": "0"
                        },
                        "sort": 0,
                        "status": true,
                        "created_at": "2018-05-26 07:32:54",
                        "updated_at": "2019-03-07 16:09:56",
                        "children": [
                            {
                                "id": 3,
                                "pid": 1,
                                "type": 1,
                                "icon": "ios-code-working",
                                "name": "节点管理",
                                "code": "node",
                                "options": {
                                    "name": "systems_nodes",
                                    "path": "systems/nodes",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2018-05-26 07:32:54",
                                "updated_at": "2019-03-07 16:11:47"
                            },
                            {
                                "id": 93,
                                "pid": 1,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "用户管理",
                                "code": "systems_admins",
                                "options": {
                                    "name": "systems_admins",
                                    "path": "systems/admins",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-04 17:21:21",
                                "updated_at": "2019-03-07 16:14:24"
                            },
                            {
                                "id": 94,
                                "pid": 1,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "操作日志",
                                "code": "systems_actionlogs",
                                "options": {
                                    "name": "systems_actionlogs",
                                    "path": "systems/actionlogs",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-05 17:37:12",
                                "updated_at": "2019-03-12 11:43:05"
                            },
                            {
                                "id": 95,
                                "pid": 1,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "组织机构",
                                "code": "systems_departments",
                                "options": {
                                    "name": "systems_departments",
                                    "path": "systems/departments",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-07 16:55:50",
                                "updated_at": "2019-03-12 11:45:23"
                            },
                            {
                                "id": 104,
                                "pid": 1,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "角色管理",
                                "code": "roles",
                                "options": {
                                    "name": "systems_roles",
                                    "path": "systems/roles",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-12 11:55:43",
                                "updated_at": "2019-03-12 11:55:43"
                            },
                            {
                                "id": 116,
                                "pid": 1,
                                "type": 2,
                                "icon": "md-apps",
                                "name": "权限管理",
                                "code": "测试001",
                                "options": null,
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-14 22:26:45",
                                "updated_at": "2019-03-15 10:12:58",
                                "children": [
                                    {
                                        "id": 117,
                                        "pid": 116,
                                        "type": 2,
                                        "icon": "md-apps",
                                        "name": "比方说",
                                        "code": "123123",
                                        "options": null,
                                        "sort": 0,
                                        "status": true,
                                        "created_at": "2019-03-14 22:28:03",
                                        "updated_at": "2019-03-15 10:13:41",
                                        "children": [
                                            {
                                                "id": 118,
                                                "pid": 117,
                                                "type": 1,
                                                "icon": "md-apps",
                                                "name": "渠道管理",
                                                "code": "sdfsdfvvvv",
                                                "options": {
                                                    "name": "sdfsdfvvv",
                                                    "path": "prototypes/channel",
                                                    "tree_path": "1,116,117"
                                                },
                                                "sort": 0,
                                                "status": true,
                                                "created_at": "2019-03-14 22:30:24",
                                                "updated_at": "2019-03-15 10:14:42"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": 121,
                        "pid": 0,
                        "type": 2,
                        "icon": "ios-body",
                        "name": "会员",
                        "code": "uses",
                        "options": {
                            "tree_path": "0"
                        },
                        "sort": 0,
                        "status": true,
                        "created_at": "2019-03-29 03:43:35",
                        "updated_at": "2019-03-29 03:43:35",
                        "children": [
                            {
                                "id": 122,
                                "pid": 121,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "会员档案",
                                "code": "users_lists",
                                "options": {
                                    "name": "users_lists",
                                    "path": "users/lists",
                                    "tree_path": "121"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-29 03:44:27",
                                "updated_at": "2019-04-01 03:55:29"
                            },
                            {
                                "id": 123,
                                "pid": 121,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "预约管理",
                                "code": "reservations",
                                "options": {
                                    "name": "users_reservations",
                                    "path": "users/reservations",
                                    "tree_path": "121"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-29 07:25:13",
                                "updated_at": "2019-03-29 07:25:13"
                            }
                        ]
                    },
                    {
                        "id": 1,
                        "pid": 0,
                        "type": 2,
                        "icon": "md-apps",
                        "name": "系统",
                        "code": "systems",
                        "options": {
                            "name": "systems_nodes",
                            "path": "systems/nodes",
                            "tree_path": "0"
                        },
                        "sort": 0,
                        "status": true,
                        "created_at": "2018-05-26 07:32:54",
                        "updated_at": "2019-03-07 16:09:56",
                        "children": [
                            {
                                "id": 3,
                                "pid": 1,
                                "type": 1,
                                "icon": "ios-code-working",
                                "name": "节点管理",
                                "code": "node",
                                "options": {
                                    "name": "systems_nodes",
                                    "path": "systems/nodes",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2018-05-26 07:32:54",
                                "updated_at": "2019-03-07 16:11:47"
                            },
                            {
                                "id": 93,
                                "pid": 1,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "用户管理",
                                "code": "systems_admins",
                                "options": {
                                    "name": "systems_admins",
                                    "path": "systems/admins",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-04 17:21:21",
                                "updated_at": "2019-03-07 16:14:24"
                            },
                            {
                                "id": 94,
                                "pid": 1,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "操作日志",
                                "code": "systems_actionlogs",
                                "options": {
                                    "name": "systems_actionlogs",
                                    "path": "systems/actionlogs",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-05 17:37:12",
                                "updated_at": "2019-03-12 11:43:05"
                            },
                            {
                                "id": 95,
                                "pid": 1,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "组织机构",
                                "code": "systems_departments",
                                "options": {
                                    "name": "systems_departments",
                                    "path": "systems/departments",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-07 16:55:50",
                                "updated_at": "2019-03-12 11:45:23"
                            },
                            {
                                "id": 104,
                                "pid": 1,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "角色管理",
                                "code": "roles",
                                "options": {
                                    "name": "systems_roles",
                                    "path": "systems/roles",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-12 11:55:43",
                                "updated_at": "2019-03-12 11:55:43"
                            },
                            {
                                "id": 116,
                                "pid": 1,
                                "type": 2,
                                "icon": "md-apps",
                                "name": "权限管理",
                                "code": "测试001",
                                "options": null,
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-14 22:26:45",
                                "updated_at": "2019-03-15 10:12:58",
                                "children": [
                                    {
                                        "id": 117,
                                        "pid": 116,
                                        "type": 2,
                                        "icon": "md-apps",
                                        "name": "比方说",
                                        "code": "123123",
                                        "options": null,
                                        "sort": 0,
                                        "status": true,
                                        "created_at": "2019-03-14 22:28:03",
                                        "updated_at": "2019-03-15 10:13:41",
                                        "children": [
                                            {
                                                "id": 118,
                                                "pid": 117,
                                                "type": 1,
                                                "icon": "md-apps",
                                                "name": "渠道管理",
                                                "code": "sdfsdfvvvv",
                                                "options": {
                                                    "name": "sdfsdfvvv",
                                                    "path": "prototypes/channel",
                                                    "tree_path": "1,116,117"
                                                },
                                                "sort": 0,
                                                "status": true,
                                                "created_at": "2019-03-14 22:30:24",
                                                "updated_at": "2019-03-15 10:14:42"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": 121,
                        "pid": 0,
                        "type": 2,
                        "icon": "md-add",
                        "name": "会员1",
                        "code": "uses",
                        "options": {
                            "tree_path": "0"
                        },
                        "sort": 0,
                        "status": true,
                        "created_at": "2019-03-29 03:43:35",
                        "updated_at": "2019-03-29 03:43:35",
                        "children": [
                            {
                                "id": 122,
                                "pid": 121,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "会员档案",
                                "code": "users_lists",
                                "options": {
                                    "name": "users_lists",
                                    "path": "users/lists",
                                    "tree_path": "121"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-29 03:44:27",
                                "updated_at": "2019-04-01 03:55:29"
                            },
                            {
                                "id": 123,
                                "pid": 121,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "预约管理",
                                "code": "reservations",
                                "options": {
                                    "name": "users_reservations",
                                    "path": "users/reservations",
                                    "tree_path": "121"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-29 07:25:13",
                                "updated_at": "2019-03-29 07:25:13"
                            }
                        ]
                    },
                    {
                        "id": 1,
                        "pid": 0,
                        "type": 2,
                        "icon": "md-alarm",
                        "name": "系统2",
                        "code": "systems",
                        "options": {
                            "name": "systems_nodes",
                            "path": "systems/nodes",
                            "tree_path": "0"
                        },
                        "sort": 0,
                        "status": true,
                        "created_at": "2018-05-26 07:32:54",
                        "updated_at": "2019-03-07 16:09:56",
                        "children": [
                            {
                                "id": 3,
                                "pid": 1,
                                "type": 1,
                                "icon": "ios-code-working",
                                "name": "节点管理",
                                "code": "node",
                                "options": {
                                    "name": "systems_nodes",
                                    "path": "systems/nodes",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2018-05-26 07:32:54",
                                "updated_at": "2019-03-07 16:11:47"
                            },
                            {
                                "id": 93,
                                "pid": 1,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "用户管理",
                                "code": "systems_admins",
                                "options": {
                                    "name": "systems_admins",
                                    "path": "systems/admins",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-04 17:21:21",
                                "updated_at": "2019-03-07 16:14:24"
                            },
                            {
                                "id": 94,
                                "pid": 1,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "操作日志",
                                "code": "systems_actionlogs",
                                "options": {
                                    "name": "systems_actionlogs",
                                    "path": "systems/actionlogs",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-05 17:37:12",
                                "updated_at": "2019-03-12 11:43:05"
                            },
                            {
                                "id": 95,
                                "pid": 1,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "组织机构",
                                "code": "systems_departments",
                                "options": {
                                    "name": "systems_departments",
                                    "path": "systems/departments",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-07 16:55:50",
                                "updated_at": "2019-03-12 11:45:23"
                            },
                            {
                                "id": 104,
                                "pid": 1,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "角色管理",
                                "code": "roles",
                                "options": {
                                    "name": "systems_roles",
                                    "path": "systems/roles",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-12 11:55:43",
                                "updated_at": "2019-03-12 11:55:43"
                            },
                            {
                                "id": 116,
                                "pid": 1,
                                "type": 2,
                                "icon": "md-apps",
                                "name": "权限管理",
                                "code": "测试001",
                                "options": null,
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-14 22:26:45",
                                "updated_at": "2019-03-15 10:12:58",
                                "children": [
                                    {
                                        "id": 117,
                                        "pid": 116,
                                        "type": 2,
                                        "icon": "md-apps",
                                        "name": "比方说",
                                        "code": "123123",
                                        "options": null,
                                        "sort": 0,
                                        "status": true,
                                        "created_at": "2019-03-14 22:28:03",
                                        "updated_at": "2019-03-15 10:13:41",
                                        "children": [
                                            {
                                                "id": 118,
                                                "pid": 117,
                                                "type": 1,
                                                "icon": "md-apps",
                                                "name": "渠道管理",
                                                "code": "sdfsdfvvvv",
                                                "options": {
                                                    "name": "sdfsdfvvv",
                                                    "path": "prototypes/channel",
                                                    "tree_path": "1,116,117"
                                                },
                                                "sort": 0,
                                                "status": true,
                                                "created_at": "2019-03-14 22:30:24",
                                                "updated_at": "2019-03-15 10:14:42"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": 121,
                        "pid": 0,
                        "type": 2,
                        "icon": "md-at",
                        "name": "会员vvv",
                        "code": "uses",
                        "options": {
                            "tree_path": "0"
                        },
                        "sort": 0,
                        "status": true,
                        "created_at": "2019-03-29 03:43:35",
                        "updated_at": "2019-03-29 03:43:35",
                        "children": [
                            {
                                "id": 122,
                                "pid": 121,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "会员档案",
                                "code": "users_lists",
                                "options": {
                                    "name": "users_lists",
                                    "path": "users/lists",
                                    "tree_path": "121"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-29 03:44:27",
                                "updated_at": "2019-04-01 03:55:29"
                            },
                            {
                                "id": 123,
                                "pid": 121,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "预约管理",
                                "code": "reservations",
                                "options": {
                                    "name": "users_reservations",
                                    "path": "users/reservations",
                                    "tree_path": "121"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-29 07:25:13",
                                "updated_at": "2019-03-29 07:25:13"
                            }
                        ]
                    },
                    {
                        "id": 1,
                        "pid": 0,
                        "type": 2,
                        "icon": "md-boat",
                        "name": "系统3434",
                        "code": "systems",
                        "options": {
                            "name": "systems_nodes",
                            "path": "systems/nodes",
                            "tree_path": "0"
                        },
                        "sort": 0,
                        "status": true,
                        "created_at": "2018-05-26 07:32:54",
                        "updated_at": "2019-03-07 16:09:56",
                        "children": [
                            {
                                "id": 3,
                                "pid": 1,
                                "type": 1,
                                "icon": "ios-code-working",
                                "name": "节点管理",
                                "code": "node",
                                "options": {
                                    "name": "systems_nodes",
                                    "path": "systems/nodes",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2018-05-26 07:32:54",
                                "updated_at": "2019-03-07 16:11:47"
                            },
                            {
                                "id": 93,
                                "pid": 1,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "用户管理",
                                "code": "systems_admins",
                                "options": {
                                    "name": "systems_admins",
                                    "path": "systems/admins",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-04 17:21:21",
                                "updated_at": "2019-03-07 16:14:24"
                            },
                            {
                                "id": 94,
                                "pid": 1,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "操作日志",
                                "code": "systems_actionlogs",
                                "options": {
                                    "name": "systems_actionlogs",
                                    "path": "systems/actionlogs",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-05 17:37:12",
                                "updated_at": "2019-03-12 11:43:05"
                            },
                            {
                                "id": 95,
                                "pid": 1,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "组织机构",
                                "code": "systems_departments",
                                "options": {
                                    "name": "systems_departments",
                                    "path": "systems/departments",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-07 16:55:50",
                                "updated_at": "2019-03-12 11:45:23"
                            },
                            {
                                "id": 104,
                                "pid": 1,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "角色管理",
                                "code": "roles",
                                "options": {
                                    "name": "systems_roles",
                                    "path": "systems/roles",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-12 11:55:43",
                                "updated_at": "2019-03-12 11:55:43"
                            },
                            {
                                "id": 116,
                                "pid": 1,
                                "type": 2,
                                "icon": "md-apps",
                                "name": "权限管理",
                                "code": "测试001",
                                "options": null,
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-14 22:26:45",
                                "updated_at": "2019-03-15 10:12:58",
                                "children": [
                                    {
                                        "id": 117,
                                        "pid": 116,
                                        "type": 2,
                                        "icon": "md-apps",
                                        "name": "比方说",
                                        "code": "123123",
                                        "options": null,
                                        "sort": 0,
                                        "status": true,
                                        "created_at": "2019-03-14 22:28:03",
                                        "updated_at": "2019-03-15 10:13:41",
                                        "children": [
                                            {
                                                "id": 118,
                                                "pid": 117,
                                                "type": 1,
                                                "icon": "md-apps",
                                                "name": "渠道管理",
                                                "code": "sdfsdfvvvv",
                                                "options": {
                                                    "name": "sdfsdfvvv",
                                                    "path": "prototypes/channel",
                                                    "tree_path": "1,116,117"
                                                },
                                                "sort": 0,
                                                "status": true,
                                                "created_at": "2019-03-14 22:30:24",
                                                "updated_at": "2019-03-15 10:14:42"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": 121,
                        "pid": 0,
                        "type": 2,
                        "icon": "ios-body",
                        "name": "会员",
                        "code": "uses",
                        "options": {
                            "tree_path": "0"
                        },
                        "sort": 0,
                        "status": true,
                        "created_at": "2019-03-29 03:43:35",
                        "updated_at": "2019-03-29 03:43:35",
                        "children": [
                            {
                                "id": 122,
                                "pid": 121,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "会员档案",
                                "code": "users_lists",
                                "options": {
                                    "name": "users_lists",
                                    "path": "users/lists",
                                    "tree_path": "121"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-29 03:44:27",
                                "updated_at": "2019-04-01 03:55:29"
                            },
                            {
                                "id": 123,
                                "pid": 121,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "预约管理",
                                "code": "reservations",
                                "options": {
                                    "name": "users_reservations",
                                    "path": "users/reservations",
                                    "tree_path": "121"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-29 07:25:13",
                                "updated_at": "2019-03-29 07:25:13"
                            }
                        ]
                    },
                    {
                        "id": 1,
                        "pid": 0,
                        "type": 2,
                        "icon": "md-apps",
                        "name": "系统",
                        "code": "systems",
                        "options": {
                            "name": "systems_nodes",
                            "path": "systems/nodes",
                            "tree_path": "0"
                        },
                        "sort": 0,
                        "status": true,
                        "created_at": "2018-05-26 07:32:54",
                        "updated_at": "2019-03-07 16:09:56",
                        "children": [
                            {
                                "id": 3,
                                "pid": 1,
                                "type": 1,
                                "icon": "ios-code-working",
                                "name": "节点管理",
                                "code": "node",
                                "options": {
                                    "name": "systems_nodes",
                                    "path": "systems/nodes",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2018-05-26 07:32:54",
                                "updated_at": "2019-03-07 16:11:47"
                            },
                            {
                                "id": 93,
                                "pid": 1,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "用户管理",
                                "code": "systems_admins",
                                "options": {
                                    "name": "systems_admins",
                                    "path": "systems/admins",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-04 17:21:21",
                                "updated_at": "2019-03-07 16:14:24"
                            },
                            {
                                "id": 94,
                                "pid": 1,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "操作日志",
                                "code": "systems_actionlogs",
                                "options": {
                                    "name": "systems_actionlogs",
                                    "path": "systems/actionlogs",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-05 17:37:12",
                                "updated_at": "2019-03-12 11:43:05"
                            },
                            {
                                "id": 95,
                                "pid": 1,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "组织机构",
                                "code": "systems_departments",
                                "options": {
                                    "name": "systems_departments",
                                    "path": "systems/departments",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-07 16:55:50",
                                "updated_at": "2019-03-12 11:45:23"
                            },
                            {
                                "id": 104,
                                "pid": 1,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "角色管理",
                                "code": "roles",
                                "options": {
                                    "name": "systems_roles",
                                    "path": "systems/roles",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-12 11:55:43",
                                "updated_at": "2019-03-12 11:55:43"
                            },
                            {
                                "id": 116,
                                "pid": 1,
                                "type": 2,
                                "icon": "md-apps",
                                "name": "权限管理",
                                "code": "测试001",
                                "options": null,
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-14 22:26:45",
                                "updated_at": "2019-03-15 10:12:58",
                                "children": [
                                    {
                                        "id": 117,
                                        "pid": 116,
                                        "type": 2,
                                        "icon": "md-apps",
                                        "name": "比方说",
                                        "code": "123123",
                                        "options": null,
                                        "sort": 0,
                                        "status": true,
                                        "created_at": "2019-03-14 22:28:03",
                                        "updated_at": "2019-03-15 10:13:41",
                                        "children": [
                                            {
                                                "id": 118,
                                                "pid": 117,
                                                "type": 1,
                                                "icon": "md-apps",
                                                "name": "渠道管理",
                                                "code": "sdfsdfvvvv",
                                                "options": {
                                                    "name": "sdfsdfvvv",
                                                    "path": "prototypes/channel",
                                                    "tree_path": "1,116,117"
                                                },
                                                "sort": 0,
                                                "status": true,
                                                "created_at": "2019-03-14 22:30:24",
                                                "updated_at": "2019-03-15 10:14:42"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": 121,
                        "pid": 0,
                        "type": 2,
                        "icon": "md-add",
                        "name": "会员1",
                        "code": "uses",
                        "options": {
                            "tree_path": "0"
                        },
                        "sort": 0,
                        "status": true,
                        "created_at": "2019-03-29 03:43:35",
                        "updated_at": "2019-03-29 03:43:35",
                        "children": [
                            {
                                "id": 122,
                                "pid": 121,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "会员档案",
                                "code": "users_lists",
                                "options": {
                                    "name": "users_lists",
                                    "path": "users/lists",
                                    "tree_path": "121"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-29 03:44:27",
                                "updated_at": "2019-04-01 03:55:29"
                            },
                            {
                                "id": 123,
                                "pid": 121,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "预约管理",
                                "code": "reservations",
                                "options": {
                                    "name": "users_reservations",
                                    "path": "users/reservations",
                                    "tree_path": "121"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-29 07:25:13",
                                "updated_at": "2019-03-29 07:25:13"
                            }
                        ]
                    },
                    {
                        "id": 1,
                        "pid": 0,
                        "type": 2,
                        "icon": "md-alarm",
                        "name": "系统2",
                        "code": "systems",
                        "options": {
                            "name": "systems_nodes",
                            "path": "systems/nodes",
                            "tree_path": "0"
                        },
                        "sort": 0,
                        "status": true,
                        "created_at": "2018-05-26 07:32:54",
                        "updated_at": "2019-03-07 16:09:56",
                        "children": [
                            {
                                "id": 3,
                                "pid": 1,
                                "type": 1,
                                "icon": "ios-code-working",
                                "name": "节点管理",
                                "code": "node",
                                "options": {
                                    "name": "systems_nodes",
                                    "path": "systems/nodes",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2018-05-26 07:32:54",
                                "updated_at": "2019-03-07 16:11:47"
                            },
                            {
                                "id": 93,
                                "pid": 1,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "用户管理",
                                "code": "systems_admins",
                                "options": {
                                    "name": "systems_admins",
                                    "path": "systems/admins",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-04 17:21:21",
                                "updated_at": "2019-03-07 16:14:24"
                            },
                            {
                                "id": 94,
                                "pid": 1,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "操作日志",
                                "code": "systems_actionlogs",
                                "options": {
                                    "name": "systems_actionlogs",
                                    "path": "systems/actionlogs",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-05 17:37:12",
                                "updated_at": "2019-03-12 11:43:05"
                            },
                            {
                                "id": 95,
                                "pid": 1,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "组织机构",
                                "code": "systems_departments",
                                "options": {
                                    "name": "systems_departments",
                                    "path": "systems/departments",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-07 16:55:50",
                                "updated_at": "2019-03-12 11:45:23"
                            },
                            {
                                "id": 104,
                                "pid": 1,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "角色管理",
                                "code": "roles",
                                "options": {
                                    "name": "systems_roles",
                                    "path": "systems/roles",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-12 11:55:43",
                                "updated_at": "2019-03-12 11:55:43"
                            },
                            {
                                "id": 116,
                                "pid": 1,
                                "type": 2,
                                "icon": "md-apps",
                                "name": "权限管理",
                                "code": "测试001",
                                "options": null,
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-14 22:26:45",
                                "updated_at": "2019-03-15 10:12:58",
                                "children": [
                                    {
                                        "id": 117,
                                        "pid": 116,
                                        "type": 2,
                                        "icon": "md-apps",
                                        "name": "比方说",
                                        "code": "123123",
                                        "options": null,
                                        "sort": 0,
                                        "status": true,
                                        "created_at": "2019-03-14 22:28:03",
                                        "updated_at": "2019-03-15 10:13:41",
                                        "children": [
                                            {
                                                "id": 118,
                                                "pid": 117,
                                                "type": 1,
                                                "icon": "md-apps",
                                                "name": "渠道管理",
                                                "code": "sdfsdfvvvv",
                                                "options": {
                                                    "name": "sdfsdfvvv",
                                                    "path": "prototypes/channel",
                                                    "tree_path": "1,116,117"
                                                },
                                                "sort": 0,
                                                "status": true,
                                                "created_at": "2019-03-14 22:30:24",
                                                "updated_at": "2019-03-15 10:14:42"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": 121,
                        "pid": 0,
                        "type": 2,
                        "icon": "md-at",
                        "name": "会员vvv",
                        "code": "uses",
                        "options": {
                            "tree_path": "0"
                        },
                        "sort": 0,
                        "status": true,
                        "created_at": "2019-03-29 03:43:35",
                        "updated_at": "2019-03-29 03:43:35",
                        "children": [
                            {
                                "id": 122,
                                "pid": 121,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "会员档案",
                                "code": "users_lists",
                                "options": {
                                    "name": "users_lists",
                                    "path": "users/lists",
                                    "tree_path": "121"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-29 03:44:27",
                                "updated_at": "2019-04-01 03:55:29"
                            },
                            {
                                "id": 123,
                                "pid": 121,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "预约管理",
                                "code": "reservations",
                                "options": {
                                    "name": "users_reservations",
                                    "path": "users/reservations",
                                    "tree_path": "121"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-29 07:25:13",
                                "updated_at": "2019-03-29 07:25:13"
                            }
                        ]
                    },
                    {
                        "id": 1,
                        "pid": 0,
                        "type": 2,
                        "icon": "md-boat",
                        "name": "系统3434",
                        "code": "systems",
                        "options": {
                            "name": "systems_nodes",
                            "path": "systems/nodes",
                            "tree_path": "0"
                        },
                        "sort": 0,
                        "status": true,
                        "created_at": "2018-05-26 07:32:54",
                        "updated_at": "2019-03-07 16:09:56",
                        "children": [
                            {
                                "id": 3,
                                "pid": 1,
                                "type": 1,
                                "icon": "ios-code-working",
                                "name": "节点管理",
                                "code": "node",
                                "options": {
                                    "name": "systems_nodes",
                                    "path": "systems/nodes",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2018-05-26 07:32:54",
                                "updated_at": "2019-03-07 16:11:47"
                            },
                            {
                                "id": 93,
                                "pid": 1,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "用户管理",
                                "code": "systems_admins",
                                "options": {
                                    "name": "systems_admins",
                                    "path": "systems/admins",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-04 17:21:21",
                                "updated_at": "2019-03-07 16:14:24"
                            },
                            {
                                "id": 94,
                                "pid": 1,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "操作日志",
                                "code": "systems_actionlogs",
                                "options": {
                                    "name": "systems_actionlogs",
                                    "path": "systems/actionlogs",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-05 17:37:12",
                                "updated_at": "2019-03-12 11:43:05"
                            },
                            {
                                "id": 95,
                                "pid": 1,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "组织机构",
                                "code": "systems_departments",
                                "options": {
                                    "name": "systems_departments",
                                    "path": "systems/departments",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-07 16:55:50",
                                "updated_at": "2019-03-12 11:45:23"
                            },
                            {
                                "id": 104,
                                "pid": 1,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "角色管理",
                                "code": "roles",
                                "options": {
                                    "name": "systems_roles",
                                    "path": "systems/roles",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-12 11:55:43",
                                "updated_at": "2019-03-12 11:55:43"
                            },
                            {
                                "id": 116,
                                "pid": 1,
                                "type": 2,
                                "icon": "md-apps",
                                "name": "权限管理",
                                "code": "测试001",
                                "options": null,
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-14 22:26:45",
                                "updated_at": "2019-03-15 10:12:58",
                                "children": [
                                    {
                                        "id": 117,
                                        "pid": 116,
                                        "type": 2,
                                        "icon": "md-apps",
                                        "name": "比方说",
                                        "code": "123123",
                                        "options": null,
                                        "sort": 0,
                                        "status": true,
                                        "created_at": "2019-03-14 22:28:03",
                                        "updated_at": "2019-03-15 10:13:41",
                                        "children": [
                                            {
                                                "id": 118,
                                                "pid": 117,
                                                "type": 1,
                                                "icon": "md-apps",
                                                "name": "渠道管理",
                                                "code": "sdfsdfvvvv",
                                                "options": {
                                                    "name": "sdfsdfvvv",
                                                    "path": "prototypes/channel",
                                                    "tree_path": "1,116,117"
                                                },
                                                "sort": 0,
                                                "status": true,
                                                "created_at": "2019-03-14 22:30:24",
                                                "updated_at": "2019-03-15 10:14:42"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": 121,
                        "pid": 0,
                        "type": 2,
                        "icon": "ios-body",
                        "name": "会员",
                        "code": "uses",
                        "options": {
                            "tree_path": "0"
                        },
                        "sort": 0,
                        "status": true,
                        "created_at": "2019-03-29 03:43:35",
                        "updated_at": "2019-03-29 03:43:35",
                        "children": [
                            {
                                "id": 122,
                                "pid": 121,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "会员档案",
                                "code": "users_lists",
                                "options": {
                                    "name": "users_lists",
                                    "path": "users/lists",
                                    "tree_path": "121"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-29 03:44:27",
                                "updated_at": "2019-04-01 03:55:29"
                            },
                            {
                                "id": 123,
                                "pid": 121,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "预约管理",
                                "code": "reservations",
                                "options": {
                                    "name": "users_reservations",
                                    "path": "users/reservations",
                                    "tree_path": "121"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-29 07:25:13",
                                "updated_at": "2019-03-29 07:25:13"
                            }
                        ]
                    },
                    {
                        "id": 1,
                        "pid": 0,
                        "type": 2,
                        "icon": "md-apps",
                        "name": "系统",
                        "code": "systems",
                        "options": {
                            "name": "systems_nodes",
                            "path": "systems/nodes",
                            "tree_path": "0"
                        },
                        "sort": 0,
                        "status": true,
                        "created_at": "2018-05-26 07:32:54",
                        "updated_at": "2019-03-07 16:09:56",
                        "children": [
                            {
                                "id": 3,
                                "pid": 1,
                                "type": 1,
                                "icon": "ios-code-working",
                                "name": "节点管理",
                                "code": "node",
                                "options": {
                                    "name": "systems_nodes",
                                    "path": "systems/nodes",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2018-05-26 07:32:54",
                                "updated_at": "2019-03-07 16:11:47"
                            },
                            {
                                "id": 93,
                                "pid": 1,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "用户管理",
                                "code": "systems_admins",
                                "options": {
                                    "name": "systems_admins",
                                    "path": "systems/admins",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-04 17:21:21",
                                "updated_at": "2019-03-07 16:14:24"
                            },
                            {
                                "id": 94,
                                "pid": 1,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "操作日志",
                                "code": "systems_actionlogs",
                                "options": {
                                    "name": "systems_actionlogs",
                                    "path": "systems/actionlogs",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-05 17:37:12",
                                "updated_at": "2019-03-12 11:43:05"
                            },
                            {
                                "id": 95,
                                "pid": 1,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "组织机构",
                                "code": "systems_departments",
                                "options": {
                                    "name": "systems_departments",
                                    "path": "systems/departments",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-07 16:55:50",
                                "updated_at": "2019-03-12 11:45:23"
                            },
                            {
                                "id": 104,
                                "pid": 1,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "角色管理",
                                "code": "roles",
                                "options": {
                                    "name": "systems_roles",
                                    "path": "systems/roles",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-12 11:55:43",
                                "updated_at": "2019-03-12 11:55:43"
                            },
                            {
                                "id": 116,
                                "pid": 1,
                                "type": 2,
                                "icon": "md-apps",
                                "name": "权限管理",
                                "code": "测试001",
                                "options": null,
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-14 22:26:45",
                                "updated_at": "2019-03-15 10:12:58",
                                "children": [
                                    {
                                        "id": 117,
                                        "pid": 116,
                                        "type": 2,
                                        "icon": "md-apps",
                                        "name": "比方说",
                                        "code": "123123",
                                        "options": null,
                                        "sort": 0,
                                        "status": true,
                                        "created_at": "2019-03-14 22:28:03",
                                        "updated_at": "2019-03-15 10:13:41",
                                        "children": [
                                            {
                                                "id": 118,
                                                "pid": 117,
                                                "type": 1,
                                                "icon": "md-apps",
                                                "name": "渠道管理",
                                                "code": "sdfsdfvvvv",
                                                "options": {
                                                    "name": "sdfsdfvvv",
                                                    "path": "prototypes/channel",
                                                    "tree_path": "1,116,117"
                                                },
                                                "sort": 0,
                                                "status": true,
                                                "created_at": "2019-03-14 22:30:24",
                                                "updated_at": "2019-03-15 10:14:42"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": 121,
                        "pid": 0,
                        "type": 2,
                        "icon": "md-add",
                        "name": "会员1",
                        "code": "uses",
                        "options": {
                            "tree_path": "0"
                        },
                        "sort": 0,
                        "status": true,
                        "created_at": "2019-03-29 03:43:35",
                        "updated_at": "2019-03-29 03:43:35",
                        "children": [
                            {
                                "id": 122,
                                "pid": 121,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "会员档案",
                                "code": "users_lists",
                                "options": {
                                    "name": "users_lists",
                                    "path": "users/lists",
                                    "tree_path": "121"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-29 03:44:27",
                                "updated_at": "2019-04-01 03:55:29"
                            },
                            {
                                "id": 123,
                                "pid": 121,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "预约管理",
                                "code": "reservations",
                                "options": {
                                    "name": "users_reservations",
                                    "path": "users/reservations",
                                    "tree_path": "121"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-29 07:25:13",
                                "updated_at": "2019-03-29 07:25:13"
                            }
                        ]
                    },
                    {
                        "id": 1,
                        "pid": 0,
                        "type": 2,
                        "icon": "md-alarm",
                        "name": "系统2",
                        "code": "systems",
                        "options": {
                            "name": "systems_nodes",
                            "path": "systems/nodes",
                            "tree_path": "0"
                        },
                        "sort": 0,
                        "status": true,
                        "created_at": "2018-05-26 07:32:54",
                        "updated_at": "2019-03-07 16:09:56",
                        "children": [
                            {
                                "id": 3,
                                "pid": 1,
                                "type": 1,
                                "icon": "ios-code-working",
                                "name": "节点管理",
                                "code": "node",
                                "options": {
                                    "name": "systems_nodes",
                                    "path": "systems/nodes",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2018-05-26 07:32:54",
                                "updated_at": "2019-03-07 16:11:47"
                            },
                            {
                                "id": 93,
                                "pid": 1,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "用户管理",
                                "code": "systems_admins",
                                "options": {
                                    "name": "systems_admins",
                                    "path": "systems/admins",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-04 17:21:21",
                                "updated_at": "2019-03-07 16:14:24"
                            },
                            {
                                "id": 94,
                                "pid": 1,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "操作日志",
                                "code": "systems_actionlogs",
                                "options": {
                                    "name": "systems_actionlogs",
                                    "path": "systems/actionlogs",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-05 17:37:12",
                                "updated_at": "2019-03-12 11:43:05"
                            },
                            {
                                "id": 95,
                                "pid": 1,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "组织机构",
                                "code": "systems_departments",
                                "options": {
                                    "name": "systems_departments",
                                    "path": "systems/departments",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-07 16:55:50",
                                "updated_at": "2019-03-12 11:45:23"
                            },
                            {
                                "id": 104,
                                "pid": 1,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "角色管理",
                                "code": "roles",
                                "options": {
                                    "name": "systems_roles",
                                    "path": "systems/roles",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-12 11:55:43",
                                "updated_at": "2019-03-12 11:55:43"
                            },
                            {
                                "id": 116,
                                "pid": 1,
                                "type": 2,
                                "icon": "md-apps",
                                "name": "权限管理",
                                "code": "测试001",
                                "options": null,
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-14 22:26:45",
                                "updated_at": "2019-03-15 10:12:58",
                                "children": [
                                    {
                                        "id": 117,
                                        "pid": 116,
                                        "type": 2,
                                        "icon": "md-apps",
                                        "name": "比方说",
                                        "code": "123123",
                                        "options": null,
                                        "sort": 0,
                                        "status": true,
                                        "created_at": "2019-03-14 22:28:03",
                                        "updated_at": "2019-03-15 10:13:41",
                                        "children": [
                                            {
                                                "id": 118,
                                                "pid": 117,
                                                "type": 1,
                                                "icon": "md-apps",
                                                "name": "渠道管理",
                                                "code": "sdfsdfvvvv",
                                                "options": {
                                                    "name": "sdfsdfvvv",
                                                    "path": "prototypes/channel",
                                                    "tree_path": "1,116,117"
                                                },
                                                "sort": 0,
                                                "status": true,
                                                "created_at": "2019-03-14 22:30:24",
                                                "updated_at": "2019-03-15 10:14:42"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": 121,
                        "pid": 0,
                        "type": 2,
                        "icon": "md-at",
                        "name": "会员vvv",
                        "code": "uses",
                        "options": {
                            "tree_path": "0"
                        },
                        "sort": 0,
                        "status": true,
                        "created_at": "2019-03-29 03:43:35",
                        "updated_at": "2019-03-29 03:43:35",
                        "children": [
                            {
                                "id": 122,
                                "pid": 121,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "会员档案",
                                "code": "users_lists",
                                "options": {
                                    "name": "users_lists",
                                    "path": "users/lists",
                                    "tree_path": "121"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-29 03:44:27",
                                "updated_at": "2019-04-01 03:55:29"
                            },
                            {
                                "id": 123,
                                "pid": 121,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "预约管理",
                                "code": "reservations",
                                "options": {
                                    "name": "users_reservations",
                                    "path": "users/reservations",
                                    "tree_path": "121"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-29 07:25:13",
                                "updated_at": "2019-03-29 07:25:13"
                            }
                        ]
                    },
                    {
                        "id": 1,
                        "pid": 0,
                        "type": 2,
                        "icon": "md-boat",
                        "name": "系统3434",
                        "code": "systems",
                        "options": {
                            "name": "systems_nodes",
                            "path": "systems/nodes",
                            "tree_path": "0"
                        },
                        "sort": 0,
                        "status": true,
                        "created_at": "2018-05-26 07:32:54",
                        "updated_at": "2019-03-07 16:09:56",
                        "children": [
                            {
                                "id": 3,
                                "pid": 1,
                                "type": 1,
                                "icon": "ios-code-working",
                                "name": "节点管理",
                                "code": "node",
                                "options": {
                                    "name": "systems_nodes",
                                    "path": "systems/nodes",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2018-05-26 07:32:54",
                                "updated_at": "2019-03-07 16:11:47"
                            },
                            {
                                "id": 93,
                                "pid": 1,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "用户管理",
                                "code": "systems_admins",
                                "options": {
                                    "name": "systems_admins",
                                    "path": "systems/admins",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-04 17:21:21",
                                "updated_at": "2019-03-07 16:14:24"
                            },
                            {
                                "id": 94,
                                "pid": 1,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "操作日志",
                                "code": "systems_actionlogs",
                                "options": {
                                    "name": "systems_actionlogs",
                                    "path": "systems/actionlogs",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-05 17:37:12",
                                "updated_at": "2019-03-12 11:43:05"
                            },
                            {
                                "id": 95,
                                "pid": 1,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "组织机构",
                                "code": "systems_departments",
                                "options": {
                                    "name": "systems_departments",
                                    "path": "systems/departments",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-07 16:55:50",
                                "updated_at": "2019-03-12 11:45:23"
                            },
                            {
                                "id": 104,
                                "pid": 1,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "角色管理",
                                "code": "roles",
                                "options": {
                                    "name": "systems_roles",
                                    "path": "systems/roles",
                                    "tree_path": "1"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-12 11:55:43",
                                "updated_at": "2019-03-12 11:55:43"
                            },
                            {
                                "id": 116,
                                "pid": 1,
                                "type": 2,
                                "icon": "md-apps",
                                "name": "权限管理",
                                "code": "测试001",
                                "options": null,
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-14 22:26:45",
                                "updated_at": "2019-03-15 10:12:58",
                                "children": [
                                    {
                                        "id": 117,
                                        "pid": 116,
                                        "type": 2,
                                        "icon": "md-apps",
                                        "name": "比方说",
                                        "code": "123123",
                                        "options": null,
                                        "sort": 0,
                                        "status": true,
                                        "created_at": "2019-03-14 22:28:03",
                                        "updated_at": "2019-03-15 10:13:41",
                                        "children": [
                                            {
                                                "id": 118,
                                                "pid": 117,
                                                "type": 1,
                                                "icon": "md-apps",
                                                "name": "渠道管理",
                                                "code": "sdfsdfvvvv",
                                                "options": {
                                                    "name": "sdfsdfvvv",
                                                    "path": "prototypes/channel",
                                                    "tree_path": "1,116,117"
                                                },
                                                "sort": 0,
                                                "status": true,
                                                "created_at": "2019-03-14 22:30:24",
                                                "updated_at": "2019-03-15 10:14:42"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        "id": 121,
                        "pid": 0,
                        "type": 2,
                        "icon": "ios-body",
                        "name": "会员",
                        "code": "uses",
                        "options": {
                            "tree_path": "0"
                        },
                        "sort": 0,
                        "status": true,
                        "created_at": "2019-03-29 03:43:35",
                        "updated_at": "2019-03-29 03:43:35",
                        "children": [
                            {
                                "id": 122,
                                "pid": 121,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "会员档案",
                                "code": "users_lists",
                                "options": {
                                    "name": "users_lists",
                                    "path": "users/lists",
                                    "tree_path": "121"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-29 03:44:27",
                                "updated_at": "2019-04-01 03:55:29"
                            },
                            {
                                "id": 123,
                                "pid": 121,
                                "type": 1,
                                "icon": "md-apps",
                                "name": "预约管理",
                                "code": "reservations",
                                "options": {
                                    "name": "users_reservations",
                                    "path": "users/reservations",
                                    "tree_path": "121"
                                },
                                "sort": 0,
                                "status": true,
                                "created_at": "2019-03-29 07:25:13",
                                "updated_at": "2019-03-29 07:25:13"
                            }
                        ]
                    }
                ],
            }
        }
    }
</script>

<style scoped>

</style>
