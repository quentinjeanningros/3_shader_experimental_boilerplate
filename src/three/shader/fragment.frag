uniform vec2 uMouse;
uniform vec2 uResolution;
varying vec2 vUv;

vec3 linearTosRGB(vec3 color) {
    return pow(color, vec3(1.0 / 2.2));
}

void main() {
    vec2 st = vUv;
    vec2 mouse = uMouse / uResolution;
    vec2 aspect = vec2(uResolution.x / uResolution.y, 1.0);
    vec2 mouseAspect = mouse * aspect;
    vec2 stAspect = st * aspect;

    float dist = distance(stAspect, mouseAspect);
    float dot = 1.0 - smoothstep(0.0, 0.05, dist);

    vec3 finalColor = vec3(dot);
    gl_FragColor = vec4(linearTosRGB(finalColor), 1.0);
}