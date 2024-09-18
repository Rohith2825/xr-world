      const modal = document.getElementById("modal");
      const modalBackdrop = document.getElementById("modalBackdrop");
      const closeModal = document.getElementById("closeModal");
      const viewPhoto = document.getElementById("viewPhoto");
      const view3dModel = document.getElementById("view3dModel");
      const carousel = document.getElementById("carousel");
      const carouselInner = document.querySelector(".carousel-inner");
      const prevSlide = document.getElementById("prevSlide");
      const nextSlide = document.getElementById("nextSlide");
      const crosshair = document.querySelector('.crosshair');
      const productImageContainer = document.getElementById(
        "productImageContainer"
      );
      let is3DView = false;
      let currentIndex = 0;

      function onPointerLockChange() {
        if (document.pointerLockElement === null) {
          document.body.classList.add("modal-open");
        } else {
          document.body.classList.remove("modal-open");
        }
      }

      document.addEventListener(
        "pointerlockchange",
        onPointerLockChange,
        false
      );

      function showModal() {
        if (document.pointerLockElement) {
          document.exitPointerLock();
        }
        modal.style.display = "flex";
        modalBackdrop.style.display = "block";
        crosshair.classList.add("hidden");
        document.body.classList.add("modal-open");

        if(window.mobileAndTabletCheck()){
          const gamepad = document.querySelector("#gamepad-overlay");
          gamepad.style.display = "none";
          }
      }

      function onCloseModal() {
        modal.style.display = "none";
        modalBackdrop.style.display = "none";
        document.body.classList.remove("modal-open");
        crosshair.classList.remove("hidden");
        document.body.requestPointerLock();
        if(window.mobileAndTabletCheck()){
          const gamepad = document.querySelector("#gamepad-overlay");
          gamepad.style.display = "block";
        }
      }

      const viewPhotoButton = document.getElementById("viewPhoto");

     

function onView3dModel() {
  if (!is3DView) {
    productImageContainer.innerHTML = `
      <model-viewer src="models/inter_elem2.glb" alt="A 3D model of a product" auto-rotate camera-controls ar ar-modes="scene-viewer webxr quick-look" style="width: 100%; height: 100%;"></model-viewer>
    `;
  }
  is3DView = true;
}
function onViewPhoto() {
  productImageContainer.innerHTML = `
      <div class="carousel">
        <div class="carousel-inner">
          <img src="https://m.media-amazon.com/images/I/71zQiNDmeGL._AC_SY879_.jpg" class="carousel-image" alt="Product Image">
          <img src="https://m.media-amazon.com/images/I/81ymIsjYKJL._AC_SY879_.jpg" class="carousel-image" alt="Product Image">
          <img src="https://m.media-amazon.com/images/I/71RSyLykPcL._AC_SY879_.jpg" class="carousel-image" alt="Product Image">
        </div>
        <div class="carousel-controls">
          <button id="prevSlide">❮</button>
          <button id="nextSlide">❯</button>
        </div>
      </div>
    `;
    is3DView = false;
}

      function handleKeydown(event) {
        if (event.key === "q") {
          onCloseModal();
        } else if (event.key === "t") {
          onViewPhoto();
        } else if (event.key === "z") {
          onNextSlide();
        } else if (event.key === "x") {
          onPrevSlide();
        }
      }

      function updateCarousel() {
        const totalSlides = carouselInner.children.length;
        carouselInner.style.transform = `translateX(-${currentIndex * 100}%)`;
      }

      function onPrevSlide() {
        if (currentIndex > 0) {
          currentIndex--;
        } else {
          currentIndex = carouselInner.children.length - 1;
        }
        updateCarousel();
      }

      function onNextSlide() {
        if (currentIndex < carouselInner.children.length - 1) {
          currentIndex++;
        } else {
          currentIndex = 0;
        }
        updateCarousel();
      }

      closeModal.addEventListener("pointerdown", onCloseModal);
      viewPhoto.addEventListener("pointerdown", onViewPhoto);
      view3dModel.addEventListener("pointerdown", onView3dModel);
      document.addEventListener("keydown", handleKeydown);

      prevSlide.addEventListener("click", onPrevSlide);
      nextSlide.addEventListener("click", onNextSlide);
      prevSlide.addEventListener("touchstart", onPrevSlide);
      nextSlide.addEventListener("touchstart", onNextSlide);

window.showModal = showModal; 