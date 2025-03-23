const canvas = document.getElementById("renderCanvas");
const engine = new BABYLON.Engine(canvas, true);

function createScene() {
  const scene = new BABYLON.Scene(engine);

  // Tambahkan kamera dan lampu
  const camera = new BABYLON.ArcRotateCamera(
    "camera",
    Math.PI / 2,
    Math.PI / 3,
    5,
    BABYLON.Vector3.Zero(),
    scene
  );
  camera.attachControl(canvas, true);
  const light = new BABYLON.HemisphericLight(
    "light",
    new BABYLON.Vector3(1, 1, 0),
    scene
  );

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
