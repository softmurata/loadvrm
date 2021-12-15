window.addEventListener("DOMContentLoaded", () => {
    // canvasの取得
    const canvas = document.getElementById('canvas')
  
    // シーンの生成
    const scene = new THREE.Scene()
  
    // カメラの生成
    const camera = new THREE.PerspectiveCamera(
      45, canvas.clientWidth/canvas.clientHeight, 0.1, 1000)
    camera.position.set(0, 1.3, -1)
    camera.rotation.set(0, Math.PI, 0)
  
    // レンダラーの生成
    const renderer = new THREE.WebGLRenderer()
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    renderer.setClearColor(0x7fbfff, 1.0)
    canvas.appendChild(renderer.domElement)
  
    // ライトの生成
    const light = new THREE.DirectionalLight(0xffffff)
    light.position.set(-1, 1, -1).normalize()
    scene.add(light)
  
    // VRMの読み込み
    const loader = new THREE.GLTFLoader()
    loader.load('./sample.vrm',
      (gltf) => {
        THREE.VRM.from(gltf).then( (vrm) => {
          // シーンへの追加
          scene.add(vrm.scene)
        })
      }
    )
  
    // フレーム毎に呼ばれる
    const update = () => {
      requestAnimationFrame(update)
      renderer.render(scene, camera)
    }
    update()
})