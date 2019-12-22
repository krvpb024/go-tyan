<template>
  <section class="home">
    <header class="home__header">
      <img
        class="home-header__logo"
        src="@/assets/awu.png"
        alt="阿五 logo"
      >

      <h1 class="home-header__title">
        <span class="home-title__span">阿五</span>
      </h1>

      <button class="home-header__install-button">
        <span class="home-install-button__content">
          + 桌面
        </span>
      </button>

      <div
        class="home-header__stream"
        ref="streamElement"
        tabindex="0"
        @keydown="streamMoveByKey"
        @wheel="wheelStreamScroll"
        @mousedown="streamMoveStart"
        @mousemove.passive="streamMoving"
        @mouseup="streamMoveEnd"
        @touchstart="streamMoveStart"
        @touchmove.passive="streamMoving"
        @touchend="streamMoveEnd"
      >
        <div
          class="home-stream__content-block"
          ref="streamContentBlockElement"
        >
          <home-stream-item class="home-content-block__item--first">
            <p>嗨！54 阿五！</p>
          </home-stream-item>

          <home-stream-item class="home-content-block__item--second">
            <p>加入到桌面更方便使用喔！</p>
          </home-stream-item>

          <home-stream-item class="home-content-block__item--third">
            <p>2020 年 1 月 11 日，一定要回家投票喔！</p>
          </home-stream-item>
        </div>
      </div>
    </header>

    <nav class="home__nav">
      <router-link
        to="/table"
        class="home-nav__nav-item"
      >
        <home-card>
          <template #image>
            <svg
              id="Group_320"
              data-name="Group 320"
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="44.743"
              viewBox="0 0 50 44.743"
            >
              <g
                id="Group_11"
                data-name="Group 11"
                transform="translate(2 1.608)"
              >
                <path
                  id="Path_9"
                  data-name="Path 9"
                  d="M5,0H43a5.15,5.15,0,0,1,5,5.288V37.846a5.15,5.15,0,0,1-5,5.288H5a5.15,5.15,0,0,1-5-5.288V5.288A5.15,5.15,0,0,1,5,0Z"
                  fill="#ffc400"
                />
                <text
                  id="あ_a"
                  data-name="あ a"
                  transform="translate(4.765 27.853)"
                  fill="#313131"
                  font-size="19"
                  font-family="PingFangTC-Semibold, PingFang TC"
                  font-weight="600"
                >
                  <tspan
                    x="0"
                    y="0"
                  >あ</tspan>
                  <tspan
                    y="0"
                    xml:space="preserve"
                    font-family="Roboto-Bold, Roboto"
                    font-weight="700"
                  > a</tspan>
                </text>
              </g>
              <g
                id="Path_9-2"
                data-name="Path 9"
                fill="#e0e0e0"
              >
                <path
                  d="M 43 41.35168075561523 L 5 41.35168075561523 C 2.794389963150024 41.35168075561523 1 39.47101211547852 1 37.15936279296875 L 1 5.192322254180908 C 1 2.880672216415405 2.794389963150024 1.000002264976501 5 1.000002264976501 L 43 1.000002264976501 C 45.20560836791992 1.000002264976501 47 2.880672216415405 47 5.192322254180908 L 47 37.15936279296875 C 47 39.47101211547852 45.20560836791992 41.35168075561523 43 41.35168075561523 Z"
                  stroke="none"
                />
                <path
                  d="M 5 2.000003814697266 C 3.345790863037109 2.000003814697266 2 3.432071685791016 2 5.19232177734375 L 2 37.15936279296875 C 2 38.91961288452148 3.345790863037109 40.35168075561523 5 40.35168075561523 L 43 40.35168075561523 C 44.65420913696289 40.35168075561523 46 38.91961288452148 46 37.15936279296875 L 46 5.19232177734375 C 46 3.432071685791016 44.65420913696289 2.000003814697266 43 2.000003814697266 L 5 2.000003814697266 M 5 3.814697265625e-06 L 43 3.814697265625e-06 C 45.76142120361328 3.814697265625e-06 48 2.324684143066406 48 5.19232177734375 L 48 37.15936279296875 C 48 40.02700042724609 45.76142120361328 42.35168075561523 43 42.35168075561523 L 5 42.35168075561523 C 2.238571166992188 42.35168075561523 0 40.02700042724609 0 37.15936279296875 L 0 5.19232177734375 C 0 2.324684143066406 2.238571166992188 3.814697265625e-06 5 3.814697265625e-06 Z"
                  stroke="none"
                  fill="#313131"
                />
              </g>
              <rect
                id="Rectangle_670"
                data-name="Rectangle 670"
                width="2"
                height="6"
                transform="translate(46.934 11.352)"
                fill="#ffc400"
              />
              <rect
                id="Rectangle_671"
                data-name="Rectangle 671"
                width="2"
                height="6"
                transform="translate(44.934 11.352)"
                fill="#e0e0e0"
              />
              <rect
                id="Rectangle_672"
                data-name="Rectangle 672"
                width="2"
                height="2"
                rx="1"
                transform="translate(45.934 10.352)"
                fill="#313131"
              />
              <rect
                id="Rectangle_673"
                data-name="Rectangle 673"
                width="2"
                height="2"
                rx="1"
                transform="translate(45.934 16.352)"
                fill="#313131"
              />
              <path
                id="Rectangle_674"
                data-name="Rectangle 674"
                d="M3,0H39a2,2,0,0,1,2,2V30a3,3,0,0,1-3,3H3a3,3,0,0,1-3-3V3A3,3,0,0,1,3,0Z"
                transform="translate(1.934 2.352)"
                fill="#fff"
              />
              <g
                id="Group_297"
                data-name="Group 297"
                transform="translate(4.765 6.384)"
              >
                <text
                  id="あ_a-2"
                  data-name="あ a"
                  transform="translate(1 21)"
                  fill="#d3d3d3"
                  font-size="19"
                  font-family="PingFangTC-Semibold, PingFang TC"
                  font-weight="600"
                >
                  <tspan
                    x="0"
                    y="0"
                  >あ</tspan>
                  <tspan
                    y="0"
                    xml:space="preserve"
                    font-family="Roboto-Bold, Roboto"
                    font-weight="700"
                  > a</tspan>
                </text>
                <text
                  id="あ_a-3"
                  data-name="あ a"
                  transform="translate(0 20)"
                  fill="#313131"
                  font-size="19"
                  font-family="PingFangTC-Semibold, PingFang TC"
                  font-weight="600"
                >
                  <tspan
                    x="0"
                    y="0"
                  >あ</tspan>
                  <tspan
                    y="0"
                    xml:space="preserve"
                    font-family="Roboto-Bold, Roboto"
                    font-weight="700"
                  > a</tspan>
                </text>
              </g>
            </svg>
          </template>

          <template #title>
            <h2>五十音表格</h2>
          </template>

          <template #description>
            <ul>
              <li>提供默背及手寫練習</li>
            </ul>
          </template>
        </home-card>
      </router-link>

      <router-link
        to="/exam"
        class="home-nav__nav-item"
      >
        <home-card>
          <template #image>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="45"
              height="49"
              viewBox="0 0 45 49"
            >
              <g
                id="Group_321"
                data-name="Group 321"
                transform="translate(0.066)"
              >
                <rect
                  id="Rectangle_23"
                  data-name="Rectangle 23"
                  width="43"
                  height="49"
                  rx="5"
                  transform="translate(1.934)"
                  fill="#ffc400"
                />
                <g
                  id="Rectangle_675"
                  data-name="Rectangle 675"
                  transform="translate(0.934)"
                  fill="#fff"
                  stroke="#313131"
                  stroke-width="2"
                >
                  <rect
                    width="41"
                    height="46"
                    rx="5"
                    stroke="none"
                  />
                  <rect
                    x="1"
                    y="1"
                    width="39"
                    height="44"
                    rx="4"
                    fill="none"
                  />
                </g>
                <path
                  id="Path_7"
                  data-name="Path 7"
                  d="M4509.366-1358.473l4.4,4.6,7.685-9.67"
                  transform="translate(-4486.313 1371.337)"
                  fill="none"
                  stroke="#d3d3d3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <path
                  id="Path_108"
                  data-name="Path 108"
                  d="M4509.366-1358.787l4.127,4.315,7.209-9.071"
                  transform="translate(-4486.564 1370.337)"
                  fill="none"
                  stroke="#313131"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                />
                <rect
                  id="Rectangle_677"
                  data-name="Rectangle 677"
                  width="2"
                  height="6"
                  transform="translate(40.934 26)"
                  fill="#ffc400"
                />
                <rect
                  id="Rectangle_678"
                  data-name="Rectangle 678"
                  width="2"
                  height="6"
                  transform="translate(38.934 26)"
                  fill="#fff"
                />
                <rect
                  id="Rectangle_676"
                  data-name="Rectangle 676"
                  width="2"
                  height="2"
                  rx="1"
                  transform="translate(39.934 25)"
                  fill="#313131"
                />
                <rect
                  id="Rectangle_679"
                  data-name="Rectangle 679"
                  width="2"
                  height="2"
                  rx="1"
                  transform="translate(39.934 31)"
                  fill="#313131"
                />
                <g
                  id="Group_298"
                  data-name="Group 298"
                  transform="translate(0 5)"
                >
                  <rect
                    id="Rectangle_683"
                    data-name="Rectangle 683"
                    width="2"
                    height="6"
                    transform="translate(1.934 1)"
                    fill="#fff"
                  />
                  <rect
                    id="Rectangle_681"
                    data-name="Rectangle 681"
                    width="2"
                    height="6"
                    transform="translate(-0.066 1)"
                    fill="#ffe65a"
                  />
                  <rect
                    id="Rectangle_680"
                    data-name="Rectangle 680"
                    width="2"
                    height="2"
                    rx="1"
                    transform="translate(0.934)"
                    fill="#313131"
                  />
                  <rect
                    id="Rectangle_682"
                    data-name="Rectangle 682"
                    width="2"
                    height="2"
                    rx="1"
                    transform="translate(0.934 6)"
                    fill="#313131"
                  />
                </g>
                <rect
                  id="Rectangle_684"
                  data-name="Rectangle 684"
                  width="24"
                  height="3"
                  rx="1.5"
                  transform="translate(14 36.5)"
                  fill="#d3d3d3"
                />
                <rect
                  id="Rectangle_689"
                  data-name="Rectangle 689"
                  width="3"
                  height="3"
                  rx="1.5"
                  transform="translate(7 36.5)"
                  fill="#d3d3d3"
                />
                <rect
                  id="Rectangle_685"
                  data-name="Rectangle 685"
                  width="24"
                  height="3"
                  rx="1.5"
                  transform="translate(14 29.5)"
                  fill="#d3d3d3"
                />
                <rect
                  id="Rectangle_688"
                  data-name="Rectangle 688"
                  width="3"
                  height="3"
                  rx="1.5"
                  transform="translate(7 29.5)"
                  fill="#d3d3d3"
                />
                <rect
                  id="Rectangle_686"
                  data-name="Rectangle 686"
                  width="24"
                  height="3"
                  rx="1.5"
                  transform="translate(14 22.5)"
                  fill="#d3d3d3"
                />
                <rect
                  id="Rectangle_687"
                  data-name="Rectangle 687"
                  width="3"
                  height="3"
                  rx="1.5"
                  transform="translate(7 22.5)"
                  fill="#d3d3d3"
                />
                <g
                  id="Group_6"
                  data-name="Group 6"
                  transform="translate(6.971 35.042)"
                >
                  <line
                    id="Line_1"
                    data-name="Line 1"
                    x2="21"
                    transform="translate(7.5 1.5)"
                    fill="none"
                    stroke="#313131"
                    stroke-linecap="round"
                    stroke-width="2"
                  />
                  <g
                    id="Ellipse_5"
                    data-name="Ellipse 5"
                    fill="#fff"
                    stroke="#313131"
                    stroke-width="2"
                  >
                    <circle
                      cx="1.5"
                      cy="1.5"
                      r="1.5"
                      stroke="none"
                    />
                    <circle
                      cx="1.5"
                      cy="1.5"
                      r="0.5"
                      fill="none"
                    />
                  </g>
                </g>
                <g
                  id="Group_7"
                  data-name="Group 7"
                  transform="translate(6.971 27.875)"
                >
                  <line
                    id="Line_1-2"
                    data-name="Line 1"
                    x2="21"
                    transform="translate(7.5 1.5)"
                    fill="none"
                    stroke="#313131"
                    stroke-linecap="round"
                    stroke-width="2"
                  />
                  <g
                    id="Ellipse_5-2"
                    data-name="Ellipse 5"
                    fill="#fff"
                    stroke="#313131"
                    stroke-width="2"
                  >
                    <circle
                      cx="1.5"
                      cy="1.5"
                      r="1.5"
                      stroke="none"
                    />
                    <circle
                      cx="1.5"
                      cy="1.5"
                      r="0.5"
                      fill="none"
                    />
                  </g>
                </g>
                <g
                  id="Group_8"
                  data-name="Group 8"
                  transform="translate(6.971 20.708)"
                >
                  <line
                    id="Line_1-3"
                    data-name="Line 1"
                    x2="21"
                    transform="translate(7.5 1.5)"
                    fill="none"
                    stroke="#313131"
                    stroke-linecap="round"
                    stroke-width="2"
                  />
                  <g
                    id="Ellipse_5-3"
                    data-name="Ellipse 5"
                    fill="#fff"
                    stroke="#313131"
                    stroke-width="2"
                  >
                    <circle
                      cx="1.5"
                      cy="1.5"
                      r="1.5"
                      stroke="none"
                    />
                    <circle
                      cx="1.5"
                      cy="1.5"
                      r="0.5"
                      fill="none"
                    />
                  </g>
                </g>
              </g>
            </svg>
          </template>

          <template #title>
            <h2>五十音測驗</h2>
          </template>

          <template #description>
            <ul>
              <li>平假名、片假名、拼音轉換</li>
              <li>手寫測驗</li>
            </ul>
          </template>
        </home-card>
      </router-link>

      <router-link
        to="/"
        class="home-nav__nav-item"
      >
        <home-card>
          <template #image>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="50"
              height="51"
              viewBox="0 0 50 51"
            >
              <g
                id="Group_324"
                data-name="Group 324"
                transform="translate(-52 -500)"
              >
                <rect
                  id="Rectangle_690"
                  data-name="Rectangle 690"
                  width="50"
                  height="50"
                  rx="23"
                  transform="translate(52 501)"
                  fill="#ffc400"
                />
                <g
                  id="Path_109"
                  data-name="Path 109"
                  transform="translate(52.066 500)"
                  fill="#fff"
                >
                  <path
                    d="M 24 47 C 20.89458084106445 47 17.8825798034668 46.39202117919922 15.04767036437988 45.19295883178711 C 12.30897045135498 44.03458023071289 9.849149703979492 42.37606048583984 7.736549854278564 40.26345062255859 C 5.623939990997314 38.15084838867188 3.965420007705688 35.6910285949707 2.807039976119995 32.95233154296875 C 1.607980012893677 30.1174201965332 1 27.10541915893555 1 24 C 1 20.89458084106445 1.607980012893677 17.8825798034668 2.807039976119995 15.04767036437988 C 3.965420007705688 12.30897045135498 5.623939990997314 9.849149703979492 7.736549854278564 7.736549854278564 C 9.849149703979492 5.623939990997314 12.30897045135498 3.965420007705688 15.04767036437988 2.807039976119995 C 17.8825798034668 1.607980012893677 20.89458084106445 1 24 1 C 27.10541915893555 1 30.1174201965332 1.607980012893677 32.95233154296875 2.807039976119995 C 35.6910285949707 3.965420007705688 38.15084838867188 5.623939990997314 40.26345062255859 7.736549854278564 C 42.37606048583984 9.849149703979492 44.03458023071289 12.30897045135498 45.19295883178711 15.04767036437988 C 46.39202117919922 17.8825798034668 47 20.89458084106445 47 24 C 47 27.10541915893555 46.39202117919922 30.1174201965332 45.19295883178711 32.95233154296875 C 44.03458023071289 35.6910285949707 42.37606048583984 38.15084838867188 40.26345062255859 40.26345062255859 C 38.15084838867188 42.37606048583984 35.6910285949707 44.03458023071289 32.95233154296875 45.19295883178711 C 30.1174201965332 46.39202117919922 27.10541915893555 47 24 47 Z"
                    stroke="none"
                  />
                  <path
                    d="M 24 2 C 21.02914047241211 2 18.1481990814209 2.581401824951172 15.43722152709961 3.728050231933594 C 12.81771850585938 4.836009979248047 10.46474075317383 6.422561645507812 8.443649291992188 8.443649291992188 C 6.422561645507812 10.46474075317383 4.836009979248047 12.81771850585938 3.728050231933594 15.43722152709961 C 2.581401824951172 18.1481990814209 2 21.02914047241211 2 24 C 2 26.97085952758789 2.581401824951172 29.8518009185791 3.728050231933594 32.56278228759766 C 4.836009979248047 35.18228149414062 6.422561645507812 37.53525924682617 8.443649291992188 39.55635070800781 C 10.46474075317383 41.57743835449219 12.81771850585938 43.16399002075195 15.43722152709961 44.27194976806641 C 18.1481990814209 45.41860198974609 21.02914047241211 46 24 46 C 26.97085952758789 46 29.8518009185791 45.41860198974609 32.56278228759766 44.27194976806641 C 35.18228149414062 43.16399002075195 37.53525924682617 41.57743835449219 39.55635070800781 39.55635070800781 C 41.57743835449219 37.53525924682617 43.16399002075195 35.18228149414062 44.27194976806641 32.56278228759766 C 45.41860198974609 29.8518009185791 46 26.97085952758789 46 24 C 46 21.02914047241211 45.41860198974609 18.1481990814209 44.27194976806641 15.43722152709961 C 43.16399002075195 12.81771850585938 41.57743835449219 10.46474075317383 39.55635070800781 8.443649291992188 C 37.53525924682617 6.422561645507812 35.18228149414062 4.836009979248047 32.56278228759766 3.728050231933594 C 29.8518009185791 2.581401824951172 26.97085952758789 2 24 2 M 24 0 C 37.25482940673828 0 48 10.74517059326172 48 24 C 48 37.25482940673828 37.25482940673828 48 24 48 C 10.74517059326172 48 0 37.25482940673828 0 24 C 0 10.74517059326172 10.74517059326172 0 24 0 Z"
                    stroke="none"
                    fill="#313131"
                  />
                </g>
                <rect
                  id="Rectangle_692"
                  data-name="Rectangle 692"
                  width="2"
                  height="5"
                  transform="translate(99 523)"
                  fill="#ffc400"
                />
                <rect
                  id="Rectangle_691"
                  data-name="Rectangle 691"
                  width="2"
                  height="5"
                  transform="translate(97 523)"
                  fill="#fff"
                />
                <rect
                  id="Rectangle_693"
                  data-name="Rectangle 693"
                  width="2"
                  height="2"
                  rx="1"
                  transform="translate(98 522)"
                  fill="#313131"
                />
                <rect
                  id="Rectangle_694"
                  data-name="Rectangle 694"
                  width="2"
                  height="2"
                  rx="1"
                  transform="translate(97.66 527)"
                  fill="#313131"
                />
                <g
                  id="Group_299"
                  data-name="Group 299"
                  transform="translate(60.066 503)"
                >
                  <text
                    id="_"
                    data-name="？"
                    transform="translate(-0.066 34)"
                    fill="#d3d3d3"
                    font-size="32"
                    font-family="PingFangTC-Semibold, PingFang TC"
                    font-weight="600"
                  >
                    <tspan
                      x="0"
                      y="0"
                    >？</tspan>
                  </text>
                  <text
                    id="_2"
                    data-name="？"
                    transform="translate(-0.066 32)"
                    fill="#313131"
                    font-size="30"
                    font-family="PingFangTC-Regular, PingFang TC"
                  >
                    <tspan
                      x="0"
                      y="0"
                    >？</tspan>
                  </text>
                </g>
              </g>
            </svg>
          </template>

          <template #title>
            <h2>關於</h2>
          </template>

          <template #description>
            <ul>
              <li>關於這個 App 及我們</li>
            </ul>
          </template>
        </home-card>
      </router-link>

      <router-link
        to="/"
        class="home-nav__nav-item"
      >
        <home-card>
          <template #image>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="53"
              height="39"
              viewBox="0 0 53 39"
            >
              <g
                id="Group_323"
                data-name="Group 323"
                transform="translate(-61 -639)"
              >
                <g
                  id="Group_303"
                  data-name="Group 303"
                  transform="translate(-13 43)"
                >
                  <g
                    id="Group_300"
                    data-name="Group 300"
                    transform="translate(77.366 597.244)"
                  >
                    <path
                      id="Rectangle_697"
                      data-name="Rectangle 697"
                      d="M6,0H27a6,6,0,0,1,6,6v4A12,12,0,0,1,21,22H6a6,6,0,0,1-6-6V6A6,6,0,0,1,6,0Z"
                      transform="translate(16.634 2.756)"
                      fill="#ffc400"
                    />
                    <path
                      id="Rectangle_696"
                      data-name="Rectangle 696"
                      d="M6,0H36a6,6,0,0,1,6,6V16A21,21,0,0,1,21,37H20A20,20,0,0,1,0,17V6A6,6,0,0,1,6,0Z"
                      transform="translate(-1.366 0.756)"
                      fill="#ffc400"
                    />
                  </g>
                  <g
                    id="Group_301"
                    data-name="Group 301"
                    transform="translate(74.838 596)"
                  >
                    <g
                      id="Rectangle_697-2"
                      data-name="Rectangle 697"
                      transform="translate(16.162 3)"
                      fill="#e0e0e0"
                      stroke="#313131"
                      stroke-width="2"
                    >
                      <path
                        d="M8,0H29a4,4,0,0,1,4,4v9a8,8,0,0,1-8,8H8a8,8,0,0,1-8-8V8A8,8,0,0,1,8,0Z"
                        stroke="none"
                      />
                      <path
                        d="M8,1H29a3,3,0,0,1,3,3v9a7,7,0,0,1-7,7H8a7,7,0,0,1-7-7V8A7,7,0,0,1,8,1Z"
                        fill="none"
                      />
                    </g>
                    <g
                      id="Rectangle_696-2"
                      data-name="Rectangle 696"
                      transform="translate(0.162)"
                      fill="#fff"
                      stroke="#313131"
                      stroke-width="2"
                    >
                      <path
                        d="M5.727,0H36.273A5.727,5.727,0,0,1,42,5.727V16A21,21,0,0,1,21,37h0A21,21,0,0,1,0,16V5.727A5.727,5.727,0,0,1,5.727,0Z"
                        stroke="none"
                      />
                      <path
                        d="M5.762,1H36.238A4.762,4.762,0,0,1,41,5.762V16A20,20,0,0,1,21,36h0A20,20,0,0,1,1,16V5.762A4.762,4.762,0,0,1,5.762,1Z"
                        fill="none"
                      />
                    </g>
                  </g>
                  <rect
                    id="Rectangle_698"
                    data-name="Rectangle 698"
                    width="2"
                    height="6"
                    transform="translate(76 607)"
                    fill="#fff"
                  />
                  <rect
                    id="Rectangle_699"
                    data-name="Rectangle 699"
                    width="2"
                    height="6"
                    transform="translate(74 607)"
                    fill="#ffe65a"
                  />
                  <rect
                    id="Rectangle_700"
                    data-name="Rectangle 700"
                    width="2"
                    height="2"
                    rx="1"
                    transform="translate(75 606)"
                    fill="#313131"
                  />
                  <rect
                    id="Rectangle_701"
                    data-name="Rectangle 701"
                    width="2"
                    height="2"
                    rx="1"
                    transform="translate(75 612)"
                    fill="#313131"
                  />
                  <path
                    id="Subtraction_49"
                    data-name="Subtraction 49"
                    d="M-17430-15877.294V-15907h5a4,4,0,0,1,4,4v9a19.975,19.975,0,0,1-9,16.706Z"
                    transform="translate(17536 16505)"
                    fill="#f5f5f5"
                  />
                  <rect
                    id="Rectangle_718"
                    data-name="Rectangle 718"
                    width="2"
                    height="18"
                    transform="translate(97 605)"
                    fill="#d3d3d3"
                  />
                  <g
                    id="Group_302"
                    data-name="Group 302"
                    transform="translate(92.831 600.488)"
                  >
                    <text
                      id="s"
                      transform="translate(-1.831 20.512)"
                      fill="#d3d3d3"
                      font-size="26"
                      font-family="Roboto-Medium, Roboto Medium"
                      font-weight="500"
                    >
                      <tspan
                        x="0"
                        y="0"
                      >s</tspan>
                    </text>
                    <text
                      id="s-2"
                      data-name="s"
                      transform="translate(-3.831 19.512)"
                      fill="#313131"
                      font-size="26"
                      font-family="Roboto-Medium, Roboto Medium"
                      font-weight="500"
                    >
                      <tspan
                        x="0"
                        y="0"
                      >s</tspan>
                    </text>
                  </g>
                  <rect
                    id="Rectangle_713"
                    data-name="Rectangle 713"
                    width="2"
                    height="18"
                    transform="translate(95 604)"
                    fill="#313131"
                  />
                </g>
              </g>
            </svg>
          </template>

          <template #title>
            <h2>Buy me a coffee</h2>
          </template>

          <template #description>
            <ul>
              <li>小額贊助鼓勵我們</li>
            </ul>
          </template>
        </home-card>
      </router-link>
    </nav>
  </section>
</template>

<script>
import { ref, onMounted, computed } from '@vue/composition-api'
import { gsap } from 'gsap'
import { useDragToMove } from '@/utils/useDragToMove.js'
import homeCard from '@/components/homeCard.vue'
import homeStreamItem from '@/components/homeStreamItem.vue'

export default {
  name: 'Home',
  components: { homeCard, homeStreamItem },
  setup () {
    // composition
    const { xMovement, canDrag, dragStart, getDraggingMovement, dragEnd } = useDragToMove()

    // element
    const streamElement = ref(null)
    const streamContentBlockElement = ref(null)

    // data
    const crossLimit = ref(0)
    const leftBoundary = ref(0)
    const rightBoundary = ref(null)
    const accelerator = ref(1)

    const touchStartPoint = ref(0)
    const toucheStartTime = ref(0)
    const touchEndPoint = ref(0)
    const toucheEndTime = ref(0)

    const velocity = ref(0)
    const touchDuration = computed(function getTouchDuration () {
      return toucheEndTime.value - toucheStartTime.value
    })

    // effect
    onMounted(function homeOnMounted () {
      crossLimit.value = streamElement.value.offsetWidth / 4
      rightBoundary.value = streamElement.value.offsetWidth - streamContentBlockElement.value.scrollWidth
    })

    return {
      // element
      streamElement,
      streamContentBlockElement,
      // data
      xMovement,
      crossLimit,
      rightBoundary,
      touchStartPoint,
      touchEndPoint,
      touchDuration,
      // methods
      streamMoveStart,
      streamMoving,
      streamMoveEnd,
      wheelStreamScroll,
      streamMoveByKey,
    }

    function streamMoveStart (e) {
      dragStart(e)
      touchStartPoint.value = e.touches ? e.touches[0].pageX : e.x
      toucheStartTime.value = e.timeStamp
    }

    function streamMoving (e) {
      if (!canDrag.value) return
      const movement = getDraggingMovement(e)
      touchEndPoint.value = e.touches ? e.touches[0].pageX : e.x

      if (movement > 0 && xMovement.value > leftBoundary.value) {
        xMovement.value = xMovement.value + movement * accelerator.value
        // check current position to crossLimit percentage
        accelerator.value = 0.5 - Math.abs(xMovement.value / crossLimit.value)
      } else if (movement < 0 && xMovement.value < rightBoundary.value) {
        xMovement.value = xMovement.value + movement * accelerator.value
        const extra = rightBoundary.value - xMovement.value
        // check current position to crossLimit percentage
        accelerator.value = 0.5 - Math.abs(extra / crossLimit.value)
      } else {
        xMovement.value += movement
      }

      streamContentBlockElement.value.style.transform = `translateX(${xMovement.value}px)`
    }

    function streamMoveEnd (e) {
      dragEnd()
      toucheEndTime.value = e.timeStamp

      if (xMovement.value > leftBoundary.value) {
        gsap
          .to(streamContentBlockElement.value, {
            x: 0,
            duration: 0.3,
          })
          .then(function backToPositionAnimationEnd () {
            xMovement.value = 0
            // don't know why if don't clear props, duration will be ignored
            gsap.set(streamContentBlockElement.value, { clearProps: true })
          })
      } else if (xMovement.value < rightBoundary.value) {
        gsap
          .to(streamContentBlockElement.value, {
            x: rightBoundary.value,
            duration: 0.3,
          })
          .then(function backToPositionAnimationEnd () {
            xMovement.value = rightBoundary.value
            // don't know why if don't clear props, duration will be ignored
            gsap.set(streamContentBlockElement.value, { clearProps: true })
            streamContentBlockElement.value.style.transform = `translateX(${xMovement.value}px)`
          })
        // if drag time too long, then ignore
      } else if (touchDuration.value <= 500) {
        velocity.value = (touchEndPoint.value - touchStartPoint.value) / 8
        inertiaFrame()
      }

      function inertiaFrame () {
        if (
          rightBoundary.value < xMovement.value &&
          xMovement.value < leftBoundary.value
        ) {
          requestAnimationFrame(inertiaFrame)
        }

        let resultValue = xMovement.value + velocity.value
        if (resultValue > leftBoundary.value) {
          resultValue = 0
        } else if (resultValue < rightBoundary.value) {
          resultValue = rightBoundary.value
        }
        const friction = 0.96
        xMovement.value = resultValue
        streamContentBlockElement.value.style.transform = `translateX(${xMovement.value}px)`
        velocity.value *= friction
      }
    }

    function wheelStreamScroll (e) {
      if ((e.deltaY > 0 && rightBoundary.value < xMovement.value) ||
        (e.deltaY < 0 && xMovement.value < leftBoundary.value)
      ) {
        e.preventDefault()
      }

      const movement = (e.deltaY * -1) * 10
      const resultValue = getResultMovementBetweenBoundary(movement)
      xMovement.value = resultValue
      streamContentBlockElement.value.style.transform = `translateX(${xMovement.value}px)`
    }

    function streamMoveByKey (e) {
      if (!['ArrowRight', 'ArrowLeft'].includes(e.key)) return

      let resultValue
      const moveStep = 15

      switch (e.key) {
        case 'ArrowRight':
          e.preventDefault()
          resultValue = getResultMovementBetweenBoundary(moveStep)
          break
        case 'ArrowLeft':
          e.preventDefault()
          resultValue = getResultMovementBetweenBoundary(moveStep * -1)
          break
        default:
          break
      }
      xMovement.value = resultValue
      streamContentBlockElement.value.style.transform = `translateX(${xMovement.value}px)`
    }

    function getResultMovementBetweenBoundary (addValue) {
      let resultValue = xMovement.value + addValue

      if (resultValue > leftBoundary.value) {
        resultValue = 0
      } else if (resultValue < rightBoundary.value) {
        resultValue = rightBoundary.value
      }

      return resultValue
    }
  },
}
</script>

<style scoped>
.home__header {
  margin-top: 27px;
  display: grid;
  align-items: center;
  grid-gap: 10px;
  gap: 10px;
  grid-template:
    ".      logo   title  .      install-button .     " auto
    "stream stream stream stream stream         stream" auto / 20px 70px auto 1fr auto 20px;
}

.home-header__logo {
  grid-area: logo;
  object-fit: contain;
  width: 100%;
  height: auto;
}

.home-header__title {
  grid-area: title;
  position: relative;
  font-size: 1.5rem;
  font-weight: bold;
  color: var(--text-color);
  text-shadow: 1.7px 1.5px 0 #fff;
}

.home-title__span {
  position: relative;
  z-index: 10;
}

.home-header__title::after {
  position: absolute;
  border-radius: 8px;
  content: "";
  display: block;
  width: calc(100% + 8px);
  height: 80%;
  background-color: var(--main-color);
  bottom: 0;
  left: 0;
  z-index: 9;
  transform: translate(-2px, 2px);
}

.home-header__install-button {
  grid-area: install-button;
  background-color: #fff;
  border: none;
  padding: 0;
  position: relative;
}

.home-header__install-button:focus {
  outline: 4px solid var(--main-color);
  outline-offset: 8px;
}

.home-header__install-button::after {
  content: "";
  display: block;
  background-color: var(--main-color);
  width: 100%;
  height: 100%;
  position: absolute;
  border: 2px solid var(--text-color);
  border-radius: 6px;
  top: 0;
  left: 0;
  z-index: 9;
  transform: translate(4px, 4px);
}

.home-install-button__content {
  position: relative;
  background-color: #fff;
  display: inline-block;
  border: 2px solid var(--text-color);
  border-radius: 6px;
  padding: 6px;
  font-weight: bold;
  font-size: 1rem;
  z-index: 10;
}

.home-header__stream {
  position: relative;
  grid-area: stream;
  overflow: hidden;
  padding: 10px 0;
}

.home-header__stream:focus {
  outline: 4px solid var(--main-color);
  outline-offset: 6px;
}

.fix-touch {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  z-index: 100;
}

.home-stream__content-block {
  padding: 0 20px;
  height: 100%;
  display: grid;
  grid-template-columns:
    40px minmax(min-content, auto) 40px minmax(min-content, auto)
    40px minmax(min-content, auto) 40px minmax(min-content, auto) 40px minmax(min-content, auto);
  grid-auto-flow: column dense;
  justify-content: start;
  align-content: flex-start;
  grid-row-gap: 30px;
  row-gap: 30px;
  grid-column-gap: 30px;
  column-gap: 30px;
  z-index: 9;
}

.home-content-block__item--first {
  grid-column: 1 / 4;
  grid-row: 1;
}

.home-content-block__item--second {
  grid-column: 3 / 6;
  grid-row: 2;
}
.home-content-block__item--third {
  grid-column: 5 / 8;
  grid-row: 1;
}

.home-content-block__item--forth {
  grid-column: 7 / 10;
  grid-row: 2;
}

.home-content-block__item--fifth {
  grid-column: 9 / 11;
  grid-row: 1;
}

.home__nav {
  --column-gap: 25px;
  --row-gap: 25px;

  padding: 20px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(min-content, auto));
  grid-column-gap: var(--column-gap);
  column-gap: var(--column-gap);
  grid-row-gap: var(--row-gap);
  row-gap: var(--row-gap);
}

.home-nav__nav-item {
  display: block;
}

.home-nav__nav-item:focus {
  outline: 4px solid var(--main-color);
  outline-offset: 6px;
}
</style>
