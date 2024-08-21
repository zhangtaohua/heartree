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

      <view
        v-for="(dateRows, index) in monthData.dateArrays"
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
            :class="{
              cmi_cols_valdeactive: !item.isLight,
              cmi_cols_val_active: item.fullDate === currentFullDate,
            }"
            @click="selectDate(item)"
          >
            <view>{{ item.date }}</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { reactive } from "vue";

const leapYearMonth = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const normalYearMonth = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const dateHeader = ["日", "一", "二", "三", "四", "五", "六"];

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
  setDateShowArray();
}

function selectDate(date) {}
</script>

<style scoped lang="scss"></style>
