import "./style.css";
import * as THREE from "three";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.15, 69, 69);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(420).fill().forEach(addStar);

const spaceTexture = new THREE.TextureLoader().load("./assets/background.ff8ad045.png");
scene.background = spaceTexture;

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener("resize", onWindowResize);

const earthTexture = new THREE.TextureLoader().load("./assets/EarthHd.5cf740c7.jpeg");

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: earthTexture,
  })
);

scene.add(earth);

earth.position.z = 0;
earth.position.setX(2);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  // if (t < -200) {
  //   const rotationSpeed = 0.05;
  //   earth.rotation.y += rotationSpeed;
  // }

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

let earthRotationSpeed = 0.005;
function animate() {
  requestAnimationFrame(animate);
  earth.rotation.y += earthRotationSpeed;

  renderer.render(scene, camera);
}

animate();

const textArray = [
  "“If there is no struggle, there is no progress.” - Frederick Douglass",
  "“It is never too late to be who you might have been.” - George Eliot",
  "“With self-discipline most anything is possible.” - Theodore Roosevelt",
  "“The only constant in life is change.” -Heraclitus",
];

const textElement = document.querySelector(".quote");
let currentTextIndex = 0;

setInterval(() => {
  currentTextIndex = (currentTextIndex + 1) % textArray.length;
  textElement.textContent = textArray[currentTextIndex];
}, 5000);
