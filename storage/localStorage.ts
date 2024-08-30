import starwizConfig from "@/common/config"

export default {
	
	set (name:string, data:any) {
		try {
			uni.setStorageSync(name, JSON.stringify(data));
			starwizConfig.debug && console.log("异步本地存储成功");
		} catch( err ) {
			starwizConfig.debug && console.log("异步本地存储失败:", err);
			return false;
		} 
		return true;
	},
	
	get (name:string) {
		let data = null;
		try {
			data = JSON.parse(uni.getStorageSync(name));
			starwizConfig.debug && console.log("异步本地获取成功");
		} catch( err ) {
			starwizConfig.debug && console.log("异步本地获取失败", err);
		}
		return data;
	},
	
	delete (name:string) {
		try {
			uni.removeStorageSync(name) 
		} catch (err) {
			starwizConfig.debug && console.log("异步本地删除失败", err);
			return false;
		}
		return true;
	},
	
	hasKey (name:string) {
		let isHas;
		try {
			const res = uni.getStorageInfoSync();
			isHas = res.keys.includes(name);
		} catch (err) {
			starwizConfig.debug && console.log("异步本地内存判断失败", err);
			return false;
		}
		return isHas;
	},
	
	clear () {
		try {
			uni.clearStorageSync() 
		} catch (err) {
			starwizConfig.debug && console.log("异步本地消除失败", err);
			return false;
		}
		return true;
	}
	
}
