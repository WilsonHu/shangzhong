import Login from '../components/Login.vue'
import NotFound from '../components/404.vue'
import Home from '../components/home.vue'


import DataManage from "../components/datamanage.vue"
import ClassData from "../components/datamanage/classdata.vue"
import RecordQuery from "../components/datamanage/recordquery.vue"
import DataBus from "../components/datamanage/databus.vue"

import SchoolBus from "../components/schoolbus.vue"
import BusManage from "../components/schoolbus/busmanage.vue"
import NightWay from "../components/schoolbus/nightway.vue"
import LineManage from "../components/schoolbus/linemanage.vue"
import SiteLib from "../components/schoolbus/sitelib.vue"
import MesManage from '../components/schoolbus/mesmanage.vue'

import Student from "../components/student.vue"
import StudentMange from "../components/student/studentmange.vue"
import ChangeMange from "../components/student/changemange.vue"


//system
import System from "../components/system.vue"
import UserManage from '../components/system/user_manage.vue'
import RoleManage from '../components/system/role_manage.vue'
import DataSync from '../components/system/data_sync.vue'


export default
[
	{
		path: '/login',
		component: Login,
		name: 'Login',
		hidden: true
	},
	{
		path: '/404',
		component: NotFound,
		name: '404',
		hidden: true
	},
	{
		path: '/home',
		component: Home,
		redirect: '/home/datamanage/databus',
		children: [
			{
				path: '/home/datamanage',
				component: DataManage,
				name: 'DataManage',
				icon: 'el-icon-menu',
                hidden: false,

				meta: "数据管理",
				children: [
					{
						path: '/home/datamanage/databus',
						component: DataBus,
						name: 'DataBus',
						meta: '校车数据',
					},
					{
						path: '/home/datamanage/classdata',
						component: ClassData,
						name: 'ClassData',
						meta: '班级数据'
					},
					{
						path: '/home/datamanage/recordquery',
						component: RecordQuery,
						name: 'RecordQuery',
						meta: '记录查询'
					},
				],
			},
			{
				path: '/home/schoolbus',
				component: SchoolBus,
				name: 'SchoolBus',
				meta: "校车管理",
				icon: 'el-icon-date',
				hidden: false,

				children: [
					{
						path: '/home/schoolbus/busmanage',
						component: BusManage,
						name: 'BusManage',
						meta: '校车列表'
					},
					{
						path: '/home/schoolbus/sitelib',
						component: SiteLib,
						name: 'SiteLib',
						meta: '站点库'
					},
					{
						path: '/home/schoolbus/mesmanage',
						component: MesManage,
						name: 'MesManage',
						meta: '消息管理'
					},
                    {
                        path: '/home/schoolbus/linemamage',
                        component: LineManage,
                        name: 'LineManage',
                        meta: '线路管理'
                    },
                    {
                        path: '/home/schoolbus/nightway',
                        component: NightWay,
                        name: 'NightWay',
                        meta: '晚班线路'
                    },
				],
			},
			{
				path: '/home/student',
				component: Student,
				name: 'Student',
				icon: 'el-icon-news',

				meta: "学生管理",
                hidden: false,
				children: [
					{
						path: '/home/student/studentmange',
						component: StudentMange,
						name: 'StudentMange',
						meta: '学生列表'
					},
					{
						path: '/home/student/changemange',
						component: ChangeMange,
						name: 'ChangeMange',
						meta: '变更列表'
					},
				],
			},
			{
				path: '/home/system',
				component: System,
				name: 'System',
				icon: 'el-icon-setting',

				meta: "系统管理",
				hidden: false,
				children: [
					{
						path: '/home/system/user_manage',
						component: UserManage,
						name: 'user_manage',
						meta: '用户管理'
					},
					{
						path: '/home/system/role_manage',
						component: RoleManage,
						name: 'role_manage',
						meta: '角色管理'
					},
                    {
                        path: '/home/system/data_sync',
                        component: DataSync,
                        name: 'data_sync',
                        meta: '数据同步'
                    }
				],
			},
		]
	},
	{
		path: '/',
		redirect: '/home',
		hidden: true
	},
]
