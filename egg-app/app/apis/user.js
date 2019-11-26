/**
 * user API 列表
 * 约定API名称跟action名称保持一致
 */

var userApis = {    
    EDIT_USER_NICKNAME: {
      adaptorName: 'http',
      http: {
        url:'/users/v1',
        method: 'PUT',
      }
    },
    GET_USER_INFO: {
      adaptorName: 'http',
      http: {
        url:'/v1/user/info',
        method:'GET'
      }
    },
    GET_USER_SCHOOL: {
      adaptorName: 'http',
      http: {
        url:'/c/v1/user/apply-state',
        method:'GET'
      }
    },
    GET_SCHOOL_NAME_BY_CODE: {
      adaptorName: 'http',
      http: {
        url:'/users/v1/inviteCode/:code',
        method:'GET'
      }
    },
    VALIDATE_PHONE: {
      adaptorName: 'http',
      http: {
        url: '/users/v1/info/phone',
        method: 'GET'
      }
    },
    GET_USER_INFO_MORE: {
      adaptorName: 'http',
      http: {
        url:'/v1/user/info/more',
        method:'GET'
      } 
    },
    APPLY_SCHOOL: {
      adaptorName: 'http',
      http: {
        url:'/users/v1/school/apply',
        method:'POST'
      }
    },
    UN_BIND_APPLY: {
      adaptorName: 'http',
      http: {
        url:'/users/v1/info/unbind',
        method:'POST'
      }
    },
    UN_BIND_APPLY_ORIGIN: {
      adaptorName: 'http',
      http: {
        url:'/users/v1/unbind',
        method:'POST'
      }
    },
    USER_GET_ROLE: {
      adaptorName: 'http',
      http: {
        url:'/v1/users/role',
        method:'GET'
      }
    },
    USER_GET_PRIVILEGE: {
      adaptorName: 'http',
      http: {
        url:'/permission/v1/viewallpermission',
        method:'GET'
      }
    },
    USER_GET_ISNOTICED: {
      adaptorName: 'http',
      http: {
        url: '/v1/manager/notice',
        method: 'GET'
      }
    },
    USER_SET_ISNOTICED: {
      adaptorName: 'http',
      http: {
        url: '/v1/manager/notice',
        method: 'PUT'
      }
    },
    RESET_USER_BIND_FAIL: {
      adaptorName: 'http',
      http: {
        url: '/users/v1/unbind',
        method: 'POST'
      }
    },
    USER_GET_INFO_BY_PHONE: {
      adaptorName: 'http',
      http: {
        url: '/v1/user/:phone',
        method: 'GET'
      }
    },
    USER_GET_WX_UNLOCK: {
      adaptorName: 'http',
      http: {
        url: '/v1/school/wx/unlock',
        method: 'GET'
      },
      mock: {
        data: {
          statusCode: 200,
          message: 'mock test',
          'data': {
            'schoolId': '77925033822641ce956b4a86dbe54d39',
            'currentTeacher': 8,  //当前教师数
            'isFirstOpen': true, //是否是今天第一次打开
            'isUnlock': false, //是否达到解锁条件
            'isFirstReach': false //是否是第一次达标
          }
        }
      }
    },
    USER_SET_WX_UNLOCK: {
      adaptorName: 'http',
      http: {
        url: '/v1/school/wx/unlocked',
        method: 'POST'
      }
    },
    MODIFY_PASSWORD: {
      adaptorName: 'http',
      http: {
        url: '/t/v1/settings/password',
        method: 'PUT',
        jsonBody: true,
      },
      mock: {
        data: {
          statusCode: 200,
          message: 'mock test',
        }
      }
    },
  }
  
  module.exports = userApis;