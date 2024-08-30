<template>
	<view v-if="isShow" class="col_nw_fs_center cdate_containner"
		@tap="onSendDate(false)"
	>
		<view class="col_nw_fs_center cdate_wraper" @tap.stop="() => {}">
			<view class="col_nw_fs_center cdate_content">

				<view class="row_nw_center_center cdate_switch_box">
					<view class="row_nw_center_center cdate_switch_btns"
						@tap="getLastYearDateArr"
					>&lt;&lt;</view>
					<view class="row_nw_center_center cdate_switch_btns"
						@tap="getLastMonthDateArr"
					>&lt;</view>
					<view class="row_nw_center_center cdate_switch_show"
						 @tap="getTodayDateArr"
					>{{ currentYM }}</view>
					<view class="row_nw_center_center cdate_switch_btns"
						@tap="getNextMonthDateArr"
					>&gt;</view>
					<view class="row_nw_center_center cdate_switch_btns"
						@tap="getNextYearDateArr"
					>&gt;&gt;</view>
					<view class="row_nw_center_center cdate_switch_btnc"
							@tap.prevent.stop="onSendDate(false)"
					>x</view>
				</view>

				<view class="row_nw_sb_center cdate_header_box">
					<view
						v-for="(item, index) in dateHeader"
						:key="'header_' + index"
						class="row_nw_center_center cdate_header_title_box"
					>
						<view
							class="row_nw_center_center cdate_header_title"
							:class="{cdate_header_active: index === 0 || index ===6 }"
						>{{ item }}</view>
					</view>
				</view>

				<view class="cdate_hgap"></view>


				<view class="col_nw_center_center cdate_body_box">
					<view
						v-for="(dateRows, index) in dateShowArray.data"
						:key="'date_' + index"
						class="row_nw_sb_center cdate_body_rows"
					>
						<view
							v-for="(item, ind) in dateRows"
							:key="'date_body_' + ind"
							class="row_nw_center_center cdate_body_value_box"
						>
							<view
								class="col_nw_center_center cdate_body_value"
								hover-class="cdate_body_value_hover" hover-stay-time="250"
								:class="{cdate_body_value_deactive: !item.isLight, cdate_body_value_active: item.fullDate === currentFullDate}"
								@tap.prevent.stop="selectDate(item)"
							>
								{{ item.date }}
								<view v-if="item.fullDate === todayYMD" class="cdate_today_flag"></view>
							</view>
						</view>
					</view>
				</view>

				<view class="cdate_hgap"></view>
				<view class="row_nw_center_center cdate_action_box"
					@tap.prevent.stop="onSendDate(true)"
				>确定</view>
			</view>
		</view>
	</view>
</template>

<script>
import { defineComponent, reactive, ref } from 'vue'
import { leapYearMonth, normalYearMonth, dateHeader, isLeapYear, checkOutDate } from '../../utils/date/dateTools'
import { newDate, getDate } from '../../utils/date/dateFormat'

export default defineComponent({
	name: 'Calendar',
	props: {
		isShow: {
			type: Boolean,
			default: true
		}
	},
	emits: ["onChange"],
	setup(props, ctx) {
		const dateShowArray = reactive({
			data: []
		})

		let todayYMD = ''
		const currentYM = ref('')
		const currentFullDate = ref('')

		function init() {
			const {YMD, YM} = getDate()
			todayYMD = YMD
			currentYM.value = YM
			currentFullDate.value = YMD
			setDateShowArray()
		}
		init()

		function setDateShowArray(dateStr = '') {
			let dateNow = null
			if (dateStr === '') {
				dateNow = newDate()
			} else {
				dateNow = newDate(dateStr)
			}
			

			const date = dateNow.date() // 1~31
			const day = dateNow.day() // 0-6
			let month = dateNow.month() + 1 // 0~11
			const year = dateNow.year()

			let lastYear = year
			let nextYear = year

			let lastMonth = month - 1
			if (lastMonth < 1) {
				lastMonth = 12
				lastYear = year - 1
			}

			let nextMonth = month + 1
			if (nextMonth > 12) {
				nextMonth = 1
				nextYear = year + 1
			}

			let daysOfMonth = 0
			let lastDaysOfMonth = 0
			let nextDaysOfMonth = 0

			let isLeap = isLeapYear(year)
			if (isLeap) {
				daysOfMonth = leapYearMonth[month]
			} else {
				daysOfMonth = normalYearMonth[month]
			}

			isLeap = isLeapYear(lastYear)
			if (isLeap) {
				lastDaysOfMonth = leapYearMonth[lastMonth]
			} else {
				lastDaysOfMonth = normalYearMonth[lastMonth]
			}

			isLeap = isLeapYear(nextYear)
			if (isLeap) {
				nextDaysOfMonth = leapYearMonth[nextMonth]
			} else {
				nextDaysOfMonth = normalYearMonth[nextMonth]
			}
			const monthstr = month > 9 ? month : '0'+ month
			const dateFirst = newDate(`${year}-${monthstr}-01`)
			const beforeDay = dateFirst.day() // 0-6
			const beforeInsertDays = beforeDay

			// console.log("dateNow", dateFirst, `${year}-${monthstr}-01`)

			const afterInsertDays = 7 - ((daysOfMonth - (7 - beforeDay)) % 7)

			const tempDateArray = []
			// 只能放在外面
			lastMonth = lastMonth > 9 ? lastMonth : '0' + lastMonth
			for (let i = (beforeInsertDays - 1); i >= 0; i--) {
				let tempDay = lastDaysOfMonth - i
				tempDay = tempDay > 9 ? tempDay : '0' + tempDay
				const tempDate = {
					'date': tempDay,
					'YM': `${lastYear}年${lastMonth}月`,
					'fullDate': `${lastYear}-${lastMonth}-${tempDay}`,
					'isLight': false,
					'isLast': 1
				}
				tempDateArray.push(tempDate)
			}

			month = month > 9 ? month : '0' + month
			for (let i = 1; i <= daysOfMonth; i++) {
				let tempDay = i
				tempDay = tempDay > 9 ? tempDay : '0' + tempDay
				let tempDate = {
						'date': tempDay,
						'YM': `${year}年${month}月`,
						'fullDate': `${year}-${month}-${tempDay}`,
						'isLight': true,
						'isLast': 2
					}
				tempDateArray.push(tempDate)
			}

			nextMonth = nextMonth > 9 ? nextMonth : '0' + nextMonth
			for (let i = 1; i <= afterInsertDays; i++) {
				let tempDay = i
				tempDay = tempDay > 9 ? tempDay : '0' + tempDay
				const tempDate = {
					'date': tempDay,
					'YM': `${nextYear}年${nextMonth}月`,
					'fullDate': `${nextYear}-${nextMonth}-${tempDay}`,
					'isLight': false,
					'isLast': 3
				}
				tempDateArray.push(tempDate)
			}

			const dateArr = []
			for (let i = 0; i < tempDateArray.length; i = i + 7) {
				dateArr.push(tempDateArray.slice(i, i + 7))
			}
			dateShowArray.data = dateArr
		}

		function getLastYearDateArr() {
			const currentDates = currentFullDate.value.split('-')
			let lastYear = Number(currentDates[0]) - 1
			if(lastYear <= 1970) {
				lastYear = 1970
			}

			let dateChecked = checkOutDate(lastYear, currentDates[1], currentDates[2])
			currentYM.value = `${lastYear}年${currentDates[1]}月`
			currentFullDate.value = `${lastYear}-${currentDates[1]}-${dateChecked}`
			setDateShowArray(currentFullDate.value)
		}

		function getNextYearDateArr() {
			const currentDates = currentFullDate.value.split('-')
			const nextYear = Number(currentDates[0]) + 1

			let dateChecked = checkOutDate(nextYear, currentDates[1], currentDates[2])
			currentYM.value = `${nextYear}年${currentDates[1]}月`
			currentFullDate.value = `${nextYear}-${currentDates[1]}-${dateChecked}`
			setDateShowArray(currentFullDate.value)
		}

		function getLastMonthDateArr() {
			const currentDates = currentFullDate.value.split('-')
			let lastMonth = Number(currentDates[1]) - 1
			let lastYear = Number(currentDates[0])
			if (lastMonth <= 0) {
				lastMonth = 12
				lastYear--
			}

			if(lastYear <= 1970) {
				lastYear = 1970
			}

			lastMonth = lastMonth > 9 ? lastMonth : '0' + lastMonth

			let dateChecked = checkOutDate(lastYear, lastMonth, currentDates[2])
			currentYM.value = `${lastYear}年${lastMonth}月`
			currentFullDate.value = `${lastYear}-${lastMonth}-${dateChecked}`
			setDateShowArray(currentFullDate.value)
		}

		function getNextMonthDateArr() {
			const currentDates = currentFullDate.value.split('-')
			let nextMonth = Number(currentDates[1]) + 1
			let nextYear = Number(currentDates[0])
			if (nextMonth >= 13) {
				nextMonth = 1
				nextYear++
			}
			nextMonth = nextMonth > 9 ? nextMonth : '0' + nextMonth

			let dateChecked = checkOutDate(nextYear, nextMonth, currentDates[2])
			currentYM.value = `${nextYear}年${nextMonth}月`
			currentFullDate.value = `${nextYear}-${nextMonth}-${dateChecked}`
			setDateShowArray(currentFullDate.value)
		}

		function getTodayDateArr() {
			const {YMD, YM} = getDate()
			currentYM.value = YM
			currentFullDate.value = YMD
			setDateShowArray()
		}

		function selectDate(date) {
			if (date.isLast === 1) {
				getLastMonthDateArr()
			} else if (date.isLast === 3) {
				getNextMonthDateArr()
			}
			currentYM.value = date.YM
			currentFullDate.value = date.fullDate
		}

		function onSendDate(isSend) {
			ctx.emit('onChange', isSend, currentFullDate.value)
		}

		return {
			leapYearMonth,
			normalYearMonth,
			dateHeader,
			dateShowArray,
			todayYMD,
			currentYM,
			currentFullDate,
			getLastYearDateArr,
			getNextYearDateArr,
			getLastMonthDateArr,
			getNextMonthDateArr,
			getTodayDateArr,
			selectDate,
			onSendDate
		}
	}
})
</script>

<style scoped>
	.cdate_containner {
		width: 750rpx;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
	}

	.cdate_wraper {
		width: 750rpx;
		height: 820rpx;
		background: #FFFFFF;
	}

	.cdate_content {
		position: relative;
		width: 678rpx;
		height: 100%;
	}

	.cdate_switch_box {
		position: relative;
		width: 100%;
		height: 36rpx;
		margin-top: 40rpx;
	}

	.cdate_switch_btns {
		width: 50rpx;
		height: 100%;
		font-size: 24rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #B1B1B1;
		cursor: pointer;
	}

	.cdate_switch_show {
		width: 200rpx;
		height: 100%;
		font-size: 26rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #70747D;
		cursor: pointer;
	}

	.cdate_switch_btnc {
		position: absolute;
		right: 14rpx;
		width: 50rpx;
		height: 100%;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: bolder;
		color: #B1B1B1;
		cursor: pointer;
	}

	.cdate_header_box {
		width: 100%;
		height: 84rpx;
	}

	.cdate_header_title_box {
		width: 84rpx;
		height: 84rpx;
	}

	.cdate_header_title {
		width: 100%;
		height: 100%;
		font-size: 20rpx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #B1B1B1;
	}

	.cdate_header_active {
		color: rgba(61, 85, 240, 1);
	}

	.cdate_hgap {
		width: 740rpx;
		height: 0px;
		border-bottom: 1rpx solid #DBDBDB;
	}

	.cdate_body_box {
		width: 100%;
		height: auto;
	}

	.cdate_body_rows {
		width: 100%;
		height: 84rpx;
	}

	.cdate_body_value_box {
		position: relative;
		width: 84rpx;
		height: 84rpx;
	}

	.cdate_body_value {
		width: 34rpx;
		height: 34rpx;
		font-size: 28rpx;
		font-family: PingFang SC;
		font-weight: bolder;
		color: #445996;
	}

	.cdate_body_value_deactive {
		font-weight: bold;
		color: #D0D0D0;
	}

	.cdate_body_value_hover {
		width: 72rpx;
		height: 72rpx;
		color: #FFFFFF;
		background: #74A4FF;
		border: 2rpx solid #3D55F0;
		border-radius: 50%;
	}

	/*  #ifdef H5  */
	cdate_body_value:hover {
		width: 72rpx;
		height: 72rpx;
		color: #FFFFFF;
		background: #74A4FF;
		border: 2rpx solid #3D55F0;
		border-radius: 50%;
	}
	/*  #endif  */

	.cdate_body_value_active {
		width: 72rpx;
		height: 72rpx;
		color: #FFFFFF;
		background: #74A4FF;
		border: 2rpx solid #3D55F0;
		border-radius: 50%;
	}

	.cdate_today_flag {
		position: absolute;
		width: 16rpx;
		height: 16rpx;
		top: 0;
		right: 0;
		background: #FF5353;
		border-radius: 50%;
	}

	.cdate_action_box {
		position: absolute;
		width: 100%;
		height: 80rpx;
		left: 0;
		bottom: 40rpx;
		background: #3D55F0;
		border-radius: 40rpx;
		font-size: 32rpx;
		font-family: PingFang SC;
		font-weight: bold;
		color: #FFFFFF;
		letter-spacing: 46rpx;
	}
</style>
