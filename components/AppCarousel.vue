<template>
  <div class="h-full">
    <!-- carousel -->
    <div class="relative w-full h-full mx-auto carousel">
      <div class="h-full transition carousel-inner">
        <!-- left button -->
        <!-- <button @mouseover="pauseSlider()" @mouseout="startSlider()" ref="prevBtn" @click.prevent="prevBtnHandler" -->
        <button ref="prevBtn" @click.prevent="prevBtnHandler"
          class="absolute top-0 bottom-0 z-10 text-white left-2">
          <div class="p-2 rounded-lg bg-black/50">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
              <path fill-rule="evenodd"
                d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z"
                clip-rule="evenodd" />
            </svg>
          </div>
        </button>

        <div class="relative h-full overflow-y-scroll carousel-track ">
          <ul class="h-full transition duration-500 ease-in-out" ref="slidesElement">
            <!-- <li @mouseover="pauseSlider()" @mouseout="startSlider()" -->
            <li v-for="(item, index) in items" class="absolute w-full h-full py-3 cursor-pointer" :id="index">
              <InstaCard :item="item" :key="item.number"/>
            </li>
          </ul>
        </div>
        <!-- right button -->
        <!-- <button @mouseover="pauseSlider()" @mouseout="startSlider()" ref="nextBtn" @click.prevent="nextBtnHandler" -->
        <button ref="nextBtn" @click.prevent="nextBtnHandler"
          class="absolute top-0 bottom-0 z-10 text-white right-2">
          <div class="p-2 rounded-lg bg-black/50">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
              <path fill-rule="evenodd"
                d="M16.28 11.47a.75.75 0 010 1.06l-7.5 7.5a.75.75 0 01-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 011.06-1.06l7.5 7.5z"
                clip-rule="evenodd" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { IconArrowRightCircle } from '@iconify-prerendered/vue-bi';
const props = defineProps({
  items: {
    type: Array
  }
})
// const items = [
//   {
//     title: "10 Best Episodes of monica",
//     description:
//       "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi assumenda mollitia eaque asperiores quas ullam tempore ut fugit obcaecati atque?",
//     source: "https://source.unsplash.com/random?subway",
//     tags: ["subway", "transit", "travel"],
//   },
//   {
//     title: "The Park",
//     description: "A podcast about the park",
//     source: "https://source.unsplash.com/random?park",
//     tags: ["park", "nature", "travel"],
//   },
//   {
//     title: "The Beach",
//     description: "A podcast about the beach",
//     source: "https://source.unsplash.com/random?beach",
//     tags: ["beach", "nature", "travel"],
//   },
//   {
//     title: "The Bench",
//     description: "A podcast about the beach",
//     source: "https://source.unsplash.com/random?bench",
//     tags: ["beach", "nature", "travel"],
//   },
//   {
//     title: "The Chair",
//     description: "A podcast about the beach",
//     source: "https://source.unsplash.com/random?chair",
//     tags: ["beach", "nature", "travel"],
//   },
// ];
const slideWidth = ref(0);
const slidesElement = ref(null);
const dotsNav = ref(null);

const sliderAutomation = ref();

const activeSlide = ref(null);

const prevBtn = ref(null);
const nextBtn = ref(null);

const moveToSlide = (currentSlide, targetSlide) => {
  setSlideWidth();
  slidesElement.value.style.transform = `translateX(-${targetSlide.style.left})`;

  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");

  activeSlide.value = targetSlide.id;
};

const startSlider = () => {
  sliderAutomation.value = setInterval(() => {
    const currentSlide = slidesElement.value.querySelector(".current-slide");
    const nextSlide = currentSlide.nextElementSibling;

    if (!nextSlide) {
      moveToSlide(currentSlide, slidesElement.value.firstElementChild);
    } else {
      moveToSlide(currentSlide, nextSlide);
    }
  }, 7000);
};

const pauseSlider = () => {
  clearInterval(sliderAutomation.value);
};

const nextBtnHandler = () => {
  const currentSlide = slidesElement.value.querySelector(".current-slide");
  const nextSlide = currentSlide.nextElementSibling;

  moveToSlide(currentSlide, nextSlide);
  showHideArrows(nextSlide);
};

const prevBtnHandler = () => {
  const currentSlide = slidesElement.value.querySelector(".current-slide");
  const prevSlide = currentSlide.previousElementSibling;

  moveToSlide(currentSlide, prevSlide);
  showHideArrows(prevSlide);
};

const showHideArrows = (targetSlide) => {
  // console.log(targetSlide)
  if (targetSlide.id == 0) {
    prevBtn.value.classList.add("hidden");
    nextBtn.value.classList.remove("hidden");
  } else if (targetSlide.id == props.items.length - 1) {
    nextBtn.value.classList.add("hidden");
    prevBtn.value.classList.remove("hidden");
  } else {
    prevBtn.value.classList.remove("hidden");
    nextBtn.value.classList.remove("hidden");
  }
};

const setSlideWidth = () => {
  const children = Array.from(slidesElement.value.children);
  slideWidth.value = children[0].clientWidth;

  // console.log(children)

  // set the width of the slides
  children.forEach((slide, index) => {
    slide.style.left = slideWidth.value * index + "px";
  });
};

onMounted(() => {
  // console.log(props.items)
  // setSlideWidth();

  slidesElement.value.children[0].classList.add("current-slide");

  // startSlider();
});

const createSlug = (title, id) => {
  return (
    title
      .toLowerCase()
      .replace(/[^\w ]+/g, "")
      .replace(/ +/g, "-") +
    "_" +
    id
  );
};
</script>

<style>

</style>