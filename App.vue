<script>
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	/*每个页面公共css */
@import "@/assets/style/base.scss";
@import "@/assets/style/flex.scss";
@import "@/assets/style/general.scss";
</style>
