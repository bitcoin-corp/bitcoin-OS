'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

interface Desktop3DProps {
  children?: React.ReactNode
  onAppClick?: (appName: string) => void
}

export default function Desktop3D({ children, onAppClick }: Desktop3DProps) {
  const mountRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const raycasterRef = useRef<THREE.Raycaster>(new THREE.Raycaster())
  const mouseRef = useRef<THREE.Vector2>(new THREE.Vector2())
  const [hoveredApp, setHoveredApp] = useState<THREE.Group | null>(null)

  useEffect(() => {
    if (!mountRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0x0a0a0a)
    scene.fog = new THREE.Fog(0x0a0a0a, 20, 80)
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    camera.position.set(0, 8, 15)
    camera.lookAt(0, 0, 0)

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    mountRef.current.appendChild(renderer.domElement)
    rendererRef.current = renderer

    // Controls - More responsive settings
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.08
    controls.rotateSpeed = 0.8
    controls.zoomSpeed = 1.2
    controls.panSpeed = 0.8
    controls.maxDistance = 30
    controls.minDistance = 5
    controls.maxPolarAngle = Math.PI / 2.1
    controls.enablePan = true
    controls.mouseButtons = {
      LEFT: THREE.MOUSE.ROTATE,
      MIDDLE: THREE.MOUSE.DOLLY,
      RIGHT: THREE.MOUSE.PAN
    }
    controls.touches = {
      ONE: THREE.TOUCH.ROTATE,
      TWO: THREE.TOUCH.DOLLY_PAN
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6)
    directionalLight.position.set(10, 15, 10)
    directionalLight.castShadow = true
    directionalLight.shadow.camera.near = 0.1
    directionalLight.shadow.camera.far = 50
    directionalLight.shadow.camera.left = -20
    directionalLight.shadow.camera.right = 20
    directionalLight.shadow.camera.top = 20
    directionalLight.shadow.camera.bottom = -20
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    scene.add(directionalLight)

    // Add rim lighting
    const rimLight = new THREE.DirectionalLight(0xf7931a, 0.3)
    rimLight.position.set(-10, 5, -10)
    scene.add(rimLight)

    // Add point light for glow
    const pointLight = new THREE.PointLight(0xf7931a, 0.5, 30)
    pointLight.position.set(0, 10, 0)
    scene.add(pointLight)

    // Grid floor (desktop surface) - XZ plane
    const gridHelper = new THREE.GridHelper(50, 50, 0xf7931a, 0x333333)
    gridHelper.position.y = 0
    gridHelper.material.opacity = 0.3
    gridHelper.material.transparent = true
    scene.add(gridHelper)

    // Create desktop plane (floor) with reflective material
    const planeGeometry = new THREE.PlaneGeometry(50, 50)
    const planeMaterial = new THREE.MeshPhysicalMaterial({ 
      color: 0x0a0a0a,
      metalness: 0.9,
      roughness: 0.1,
      transparent: true,
      opacity: 0.95,
      envMapIntensity: 1,
      clearcoat: 1,
      clearcoatRoughness: 0.1
    })
    const plane = new THREE.Mesh(planeGeometry, planeMaterial)
    plane.rotation.x = -Math.PI / 2
    plane.position.y = -0.01 // Slightly below grid to avoid z-fighting
    plane.receiveShadow = true
    scene.add(plane)

    // Add floating Bitcoin icon with better materials
    const bitcoinGroup = new THREE.Group()
    const bitcoinGeometry = new THREE.CylinderGeometry(1.5, 1.5, 0.3, 64)
    const bitcoinMaterial = new THREE.MeshPhysicalMaterial({ 
      color: 0xf7931a,
      metalness: 1,
      roughness: 0,
      emissive: 0xf7931a,
      emissiveIntensity: 0.3,
      clearcoat: 1,
      clearcoatRoughness: 0,
      reflectivity: 1
    })
    const bitcoin = new THREE.Mesh(bitcoinGeometry, bitcoinMaterial)
    bitcoin.castShadow = true
    bitcoinGroup.add(bitcoin)
    
    // Add B symbol on Bitcoin using simple geometry
    const bShape = new THREE.Shape()
    bShape.moveTo(0, -0.5)
    bShape.lineTo(0, 0.5)
    bShape.lineTo(0.3, 0.5)
    bShape.quadraticCurveTo(0.5, 0.5, 0.5, 0.3)
    bShape.quadraticCurveTo(0.5, 0.1, 0.3, 0.1)
    bShape.lineTo(0, 0.1)
    bShape.lineTo(0.3, 0.1)
    bShape.quadraticCurveTo(0.5, 0.1, 0.5, -0.1)
    bShape.quadraticCurveTo(0.5, -0.3, 0.3, -0.3)
    bShape.lineTo(0, -0.3)
    bShape.lineTo(0.3, -0.3)
    bShape.quadraticCurveTo(0.5, -0.3, 0.5, -0.5)
    bShape.quadraticCurveTo(0.5, -0.5, 0.3, -0.5)
    bShape.lineTo(0, -0.5)
    
    const extrudeSettings = { depth: 0.1, bevelEnabled: false }
    const bGeometry = new THREE.ExtrudeGeometry(bShape, extrudeSettings)
    const bMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      metalness: 0.8,
      roughness: 0.2,
      emissive: 0xffffff,
      emissiveIntensity: 0.1
    })
    const bSymbol = new THREE.Mesh(bGeometry, bMaterial)
    bSymbol.position.y = 0.16
    bSymbol.position.x = -0.25
    bSymbol.rotation.x = -Math.PI / 2
    bSymbol.scale.set(0.8, 0.8, 0.8)
    bitcoinGroup.add(bSymbol)
    
    bitcoinGroup.position.set(0, 5, 0)
    scene.add(bitcoinGroup)

    // Create 3D app icons with unique shapes
    const createAppIcon = (x: number, z: number, color: number, name: string, iconType: string) => {
      const group = new THREE.Group()
      let iconMesh: THREE.Mesh
      
      // Create different 3D shapes for each app type
      switch(iconType) {
        case 'terminal':
          // Terminal - Box with screen
          const termGeometry = new THREE.BoxGeometry(2, 1.4, 0.3)
          iconMesh = new THREE.Mesh(termGeometry, new THREE.MeshPhysicalMaterial({ 
            color: 0x1a1a1a,
            metalness: 0.8,
            roughness: 0.2,
            clearcoat: 0.5
          }))
          const screenGeometry = new THREE.PlaneGeometry(1.8, 1.2)
          const screenMesh = new THREE.Mesh(screenGeometry, new THREE.MeshPhysicalMaterial({ 
            color,
            emissive: color,
            emissiveIntensity: 0.5,
            metalness: 0,
            roughness: 0.8
          }))
          screenMesh.position.z = 0.16
          group.add(iconMesh)
          group.add(screenMesh)
          break
          
        case 'wallet':
          // Wallet - Thick box like a wallet with leather texture
          const walletGeometry = new THREE.BoxGeometry(1.8, 1.2, 0.6)
          iconMesh = new THREE.Mesh(walletGeometry, new THREE.MeshPhysicalMaterial({ 
            color,
            metalness: 0.1,
            roughness: 0.8,
            clearcoat: 0.2,
            clearcoatRoughness: 0.8
          }))
          // Add clasp detail
          const claspGeometry = new THREE.BoxGeometry(0.4, 0.1, 0.65)
          const clasp = new THREE.Mesh(claspGeometry, new THREE.MeshPhysicalMaterial({
            color: 0xffd700,
            metalness: 0.9,
            roughness: 0.1
          }))
          clasp.position.y = 0.61
          group.add(clasp)
          break
          
        case 'browser':
          // Browser - Sphere (globe) with continents
          const browserGeometry = new THREE.SphereGeometry(1, 64, 32)
          iconMesh = new THREE.Mesh(browserGeometry, new THREE.MeshPhysicalMaterial({ 
            color,
            metalness: 0.3,
            roughness: 0.4,
            clearcoat: 1,
            clearcoatRoughness: 0,
            envMapIntensity: 1
          }))
          // Add rings around globe
          const ringGeometry = new THREE.TorusGeometry(1.4, 0.08, 16, 64)
          const ringMesh = new THREE.Mesh(ringGeometry, new THREE.MeshPhysicalMaterial({ 
            color: 0xffffff,
            metalness: 0.8,
            roughness: 0.2,
            opacity: 0.8,
            transparent: true
          }))
          ringMesh.rotation.x = Math.PI / 2
          group.add(ringMesh)
          
          // Add second ring
          const ring2 = ringMesh.clone()
          ring2.rotation.z = Math.PI / 3
          group.add(ring2)
          break
          
        case 'files':
          // Files - Stack of thin boxes
          for (let i = 0; i < 3; i++) {
            const fileGeometry = new THREE.BoxGeometry(1.4, 0.15, 1.8)
            const fileMesh = new THREE.Mesh(fileGeometry, new THREE.MeshStandardMaterial({ 
              color,
              metalness: 0.3
            }))
            fileMesh.position.y = i * 0.3
            group.add(fileMesh)
          }
          iconMesh = group.children[0] as THREE.Mesh
          break
          
        case 'settings':
          // Settings - Gear/cog
          const gearGeometry = new THREE.CylinderGeometry(0.8, 0.8, 0.3, 8)
          iconMesh = new THREE.Mesh(gearGeometry, new THREE.MeshStandardMaterial({ color }))
          // Add teeth
          for (let i = 0; i < 8; i++) {
            const toothGeometry = new THREE.BoxGeometry(0.3, 0.4, 0.3)
            const tooth = new THREE.Mesh(toothGeometry, new THREE.MeshStandardMaterial({ color }))
            const angle = (i / 8) * Math.PI * 2
            tooth.position.x = Math.cos(angle) * 0.8
            tooth.position.z = Math.sin(angle) * 0.8
            tooth.rotation.y = angle
            group.add(tooth)
          }
          break
          
        case 'document':
          // Document - Page with fold
          const docGeometry = new THREE.BoxGeometry(1.2, 1.6, 0.1)
          iconMesh = new THREE.Mesh(docGeometry, new THREE.MeshStandardMaterial({ color }))
          // Add fold corner
          const foldGeometry = new THREE.ConeGeometry(0.3, 0.3, 3)
          const fold = new THREE.Mesh(foldGeometry, new THREE.MeshStandardMaterial({ 
            color: 0xffffff,
            opacity: 0.8,
            transparent: true
          }))
          fold.position.set(0.45, 0.65, 0.1)
          fold.rotation.z = Math.PI / 4
          group.add(fold)
          break
          
        case 'spreadsheet':
          // Spreadsheet - Grid of small cubes
          for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
              const cellGeometry = new THREE.BoxGeometry(0.3, 0.3, 0.1)
              const cellMesh = new THREE.Mesh(cellGeometry, new THREE.MeshStandardMaterial({ 
                color: row === 0 || col === 0 ? color : 0xffffff,
                metalness: 0.2
              }))
              cellMesh.position.x = (col - 1.5) * 0.35
              cellMesh.position.y = (row - 1.5) * 0.35
              group.add(cellMesh)
            }
          }
          iconMesh = group.children[0] as THREE.Mesh
          break
          
        case 'drive':
          // Drive - Cylinder (hard drive)
          const driveGeometry = new THREE.CylinderGeometry(0.8, 0.8, 1.2, 16)
          iconMesh = new THREE.Mesh(driveGeometry, new THREE.MeshStandardMaterial({ 
            color,
            metalness: 0.8,
            roughness: 0.2
          }))
          break
          
        case 'email':
          // Email - Envelope shape
          const envGeometry = new THREE.BoxGeometry(1.6, 1, 0.2)
          iconMesh = new THREE.Mesh(envGeometry, new THREE.MeshStandardMaterial({ color }))
          // Add flap
          const flapGeometry = new THREE.PlaneGeometry(1.6, 0.8)
          const flap = new THREE.Mesh(flapGeometry, new THREE.MeshStandardMaterial({ 
            color,
            side: THREE.DoubleSide
          }))
          flap.rotation.x = -Math.PI / 4
          flap.position.y = 0.5
          flap.position.z = 0.2
          group.add(flap)
          break
          
        case 'music':
          // Music - Note shape
          const noteHeadGeometry = new THREE.SphereGeometry(0.5, 16, 8)
          const noteHead = new THREE.Mesh(noteHeadGeometry, new THREE.MeshStandardMaterial({ color }))
          noteHead.position.y = -0.3
          const stemGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1.5)
          const stem = new THREE.Mesh(stemGeometry, new THREE.MeshStandardMaterial({ color }))
          stem.position.x = 0.4
          stem.position.y = 0.3
          group.add(noteHead)
          group.add(stem)
          iconMesh = noteHead
          break
          
        default:
          // Default cube
          const defaultGeometry = new THREE.BoxGeometry(1.5, 1.5, 1.5)
          iconMesh = new THREE.Mesh(defaultGeometry, new THREE.MeshStandardMaterial({ color }))
      }
      
      // Add main mesh if not already added
      if (!group.children.includes(iconMesh)) {
        group.add(iconMesh)
      }
      
      // Set common properties
      group.position.set(x, 1.5, z)
      group.castShadow = true
      group.receiveShadow = true
      group.userData = { name, type: 'app', originalY: 1.5, originalColor: color }
      
      // Enable shadows for all children
      group.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true
          child.receiveShadow = true
          // Upgrade materials to MeshPhysicalMaterial for better appearance
          const oldMat = child.material as THREE.MeshStandardMaterial
          const material = new THREE.MeshPhysicalMaterial({
            color: oldMat.color || color,
            metalness: 0.6,
            roughness: 0.3,
            emissive: new THREE.Color(color),
            emissiveIntensity: 0.15,
            clearcoat: 0.3,
            clearcoatRoughness: 0.4,
            reflectivity: 0.5,
            envMapIntensity: 0.8
          })
          child.material = material
        }
      })
      
      return group
    }

    // Add app icons in a grid with proper 3D representations
    const apps = [
      createAppIcon(-8, -8, 0x4169e1, 'Terminal', 'terminal'),
      createAppIcon(-4, -8, 0x32cd32, 'Bitcoin Wallet', 'wallet'),
      createAppIcon(0, -8, 0xff6347, 'Browser', 'browser'),
      createAppIcon(4, -8, 0xffd700, 'Files', 'files'),
      createAppIcon(8, -8, 0x9370db, 'Settings', 'settings'),
      createAppIcon(-8, -4, 0xf7931a, 'Bitcoin Writer', 'document'),
      createAppIcon(-4, -4, 0x00bfff, 'Bitcoin Spreadsheet', 'spreadsheet'),
      createAppIcon(0, -4, 0x90ee90, 'Bitcoin Drive', 'drive'),
      createAppIcon(4, -4, 0xff1493, 'Bitcoin Email', 'email'),
      createAppIcon(8, -4, 0xda70d6, 'Bitcoin Music', 'music'),
    ]
    apps.forEach(app => scene.add(app))

    // Mouse interaction handlers
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1

      // Raycast for hover effects - check children of groups
      raycasterRef.current.setFromCamera(mouseRef.current, camera)
      const allObjects: THREE.Object3D[] = []
      apps.forEach(app => {
        allObjects.push(...app.children)
      })
      const intersects = raycasterRef.current.intersectObjects(allObjects, true)

      // Find which group was hit
      let hitGroup: THREE.Group | null = null
      if (intersects.length > 0) {
        let parent = intersects[0].object.parent
        while (parent && !apps.includes(parent as THREE.Group)) {
          parent = parent.parent
        }
        if (parent && apps.includes(parent as THREE.Group)) {
          hitGroup = parent as THREE.Group
        }
      }

      // Reset previous hovered app
      if (hoveredApp && hoveredApp !== hitGroup) {
        hoveredApp.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            const material = child.material as THREE.MeshStandardMaterial
            material.emissiveIntensity = 0.1
          }
        })
        hoveredApp.scale.set(1, 1, 1)
        setHoveredApp(null)
        renderer.domElement.style.cursor = 'grab'
      }

      // Highlight new hovered app
      if (hitGroup && hitGroup !== hoveredApp) {
        hitGroup.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            const material = child.material as THREE.MeshStandardMaterial
            material.emissiveIntensity = 0.3
          }
        })
        hitGroup.scale.set(1.1, 1.1, 1.1)
        setHoveredApp(hitGroup)
        renderer.domElement.style.cursor = 'pointer'
      }
    }

    const handleMouseClick = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1

      raycasterRef.current.setFromCamera(mouseRef.current, camera)
      const allObjects: THREE.Object3D[] = []
      apps.forEach(app => {
        allObjects.push(...app.children)
      })
      const intersects = raycasterRef.current.intersectObjects(allObjects, true)

      if (intersects.length > 0) {
        // Find which group was clicked
        let parent = intersects[0].object.parent
        while (parent && !apps.includes(parent as THREE.Group)) {
          parent = parent.parent
        }
        if (parent && apps.includes(parent as THREE.Group)) {
          const clickedApp = parent as THREE.Group
          const appName = clickedApp.userData.name
          console.log('Clicked on:', appName)
          
          // Animate the click
          const originalScale = clickedApp.scale.x
          clickedApp.scale.set(0.9, 0.9, 0.9)
          setTimeout(() => {
            clickedApp.scale.set(originalScale, originalScale, originalScale)
          }, 200)

          // Trigger app launch if callback provided
          if (onAppClick) {
            onAppClick(appName)
          }
        }
      }
    }

    // Add event listeners
    renderer.domElement.addEventListener('mousemove', handleMouseMove)
    renderer.domElement.addEventListener('click', handleMouseClick)
    renderer.domElement.style.cursor = 'grab'

    // Animation
    let animationId: number
    const animate = () => {
      animationId = requestAnimationFrame(animate)

      // Rotate Bitcoin icon
      bitcoinGroup.rotation.y += 0.01
      bitcoinGroup.position.y = 5 + Math.sin(Date.now() * 0.001) * 0.5

      // Subtle idle animation for app icons
      apps.forEach((app, index) => {
        const baseY = app.userData.originalY
        if (app !== hoveredApp) {
          app.rotation.y = Math.sin(Date.now() * 0.001 + index) * 0.05
          app.position.y = baseY + Math.sin(Date.now() * 0.002 + index * 0.5) * 0.05
        } else {
          // Enhanced hover animation
          app.rotation.y = Math.sin(Date.now() * 0.003) * 0.15
          app.position.y = baseY + 0.3
        }
      })

      controls.update()
      renderer.render(scene, camera)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      renderer.domElement.removeEventListener('mousemove', handleMouseMove)
      renderer.domElement.removeEventListener('click', handleMouseClick)
      cancelAnimationFrame(animationId)
      controls.dispose()
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
      scene.clear()
    }
  }, [onAppClick])

  return (
    <>
      <div ref={mountRef} className="fixed inset-0 z-0" style={{ pointerEvents: 'auto' }} />
      {children && (
        <div className="relative z-10 w-full h-full pointer-events-none">
          {children}
        </div>
      )}
    </>
  )
}