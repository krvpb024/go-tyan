<template>
  <div
    class="exam-mode-info-modal"
    ref="examModeInfoModalContainerElement"
    tabindex="-1"
    @keydown.esc="service.send('HIDE_INFO_MODAL')"
  >
    <div
      class="exam-mode-info-modal__background"
      ref="examModeInfoModalBackgroundElement"
      @click="service.send('HIDE_INFO_MODAL')"
    ></div>

    <section
      class="exam-mode-info-modal__content-block"
      ref="examModeInfoModalElement"
      role="dialog"
      aria-labelledby="exam-mode-info-modal-title-block__title"
      aria-modal="true"
      aria-describedat=""
    >
      <button
        class="exam-mode-info-modal-content-block__close-button"
        ref="closeButtonElement"
        aria-labelledby="info-modal-close-icon-title"
        @click="service.send('HIDE_INFO_MODAL')"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14.729"
          height="14.727"
          viewBox="0 0 14.729 14.727"
          aria-labelledby="info-modal-close-icon-title"
          aria-describedby="exam-mode-info-modal-describe"
          role="img"
        >
          <title id="info-modal-close-icon-title">關閉</title>
          <g
            id="Group_101"
            data-name="Group 101"
            transform="translate(-.414 -.415)"
          >
            <path
              id="Union_10"
              d="M-11781.959-9448.151l-5.657-5.657-5.656 5.657a1 1 0 0 1-1.415 0 1 1 0 0 1 0-1.415l5.657-5.656-5.657-5.657a1 1 0 0 1 0-1.412 1 1 0 0 1 1.415 0l5.656 5.656 5.657-5.656a1 1 0 0 1 1.415 0 1 1 0 0 1 0 1.412l-5.658 5.658 5.655 5.655a1 1 0 0 1 0 1.415.991.991 0 0 1-.705.293 1 1 0 0 1-.707-.293z"
              fill="#313131"
              data-name="Union 10"
              transform="translate(11795.395 9463)"
            />
          </g>
        </svg>
      </button>

      <div class="exam-mode-info-modal-content-block__title-block">
        <h2
          id="exam-mode-info-modal-title-block__title"
          class="exam-mode-info-modal-title-block__title"
        >操作方式</h2>
      </div>

      <p class="app-visual-hidden" id="exam-mode-info-modal-describe">
        使用點擊卡片或是鍵盤方向鍵「下」，來顯示解答；如果回答錯誤，可以左滑卡片或是使用鍵盤方向鍵「左」，稍後補強測驗會再一次出現；如果回答正確，可以右滑卡片或使用鍵盤方向鍵「右」，消除卡片。
      </p>

      <div class="exam-mode-info-modal-content-block__description-block" aria-hidden="true">
        <div class="exam-mode-info-modal-description-block__description"></div>

        <div class="exam-mode-info-modal-description-block__description">
          <p class="exam-mode-info-modal-description__text">
            觸控/滑鼠
          </p>
        </div>

        <div class="exam-mode-info-modal-description-block__description">
          <p class="exam-mode-info-modal-description__text">
            鍵盤
          </p>
        </div>

        <div class="exam-mode-info-modal-description-block__description">
          <p class="exam-mode-info-modal-description__text">點擊解答</p>
        </div>

        <div class="exam-mode-info-modal-description-block__description">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32.503"
            height="33.072"
            viewBox="0 0 32.503 33.072"
          >
            <g
              id="Group_201"
              isolation="isolate"
              data-name="Group 201"
              transform="translate(-106.898 -195)"
            >
              <path
                id="Union_14"
                d="M-15187.237-5735.98l-.713-.706a7 7 0 0 1 0-9.9l2.123-2.124a3.977 3.977 0 0 1 2.329-1.14v-9.15a8.007 8.007 0 0 1 8-8h10a8.01 8.01 0 0 1 8 8v15a8.01 8.01 0 0 1-8 8h-10a8 8 0 0 1-1.651-.171l-.194.194a6.962 6.962 0 0 1-4.948 2.051 6.96 6.96 0 0 1-4.946-2.054zm21.737-2.021a6.007 6.007 0 0 0 6-6v-15a6.007 6.007 0 0 0-6-6h-10a6 6 0 0 0-6 6v7.375l4.037-4.04a1.758 1.758 0 0 1 2.475 0 1.757 1.757 0 0 1 0 2.478l-4.834 4.834 4.6 4.6a4 4 0 0 1 0 5.654l-.1.1z"
                fill="#313131"
                data-name="Union 14"
                transform="translate(15296.898 5962.001)"
              />
            </g>
          </svg>
        </div>

        <div class="exam-mode-info-modal-description-block__description">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32.211"
            height="31.651"
            viewBox="0 0 32.211 31.651"
          >
            <g
              id="Group_375"
              data-name="Group 375"
              transform="translate(-251 -239)"
            >
              <g
                id="Group_339"
                data-name="Group 339"
                transform="translate(251 239)"
              >
                <g
                  id="Path_116"
                  data-name="Path 116"
                  transform="translate(0.082)"
                  fill="#fff"
                >
                  <path
                    d="M 26.87296104431152 30.65060043334961 L 5.191650867462158 30.65060043334961 C 2.873830795288086 30.65060043334961 0.9881407618522644 28.79675102233887 0.9881407618522644 26.51807022094727 L 0.9881407618522644 10.06791114807129 L 0.9881407618522644 9.99596118927002 L 0.977840781211853 9.924751281738281 C 0.8984007835388184 9.375600814819336 0.8983507752418518 8.821210861206055 0.9776808023452759 8.27699089050293 C 1.343990802764893 5.764081001281738 3.297090768814087 3.924121141433716 4.4287109375 3.051001071929932 C 6.164167881011963 1.711979866027832 8.04332447052002 1.007847785949707 9.013687133789062 1.000067353248596 C 10.70184803009033 1.06130588054657 23.9350528717041 1.540765047073364 25.9488468170166 1.595673203468323 C 26.28371047973633 1.768607497215271 26.59616088867188 1.921170234680176 26.90005111694336 2.069541215896606 C 28.98153495788574 3.085853815078735 30.03157997131348 3.598403215408325 31.09406852722168 7.528915405273438 C 31.15061187744141 7.999000072479248 31.12563514709473 9.039285659790039 31.10350036621094 9.961141586303711 C 31.0902099609375 10.51482105255127 31.07647132873535 11.08735084533691 31.07647132873535 11.60416126251221 L 31.07647132873535 26.51807022094727 C 31.07647132873535 28.79675102233887 29.19078063964844 30.65060043334961 26.87296104431152 30.65060043334961 Z M 26.05305290222168 1.52171516418457 L 25.96703147888184 1.511628150939941 L 25.20419120788574 0.6406511664390564 L 25.95326995849609 -0.3679588437080383 L 26.66963386535645 -0.2839552164077759 L 26.05305290222168 1.52171516418457 Z"
                    stroke="none"
                  />
                  <path
                    d="M 9.00225830078125 2.00031852722168 C 8.319093704223633 2.015691757202148 6.66448974609375 2.589010238647461 5.039581298828125 3.842741012573242 C 4.048097610473633 4.607738494873047 2.353158950805664 6.190868377685547 1.988130569458008 8.290363311767578 L 1.988130569458008 26.51807022094727 C 1.988130569458008 28.24535179138184 3.425220489501953 29.65060043334961 5.191650390625 29.65060043334961 L 26.87296104431152 29.65060043334961 C 28.63938140869141 29.65060043334961 30.07647132873535 28.24535179138184 30.07647132873535 26.51807022094727 L 30.07647132873535 11.60416030883789 C 30.07647132873535 11.07535171508789 30.09036064147949 10.4967212677002 30.10379028320312 9.937141418457031 C 30.12214660644531 9.172563552856445 30.14678001403809 8.146356582641602 30.10840225219727 7.715202331542969 C 29.65191459655762 6.047651290893555 29.1705322265625 4.968791961669922 28.59745025634766 4.326641082763672 C 28.12068176269531 3.792400360107422 27.53709030151367 3.49342155456543 26.46129035949707 2.968141555786133 C 26.22442626953125 2.852495193481445 25.96660995483398 2.726615905761719 25.69402313232422 2.588485717773438 C 23.11659622192383 2.511354446411133 11.60655403137207 2.094783782958984 9.00225830078125 2.00031852722168 M 9.02992057800293 1.9073486328125e-06 C 9.02992057800293 1.9073486328125e-06 25.59039497375488 0.6007900238037109 26.18695068359375 0.6007900238037109 C 26.19652557373047 0.6007900238037109 26.201904296875 0.6006355285644531 26.2031192779541 0.6003227233886719 C 29.10514450073242 2.133295059204102 30.6993293762207 2.191738128662109 32.07646942138672 7.331300735473633 C 32.19409942626953 8.127090454101562 32.07646942138672 10.11279106140137 32.07646942138672 11.60416030883789 L 32.07646942138672 26.51807022094727 C 32.07646942138672 29.35269165039062 29.74678039550781 31.65060043334961 26.87296104431152 31.65060043334961 L 5.191650390625 31.65060043334961 C 2.317831039428711 31.65060043334961 -0.01186943054199219 29.35269165039062 -0.01186943054199219 26.51807022094727 L -0.01186943054199219 8.132762908935547 C 0.6905994415283203 3.313831329345703 6.484281539916992 1.9073486328125e-06 9.02992057800293 1.9073486328125e-06 Z M 26.2021312713623 0.5998020172119141 C 26.20332527160645 0.6000080108642578 26.20366668701172 0.6001815795898438 26.2031192779541 0.6003227233886719 C 26.2027645111084 0.6001358032226562 26.20248413085938 0.5999889373779297 26.2021312713623 0.5998020172119141 Z M -0.01186943054199219 7.331300735473633 L -0.01186943054199219 8.132762908935547 L -0.01186943054199219 7.331300735473633 Z M -0.01186943054199219 8.132762908935547 L -0.01186943054199219 10.06791114807129 C -0.1084098815917969 9.400514602661133 -0.1024303436279297 8.75401496887207 -0.01186943054199219 8.132762908935547 Z"
                    stroke="none"
                    fill="#313131"
                  />
                </g>
                <g
                  id="Rectangle_825"
                  data-name="Rectangle 825"
                  transform="translate(4.324 0)"
                  fill="#fff"
                  stroke="#313131"
                  stroke-width="2"
                >
                  <rect
                    width="25"
                    height="25"
                    rx="5"
                    stroke="none"
                  />
                  <rect
                    x="1"
                    y="1"
                    width="23"
                    height="23"
                    rx="4"
                    fill="none"
                  />
                </g>
              </g>
              <g
                id="Group_354"
                data-name="Group 354"
                transform="translate(271.143 243.962) rotate(90)"
              >
                <rect
                  id="Rectangle_827"
                  data-name="Rectangle 827"
                  width="13.687"
                  height="2.139"
                  rx="1.069"
                  transform="translate(0 2.448)"
                  fill="#313131"
                />
                <rect
                  id="Rectangle_828"
                  data-name="Rectangle 828"
                  width="7.699"
                  height="2.139"
                  rx="1.069"
                  transform="translate(8.696 -2) rotate(45)"
                  fill="#313131"
                />
                <rect
                  id="Rectangle_829"
                  data-name="Rectangle 829"
                  width="7.699"
                  height="2.139"
                  rx="1.07"
                  transform="translate(14.141 3.513) rotate(135)"
                  fill="#313131"
                />
              </g>
            </g>
          </svg>
        </div>

        <div class="exam-mode-info-modal-description-block__description">
          <p class="exam-mode-info-modal-description__text">答錯左滑</p>
        </div>

        <div class="exam-mode-info-modal-description-block__description">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="39.603"
            height="32.996"
            viewBox="0 0 39.603 32.996"
          >
            <path
              id="Union_17"
              d="M-15177-5734.006a7.938 7.938 0 0 1-5.428-2.123A8.013 8.013 0 0 1-15189-5744v-15a8.007 8.007 0 0 1 8-8h10a7.983 7.983 0 0 1 5.429 2.127 7.992 7.992 0 0 1 4.513 2.524A7.945 7.945 0 0 1-15159-5757v2.1h8.451a1.15 1.15 0 0 1 1.151 1.151 1.149 1.149 0 0 1-1.151 1.147h-8.451v10.6a8.007 8.007 0 0 1-8 8zm14-9.995a8.013 8.013 0 0 1-7.757 7.994h3.755a6 6 0 0 0 6-6v-10.6h-2zm-24-15v15a6.009 6.009 0 0 0 6 6h10a6.009 6.009 0 0 0 6-6v-8.6h-8.684l4.872 4.872a1.151 1.151 0 0 1 0 1.627 1.148 1.148 0 0 1-.812.339 1.148 1.148 0 0 1-.815-.339l-6.857-6.857a1.15 1.15 0 0 1 0-1.628l.061-.057a1.868 1.868 0 0 1 .148-.183l6.861-6.861a1.153 1.153 0 0 1 1.624 0 1.15 1.15 0 0 1 0 1.628l-5.157 5.161h8.76v-4.1a6 6 0 0 0-6-6h-10A6 6 0 0 0-15187-5759zm26 4.1v-2.1a5.958 5.958 0 0 0-1.075-3.427 5.966 5.966 0 0 0-1.472-1.479 7.941 7.941 0 0 1 .547 2.907v4.1z"
              fill="#313131"
              data-name="Union 17"
              transform="translate(15189 5767.002)"
            />
          </svg>
        </div>

        <div class="exam-mode-info-modal-description-block__description">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32.211"
            height="31.651"
            viewBox="0 0 32.211 31.651"
          >
            <g
              id="Group_376"
              data-name="Group 376"
              transform="translate(-251 -324)"
            >
              <g
                id="Group_358"
                data-name="Group 358"
                transform="translate(251 324)"
              >
                <g
                  id="Path_116"
                  data-name="Path 116"
                  transform="translate(0.082)"
                  fill="#fff"
                >
                  <path
                    d="M 26.87296104431152 30.65060043334961 L 5.191650867462158 30.65060043334961 C 2.873830795288086 30.65060043334961 0.9881407618522644 28.79675102233887 0.9881407618522644 26.51807022094727 L 0.9881407618522644 10.06791114807129 L 0.9881407618522644 9.99596118927002 L 0.977840781211853 9.924751281738281 C 0.8984007835388184 9.375600814819336 0.8983507752418518 8.821210861206055 0.9776808023452759 8.27699089050293 C 1.343990802764893 5.764081001281738 3.297090768814087 3.924121141433716 4.4287109375 3.051001071929932 C 6.164167881011963 1.711979866027832 8.04332447052002 1.007847785949707 9.013687133789062 1.000067353248596 C 10.70184803009033 1.06130588054657 23.9350528717041 1.540765047073364 25.9488468170166 1.595673203468323 C 26.28371047973633 1.768607497215271 26.59616088867188 1.921170234680176 26.90005111694336 2.069541215896606 C 28.98153495788574 3.085853815078735 30.03157997131348 3.598403215408325 31.09406852722168 7.528915405273438 C 31.15061187744141 7.999000072479248 31.12563514709473 9.039285659790039 31.10350036621094 9.961141586303711 C 31.0902099609375 10.51482105255127 31.07647132873535 11.08735084533691 31.07647132873535 11.60416126251221 L 31.07647132873535 26.51807022094727 C 31.07647132873535 28.79675102233887 29.19078063964844 30.65060043334961 26.87296104431152 30.65060043334961 Z M 26.05305290222168 1.52171516418457 L 25.96703147888184 1.511628150939941 L 25.20419120788574 0.6406511664390564 L 25.95326995849609 -0.3679588437080383 L 26.66963386535645 -0.2839552164077759 L 26.05305290222168 1.52171516418457 Z"
                    stroke="none"
                  />
                  <path
                    d="M 9.00225830078125 2.00031852722168 C 8.319093704223633 2.015691757202148 6.66448974609375 2.589010238647461 5.039581298828125 3.842741012573242 C 4.048097610473633 4.607738494873047 2.353158950805664 6.190868377685547 1.988130569458008 8.290363311767578 L 1.988130569458008 26.51807022094727 C 1.988130569458008 28.24535179138184 3.425220489501953 29.65060043334961 5.191650390625 29.65060043334961 L 26.87296104431152 29.65060043334961 C 28.63938140869141 29.65060043334961 30.07647132873535 28.24535179138184 30.07647132873535 26.51807022094727 L 30.07647132873535 11.60416030883789 C 30.07647132873535 11.07535171508789 30.09036064147949 10.4967212677002 30.10379028320312 9.937141418457031 C 30.12214660644531 9.172563552856445 30.14678001403809 8.146356582641602 30.10840225219727 7.715202331542969 C 29.65191459655762 6.047651290893555 29.1705322265625 4.968791961669922 28.59745025634766 4.326641082763672 C 28.12068176269531 3.792400360107422 27.53709030151367 3.49342155456543 26.46129035949707 2.968141555786133 C 26.22442626953125 2.852495193481445 25.96660995483398 2.726615905761719 25.69402313232422 2.588485717773438 C 23.11659622192383 2.511354446411133 11.60655403137207 2.094783782958984 9.00225830078125 2.00031852722168 M 9.02992057800293 1.9073486328125e-06 C 9.02992057800293 1.9073486328125e-06 25.59039497375488 0.6007900238037109 26.18695068359375 0.6007900238037109 C 26.19652557373047 0.6007900238037109 26.201904296875 0.6006355285644531 26.2031192779541 0.6003227233886719 C 29.10514450073242 2.133295059204102 30.6993293762207 2.191738128662109 32.07646942138672 7.331300735473633 C 32.19409942626953 8.127090454101562 32.07646942138672 10.11279106140137 32.07646942138672 11.60416030883789 L 32.07646942138672 26.51807022094727 C 32.07646942138672 29.35269165039062 29.74678039550781 31.65060043334961 26.87296104431152 31.65060043334961 L 5.191650390625 31.65060043334961 C 2.317831039428711 31.65060043334961 -0.01186943054199219 29.35269165039062 -0.01186943054199219 26.51807022094727 L -0.01186943054199219 8.132762908935547 C 0.6905994415283203 3.313831329345703 6.484281539916992 1.9073486328125e-06 9.02992057800293 1.9073486328125e-06 Z M 26.2021312713623 0.5998020172119141 C 26.20332527160645 0.6000080108642578 26.20366668701172 0.6001815795898438 26.2031192779541 0.6003227233886719 C 26.2027645111084 0.6001358032226562 26.20248413085938 0.5999889373779297 26.2021312713623 0.5998020172119141 Z M -0.01186943054199219 7.331300735473633 L -0.01186943054199219 8.132762908935547 L -0.01186943054199219 7.331300735473633 Z M -0.01186943054199219 8.132762908935547 L -0.01186943054199219 10.06791114807129 C -0.1084098815917969 9.400514602661133 -0.1024303436279297 8.75401496887207 -0.01186943054199219 8.132762908935547 Z"
                    stroke="none"
                    fill="#313131"
                  />
                </g>
                <g
                  id="Rectangle_825"
                  data-name="Rectangle 825"
                  transform="translate(4.324 0)"
                  fill="#fff"
                  stroke="#313131"
                  stroke-width="2"
                >
                  <rect
                    width="25"
                    height="25"
                    rx="5"
                    stroke="none"
                  />
                  <rect
                    x="1"
                    y="1"
                    width="23"
                    height="23"
                    rx="4"
                    fill="none"
                  />
                </g>
              </g>
              <g
                id="Group_338"
                data-name="Group 338"
                transform="translate(260.592 332.759)"
              >
                <rect
                  id="Rectangle_827"
                  data-name="Rectangle 827"
                  width="13.687"
                  height="2.139"
                  rx="1.069"
                  transform="translate(0.453 4.448)"
                  fill="#313131"
                />
                <rect
                  id="Rectangle_828"
                  data-name="Rectangle 828"
                  width="7.699"
                  height="2.139"
                  rx="1.069"
                  transform="translate(6.956 1.512) rotate(135)"
                  fill="#313131"
                />
              </g>
            </g>
          </svg>
        </div>

        <div class="exam-mode-info-modal-description-block__description">
          <span class="exam-mode-info-modal-description__text">答對右滑</span>
        </div>

        <div class="exam-mode-info-modal-description-block__description">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="41.125"
            height="32.996"
            viewBox="0 0 41.125 32.996"
          >
            <path
              id="Union_18"
              d="M-15177-5734.006a7.938 7.938 0 0 1-5.428-2.123A8.013 8.013 0 0 1-15189-5744v-15a8.007 8.007 0 0 1 8-8h10a7.983 7.983 0 0 1 5.429 2.127 7.992 7.992 0 0 1 4.513 2.524A7.945 7.945 0 0 1-15159-5757v9.812h7.174l-4.871-4.872a1.149 1.149 0 0 1 0-1.627 1.141 1.141 0 0 1 .812-.335 1.146 1.146 0 0 1 .816.335l6.857 6.861a1.147 1.147 0 0 1 0 1.624c-.02.023-.042.042-.062.061a1.105 1.105 0 0 1-.148.183l-6.861 6.858a1.146 1.146 0 0 1-1.624 0 1.15 1.15 0 0 1 0-1.628l5.157-5.157h-7.25v2.882a8.007 8.007 0 0 1-8 8zm14-9.995a8.013 8.013 0 0 1-7.757 7.994h3.755a6 6 0 0 0 6-6v-2.882h-2zm-24-15v15a6.009 6.009 0 0 0 6 6h10a6.009 6.009 0 0 0 6-6v-.888h-7.959a1.153 1.153 0 0 1-1.151-1.151 1.15 1.15 0 0 1 1.151-1.151h7.959V-5759a6 6 0 0 0-6-6h-10a6 6 0 0 0-6 6zm26 11.809V-5757a5.958 5.958 0 0 0-1.075-3.427 5.966 5.966 0 0 0-1.472-1.479 7.941 7.941 0 0 1 .547 2.906v11.809z"
              fill="#313131"
              data-name="Union 18"
              transform="translate(15189 5767.002)"
            />
          </svg>
        </div>

        <div class="exam-mode-info-modal-description-block__description">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32.211"
            height="31.651"
            viewBox="0 0 32.211 31.651"
          >
            <g
              id="Group_377"
              data-name="Group 377"
              transform="translate(-251 -407)"
            >
              <g
                id="Group_359"
                data-name="Group 359"
                transform="translate(251 407)"
              >
                <g
                  id="Path_116"
                  data-name="Path 116"
                  transform="translate(0.082)"
                  fill="#fff"
                >
                  <path
                    d="M 26.87296104431152 30.65060043334961 L 5.191650867462158 30.65060043334961 C 2.873830795288086 30.65060043334961 0.9881407618522644 28.79675102233887 0.9881407618522644 26.51807022094727 L 0.9881407618522644 10.06791114807129 L 0.9881407618522644 9.99596118927002 L 0.977840781211853 9.924751281738281 C 0.8984007835388184 9.375600814819336 0.8983507752418518 8.821210861206055 0.9776808023452759 8.27699089050293 C 1.343990802764893 5.764081001281738 3.297090768814087 3.924121141433716 4.4287109375 3.051001071929932 C 6.164167881011963 1.711979866027832 8.04332447052002 1.007847785949707 9.013687133789062 1.000067353248596 C 10.70184803009033 1.06130588054657 23.9350528717041 1.540765047073364 25.9488468170166 1.595673203468323 C 26.28371047973633 1.768607497215271 26.59616088867188 1.921170234680176 26.90005111694336 2.069541215896606 C 28.98153495788574 3.085853815078735 30.03157997131348 3.598403215408325 31.09406852722168 7.528915405273438 C 31.15061187744141 7.999000072479248 31.12563514709473 9.039285659790039 31.10350036621094 9.961141586303711 C 31.0902099609375 10.51482105255127 31.07647132873535 11.08735084533691 31.07647132873535 11.60416126251221 L 31.07647132873535 26.51807022094727 C 31.07647132873535 28.79675102233887 29.19078063964844 30.65060043334961 26.87296104431152 30.65060043334961 Z M 26.05305290222168 1.52171516418457 L 25.96703147888184 1.511628150939941 L 25.20419120788574 0.6406511664390564 L 25.95326995849609 -0.3679588437080383 L 26.66963386535645 -0.2839552164077759 L 26.05305290222168 1.52171516418457 Z"
                    stroke="none"
                  />
                  <path
                    d="M 9.00225830078125 2.00031852722168 C 8.319093704223633 2.015691757202148 6.66448974609375 2.589010238647461 5.039581298828125 3.842741012573242 C 4.048097610473633 4.607738494873047 2.353158950805664 6.190868377685547 1.988130569458008 8.290363311767578 L 1.988130569458008 26.51807022094727 C 1.988130569458008 28.24535179138184 3.425220489501953 29.65060043334961 5.191650390625 29.65060043334961 L 26.87296104431152 29.65060043334961 C 28.63938140869141 29.65060043334961 30.07647132873535 28.24535179138184 30.07647132873535 26.51807022094727 L 30.07647132873535 11.60416030883789 C 30.07647132873535 11.07535171508789 30.09036064147949 10.4967212677002 30.10379028320312 9.937141418457031 C 30.12214660644531 9.172563552856445 30.14678001403809 8.146356582641602 30.10840225219727 7.715202331542969 C 29.65191459655762 6.047651290893555 29.1705322265625 4.968791961669922 28.59745025634766 4.326641082763672 C 28.12068176269531 3.792400360107422 27.53709030151367 3.49342155456543 26.46129035949707 2.968141555786133 C 26.22442626953125 2.852495193481445 25.96660995483398 2.726615905761719 25.69402313232422 2.588485717773438 C 23.11659622192383 2.511354446411133 11.60655403137207 2.094783782958984 9.00225830078125 2.00031852722168 M 9.02992057800293 1.9073486328125e-06 C 9.02992057800293 1.9073486328125e-06 25.59039497375488 0.6007900238037109 26.18695068359375 0.6007900238037109 C 26.19652557373047 0.6007900238037109 26.201904296875 0.6006355285644531 26.2031192779541 0.6003227233886719 C 29.10514450073242 2.133295059204102 30.6993293762207 2.191738128662109 32.07646942138672 7.331300735473633 C 32.19409942626953 8.127090454101562 32.07646942138672 10.11279106140137 32.07646942138672 11.60416030883789 L 32.07646942138672 26.51807022094727 C 32.07646942138672 29.35269165039062 29.74678039550781 31.65060043334961 26.87296104431152 31.65060043334961 L 5.191650390625 31.65060043334961 C 2.317831039428711 31.65060043334961 -0.01186943054199219 29.35269165039062 -0.01186943054199219 26.51807022094727 L -0.01186943054199219 8.132762908935547 C 0.6905994415283203 3.313831329345703 6.484281539916992 1.9073486328125e-06 9.02992057800293 1.9073486328125e-06 Z M 26.2021312713623 0.5998020172119141 C 26.20332527160645 0.6000080108642578 26.20366668701172 0.6001815795898438 26.2031192779541 0.6003227233886719 C 26.2027645111084 0.6001358032226562 26.20248413085938 0.5999889373779297 26.2021312713623 0.5998020172119141 Z M -0.01186943054199219 7.331300735473633 L -0.01186943054199219 8.132762908935547 L -0.01186943054199219 7.331300735473633 Z M -0.01186943054199219 8.132762908935547 L -0.01186943054199219 10.06791114807129 C -0.1084098815917969 9.400514602661133 -0.1024303436279297 8.75401496887207 -0.01186943054199219 8.132762908935547 Z"
                    stroke="none"
                    fill="#313131"
                  />
                </g>
                <g
                  id="Rectangle_825"
                  data-name="Rectangle 825"
                  transform="translate(4.324 0)"
                  fill="#fff"
                  stroke="#313131"
                  stroke-width="2"
                >
                  <rect
                    width="25"
                    height="25"
                    rx="5"
                    stroke="none"
                  />
                  <rect
                    x="1"
                    y="1"
                    width="23"
                    height="23"
                    rx="4"
                    fill="none"
                  />
                </g>
              </g>
              <g
                id="Group_336"
                data-name="Group 336"
                transform="translate(260.59 415.555)"
              >
                <rect
                  id="Rectangle_827"
                  data-name="Rectangle 827"
                  width="13.687"
                  height="2.139"
                  rx="1.069"
                  transform="translate(0 4.448)"
                  fill="#313131"
                />
                <rect
                  id="Rectangle_828"
                  data-name="Rectangle 828"
                  width="7.699"
                  height="2.139"
                  rx="1.069"
                  transform="translate(8.696 0) rotate(45)"
                  fill="#313131"
                />
              </g>
            </g>
          </svg>
        </div>

      </div>
    </section>
  </div>
</template>

<script>
import { ref, watch, onMounted } from '@vue/composition-api'
import { gsap } from 'gsap'
import { useModalNavigation } from '@/utils/useModalNavigation'

export default {
  name: 'examModeInfoModal',
  props: {
    service: {
      type: Object,
      required: true,
    },
    current: {
      type: Object,
      required: true,
    },
    buttonInfo: {
      type: Object,
    },
  },
  setup (props) {
    // element
    const examModeInfoModalContainerElement = ref(null)
    const examModeInfoModalBackgroundElement = ref(null)
    const examModeInfoModalElement = ref(null)
    const closeButtonElement = ref(null)

    // data
    const examModeInfoModalAnimationTimeline = ref(null)
    const modalFocusables = ref(null)

    // composition
    useModalNavigation(modalFocusables)

    // effect
    watch(
      () => props.current.matches('idle.infoModal.showInfoModalAnimation'),
      function showInfoModalAnimationWatcher (value) {
        if (!value) return
        const { top, left, width, height } = getOffset(examModeInfoModalContainerElement.value)

        function getOffset (el) {
          const { top, left, width, height } = el.getBoundingClientRect()

          return {
            left: left + window.scrollX,
            top: top + window.scrollY,
            width,
            height,
          }
        }

        showInfoModalAnimation()
          .then(function showAnimationEnd () {
            props.service.send('SHOW_INFO_MODAL_ANIMATION_END')
            closeButtonElement.value.focus()
          })

        function showInfoModalAnimation () {
          gsap.set(examModeInfoModalElement.value, { clearProps: 'all' })
          gsap.set(examModeInfoModalElement.value, { display: 'block' })
          gsap.set(examModeInfoModalBackgroundElement.value, { display: 'block' })

          examModeInfoModalAnimationTimeline.value = gsap.timeline({ paused: true })

          const duration = 0.3
          return examModeInfoModalAnimationTimeline.value
            .from(examModeInfoModalElement.value, {
              left,
              top,
              width,
              height,
              duration,
              ease: 'circ.inOut',
            })
            .from(examModeInfoModalElement.value, {
              x: '+=50%',
              y: '+=50%',
              duration: duration - 0.1,
            }, `-=${duration}`)
            .play()
        }
      }
    )

    watch(
      () => props.current.matches('idle.infoModal.hideInfoModalAnimation'),
      function hideInfoModalAnimationWatcher (value) {
        if (!value) return
        hideInfoModalAnimation()
          .then(function hideAnimationEnd () {
            props.service.send('HIDE_INFO_MODAL_ANIMATION_END')
          })

        function hideInfoModalAnimation () {
          return examModeInfoModalAnimationTimeline.value.reverse()
            .then(function hideModal () {
              gsap.set(examModeInfoModalElement.value, { display: 'none' })
              gsap.set(examModeInfoModalBackgroundElement.value, { display: 'none' })
            })
        }
      }
    )

    onMounted(function examModeInfoModalOnMounted () {
      modalFocusables.value = examModeInfoModalContainerElement.value.querySelectorAll('button')
    })

    return {
      // element
      examModeInfoModalContainerElement,
      examModeInfoModalElement,
      examModeInfoModalBackgroundElement,
      closeButtonElement,
      modalFocusables,
    }
  },
}
</script>

<style scoped>
.exam-mode-info-modal {
  position: absolute;
  z-index: 100;
  width: 100%;
  height: 100%;
}

.exam-mode-info-modal__background {
  display: none;
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}

.exam-mode-info-modal__content-block {
  position: fixed;
  width: 70%;
  max-width: calc(var(--app-max-width) * 0.5);
  border-radius: 6px;
  box-shadow: 0 3px 20px 0 rgba(0, 0, 0, 0.16);
  border: solid 3px var(--text-color);
  background-color: #fff;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  display: none;
  overflow: hidden;
  will-change: auto;
}

.exam-mode-info-modal-content-block__close-button {
  position: absolute;
  left: 10px;
  top: 10px;
  padding: 3px;
  background-color: transparent;
  border: var(--focus-border-width) solid transparent;
}

.exam-mode-info-modal-content-block__close-button:focus {
  border: 4px solid var(--main-color);
  outline: none;
}

.exam-mode-info-modal-content-block__title-block {
  text-align: center;
  border-bottom: 3px solid var(--text-color);
  width: 80%;
  margin: 0 auto;
  padding-top: 31px;
  padding-bottom: 22px;
}

.exam-mode-info-modal-title-block__title {
  font-size: 1.25rem;
  margin: 0;
}

.exam-mode-info-modal-content-block__description-block {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-row-gap: 30px;
  row-gap: 40px;
  margin: 25px 0 45px 0;
}

.exam-mode-info-modal-description-block__description {
  display: flex;
  align-items: center;
  justify-content: center;
}

.exam-mode-info-modal-description__text {
  font-size: 1rem;
  font-weight: bold;
}
</style>
