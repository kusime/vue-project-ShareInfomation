<template>

  <cool-card>
    <div class="container flex-col justify-center items-center">
      <cool-heading :title="'Author :' + post.author" class="text-sm" ></cool-heading>
      <cool-pill :content="post.date"/>
      <cool-expand :random-i-d="randomID">
        <template #default>
<!--          use id-${randomID}-content is aim to the just shot to the p elements-->
          <p :id="`id-${randomID}-content`">{{ post.content }}</p>
          <cool-button :data-clipboard-target="`#id-${randomID}-content`" class="btn" prompt-text="COPY">
            <img src="https://clipboardjs.com/assets/images/clippy.svg" class="w-4 h-4 mr-3" alt="Copy to clipboard">
          </cool-button>
        </template>
      </cool-expand>
    </div>
  </cool-card>

</template>

<script setup>
import getDate from "../../pubFunction/getDate.js";
import CoolButton from "../reactive/CoolButton.vue";
// https://github.com/zenorocha/clipboard.js.git
import ClipboardJS from "clipboard";
import randomUUID from "../../pubFunction/randomUUID.js";
import CoolExpand from "../layout/CoolExpand.vue";
import CoolHeading from "../layout/CoolHeading.vue";
import CoolCard from "../layout/CoolCard.vue";
import CoolPill from "../layout/CoolPill.vue";
const clipboard = new ClipboardJS('.btn');

clipboard.on('success', function(e) {
  console.info('Action:', e.action);
  console.info('Text:', e.text);
  console.info('Trigger:', e.trigger);
  e.clearSelection();
});


defineProps({
  post:{
    type: Object,
    required: true,
    default(){
      return {author: "Default author",date:getDate(),content: "Default content"};
    },
  },
  randomID : {
    type:String,
    required:true,
    // !! multiple instance will not call this in multiple times
    default:randomUUID()
  }
})


</script>