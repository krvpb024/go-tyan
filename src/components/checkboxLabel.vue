<template>
  <label :for="forId" class="checkbox-label">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17.215"
      height="14.787"
      viewBox="0 0 17.215 14.787"
    >
      <g
        id="Group_499"
        data-name="Group 499"
        transform="translate(-265 -67.213)"
      >
        <g
          id="Rectangle_433"
          data-name="Rectangle 433"
          transform="translate(265 68)"
          fill="#fff"
          stroke="#313131"
          stroke-width="1.4"
        >
          <rect width="14" height="14" rx="4" stroke="none" />
          <rect
            x="0.7"
            y="0.7"
            width="12.6"
            height="12.6"
            rx="3.3"
            fill="none"
          />
        </g>
        <g
          class="checkbox-label__check-mark"
          id="Group_498"
          data-name="Group 498"
          transform="translate(-19095 -9776)"
        >
          <path
            id="Union_35"
            data-name="Union 35"
            d="M-4.284-77.323a1.251,1.251,0,0,1-.552-.4l-4-5.122A1.251,1.251,0,0,1-8.622-84.6a1.25,1.25,0,0,1,1.755.216l3.1,3.969L3.46-88.729a1.25,1.25,0,0,1,1.763-.123,1.251,1.251,0,0,1,.123,1.764l-8.2,9.434a1.245,1.245,0,0,1-.943.43A1.247,1.247,0,0,1-4.284-77.323Z"
            transform="translate(19371.563 9932.372)"
            fill="#313131"
          />
        </g>
      </g>
    </svg>

    <slot></slot>
  </label>
</template>

<script>
export default {
  props: {
    forId: {
      type: String,
    },
  },
}
</script>

<style scoped>
.checkbox-label {
  border: solid 2.5px transparent;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 2px;
}

.checkbox-label__check-mark {
  opacity: 0;
}

input[type='checkbox']:checked + .checkbox-label .checkbox-label__check-mark {
  opacity: 1;
}

input[type='checkbox']:focus + .checkbox-label {
  border: var(--focus-border);
  outline: none;
  border-radius: 4px;
}
</style>
