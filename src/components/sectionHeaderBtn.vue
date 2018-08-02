<template>
  <div class="header-nav-btn" :class="position">
    <router-link :to="toUrl" :tag="tag" v-if="show" class="header-nav-btn-item">
      <slot></slot>
    </router-link>
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
    }
  },
  created () {
    console.log(this.position)
  }
}
</script>

<style>
.header-nav-btn {
  align-items: center;
  color: var(--titleColor);
  display: flex;
  font-size: 1rem;
  height: 50px;
  line-height: 1rem;
  width: 50px;
  white-space: nowrap;
  &.left {
    margin-left: 4%;
  }
  &.right {
    margin-right: 4%;
  }
  & .header-nav-btn-item {
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
    & img {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
