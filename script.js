const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

function createScene() {
  const scene = new BABYLON.Scene(engine);
  scene.clearColor = new BABYLON.Color4(0.1, 0.1, 0.12, 1); // background gelap tapi soft



  // Tambahkan kamera
  const camera = new BABYLON.ArcRotateCamera(
    "camera",
    Math.PI / 2,
    Math.PI / 3,
    5,
    BABYLON.Vector3.Zero(),
    scene
  );
  camera.attachControl(canvas, true);

// Lampu hemisferik putih terang
const hemiLight = new BABYLON.HemisphericLight(
  "hemiLight",
  new BABYLON.Vector3(0, 1, 0),
  scene
);
hemiLight.intensity = 1.2; // Lebih terang
hemiLight.diffuse = new BABYLON.Color3(1, 1, 1); // Putih
hemiLight.specular = new BABYLON.Color3(1, 1, 1);
hemiLight.groundColor = new BABYLON.Color3(0.8, 0.8, 0.8); // cerah

// Lampu directional putih terang dari kanan atas
const dirLight = new BABYLON.DirectionalLight(
  "dirLight",
  new BABYLON.Vector3(-1, -2, -1),
  scene
);
dirLight.position = new BABYLON.Vector3(5, 10, 5);
dirLight.intensity = 1.5;
dirLight.diffuse = new BABYLON.Color3(1, 1, 1); // putih
dirLight.specular = new BABYLON.Color3(1, 1, 1);


  return scene;
}


const scene = createScene();

// Fungsi untuk memuat model dari direktori yang sama dengan script.js
function loadModel(filename) {
  const fileExtension = filename.split(".").pop().toLowerCase();

  if (fileExtension === "obj") {
    // Load file OBJ
    BABYLON.SceneLoader.ImportMesh(
      "",
      "./", // Load dari direktori yang sama
      filename,
      scene,
      function (meshes) {
        console.log("Model OBJ berhasil dimuat!", meshes);

        // Perbesar model
        meshes.forEach((mesh) => {
          mesh.scaling = new BABYLON.Vector3(5, 5, 5);
        });
      }
    );
  } else if (fileExtension === "gltf" || fileExtension === "glb") {
    // Load file GLTF / GLB
    BABYLON.SceneLoader.Append("./", filename, scene, function () {
      console.log("Model GLTF/GLB berhasil dimuat!");

      // Tunggu model selesai dimuat, lalu cari root mesh
      scene.executeWhenReady(() => {
        const rootMesh = scene.meshes[0]; // Biasanya mesh pertama adalah root
        if (rootMesh) {
          rootMesh.scaling = new BABYLON.Vector3(5, 5, 5);
        }
      });
    });
  } else {
    console.error("Format tidak didukung:", fileExtension);
  }
}

// Panggil fungsi loadModel dengan nama file model yang sesuai
loadModel("model.gltf"); // Bisa diganti dengan "model.obj" atau "model.glb"

engine.runRenderLoop(() => scene.render());
window.addEventListener("resize", () => engine.resize());