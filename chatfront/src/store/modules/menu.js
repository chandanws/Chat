// 状态管理，如header中“会话(notice)的icon”、“人(people)的icon”，辅助组件间进行通信

const choosenState = {
  state: {
    isNoticed: true,  // header中的状态，true表示选择“会话(notice)”，false为“人(people)”
    flag: 0 // 该flag标识class为show-router区域div的当前页面，default-page: 0, chat-room: 1, personal-page: 2, setting: 3
  },
  mutaions: {

  },
  actions: {
    
  }
}

export default choosenState
