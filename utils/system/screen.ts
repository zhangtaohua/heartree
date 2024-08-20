// “portrait-primary”: 竖屏正方向；
// “portrait-secondary”: 竖屏反方向，屏幕正方向按顺时针旋转180°；
// “landscape-primary”: 横屏正方向，屏幕正方向按顺时针旋转90°；
// “landscape-secondary”: 横屏方向，屏幕正方向按顺时针旋转270°；
// “portrait”: 竖屏正方向或反方向，根据设备重力感应器自动调整；
// “landscape”: 横屏正方向或反方向，根据设备重力感应器自动调整；

export function roateScreen(direction: string) {
  // #ifdef APP-PLUS
  plus.screen.unlockOrientation(); //解除锁定屏幕方向
  // 锁定屏幕方向
  plus.screen.lockOrientation(direction); //锁定  'landscape-primary'
  // #endif
}

export function resetScreen() {
  // #ifdef APP-PLUS
  // 锁定屏幕方向
  plus.screen.unlockOrientation(); //锁定
  plus.screen.lockOrientation("portrait-primary"); //锁定  'portrait-primary'
  // #endif
}
