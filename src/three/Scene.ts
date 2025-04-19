import * as THREE from 'three';

/**
 * CustomScene handles the basic Three.js setup including scene, renderer, and camera
 * This class creates an orthographic view ideal for 2D shader effects
 */
export class ThreeBaseScene {
  public scene: THREE.Scene;
  private renderer: THREE.WebGLRenderer;
  private camera: THREE.OrthographicCamera;
  private container: HTMLDivElement;

  /**
   * Creates a new ThreeBaseScene instance
   * @param container - The HTML div element where the Three.js canvas will be mounted
   */
  constructor(container: HTMLDivElement) {
    this.container = container;
    this.scene = new THREE.Scene();
    this.renderer = this.setupRenderer(container);
    this.container.appendChild(this.renderer.domElement);
    this.camera = this.setupCamera(container);
    this.scene.add(this.camera);
  }

  /**
   * Configures and creates the WebGL renderer with optimal settings
   * @param container - Container element used to determine canvas size
   */
  private setupRenderer(container: HTMLDivElement): THREE.WebGLRenderer {
    const renderer = new THREE.WebGLRenderer({
      antialias: true, // Enables smoother edges
      alpha: true, // Enables transparency
    });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // High quality shadows
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace; // Correct color space for web
    return renderer;
  }

  /**
   * Creates an orthographic camera for 2D rendering
   * The camera is positioned at z=1 looking at the center of the scene
   * @param container - Container element used to calculate camera bounds
   */
  private setupCamera(container: HTMLDivElement): THREE.OrthographicCamera {
    const camera = new THREE.OrthographicCamera(
      container.clientWidth / -2, // Left bound
      container.clientWidth / 2, // Right bound
      container.clientHeight / 2, // Top bound
      container.clientHeight / -2, // Bottom bound
      1, // Near plane
    );
    camera.position.z = 1;
    return camera;
  }

  /**
   * Updates the scene's resolution, adjusting both renderer and camera
   * @param width - New width in pixels
   * @param height - New height in pixels
   */
  public setResolution(width: number, height: number) {
    this.renderer.setSize(width, height);
    this.camera.left = width / -2;
    this.camera.right = width / 2;
    this.camera.top = height / 2;
    this.camera.bottom = height / -2;
    this.camera.updateProjectionMatrix();
  }

  /**
   * Renders the current state of the scene
   */
  public refresh() {
    this.renderer.render(this.scene, this.camera);
  }

  /**
   * Cleans up the scene, removing all objects and the renderer
   */
  public clear() {
    this.scene.clear();
    if (this.renderer.domElement.parentNode === this.container) {
      this.container.removeChild(this.renderer.domElement);
    }
    this.renderer.clear();
  }
}
