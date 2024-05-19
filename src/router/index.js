import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/Login.vue'
import StudentContainer from '../views/container/StudentContainer.vue'
import StudentInfo from '../views/studentInfo/StudentInfo.vue'
import ScoreManagment from '../views/scoremanagement/ScoreManagment.vue'
import ClassManagement from '../views/classmanagement/ClassManagement.vue'
import SubjectManagement from '../views/subjectmanagement/SubjectManagement.vue'
import CourseManagement from '../views/coursemanagement/CourseManagement.vue'
import PersonalInfo from '../views/personalInfo/PersonalInfo.vue'
import NoticeManagement from '../views/noticemanagement/NoticeManagement.vue'
import StudentContainWeb from '../views/studentweb/contain/StudentContainWeb.vue'
import CheckHomeWork from '../views/studentweb/homeworkmanagement/checkhomework/CheckHomeWork.vue'
import NoHomeWork from '../views/studentweb/homeworkmanagement/checkhomework/NoHomeWork.vue'
import AskAndAnswer from '../views/studentweb/askandanswer/AskAndAnswer.vue'
import StudentPractice from '../views/studentweb/practice/StudentPractice.vue'
import OnLineLearn from '../views/studentweb/onlinelearn/OnLineLearn.vue'
import EssentiaInfo from '../views/studentweb/essentialinformation/EssentiaInfo.vue'
import StudentManagement from '../views/studentweb/studentmanagement/StudentManagement.vue'
import AdminManagement from '../views/admin/AdminManagement.vue'
import MarkDown from '../views/studentweb/markdown/MarkDown.vue'
import DetaliCourse from '../views/studentweb/askandanswer/DetaliCourse.vue'
import home from '../views/studentweb/contain/home.vue'
import AdminStudentManagement from '../views/admin/studentmanagement/StudentManagement.vue'
import TeacherManagement from '../views/admin/teacherm/TeacherManagement.vue'
import AdminHomeWork from '../views/admin/adminhomework/AdminHomeWork.vue'
import TestManagement from '../views/admin/testmanagement/TestManagement.vue'
import KnowledgePoints from '../views/admin/knowledgepoints/KnowledgePoints.vue'
import AdminPersonalInfo from '../views/admin/personalInfo/PersonalInfo.vue'
import TeacherPersonalInfo from '../views/admin/personalInfo/PersonalInfo.vue'
import ApplicantHistory from '../views/studentweb/studentmanagement/ApplicantHistory.vue'
import TeacherApplicant from '../views/teacherapplicant/TeacherApplicant.vue'
import DetailOnlineWeb from '../views/studentweb/onlinelearn/DetailOnlineWeb.vue'
import PracticeDetail from '../views/studentweb/practice/practiceDetail/PracticeDetail.vue'
import MarkDownNotHomeWork from '../views/studentweb/homeworkmanagement/MarkDownNotHomeWork.vue'
import HomeworkDetail from '../views/admin/adminhomework/HomeworkDetail.vue'
import TestHomeWork from '../views/admin/testmanagement/TestHomeWork.vue'
import KnowDetail from '../views/admin/knowledgepoints/KnowDetail.vue'
import Detail from '../views/scoremanagement/Detail.vue'
import StudentDetail from '../views/scoremanagement/Detail.vue'
import DetailMark from '../views/scoremanagement/DetailMark.vue'
import NotHomework from '../views/scoremanagement/NotHomework.vue'
import PDetail from '../views/personalInfo/PDetail.vue'
import Video from '../views/video/Video.vue'
// import teacherVideo from '../views/studentweb/onlinelearn/DetailOnlineWeb.vue'
import teacherVideo from '../views/studentweb/onlinelearn/DetailOnlineWebTeacher.vue'
import DoHomeWork from '../views/classmanagement/DoHomeWork.vue'
import NotHomeWork from '../views/classmanagement/NotHomeWork.vue'
import pDetail from '../views/studentweb/practice/practiceDetail/pDetail.vue'
import ClassManagementAdmin from '../views/admin/classmanagement/ClassManagement.vue'
import Subject from '../views/admin/subject/Subject.vue'

Vue.use(VueRouter)

const routes = [

  {
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '/studentdetail',
    name: 'StudentDetail',
    component: StudentDetail,
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    },
  }, {
    path: '/pDetail',
    name: 'pDetail',
    component: pDetail,
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    },
  },
  {
    path: '/nothomework',
    name: 'NotHomework',
    component: NotHomework,
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    },
  },
  {
    path: '/pdetailteacher',
    name: 'PDetail',
    component: PDetail,
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    },
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail,
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    },
  }, {
    path: '/detailmark',
    name: 'DetailMark',
    component: DetailMark,
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    },
  },
  {
    path: '/detailonlineweb',
    name: 'DetailOnlineWeb',
    component: DetailOnlineWeb,
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    },
  }, {
    path: '/TestHomeWork',
    name: 'TestHomeWork',
    component: TestHomeWork,
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    },
  }, {
    path: '/KnowDetail',
    name: 'KnowDetail',
    component: KnowDetail,
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    },
  },
  {
    path: '/markdown',
    name: 'MarkDown',
    component: MarkDown,
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    },
  }, {
    path: '/markdownnothomework',
    name: 'MarkDownNotHomeWork',
    component: MarkDownNotHomeWork,
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    },
  },
  {
    path: '/homeworkdetail',
    name: 'HomeworkDetail',
    component: HomeworkDetail,
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    },
  },
  {
    path: '/detalicourse',
    name: 'DetaliCourse',
    component: DetaliCourse,
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    },
  },
  {
    path: '/adminmanagement',
    name: 'AdminManagement',
    component: AdminManagement,
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    },
    children: [
      {
        path: '/adminstudentmanagement',
        name: 'AdminStudentManagement',
        component: AdminStudentManagement,
        meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      },
      {
        path: '/subject',
        name: 'Subject',
        component: Subject,
        meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      },
      {
        path: '/classmanagementadmin',
        name: 'ClassManagementAdmin',
        component: ClassManagementAdmin,
        meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      },
      {
        path: '/teachermanagement',
        name: 'TeacherManagement',
        component: TeacherManagement,
        meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      },
      {
        path: '/adminhomework',
        name: 'AdminHomeWork',
        component: AdminHomeWork,
        meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      },
      {
        path: '/testmanagement',
        name: 'TestManagement',
        component: TestManagement,
        meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      },
      {
        path: '/knowledgepoints',
        name: 'KnowledgePoints',
        component: KnowledgePoints,
        meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      },
      {
        path: '/adminpersonalinfo',
        name: 'AdminPersonalInfo',
        component: AdminPersonalInfo,
        meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      },
    ]
  },
  {
    path: '/studentweb',
    name: 'StudentContainWeb',
    component: StudentContainWeb,
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    },
    redirect: {name: "OnLineLearn"},
    children: [

       {
         path: '/home',
         name: 'home',
         component: home,
         meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
         },
       },
       {
         path: '/practicedetail',
         name: 'PracticeDetail',
         component: PracticeDetail,
         meta: {
           requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
         },
       },

      {
        path: '/checkhomework',
        name: 'CheckHomeWork',
        component: CheckHomeWork,
        meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      },
      {
        path: '/nohomework',
        name: 'NoHomeWork',
        component: NoHomeWork,
        meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      },
      {
        path: '/askandanswer',
        name: 'AskAndAnswer',
        component: AskAndAnswer,
        meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      },
      {
        path: '/studentpractice',
        name: 'StudentPractice',
        component: StudentPractice,
        meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      },
      {
        path: '/onlinelearn',
        name: 'OnLineLearn',
        component: OnLineLearn,
        meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      },
      {
        path: '/essentiainfo',
        name: 'EssentiaInfo',
        component: EssentiaInfo,
        meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      },
      {
        path: '/studentmanagement',
        name: 'StudentManagement',
        component: StudentManagement,
        meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      },
      {
        path: '/applicanthistory',
        name: 'ApplicantHistory',
        component: ApplicantHistory,
        meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      },

      {
        path: '/videohistory',
        name: 'VideoHistory',
        component: VideoHistory,
        meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      }

    ]
  },

  {
    path: '/hometeacher',
    name: 'StudentContainer',
    component: StudentContainer,
    meta: {
      requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
    },
    children: [
      {
        path: '/studentinfo',
        name: 'StudentInfo',
        component: StudentInfo,
        meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      },

      {
        path: '/dohomework',
        name: 'DoHomeWork',
        component: DoHomeWork,
        meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      },
      {
        path: '/nothomework',
        name: 'NotHomeWork',
        component: NotHomeWork,
        meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      },
      {
        path: '/teacherpersonalinfo',
        name: 'TeacherPersonalInfo',
        component: TeacherPersonalInfo,
        meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      },
      {
        path: '/video',
        name: 'Video',
        component: Video,
        meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      },
      {
        path: '/stdentvideo',
        name: 'StdentVideo',
        component: StdentVideo,
        meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      },
      {
        path: '/teachervideo',
        name: 'teacherVideo',
        component: teacherVideo,
        meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      },

      {
         path: '/scoremanagment',
         name: 'ScoreManagment',
         component: ScoreManagment,
         meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
         },
       },
       {
         path: '/classmanagement',
         name: 'ClassManagement',
         component: ClassManagement,
         meta: {
           requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
         },
      },
      {
        path: '/subjectmanagement',
        name: 'SubjectManagement',
        component: SubjectManagement,
        meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      },
       {
         path: '/coursemanagement',
        name: 'CourseManagement',
        component: CourseManagement,
         meta: {
           requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
       },
       {
         path: '/noticemanagement',
         name: 'NoticeManagement',
         component: NoticeManagement,
        meta: {
           requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
         },
       },
       {
       path: '/personalinfo',
        name: 'PersonalInfo',
         component: PersonalInfo,
        meta: {
         requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
         },
       },
      {
        path: '/teacherapplicant',
        name: 'TeacherApplicant',
        component: TeacherApplicant,
        meta: {
          requireAuth: true,  // 添加该字段，表示进入这个路由是需要登录的
        },
      },
    ]
  },


]


import Cookies from "js-cookie";
import VideoHistory from "@/views/videohistory/VideoHistory.vue";
import StdentVideo from "@/views/video/StdentVideo.vue";

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {  // 判断该路由是否需要登录权限
    if (Cookies.get("userId")) {  // 通过vuex state获取当前的token是否存在
      next();
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}  // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next();
  }
})

export default router
