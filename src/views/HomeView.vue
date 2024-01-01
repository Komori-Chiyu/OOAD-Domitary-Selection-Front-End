<template>
  <div class="cloud-dashboard" @click="closeDropdown">
    <div role="banner"
         class="cfc-platform-bar-container cfc-platform-bar-shadow cfc-platform-bar-white gm2-platform-bar">
      <div class="left-section">
        <div class="project-info">
          <img src="../assets/LOGO.svg" class="logo" alt="">
        </div>
      </div>
      <div class="right-section">
        <div class="header-actions">
          <div class="button-container">
            <button style="height: 30px; border: none; background-color: transparent">
              <svg height="100%" width="100%" viewBox="0 96 960 960" preserveAspectRatio="xMidYMid meet"
                   focusable="false">
                <path
                    d="M700 576q0-92-64-156t-156-64q92 0 156-64t64-156q0 92 64 156t156 64q-92 0-156 64t-64 156ZM80 976V256q0-33 23.5-56.5T160 176h400v80H160v480h640V495h80v241q0 33-23.5 56.5T800 816H240L80 976Zm160-320v-80h400v80H240Zm0-120v-80h360v80H240Zm0-120v-80h200v80H240Z"></path>
              </svg>
            </button>
          </div>
          <div class="avatar-container">
            <img :src="userAvatarUrl" alt="User" class="icon avatar" @click="toggleDropdown"/>
          </div>
          <div class="dropdown" v-if="showDropdown">
            <ul>
              <li>Profile</li>
              <li>Settings</li>
              <li>Logout</li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <main class="dashboard-main">
      <img src="../assets/background_illustration_v2.svg" alt="background" class="background_img">
      <div class="welcome-container">
        <img src="../assets/SUSTech.svg" alt="Cloud Logo" class="welcome-logo">
        <h1 class="welcome-header">&nbsp;欢迎</h1>
        <br>
        <br>
        <div class="welcome-text">
          <h5>欢迎进入南方科技大学宿舍选择系统</h5>
        </div>
        <div class="project-info">
          <h5>
            <span>学号：{{ studentId }}&nbsp;&nbsp;</span>
            <span>姓名：{{ studentName }}</span>
            <br>
            <br>
            <span>当前选房阶段：&nbsp;{{ currentPeriod }}</span>
          </h5>
        </div>
      </div>


      <div class="quick-access-board">
        <div>
          <h2 class="quick-access-head">
            快速访问
          </h2>
        </div>
        <br>
        <div class="quick-access-grid">
          <a class="quick-access-card" href="#" @click="jumpRoomSearch">
            <div class="quick-access-card-content-wrapper">
              <div class="content">
                <div class="centered-icon">
                  <svg data-icon-name="bigquerySectionIcon" viewBox="0 0 24 24" width="24" height="24"
                       fill="currentColor"
                       fill-rule="evenodd" aria-hidden="true">
                    <path d="M7 11v1.922c.25.87 1.176 1.48 2 1.85V11H7z" opacity=".6"></path>
                    <path d="M10 9v5.933c.34.04.688.067 1.045.067.326 0 .643-.023.955-.058V9h-2z"></path>
                    <path
                        d="M13.007 12v2.7c.836-.373 1.618-.825 2-1.85V12h-2zm7.883 7.072l-3.19-3.188a.363.363 0 00-.304-.095 7.8 7.8 0 01-1.61 1.6.37.37 0 00.097.3l3.187 3.18a.38.38 0 00.537 0l1.28-1.28a.38.38 0 000-.54z"
                        opacity=".6"></path>
                    <path d="M11 3a8 8 0 100 16 8 8 0 000-16m0 14a6 6 0 110-12 6 6 0 010 12"></path>
                  </svg>
                </div>
                <div class="content-text">
                  <div class="page-title">查找房间</div>
                </div>
              </div>
            </div>
          </a>
          <a class="quick-access-card" href="#" @click="jumpTeamSearch" v-if="isStudent">
            <div class="quick-access-card-content-wrapper">
              <div class="content">
                <div class="centered-icon">
                  <svg fill="currentColor" fill-rule="evenodd" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M12 17h-1v5H8V11H3V8h9v9zm0-10c-1.65 0-3-1.35-3-3s1.35-3 3-3v6z"></path>
                    <path d="M16 11v11h-3v-5h-1V8h9v3h-5zm-4-4V1c1.65 0 3 1.35 3 3s-1.35 3-3 3z" opacity=".8"></path>
                  </svg>
                </div>
                <div class="content-text">
                  <div class="page-title">查找队伍</div>
                </div>
              </div>
            </div>
          </a>
          <a class="quick-access-card" href="#" @click="jumpUserSearch">
            <div class="quick-access-card-content-wrapper">
              <div class="content">
                <div class="centered-icon">
                  <svg data-icon-name="iamSectionIcon" viewBox="0 0 24 24" width="24" height="24"
                       fill="currentColor" fill-rule="evenodd" aria-hidden="true">
                    <path
                        d="M12 2.084V5.44a2.56 2.56 0 010 5.12V12c1.335 0 4 .824 4 2.46v1.265c-.065.094-.126.19-.195.283A7.433 7.433 0 0112 18.738v2.827a11.062 11.062 0 008-10.667v-5.48l-8-3.334z"
                        opacity=".8"></path>
                    <path
                        d="M12 2.084V5.44a2.56 2.56 0 000 5.12V12c-1.335 0-4 .824-4 2.46v1.265c.065.094.126.19.195.283A7.433 7.433 0 0012 18.738v2.827a11.062 11.062 0 01-8-10.667v-5.48l8-3.334z"></path>
                  </svg>
                </div>
                <div class="content-text">
                  <div class="page-title">查找同学</div>
                </div>
              </div>
            </div>
          </a>
          <a class="quick-access-card" href="#" @click="jumpTeam" v-if="isStudent">
            <div class="quick-access-card-content-wrapper">
              <div class="content">
                <div class="centered-icon">
                  <svg data-icon-name="computeSectionIcon" viewBox="0 0 24 24" width="24" height="24"
                       fill="currentColor" fill-rule="evenodd" aria-hidden="true">
                    <path d="M7 3h2v2H7zM3 7h2v2H3z" opacity=".8"></path>
                    <path d="M19 7h2v2h-2z" opacity=".6"></path>
                    <path d="M3 11h2v2H3z" opacity=".8"></path>
                    <path d="M19 11h2v2h-2z" opacity=".6"></path>
                    <path d="M3 15h2v2H3z" opacity=".8"></path>
                    <path d="M19 15h2v2h-2zM7 19h2v2H7z" opacity=".6"></path>
                    <path d="M11 3h2v2h-2z" opacity=".8"></path>
                    <path d="M11 19h2v2h-2z" opacity=".6"></path>
                    <path d="M15 3h2v2h-2z" opacity=".8"></path>
                    <path d="M15 19h2v2h-2z" opacity=".6"></path>
                    <path d="M5 19h14V5H5v14zm12-2H7V7h10v10z"></path>
                    <path d="M15 9H9v6l3-3z"></path>
                    <path d="M12 12l-3 3h6z" opacity=".8"></path>
                    <path d="M15 15V9l-3 3z" opacity=".6"></path>
                  </svg>
                </div>
                <div class="content-text">
                  <div class="page-title">队伍管理</div>
                </div>
              </div>
            </div>
          </a>
          <a class="quick-access-card" href="#" @click="inputGroup" v-if="isTeacher">
            <div class="quick-access-card-content-wrapper">
              <div class="content">
                <div class="centered-icon">
                  <svg fill="currentColor" fill-rule="evenodd" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M12 17h-1v5H8V11H3V8h9v9zm0-10c-1.65 0-3-1.35-3-3s1.35-3 3-3v6z"></path>
                    <path d="M16 11v11h-3v-5h-1V8h9v3h-5zm-4-4V1c1.65 0 3 1.35 3 3s-1.35 3-3 3z" opacity=".8"></path>
                  </svg>
                </div>
                <div class="content-text">
                  <div class="page-title">批量导入</div>
                </div>
              </div>
            </div>
          </a>
          <a class="quick-access-card" href="#" @click="outputGroup" v-if="isTeacher">
            <div class="quick-access-card-content-wrapper">
              <div class="content">
                <div class="centered-icon">
                  <svg fill="currentColor" fill-rule="evenodd" viewBox="0 0 24 24" width="24" height="24">
                    <path d="M12 17h-1v5H8V11H3V8h9v9zm0-10c-1.65 0-3-1.35-3-3s1.35-3 3-3v6z"></path>
                    <path d="M16 11v11h-3v-5h-1V8h9v3h-5zm-4-4V1c1.65 0 3 1.35 3 3s-1.35 3-3 3z" opacity=".8"></path>
                  </svg>
                </div>
                <div class="content-text">
                  <div class="page-title">批量导出</div>
                </div>
              </div>
            </div>
          </a>
        </div>
      </div>


      <div class="modal-overlay" :style="{ display: isInput ? 'flex' : 'none' }">
        <div class="modal-content">
          <div class="close-button" @click="closeInputForm">x</div>
          <button class="button" type="inputRoom">批量导入房间</button>
          <button class="button" type="inputUser">批量导入学生</button>
        </div>
      </div>

      <div class="modal-overlay" :style="{ display: isOutput ? 'flex' : 'none' }">
        <div class="modal-content">
          <div class="close-button" @click="closeOutputForm">x</div>
          <button class="button" type="outputRoom">批量导出房间</button>
          <button class="button" type="outputUser">批量导出学生</button>
        </div>
      </div>

    </main>

    <footer class="dashboard-footer">
      <!-- 页脚内容 -->
    </footer>
  </div>
</template>

<script>

export default {
  name: 'CloudDashboard',
  // 在这里添加JavaScript逻辑
  data() {
    return {
      showDropdown: false,
      studentId: '11910101',
      studentName: '张三',
      currentPeriod: '选房阶段',
      userAvatarUrl: 'https://www.gstatic.com/pantheon/images/welcome/supercloud.svg',
      isStudent: false,
      isTeacher: true,
      isInput: false,
      isOutput: false,
    };
  },
  methods: {
    toggleDropdown() {
      event.stopPropagation();
      this.showDropdown = !this.showDropdown;
    },
    closeDropdown() {
      if (this.showDropdown) {
        this.showDropdown = false;
      }
    },
    getTeamId(){
      return 123456;
    },
    jumpRoomSearch() {
      this.$router.push({path:"/room/search"})
    },
    jumpTeamSearch() {
      this.$router.push({path:"/team/search"})
    },
    jumpUserSearch() {
      this.$router.push({path:"/user/search"})
    },
    jumpTeam() {
      const id = this.getTeamId
      this.$router.push({path:"/team",query: {id}})
    },
    inputGroup() {
      this.isInput = true;
    },
    outputGroup() {
      this.isOutput = true;
    },
    closeInputForm() {
      this.isInput = false;
    },
    closeOutputForm() {
      this.isOutput = false;
    },
    inputRoom(){

    },
    inputUser(){

    },
    outputRoom(){

    },
    outputUser(){

    },
  },
  mounted() {
    document.addEventListener('click', this.closeDropdown);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.closeDropdown);
  }
};
</script>

<style scoped>
a {
  text-decoration: none;
}

.dashboard-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  background-color: #fff;
  color: #202124;
  font-family: 'Roboto', sans-serif;
  position: relative;
}

.cfc-platform-bar-container {
  display: flex;
  justify-content: space-between; /* 使子元素分散到两边 */
  align-items: center; /* 垂直居中子元素 */
  width: 100%; /* 确保宽度为100% */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* 可选的阴影效果 */
  background-color: #fff; /* 背景颜色 */
  padding: 0 20px; /* 根据需要添加内边距 */
  height: 60px; /* 设置一个固定高度 */
}

.cfc-platform-bar-container > .left-section {

}

.cfc-platform-bar-container > .right-section {
  width: 30%;
  display: flex;
  flex-direction: column;
  align-items: flex-end; /* 设置块级元素在交叉轴上（垂直方向）靠右对齐 */
}

.cfc-platform-bar-shadow.cfc-platform-bar-container.gm2-platform-bar {
  box-shadow: none;
  border-bottom: 1px solid #dadce0;
}

.cfc-platform-bar-container.gm2-platform-bar {
  border-bottom: 0;
  height: 60px;
}

.cfc-platform-bar-white.gm2-platform-bar {
  background-color: #fff;
}


.welcome-container {
  font-family: Arial, sans-serif;
  position: absolute;
  top: 11%;
  left: 18.5%;
  text-align: left;
}

.background_img {
  position: absolute;
  top: 0;
  left: 15%;
  width: 72%;
  height: auto;
}


.quick-access-board {
  position: relative;
  top: 10%;

}


.quick-access-head {
  font-size: 22px;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: normal;
  text-align: left;
}


.quick-access-card {
  border: 1px solid #dadce0;
  border-radius: 8px;
  background-color: #fff;
  display: inline-flex;
  flex-shrink: 0;
  height: 86px;
  width: 256px;
}

.quick-access-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.page-title {
  color: #3c4043;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.centered-icon {
  align-items: center;
  color: #3c4043;
  display: flex;
  flex: 0 0 32px;
  justify-content: center;
}

.content {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  padding: 8px 0 12px;
  position: relative;
  top: 25%;

}

.quick-access-card-content-wrapper {
  height: 86px;
  width: 256px;
  padding-left: 12px;
}


.welcome-logo {
  width: 3vw;
  vertical-align: middle;
  display: inline-block;
}

.welcome-header {
  display: inline-block;
  margin: 0 0 0 1%;
  vertical-align: middle;
}

.welcome-text {
  color: #333;
  margin-bottom: 20px;
}

.project-info {
  margin-bottom: 5px;
}


.cloud-dashboard {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 0;
  background-color: #eceff1;
  color: #202124;
  font-family: 'Roboto', sans-serif;
  position: absolute;
}


.dashboard-footer {
  padding: 0.5rem;
  background-color: #2b7de9; /* 页脚背景色 */ text-align: center; width: 100%; position: absolute; bottom: 0;
}

.header-actions {
  display: flex;
  justify-content: flex-end; /* 使内容靠右对齐 */
  align-items: center;
}

.button-container, .avatar-container {
  margin-right: 10px; /* 在元素之间添加一些间隔 */
}

.avatar-container img{
  width: 100%; /* 确保图片填满其容器 */
  height: auto; /* 保持图片的纵横比 */
  vertical-align: middle;
}

.avatar-container {
  max-width: 40px; /* 限制图片的最大宽度 */
  max-height: 40px; /* 限制图片的最大高度 */
  text-align: center;
}
.button-container{
  margin-top: 2%;
}



.logo {
  width: 13vw;
  margin-left: 1vw;
}

.icon {
  margin-left: 20px;
  cursor: pointer;
}

.avatar {
  border-radius: 50%; /* 头像的圆形效果 */
}




.dropdown {
  position: absolute;
  top: 50px; /* 根据需要调整 */
  right: 10px;
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 1000;
}

.dropdown ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.dropdown li {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

.dropdown li:last-child {
  border-bottom: none;
}

.dropdown li:hover {
  background-color: #f6f6f6;
}

.modal-overlay {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }

  .modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
    max-width: 400px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  }

  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }

  .button {
    margin-top: 1rem;
    display: inline-block;
    padding: 5px 10px;
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    text-decoration: none;
    cursor: pointer;
    border: 2px solid #3498db; /* 边框颜色 */
    color: #3498db; /* 文字颜色 */
    background-color: #fff; /* 背景颜色 */
    border-radius: 5px; /* 圆角 */
    transition: background-color 0.3s, color 0.3s; /* 添加过渡效果 */
  }

  .button:hover {
    background-color: #3498db; /* 鼠标悬停时的背景颜色 */
    color: #fff; /* 鼠标悬停时的文字颜色 */
  }
</style>

