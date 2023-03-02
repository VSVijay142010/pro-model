AFRAME.registerComponent("atoms", {
  init: async function () {

    //Get the compund details of the element
    var models = await this.getModels();

    var barcodes = Object.keys(models);

    barcodes.map(barcode => {
      var model = models[barcode];

      //Call the function
      this.createModals(model);
    });

  },
  getModels: function () {
    return fetch("js/compoundList.json")
      .then(res => res.json())
      .then(data => data);
  },
  getModals: function () {
    return fetch("js/modal.json")
      .then(res => res.json())
      .then(data => data);
  },
  createModals: async function (model) {
    var barcodeValue = model.barcode_value;
    var modelUrl = model.model_url;
    var modelName = model.model_name;

    
  



    //Scene
    var scene = document.querySelector("a-scene");

    //Add marker entity for BARCODE marker
    var marker = document.createElement("a-marker");

    marker.setAttribute("id", `marker-${barcodeValue}`);
    marker.setAttribute("type", "barcode");
    marker.setAttribute("model_name",modelName);
    marker.setAttribute("value", barcodeValue);
    marker.setAttribute("markerhandler", {});

    scene.appendChild(marker);
    if (barcodeValue === 0) {
      var modelEl = document.createElement("a-entity");
      modelEl.setAttribute("id", `${modelName}`);
      modelEl.setAttribute("geometry", {
        primitive: "box",
        width: model.width,
        height: model.height
      });
      modelEl.setAttribute("position", model.position);
      modelEl.setAttribute("rotation", model.rotation);
      modelEl.setAttribute("material", {
        color: model.color
      });
      marker.appendChild(modelEl);
    } else {
      var modelEl = document.createElement("a-entity");
      modelEl.setAttribute("id", `${modelName}`);
      modelEl.setAttribute("gltf-model", `url(${modelUrl})`);
      modelEl.setAttribute("scale", model.scale);
      modelEl.setAttribute("position", model.position);
      modelEl.setAttribute("rotation", model.rotation);
      marker.appendChild(modelEl);
  

    
     


  }
}
});