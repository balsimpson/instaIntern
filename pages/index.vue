<template>
  <div class="w-full h-screen bg-white">

    <div v-if="!messages.length && !resultsPending" class="flex flex-col items-center justify-center h-full ">
      <div class="max-w-md px-4 text-center text-indigo-800 font-arvo">
        <div class="pb-3 text-2xl font-bold">Hi Bishu!<br> Am your Insta Intern.</div>
        <p>
          Simply tell me what you want your Instagram post to be about, and I'll give you three amazing options in seconds!
        </p>
      </div>
      <AppInput @clicked="startChat" class="pt-8 " />

      <div class="px-3 pb-3 text-xs text-center text-black/70 md:px-4 md:pb-6">Be as brief or elaborate as you want.</div>
    </div>

    <div v-if="resultsPending" class="flex flex-col items-center justify-center w-full h-screen">{{ loadingMessage }}
    </div>

    <div v-if="instaOptions.length && !resultsPending" class="h-full">
      <div class="w-full h-full max-w-xl mx-auto ">
        <!-- <pre>{{ messages }}</pre> -->
        <AppCarousel :items="instaOptions" />
      </div>

      <div class="absolute inset-x-0 flex justify-center gap-0 ml-1 md:w-full md:m-auto md:mb-2 md:gap-2 bottom-10">
        <button @click.prevent="messages = []"
          class="relative px-3 py-2 text-white bg-gray-600 border-0 rounded md:border">
          <div class="flex items-center justify-center w-full gap-2"><svg stroke="currentColor" fill="none"
              stroke-width="1.5" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" class="w-3 h-3"
              height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
              <polyline points="1 4 1 10 7 10"></polyline>
              <polyline points="23 20 23 14 17 14"></polyline>
              <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"></path>
            </svg>Restart</div>
        </button>
      </div>
    </div>
    <!-- <AppInput class="pt-8 " /> -->
  </div>
</template>

<script setup lang="ts">
const systemPrompt = "You are InstaIntern and your job is to help the user craft engaging, creative Instagram posts. You will output at least 3 options and they should be in this format - Content: The content of the post, Image: suggested image for the post, Hashtags: suggested hashtags for the post."

const messages = ref([])
const instaOptions = ref([])

const results = ref()
const resultsPending = ref(false)
const resultsError = ref()

const loadingMessage = ref("Sharpening my pencil...")
const loadingMessagePlayer = ref("")

useHead({
  title: "InstaIntern",
  meta: [
    {
      name: "description",
      content: "Get Instagram-Ready Posts Instantly. Simply tell me what you want your post to be about, and I'll give you three amazing options in seconds!.",
    },
    {
      property: "og:title",
      content: "InstaIntern",
    },
    {
      property: "og:description",
      content: "Get Instagram-Ready Posts Instantly. Simply tell me what you want your post to be about, and I'll give you three amazing options in seconds!.",
    },
    {
      property: "og:image",
      content: "https://insta-intern.vercel.app/site_image.png",
    },
    {
      property: "og:url",
      content: "https://insta-intern.vercel.app/",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: "InstaIntern",
    },
    {
      name: "twitter:description",
      content: "Get Instagram-Ready Posts Instantly. Simply tell me what you want your post to be about, and I'll give you three amazing options in seconds!.",
    },
    {
      name: "twitter:image",
      content: "https://insta-intern.vercel.app/site_image.png",
    },
  ],
});


// @ts-ignore
const startChat = async (prompt) => {

  resultsPending.value = true
  showLoadingMsgs()
  // console.log(prompt);
  const msgs = [
    {
      "role": "system",
      "content": systemPrompt,
    },
    {
      "role": "user",
      "content": prompt,
    }
  ]

  // @ts-ignore
  const prediction: string = await getPrediction(prompt)

  // console.log("instaOptions", instaOptions.value);

  const res = {
    "role": "assistant",
    "content": prediction,
  }

  // @ts-ignore
  messages.value = msgs
  // @ts-ignore
  messages.value.push(res)

  // @ts-ignore
  instaOptions.value = getOptions(prediction.trim())
  console.log("instaOptions", instaOptions.value);
  // saveChat()
  clearInterval(loadingMessagePlayer.value);
  resultsPending.value = false
  localStorage.setItem('instaintern-chat_current', JSON.stringify(messages.value))
}

const showLoadingMsgs = () => {
  const quotes = [
    'Typing with one hand, drinking with the other...',
    'Taking a shot of whiskey, hold on...',
    'Pouring another drink, give me a sec...',
    'Searching for lost brain cells...',
    'Waiting for inspiration to strike...',
    'Trying to remember what I was doing...',
    'Fumbling for my glasses, be right there...',
    'Fighting off writer’s block...',
    'Feeding the cats, almost ready...',
    'Digging up old poems...',
    'Fixing my typewriter...',
    'Giving my liver a break, back soon...',
    'Just one more sip, almost there...',
    'Putting on some music, hold on tight...',
    'Stealing a kiss from a muse...',
    'Writing a dirty limerick, be right with you...',
    'Warming up my pen...',
    'Killing time, one word at a time...',
    'Trying to impress a pretty girl, brb...',
    'Typing away like a madman, hold your horses...',
    'Polishing my metaphors, be patient...',
    'Reading Bukowski for inspiration, gimme a sec...',
    'Sifting through my memories...',
    'Struggling with my demons...',
    'Throwing darts at my muse, hang on tight...',
    'Wrestling with my muse, back in a flash...'
  ];
  loadingMessage.value = quotes[Math.floor(Math.random() * quotes.length)]
  // @ts-ignore
  loadingMessagePlayer.value = setInterval(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    loadingMessage.value = randomQuote;
  }, 2000);
}

const getPrediction = async (prompt: string) => {
  try {
    let { data: results, pending: resultsPending, error: resultsError } = await useFetch(`https://chatgpt.cyclic.app/chat?secret=floppyfoxy&prompt=${prompt}`)
    // console.log("pending", pending.value)
    // console.log("data", results.value)
    return results.value
  } catch (error) {
    console.log("error:", error)
  }
}

// @ts-ignore
function getOptions(text) {
  const options = [];

  // split the text by new lines and remove any empty strings
  // @ts-ignore
  const lines = text.split("\n").filter((line) => line.trim() !== "");

  // iterate over each line and extract the option content, image URL, and hashtags
  let i = 0;
  while (i < lines.length) {
    const option = {};

    // extract option number
    // @ts-ignore
    option.number = lines[i].match(/Option (\d+):/)[1];

    // extract content
    // @ts-ignore
    option.content = lines[i + 1].match(/Content:(.+)/)[1];

    // extract image URL
    // @ts-ignore
    // console.log(option);
    option.image = "" || lines[i + 2]?.match(/Image: (.+)/)[1];

    // extract hashtags
    // @ts-ignore
    option.hashtags = lines[i + 3]?.match(/Hashtags: (.+)/)[1].split(" ");

    // add option to options array
    options.push(option);

    // increment index
    i += 4;
  }

  return options;
}



</script>