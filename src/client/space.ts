import * as THREE from '/build/three.module.js'
import { OrbitControls } from '/jsm/controls/OrbitControls'
import Stats from '/jsm/libs/stats.module'
import { GUI } from '/jsm/libs/dat.gui.module'

export class Space {
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  renderer: THREE.WebGLRenderer
  cube: THREE.Mesh<THREE.BoxGeometry, THREE.MeshBasicMaterial>
  controls: OrbitControls
  stats: Stats
  light: THREE.DirectionalLight
  ambient: THREE.AmbientLight

  constructor() {
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setSize( window.innerWidth, window.innerHeight )
    document.body.appendChild( this.renderer.domElement )

    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
    // this.controls.autoRotate = true
    // this.controls.enableKeys = true
    // this.controls.keys = {
    //   // LEFT: 37,
    //   // UP: 38,
    //   // RIGHT: 39,
    //   // BOTTOM: 40,
    //   LEFT: 87,
    //   UP: 65,
    //   RIGHT: 68,
    //   BOTTOM: 83,
    // }
    // this.controls.mouseButtons = {
    //   LEFT: THREE.MOUSE.ROTATE,
    //   MIDDLE: THREE.MOUSE.DOLLY,
    //   RIGHT: THREE.MOUSE.PAN,
    // }
    const cubeData: {[key: string]: number} = {
      width: 1,
      height: 1,
      depth: 1,
      widthSegments: 2,
      heightSegments: 2,
      depthSegments: 2,
    }
    const geometry = new THREE.BoxGeometry(...Object.values(cubeData))
     this.light = new THREE.DirectionalLight(0xffffff)
    var helper = new THREE.DirectionalLightHelper(this.light);
    this.scene.add(helper);
    this.light.position.set(1, 20, 10)
    this.ambient = new THREE.AmbientLight(0x707070)
    const material = new THREE.MeshPhongMaterial({
      color: 0x00ff00,
      wireframe: false,
    })
    this.cube = (new THREE.Mesh(geometry, material))
    // new a interaction, then you can add interaction-event with your free style

    this.scene.add(this.cube)
    this.cube.name = 'THE CUBE'
    this.scene.add(this.light)
    this.scene.add(this.ambient)

    this.camera.position.z = 2
    this.light.target = this.cube

    const handleWindowResize = () => {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.renderer.render(this.scene, this.camera)
    }

    window.addEventListener('resize', handleWindowResize, false)

    this.stats = Stats()
    document.body.appendChild(this.stats.dom)

    const gui = new GUI()
    // gui.add(cube.rotation, 'x', 0, Math.PI * 2, 0.01)
    const cubeFolder = gui.addFolder('Cube')
    const cubeRotationFolder = cubeFolder.addFolder('Rotation')
    cubeRotationFolder.add(this.cube.rotation, 'x', 0, Math.PI * 2, 0.01)
    cubeRotationFolder.add(this.cube.rotation, 'y', 0, Math.PI * 2, 0.01)
    cubeRotationFolder.add(this.cube.rotation, 'z', 0, Math.PI * 2, 0.01)
    cubeFolder.open()
    const cubePropsFolder = cubeFolder.addFolder('Props')
    const regenerateBoxGeometry = () => {
      const newGeometry = new THREE.BoxGeometry(...Object.values(cubeData))

      this.cube.geometry.dispose()
      this.cube.geometry = newGeometry
    }
    for (let key in cubeData) {
      cubePropsFolder.add(cubeData, key, 1, 30)
        .onChange(regenerateBoxGeometry)
        .onFinishChange(() => {
          console.dir(this.cube.geometry)
        })
    }
    this.animate = this.animate.bind(this)

    this.animate()
  }
  _update() {
    // this.cube.rotation.x += 0.01;
    // this.cube.rotation.y += 0.01;

    this.controls.update()
    this.stats.update()
  }
  _render() {
    this.renderer.render(this.scene, this.camera)
  }
  animate() {
    requestAnimationFrame(this.animate)

    this._update()
    this._render()
  }
}
