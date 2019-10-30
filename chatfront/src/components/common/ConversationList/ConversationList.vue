<template>
  <div class="conversation-list-container">
    <conversation-list-item
      :conversationListItem="item"
      v-for="(item, key) in conversationList"
      :key="key"
    ></conversation-list-item>
  </div>
</template>

<script>
export default {
  data () {
    return {
      conversationList: [
        {
          avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          account: 'honeysyt',
          content: '[图片]',
          code: '4567'
        },
        {
          avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          account: 'Leooel',
          content: '哈哈',
          code: '4567'
        },
        {
          avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          account: '我的安卓手机',
          content: '你已登录手机TIM，可传文件',
          code: '4567'
        },
        {
          avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          account: '牛客2020秋招备战-前端',
          content: '不改名:[图片]',
          code: '4567'
        }, {
          avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          account: '牛客2020秋招备战-前端',
          content: '不改名:[图片]',
          code: '4567'
        }
        , {
          avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          account: '牛客2020秋招备战-前端',
          content: '不改名:[图片]',
          code: '4567'
        }
        , {
          avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          account: '牛客2020秋招备战-前端',
          content: '不改名:[图片]',
          code: '4567'
        }
        , {
          avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          account: '牛客2020秋招备战-前端',
          content: '不改名:[图片]',
          code: '4567'
        }
        , {
          avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          account: '牛客2020秋招备战-前端',
          content: '不改名:[图片]',
          code: '4567'
        }
        , {
          avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          account: '牛客2020秋招备战-前端',
          content: '不改名:[图片]',
          code: '4567'
        }
        , {
          avatar: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          account: '牛客2020秋招备战-前端',
          content: '不改名:[图片]',
          code: '4567'
        }
      ]
    }
  },
  mounted () {
    // 载入默认页路由
    this.$router.push({
      name: 'default'
    })
    // 加载会话(好友和群聊)列表
  },
  methods: {
    // itemClickedF (flag) {
    //   console.log('父组件被点击')
    // }
  }
}
</script>
