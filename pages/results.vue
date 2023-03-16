<template>
  <div class="min-h-screen p-4 bg-gray-200">
    <!-- <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, minima.</div> -->
    <!-- <InstaCard /> -->
    <div class="max-w-xl mx-auto">
      <AppCarousel :items="[
        {
          description:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi assumenda mollitia eaque asperiores quas ullam tempore ut fugit obcaecati atque?',
          image: 'subway',
          tags: ['subway', 'transit', 'travel'],
        },
        {
          description:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi assumenda mollitia eaque asperiores quas ullam tempore ut fugit obcaecati atque?',
          image: 'subway',
          tags: ['subway', 'transit', 'travel'],
        },
        {
          description:
            'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Excepturi assumenda mollitia eaque asperiores quas ullam tempore ut fugit obcaecati atque?',
          image: 'subway',
          tags: ['subway', 'transit', 'travel'],
        }
      ]" />

      <AppInput  class="pt-8 "/>
    </div>
  </div>
</template>