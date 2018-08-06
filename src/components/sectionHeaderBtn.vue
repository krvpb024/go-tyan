<template>
  <div class="header-nav-btn" :class="position">
    <router-link :to="toUrl" v-if="show && tag === 'a'" class="header-nav-btn-item">
      <img class="header-nav-btn-item-img" v-if="insideType === 'img'" :src="insideSrc" :alt="insideAlt">
    </router-link>
    <button :tag="tag" v-if="show && tag === 'button'" class="header-nav-btn-item">
      <img class="header-nav-btn-item-img" v-if="insideType === 'img'" :src="insideSrc" :alt="insideAlt">
    </button>
    <slot name="modal"></slot>
  </div>
</template>

<script>
export default {
  props: {
    position: {
      type: String,
      required: true
    },
    tag: {
      type: String,
      required: true
    },
    toUrl: {
      type: String,
      default: '/'
    },
    show: {
      type: Boolean,
      required: true
    },
    insideType: {
      type: String,
      default: 'text'
    },
    insideSrc: {
      type: String
    },
    insideAlt: {
      type: String
    }
  }
}
</script>

<style scoped>
.header-nav-btn {
  align-items: center;
  color: var(--titleColor);
  display: flex;
  font-size: 1rem;
  height: 50px;
  line-height: 1rem;
  position: relative;
  width: 50px;
  white-space: nowrap;
}
.header-nav-btn-item {
  align-items: center;
  background-color: transparent;
  border: none;
  color: inherit;
  display: flex;
  font-size: 1.2rem;
  justify-content: center;
  padding: 15%;
  text-decoration: none;
  width: 100%;
}
.header-nav-btn-item-img {
  height: 100%;
  width: 100%;
}
</style>
