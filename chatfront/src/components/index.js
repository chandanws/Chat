import SvgIcon from '@/components/SvgIcon'
import TheHeader from '@/components/common/TheHeader'
import AsideFriendGroup from '@/components/common/AsideFriendGroup/AsideFriendGroup'
import FriendListItem from '@/components/common/AsideFriendGroup/FriendListItem'
import GroupListItem from '@/components/common/AsideFriendGroup/GroupListItem'
import ConversationList from '@/components/common/ConversationList/ConversationList'
import ConversationListItem from '@/components/common/ConversationList/ConversationListItem'

const components = {
  SvgIcon,
  TheHeader,
  AsideFriendGroup,
  ConversationList,
  ConversationListItem,
  FriendListItem,
  GroupListItem
}

export default (Vue) => {
  Object.keys(components).forEach((key) => {
    Vue.component(key, components[key])
  })
}
