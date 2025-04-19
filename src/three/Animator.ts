import * as THREE from 'three';
import vertexShader from './shader/vertex.vert?raw';
import fragmentShader from './shader/fragment.frag?raw';
import { ThreeBaseScene } from './Scene';

/**
 * Animator creates and manages a full-screen shader plane
 * This class is ideal for creating 2D shader effects with mouse interaction
 */
export class Animator {
  private scene: ThreeBaseScene;
  private resolution: THREE.Vector2 = new THREE.Vector2(1, 1);
  private mouse: THREE.Vector2 = new THREE.Vector2(0, 0);
  private plane: THREE.Mesh;
  private material: THREE.ShaderMaterial;
  private baseSize: number = 0.2; // Base size for shader effects

  /**
   * Creates a new Animator instance
   * @param scene - The ThreeBaseScene instance to render into
   */
  constructor(scene: ThreeBaseScene) {
    this.scene = scene;
    const { plane, material } = this.createShaderPlane();
    this.scene.scene.add(plane);
    this.plane = plane;
    this.material = material;
  }

  /**
   * Initializes a full-screen plane with shader material
   * The plane uses custom vertex and fragment shaders
   */
  private createShaderPlane() {
    const geometry = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uMouse: { value: this.mouse }, // Mouse position uniform
        uResolution: { value: this.resolution }, // Screen resolution uniform
      },
      vertexShader, // Custom vertex shader
      fragmentShader, // Custom fragment shader
      transparent: true, // Enable transparency
      depthWrite: false, // Disable depth writing for 2D rendering
    });
    const plane = new THREE.Mesh(geometry, material);
    plane.scale.set(this.resolution.x, -this.resolution.y, 1);
    return { plane, material: material };
  }

  /**
   * Updates the resolution of the shader plane and renderer
   * @param width - New width in pixels
   * @param height - New height in pixels
   */
  public setResolution(width: number, height: number) {
    this.scene.setResolution(width, height);
    this.resolution.set(width, height);
    this.plane.scale.set(width, -height, 1);
    this.scene.refresh();
  }

  /**
   * Updates the mouse position uniform in the shader
   * @param x - Mouse X coordinate
   * @param y - Mouse Y coordinate
   */
  public setMouse(x: number, y: number) {
    this.mouse.set(x, y);
    this.scene.refresh();
  }

  /**
   * Updates the size uniform in the shader
   * @param multiplier - Size multiplier relative to base size
   */
  public setDotSize(multiplier: number) {
    this.material.uniforms.uSize.value = this.baseSize * multiplier;
    this.scene.refresh();
  }

  /**
   * Cleans up resources by disposing geometries and materials
   */
  public clear() {
    this.plane.geometry.dispose();
    this.material.dispose();
    this.scene.scene.remove(this.plane);
  }
}
