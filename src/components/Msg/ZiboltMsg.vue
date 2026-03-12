<template>
  <div class="msg-box" :class="{ right: right }">
    <template> </template>
    <time-msg v-if="props.msg.isShowTime" :content="props.msg.createTime" class="mb-[10px]" />
    <template v-if="msg.type === 'recall'">
      <recall-msg :msg="msg" />
    </template>
    <div v-else class="msg-box-wrapper" :class="{ right: right }">
      <zibolt-avatar
        :info="userInfo"
        size="40px"
        class="mr-[5px] ml-[5px]"
      />
      <div class="msg-box-info">
        <!--用户信息-->
        <div class="mgs-box-user-info" :class="{ right: right }">
          <div class="msg-username">
            {{ userInfo?.name ?? props.msg.fromInfo?.name ?? '未知用户' }}
          </div>
          <div class="mgs-ip ml-[2px] mr-[2px]">
            [{{ props.msg.fromInfo?.ipOwnership ?? '未知' }}]
          </div>
        </div>
        <!--消息内容-->
        <zibolt-msg-content :right="right" :msg="props.msg" />
        <!--引用信息-->
        <div class="msg-box-info-reference" v-if="props.msg.referenceMsg" :class="{ right: right }">
          <zibolt-reference-content :msg="props.msg.referenceMsg" />
          <i class="iconfont icon-zhiding ml-[5px]" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed } from 'vue'
import ZiboltMsgContent from '@/components/Msg/ZiboltMsgContent.vue'
import ZiboltAvatar from '@/components/ZiboltAvatar.vue'
import RecallMsg from '@/components/Msg/MsgContent/RecallMsg.vue'
import ZiboltReferenceContent from '@/components/Msg/ZiboltReferenceContent.vue'
import TimeMsg from '@/components/Msg/MsgContent/TimeMsg.vue'
import { useUserInfoStore } from '@/stores/useUserInfoStore.js'
import { useChatMsgStore } from '@/stores/useChatMsgStore.js'

const userInfoStore = useUserInfoStore()
const msgStore = useChatMsgStore()

const props = defineProps({
  msg: Object,
  user: Object,
})


// 安全获取用户信息
const userInfo = computed(() => {
  return props.user || msgStore.userListMap.get(props.msg.fromId) || props.msg.fromInfo
})



const right = props.msg.fromId === userInfoStore.userId
</script>
<style lang="less" scoped>
.msg-box {
  display: flex;
  margin-bottom: 20px;
  width: 100%;
  flex-direction: column;

  .msg-box-wrapper {
    display: flex;

    .msg-box-info {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 100%;

      .mgs-box-user-info {
        display: flex;
        align-items: center;
        height: 30px;

        &.right {
          flex-direction: row-reverse;
        }

        .msg-username {
          color: rgba(var(--text-color), 0.7);
          user-select: none;
          font-size: 14px;
          font-weight: 600;
        }

        .mgs-ip {
          color: rgba(var(--text-color), 0.6);
          user-select: none;
          font-size: 12px;
          font-weight: 600;
        }
      }

      .msg-box-info-reference {
        max-width: 60%;
        word-break: break-word;
        margin-top: 5px;
        padding: 2px 10px;
        border-radius: 4px;
        background-color: rgba(var(--text-color), 0.05);
        user-select: none;
        display: flex;
        font-size: 14px;
        color: rgba(var(--text-color), 0.7);
        border: rgba(var(--text-color), 0.07) 1px solid;

        &.right {
          flex-direction: row-reverse;

          i {
            margin-right: 10px;
            margin-left: 0;
          }
        }
      }
    }

    &.right {
      flex-direction: row-reverse;
    }
  }

  &.right {
    justify-content: flex-end;

    .msg-box-info {
      align-items: flex-end;
    }
  }
}
</style>
