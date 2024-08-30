export const globalSystemInfo = {
	deviceId: ""
}

export function getSystemInfoSync(direction) {
	return uni.getSystemInfoSync();
}

export function getIsIOS(){
	return uni.getSystemInfoSync().platform === 'ios';
}

export function getIsAndroid(){
	return uni.getSystemInfoSync().platform === 'android';
}

export function getIsMac(){
	return uni.getSystemInfoSync().platform === 'mac';
}

export function getIsPc(){
	const systemInfo = uni.getSystemInfoSync()
	return systemInfo.platform != 'ios' && systemInfo.platform != 'android';
}

export function getIsPhone(){
	const systemInfo = uni.getSystemInfoSync() 
	return systemInfo.platform == 'ios' || systemInfo.platform === 'android';
}

export function getPixelRatio(){
	const systemInfo = uni.getSystemInfoSync();
	let devicePixelRatio = systemInfo.devicePixelRatio;
	if(devicePixelRatio) {
		if (devicePixelRatio == 1) {
			const isPhone = getIsPhone();
			if(isPhone) {
				devicePixelRatio = 2;
			}
		}
	}
	return devicePixelRatio;
}

export function getWindowHeight() {
  return uni.getSystemInfoSync().windowHeight;
}

export function getWindowWidth() {
  return uni.getSystemInfoSync().windowWidth;
}

export function getStatusBarHeight() {
  return uni.getSystemInfoSync().statusBarHeight;
}
