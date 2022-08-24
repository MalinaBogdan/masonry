<template>
  <masonry-wall
    :items="cards"
    :ssr-columns="2"
    :column-width="widthCard"
    :gap="16"
    :rtl="false"
  >
    <template #default="{ item, index }">
      <div class="card">
        <div class="number">{{ index + 1 }}</div>
        <img
          :src="`${item.download_url}`"
          alt=""
          :style="{ height: `${index < 4 ? index * 75 + 400 : 650}px` }"
        />
        <div class="info">
          <h4>{{ "Author: " + item.author }}</h4>
          <span>{{ "Id: " + item.id }}</span>
        </div>
      </div>
    </template>
  </masonry-wall>
</template>

<script>
import { inject, ref } from "vue";

export default {
  setup() {
    const axios = inject("axios");
    let cards = ref([]);

    let canUpdated = false;
    let limitCount = 0;
    let limitStep = 10;

    function getCards(amount) {
      limitCount += amount;
      axios
        .get(`https://picsum.photos/v2/list?page=1&limit=${limitCount}`)
        .then((response) => {
          cards.value = response.data;
          setTimeout(() => {
            canUpdated = true;
          }, 10);
        });
    }

    function checkScroll() {
      if (
        document.documentElement.scrollTop + window.innerHeight >=
          document.documentElement.offsetHeight - 50 &&
        canUpdated
      ) {
        canUpdated = false;
        getCards(limitStep);
      }
    }

    let widthCard = ref(0);
    function checkResize() {
      widthCard.value = (window.innerWidth - 200) / 2;
    }

    getCards(limitStep);
    checkResize();

    return { cards, widthCard, checkScroll, checkResize };
  },
  created() {
    window.addEventListener("scroll", this.checkScroll);
    window.addEventListener("resize", this.checkResize);
  },
  destroyed() {
    window.removeEventListener("scroll", this.checkScroll);
    window.removeEventListener("resize", this.checkResize);
  },
};
</script>

<style scoped>
.card {
  border-radius: 10px;
  overflow: hidden;
  text-align: center;
  position: relative;
}

.number {
  width: 30px;
  height: 30px;
  position: absolute;
  top: 5px;
  left: 5px;
  background: white;
  border-radius: 50px;
  font-weight: 900;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

img {
  width: 100%;
  object-fit: cover;
}

.info {
  position: absolute;
  bottom: 0;
  width: calc(100% - 20px);
  background: rgb(228, 225, 212);
  padding: 10px;
  text-align: end;
}

h4 {
  margin: 5px 0;
}
</style>
