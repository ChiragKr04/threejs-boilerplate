import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'
import { gsap } from 'gsap'

let scene, camera, renderer, geometry, mesh, group

function init(){
    // Scene
    scene = new THREE.Scene()

    // Loading canvas as DOM Element 
    const canvas = document.querySelector('.webgl')

    // Sizes
    const sizes = {
        width:innerWidth,
        height:innerHeight, 
    }

    // Cretaing group
    group = new THREE.Group()
    scene.add(group)

    const cube1 = new THREE.Mesh(
        new THREE.BoxGeometry(.5,.5,.5),
        new THREE.MeshBasicMaterial({
            color:'#00ff00'
        })
    )
    // Adding new cube to the group
    group.add(cube1)

    const cube2 = new THREE.Mesh(
        new THREE.BoxGeometry(2,.1,.1),
        new THREE.MeshBasicMaterial({
            color:'#ff0000'
        })
    )
    group.add(cube2)

    // Camera
    camera = new THREE.PerspectiveCamera(75,innerWidth / innerHeight, 0.1, 1000)
    scene.add(camera)
    console.log(camera)
    camera.position.set(0,0,2)
    console.log();

    camera.lookAt(group.position)

    // Orbit controls
    const control = new OrbitControls(camera, canvas)
    control.enableDamping = true

    // Renderer
    renderer = new THREE.WebGLRenderer({
        canvas:canvas,
        antialias: true
    })
    renderer.setSize(innerWidth,innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))

    // Cursor
    const cursor = {
        x:0,
        y:0,
    }
    window.addEventListener('mousemove', (event) => {
        cursor.x = event.clientX / sizes.width - 0.5
        cursor.y = -(event.clientY / sizes.height - 0.5)
    })

    // Three js Clock
    const clock = new THREE.Clock()
    function animate(){
        // Clock updation
        const elapsedTime = clock.getElapsedTime()

        // Animating
        // group.position.y = Math.sin(elapsedTime)
        // group.position.x = Math.cos(elapsedTime)
        // group.rotation.y = elapsedTime 

        // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3
        // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3
        // camera.position.y = cursor.y * 3
        camera.lookAt(group.position)
        control.update()

        // Rendering object every second
        renderer.render( scene, camera );
        requestAnimationFrame(animate)
    }
    animate()

    function onWindowResize(){
    camera.aspect = innerWidth / innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(innerWidth,innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio,2))
}

    window.addEventListener('resize', onWindowResize, false)

    function windowToFullScreen(){
        if(!document.fullscreenElement){
            canvas.requestFullscreen()
        }else{
            document.exitFullscreen()
        }
    }

    window.addEventListener('dblclick', windowToFullScreen, false)

}

init()


