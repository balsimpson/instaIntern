<template>
  <div class="w-full h-screen bg-white">
    <div v-if="!messages.length" class="flex flex-col items-center justify-center h-full ">
      <div class="max-w-md px-4 text-center text-indigo-800 font-arvo">
        <div class="pb-3 text-2xl font-bold">Leave the Work to Me. <br> Get Instagram-Ready Posts <br> Instantly</div>
        <p>
          Simply tell me what you want your post to be about, and I'll give you three amazing options in seconds!
        </p>
      </div>
      <AppInput @clicked="startChat" class="pt-8 " />

      <div class="px-3 pb-3 text-xs text-center text-black/70 md:px-4 md:pb-6">Be as brief or elaborate as you want.</div>

      <!-- <pre class="max-w-md mx-auto break-words">{{ instaOptions }}</pre> -->

      <!-- <select>
        <option value="">Select a tone</option>
        <option value="Casual">Casual</option>
        <option value="Cheeky">Cheeky</option>
        <option value="Cheerful">Cheerful</option>
        <option value="Confident">Confident</option>
        <option value="Direct">Direct</option>
        <option value="Dry">Dry</option>
        <option value="Educational">Educational</option>
        <option value="Firm">Firm</option>
        <option value="Formal">Formal</option>
        <option value="Friendly">Friendly</option>
        <option value="Fun">Fun</option>
        <option value="Helpful">Helpful</option>
        <option value="Inspirational">Inspirational</option>
        <option value="Irreverent">Irreverent</option>
        <option value="Matter-of-fact">Matter-of-fact</option>
        <option value="Mysterious">Mysterious</option>
        <option value="Playful">Playful</option>
        <option value="Sophisticated">Sophisticated</option>
        <option value="Witty">Witty</option>
      </select> -->
    </div>

    <div v-else class="h-full">
      <div class="h-full max-w-xl mx-auto ">
        <AppCarousel :items="instaOptions" />
      </div>
    </div>
    <!-- <AppInput class="pt-8 " /> -->
  </div>
</template>

<script setup lang="ts">
const systemPrompt = "You are InstaIntern and your job is to help the user craft engaging, creative Instagram posts. You will output at least 3 options and they should be in this format - Content: The content of the post, Image: suggested image for the post, Hashtags: suggested hashtags for the post."

const messages = ref([])
const instaOptions = ref([])

// @ts-ignore
const startChat = async (data) => {

  console.log(data);
  const msgs = [
    {
      "role": "system",
      "content": systemPrompt,
    },
    {
      "role": "user",
      "content": data,
    }
  ]

  // @ts-ignore
  const prediction: { message: { content: string } } = await getPrediction(msgs)

  console.log("instaOptions", instaOptions.value);
  
  const res = {
    "role": "assistant",
    "content": prediction.message.content.trim(),
  }
  
  // @ts-ignore
  messages.value = msgs
  // @ts-ignore
  messages.value.push(res)
  
  // @ts-ignore
  instaOptions.value = getOptions(prediction.message.content.trim())
  console.log("instaOptions", instaOptions.value);
  // saveChat()

  localStorage.setItem('instaintern-chat_current', JSON.stringify(messages.value))
}

const getPrediction = async (messages: [{
  role: string,
  content: string,
}]) => {
  try {
    let { data, pending, error } = await useFetch(`/api/chat`, {
      method: "POST",
      body: JSON.stringify({
        messages: messages,
      })
    })
    console.log("pending", pending.value)
    return data.value
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
    option.content = lines[i + 1].match(/Content: (.+)/)[1];

    // extract image URL
    // @ts-ignore
    option.image = lines[i + 2].match(/Image: (.+)/)[1];

    // extract hashtags
    // @ts-ignore
    option.hashtags = lines[i + 3].match(/Hashtags: (.+)/)[1].split(" ");

    // add option to options array
    options.push(option);

    // increment index
    i += 4;
  }

  return options;
}



</script>