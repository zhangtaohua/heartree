<template>
  <view class="row_nw_fs_center cmi_container">
    <view class="col_nw_center_center cmi_body">
      <view class="row_nw_sb_center cmi_header_box">
        <view
          v-for="(item, index) in dateHeader"
          :key="'cmi_header_' + index"
          class="row_nw_center_center cmi_header_title_box"
        >
          <view
            class="row_nw_center_center cmi_header_title"
            :class="{ cmi_header_active: index === 0 || index === 6 }"
            >{{ item }}</view
          >
        </view>
      </view>

      <view class="cmi_hgap"></view>
      <view class="col_nw_center_center cmi_body_box">
        <view
          v-for="(dateRows, index) in calendarData.dateShowArray"
          :key="'date_body_' + index"
          class="row_nw_sb_center cmi_rows"
        >
          <view
            v-for="(item, ind) in dateRows"
            :key="'date_bv_' + ind"
            class="row_nw_center_center cmi_cols"
          >
            <view
              class="col_nw_center_center cmi_cols_val"
              hover-class="cmi_cols_val_hover"
              hover-stay-time="250"
              :class="{
                cmi_cols_valdeactive: !item.isLight,
                cmi_cols_val_active: item.fullDate === currentFullDate,
              }"
              @tap.prevent.stop="selectDate(item)"
            >
              <view>{{ item.date }}</view>
              <view v-if="item.fullDate === todayYMD" class="cmi_today_flag"></view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { reactive } from "vue";
import { dateHeader, getDateFormat, useCalendar } from "@/mixins/date/calendar";

const { calendarData, setLimitdate, getDateShowArray } = useCalendar();
const props = defineProps({});

const emit = defineEmits(["change"]);

const monthData = reactive({
  dateRows: null,
  currentFullDate: "",
});

function init() {
  const start = new Date();
  const end = new Date();
  start.setTime(start.getTime() + 3600 * 1000 * 24 * 0);
  end.setTime(end.getTime() + 3600 * 1000 * 24 * 7);
  const showStartDate = getDateFormat(start);
  const showEndDate = getDateFormat(end);

  const currentFullDate = showStartDate;
  const tempDate = showStartDate.split("-");
  const startLimitDate = {
    fullDate: showStartDate,
    year: parseInt(tempDate[0]),
    month: parseInt(tempDate[1]),
    date: parseInt(tempDate[2]),
  };
  getDateShowArray();
}

init();

function selectDate(date) {}
</script>

<style scoped lang="scss">
.cmi_container {
  width: 100%;
  height: auto;
}

.cmi_body {
  width: 100%;
  height: auto;
}

.cmi_header_box {
  width: 100%;
  height: 84rpx;
}

.cmi_header_title_box {
  width: 84rpx;
  height: 84rpx;
}

.cmi_header_title {
  width: 100%;
  height: 100%;
  font-size: 20rpx;
  font-family: PingFang SC;
  font-weight: 400;
  color: #b1b1b1;
}

.cmi_header_active {
  color: rgba(61, 85, 240, 1);
}

.cmi_hgap {
  width: 96%;
  height: 0px;
  border-bottom: 1rpx solid #dbdbdb;
}

.cmi_body_box {
  width: 100%;
  height: auto;
  padding-bottom: 32rpx;
}

.cmi_rows {
  width: 100%;
  height: 84rpx;
}

.cmi_cols {
  position: relative;
  width: 84rpx;
  height: 84rpx;
}

.cmi_cols_val {
  width: 34rpx;
  height: 34rpx;
  font-size: 28rpx;
  font-family: PingFang SC;
  font-weight: bolder;
  color: #445996;
}

.cmi_cols_valdeactive {
  font-weight: bold;
  color: #d0d0d0;
}

.cmi_cols_val_hover {
  width: 72rpx;
  height: 72rpx;
  color: #ffffff;
  background: #74a4ff;
  border: 2rpx solid #3d55f0;
  border-radius: 50%;
}

/*  #ifdef H5  */
cmi_cols_val:hover {
  width: 72rpx;
  height: 72rpx;
  color: #ffffff;
  background: #74a4ff;
  border: 2rpx solid #3d55f0;
  border-radius: 50%;
}
/*  #endif  */

.cmi_cols_val_active {
  width: 72rpx;
  height: 72rpx;
  color: #ffffff;
  background: #74a4ff;
  border: 2rpx solid #3d55f0;
  border-radius: 50%;
}

.cmi_today_flag {
  position: absolute;
  width: 16rpx;
  height: 16rpx;
  top: 0;
  right: 0;
  background: #ff5353;
  border-radius: 50%;
}

.cmi_action_box {
  position: absolute;
  width: 100%;
  height: 80rpx;
  left: 0;
  bottom: 40rpx;
  background: #3d55f0;
  border-radius: 40rpx;
  font-size: 32rpx;
  font-family: PingFang SC;
  font-weight: bold;
  color: #ffffff;
  letter-spacing: 46rpx;
}
</style>
