<template>
  <view class="row_nw_fs_center home_container">
    <canvas
      class="webgl"
      type="webgl"
      id="webgl"
      @touchstart="onTX"
      @touchmove="onTX"
      @touchend="onTX"
    ></canvas>
  </view>
</template>

<script setup>
import * as THREE from "three-platformize";
import { WechatPlatform } from "three-platformize/src/WechatPlatform";
import { GLTFLoader } from "three-platformize/examples/jsm/loaders/GLTFLoader";
import { OrbitControls } from "three-platformize/examples/jsm/controls/OrbitControls";
import { onMounted, onUnmounted, getCurrentInstance } from "vue";

const gl = {
  disposing: false,
  frameId: null,
  canvas: null,
  platform: null,
  camera: null,
  scene: null,
  controls: null,
  gltfLoader: null,
  lights: [],
  models: [],
};

let clock, mixer, actions, activeAction, previousAction, model, face, raycaster;
const api = { state: "Walking" };

let SCREEN_WIDTH = 10;
let SCREEN_HEIGHT = 10;

onMounted(() => {
  initThree();
});

onUnmounted(() => {
  disposeThree();
});

function initThree() {
  try {
    const instance = getCurrentInstance();
    const query = uni.createSelectorQuery().in(instance.proxy);
    query
      .select("#webgl")
      .node()
      .exec((res) => {
        gl.canvas = res[0].node;
        console.log("canvas", gl.canvas);

        gl.platform = new WechatPlatform(gl.canvas); // webgl canvas
        gl.platform.enableDeviceOrientation("game"); // 开启DeviceOrientation
        THREE.PLATFORM.set(gl.platform);

        gl.renderer = new THREE.WebGL1Renderer({ canvas: gl.canvas, antialias: true, alpha: true });
        gl.camera = new THREE.PerspectiveCamera(75, gl.canvas.width / gl.canvas.height, 0.1, 1000);
        SCREEN_WIDTH = gl.canvas.clientWidth;
        SCREEN_HEIGHT = gl.canvas.clientHeight;
        gl.scene = new THREE.Scene();
        gl.gltfLoader = new GLTFLoader();
        gl.controls = new OrbitControls(gl.camera, gl.canvas);
        gl.controls.enableDamping = true;
        gl.controls.update();

        raycaster = new THREE.Raycaster();

        // ground
        const mesh = new THREE.Mesh(
          new THREE.PlaneBufferGeometry(2000, 2000),
          new THREE.MeshPhongMaterial({ color: 0x999999, depthWrite: false })
        );
        mesh.rotation.x = -Math.PI / 2;
        gl.scene.add(mesh);
        const grid = new THREE.GridHelper(200, 40, 0x000000, 0x000000);
        grid.material.opacity = 0.2;
        grid.material.transparent = true;
        gl.scene.add(grid);

        gl.gltfLoader
          .loadAsync(
            "https://dtmall-tel.alicdn.com/edgeComputingConfig/upload_models/1591673169101/RobotExpressive.glb"
          )
          .then((gltf) => {
            // @ts-ignore
            gltf.parser = null;
            gltf.scene.position.y = -2;
            model = gltf.scene;
            gl.scene.add(gltf.scene);

            createGUI(model, gltf.animations);
          });

        gl.camera.position.z = 10;
        gl.renderer.outputEncoding = THREE.sRGBEncoding;
        gl.scene.add(new THREE.AmbientLight(0xffffff, 1.0));
        gl.scene.add(new THREE.DirectionalLight(0xffffff, 1.0));
        gl.renderer.setSize(gl.canvas.width, gl.canvas.height);
        gl.renderer.setPixelRatio(THREE.$window.devicePixelRatio);
        // renderer.setPixelRatio(wx.getSystemInfoSync().pixelRatio);
        gl.renderer.gammaOutput = true;
        gl.renderer.gammaFactor = 2.2;

        clock = new THREE.Clock();

        const render = () => {
          if (!gl.disposing) {
            const dt = clock.getDelta();
            if (mixer) {
              mixer.update(dt);
            }
            gl.controls.update();
            gl.renderer.render(gl.scene, gl.camera);
            gl.frameId = THREE.$requestAnimationFrame(render);
          }
        };
        render();
      });
  } catch (error) {}
}

function createGUI(model, animations) {
  const states = ["Idle", "Walking", "Running", "Dance", "Death", "Sitting", "Standing"];
  const emotes = ["Jump", "Yes", "No", "Wave", "Punch", "ThumbsUp"];
  mixer = new THREE.AnimationMixer(model);
  actions = {};
  for (var i = 0; i < animations.length; i++) {
    var clip = animations[i];
    var action = mixer.clipAction(clip);
    actions[clip.name] = action;
    if (emotes.indexOf(clip.name) >= 0 || states.indexOf(clip.name) >= 4) {
      action.clampWhenFinished = true;
      action.loop = THREE.LoopOnce;
    }
  }

  // expressions
  face = model.getObjectByName("Head_2");
  activeAction = actions["Walking"];
  activeAction.play();
}

// function fadeToAction(name, duration) {
//   previousAction = activeAction;
//   activeAction = actions[name];
//   if (previousAction !== activeAction) {
//     previousAction.fadeOut(duration);
//   }
//   activeAction.reset().setEffectiveTimeScale(1).setEffectiveWeight(1).fadeIn(duration).play();
// }

// function animate() {
//   var dt = clock.getDelta();
//   if (mixer) mixer.update(dt);
//   canvas.requestAnimationFrame(animate);
//   controls.update();
//   renderer.render(scene, camera);
// }

function disposeThree() {
  gl.disposing = true;
  if (gl.frameId) {
    THREE.$cancelAnimationFrame(gl.frameId);
    gl.frameId = null;
  }
  // 使用完毕后释放资源
  THREE.PLATFORM.dispose();
}

let mouse = new THREE.Vector2();
function onTX(event) {
  // gl.canvas.dispatchTouchEvent({ ...event, type: "touchstart" });
  gl.platform.dispatchTouchEvent(event);
  console.log("event", event);
  if (event.type === "touchstart" && raycaster) {
    const touches = event.touches[0];
    mouse.x = (touches.clientX / SCREEN_WIDTH) * 2 - 1;
    mouse.y = -(touches.clientY / SCREEN_HEIGHT) * 2 + 1;
    raycaster.setFromCamera(mouse, gl.camera);
    console.log("commining...", mouse, model, SCREEN_WIDTH, SCREEN_HEIGHT);
    let targetIntersects = raycaster.intersectObjects(model.children, true);
    console.log("targetIntersects", targetIntersects);

    let targetIntersects2 = raycaster.intersectObjects(model.children[0].children, true);
    console.log("targetIntersects2", targetIntersects2);
    for (let i = 0; i < targetIntersects2.length; i++) {
      console.log("target", targetIntersects2[i]);
    }
  }
}
</script>

<style scoped lang="scss">
.home_container {
  width: 750rpx;
  height: 100vh;
}

.webgl {
  width: 750rpx;
  height: 100vh;
}
</style>
