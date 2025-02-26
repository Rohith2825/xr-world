export default [
  {
    whiterun: {
      assets: [
        {
          name: "land",
          type: "glbModel",
          path: "/models/land_w_collider.glb",
        },
        {
          name: "items",
          type: "glbModel",
          path: "/models/land_items.glb",
        },
        {
          name: "buildings",
          type: "glbModel",
          path: "/models/buildings.glb",
        },
        {
          name: "interactions1",
          type: "glbModel",
          path: "/models/inter_elem.glb",
        },
        {
          name: "interactions2",
          type: "glbModel",
          path: "/models/inter_elem1.glb",
        },
        {
          name: "interactions3",
          type: "glbModel",
          path: "/models/inter_elem2.glb",
        },
        {
          name: "walls",
          type: "glbModel",
          path: "/models/walls.glb",
        },
        {
          name: "buildings_texture",
          type: "imageTexture",
          path: "/textures/buildings.webp",
        },
        {
          name: "items_texture",
          type: "imageTexture",
          path: "/textures/items.webp",
        },
        {
          name: "land_texture",
          type: "imageTexture",
          path: "/textures/land.webp",
        },
        {
          name: "walls_texture",
          type: "imageTexture",
          path: "/textures/walls_baked.webp",
        },
        {
          name: "skyBoxTexture",
          type: "cubeTexture",
          path: [
            "/textures/skybox/px.webp",
            "/textures/skybox/nx.webp",
            "/textures/skybox/py.webp",
            "/textures/skybox/ny.webp",
            "/textures/skybox/pz.webp",
            "/textures/skybox/nz.webp",
          ],
        },
        {
          name: "skyBoxTexturen",
          type: "cubeTexture",
          path: [
            "/textures/skyboxn/px.webp",
            "/textures/skyboxn/nx.webp",
            "/textures/skyboxn/py.webp",
            "/textures/skyboxn/ny.webp",
            "/textures/skyboxn/pz.webp",
            "/textures/skyboxn/nz.webp",
          ],
        },
      ],
    },
    castleInterior: {
      assets: [
        {
          name: "castle",
          type: "glbModel",
          path: "/models/interior_w_collider.glb",
        },
        {
          name: "interactions",
          type: "glbModel",
          path: "/models/interior_interactions.glb",
        },
        {
          name: "castle_texture",
          type: "imageTexture",
          path: "/textures/interior_baked.webp",
        },
      ],
    },
  },
];
