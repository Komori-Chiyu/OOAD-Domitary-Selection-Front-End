<template>
  <div>
    <div class="mt-4">
      <div style="margin-right: 1rem;">
        <div class="room-info">
          <!-- 左侧信息展示卡 -->
          <div style="width: 100%;">
            <!-- 房间信息展示 -->
            <div>
              <h2>{{ this.room.name }}</h2>
              <p>区域：{{ this.room.region }}</p>
              <p>楼栋：{{ this.room.building }}</p>
              <p>楼层：{{ this.room.floor }}</p>
              <p>人数：{{ this.room.type }}</p>
              <p>被收藏数：{{ this.room.isFavoured }}</p>
              <p>简介：{{ this.room.intro }}</p>
              <!-- <p>状态：{{ this.room.status }}</p> -->
            </div>
            <!-- 学生端显示收藏按钮 -->
            <button class="button" v-if="isStudent" @click="addToFavorites">收藏</button>
            <!-- 教师端显示编辑按钮 -->
            <button class="button" v-if="isTeacher" @click="openEditForm">编辑</button>
          </div>
        </div>
      </div>

      <!-- 右侧房间图片 -->
      <div class="room-image">
        <div style="width: 100%;">
          <img :src="this.room.imgUrl" style="width: 100%;" alt="Room Image"/>
        </div>
      </div>
    </div>

    <!-- 评论区 -->
    <div class="comments-section">
      <div v-if="!room.comments">
        <!-- 加载状态的提示，例如 loading spinner -->
        <p>Loading comments...</p>
      </div>
      <div v-else>
        <!-- 遍历评论，每个评论作为一个 media -->
        <div v-for="comment in firstLevelComments" :key="comment.commentId" class="comment-item">
          <!-- 评论内容 -->
          <div>
            <!-- <p v-if="comment.post_id !== this.isReply">{{ '回复： ' + this.getReplyContent(comment.post_id).body }}</p> -->
            <div class="comment-container">
              <router-link :to="'/user?id=' + comment.userId">
                <img :src="comment.creationTime" alt="Sender Avatar" class="sender-avatar" v-if="comment.userId !== 0"/>
              </router-link>
              <div class="comment-content">
                <p class="comment-title">{{ comment.title }}：</p>
                <p class="comment-body">{{ comment.body }}</p>
              </div>
            </div>
            <div>
              <div v-for="comment1 in comment.secondLevelComments" :key="comment1.commentId" class="comment-item">
                <div class="comment-container">
                <router-link :to="'/user?id=' + comment.userId">
                 <img :src="comment1.creationTime" alt="Sender Avatar" class="sender-avatar" v-if="comment1.userId !== 0"/>
                </router-link>
                <div class="comment-content">
                  <p class="comment-title">{{ comment1.title }}：</p>
                  <p class="comment-body">{{ comment1.body }}</p>
                </div>
              </div>
                <button v-if="comment1 && comment1.userId == $data.userId" class="button" @click="deleteComment(comment1.commentId)">删除评论</button>
              </div>
            </div>

          </div>
          <!-- 添加回复按钮 -->
          <button v-if="!comment.disabled" class="button" @click="replyToComment(comment.commentId)">回复</button>
          <button v-if="comment && comment.userId == $data.userId" class="button" @click="deleteComment(comment.commentId)">删除评论</button>
        </div>
        <!-- 添加回复的按钮 -->
        <button class="button" @click="addComment()">添加评论</button>

      </div>
    </div>


    <!-- 弹窗 -->
    <div class="modal-overlay" :style="{ display: isEditing ? 'flex' : 'none' }">
      <div class="modal-content">
        <div class="close-button" @click="closeEditForm">x</div>
        <!-- 修改信息表单 -->
        <form @submit.prevent="updateRoom">
          <div class="form-group">
            <label for="name">房间</label>
            <input id="name" v-model="editRoom.name" required/>
          </div>


          <div class="form-group">
            <label for="roomType">人数</label>
            <input id="roomType" v-model="editRoom.type" required/>
          </div>

          <div class="form-group">
            <label for="roomIntro">简介</label>
            <input id="roomIntro" v-model="editRoom.intro"/>
          </div>

          <div class="form-group">
            <label for="roomStatus">简介</label>
            <input id="roomStatus" v-model="editRoom.status" required/>
          </div>
          <button class="button" v-if="isTeacher" @click="uploadImage">上传图片</button>
          <!-- 提交按钮 -->
          <button class="button" type="submit">提交</button>
        </form>
      </div>
    </div>

    <div id="errorModal" class="modal-overlay" :style="{ display: showErrorModal ? 'flex' : 'none' }">
      <div class="modal-content">
        <div class="close-button" @click="closeErrorModal">x</div>
        <p id="errorMessage">{{ errorType }}</p>
      </div>
    </div>

    <div id="replyModal" class="modal-overlay" :style="{ display: showCommentModal ? 'flex' : 'none' }">
      <div class="modal-content">
        <div class="close-button" @click="closeCommentModal">x</div>
        <textarea id="replyContent" placeholder="在这里写回复内容"></textarea>
        <button class="button" @click="submitReply">提交</button>
      </div>
    </div>
  </div>

</template>

<script>
import { v4 as uuidv4 } from 'uuid';
export default {

  data() {
    return {
      key:true,
      room: {
        roomId: '',
        name: '',
        floorId: '',
        region: '',
        building: '',
        floor: '',
        type: '',
        intro: '暂无',
        status: '',
        isFavoured: '',
        isSelected: '',
        imgUrl: 'https://img2.baidu.com/it/u=454988151,767078241&fm=253&fmt=auto&app=138&f=JPEG?w=667&h=500',
        commentUsers: [],
        comments: [
          {
            commentId: 10,
            userId: 12110433,
            postId: 1,
            title: null,
            body: 'Great room!',
            creationTime: null,
            disabled: false
          },
          {
            commentId: 11,
            userId: 12110433,
            postId: 1,
            title: null,
            body: 'Not so bad!',
            creation_date: null,
            disabled: false
          },
          // Other comments
        ],
      },
      editRoom: {
        roomId: '',
        name: '',
        floorId: '',
        region: '',
        building: '',
        floor: '',
        type: '',
        intro: '',
        status: '',
        isFavoured: '',
        isSelected: '',
        imgUrl: '',
        comments: '',
      },

      isStudent: false,
      isTeacher: true,
      isEditing: false,
      showErrorModal: false,
      showCommentModal: false,
      userId:'1111',
      errorType: '',
      isReply: "0",
      replyTo: "0",
      firstLevelComments: [],
      secondLevelComments: [],
      showSecondLevelComments: false,
    };
  },
  mounted() {
    this.room.roomId = this.$route.query.roomId;
    this.userId = localStorage.getItem('userId')
    console.log(111)
    console.log(this.userId)
    this.config = {
      headers: {
        'Authorization': localStorage.getItem("jwt"),
      }
    }
    let url = "https://api.cxpcn.site/rooms/" + this.room.roomId
    this.$axios.get(url, this.config).then((response) => {
      this.room.name = response.data.data.name
      this.room.type = response.data.data.type
      this.room.intro = response.data.data.intro
      this.room.status = response.data.data.status
      if (response.data.data.imgURL != null) {
        this.room.imgUrl = response.data.data.imgURL
        alert(this.room.imgUrl)
      }
      this.isReply = response.data.data.commentBaseId
    })
        .catch(error => {
          console.error("查询房间失败:", error);
        });

    url = url + "/comments"

    this.$axios.get(url, this.config).then((response) => {
      this.room.comments = response.data.data
      this.commentUsers = []
      // for (let i in this.room.comments) {
      //   if (this.room.comments[i].postId == 0) {
      //     this.room.commentBaseId = this.room.comments[i].commentId
      //     break
      //   }
      // }
      for (let i in this.room.comments) {
        if (this.room.comments[i].disabled == true) continue;
        if (this.room.comments[i].postId == this.isReply) {
          this.room.comments[i].showSecondLevelComments = false;
          // if (this.room.comments[i].postId == 0) {
          //   continue
          // }
          this.firstLevelComments.push(this.room.comments[i])

        }
        if (this.room.comments[i].postId == 0) continue;
        let url = "https://api.cxpcn.site/users?id=" + this.room.comments[i].userId

        this.$axios.get(url, this.config).then((response) => {
            this.room.comments[i].title = response.data.data.name
            this.room.comments[i].creationTime = response.data.data.imgURL
        }).catch(error => {
              console.error("查询评论用户失败:", error);
        });

      }
      for (let i in this.firstLevelComments){
        this.firstLevelComments[i].secondLevelComments = []
      }
      for (let i in this.firstLevelComments) {
        for(let j in this.room.comments){
          if (this.room.comments[j].postId == this.firstLevelComments[i].commentId) {
            this.firstLevelComments[i].secondLevelComments.push(this.room.comments[j])
          }
        }
      }
    })
        .catch(error => {
          console.error("查询房间评论失败:", error);
        });
    url = "https://api.cxpcn.site/rooms/info/" + this.room.roomId
    this.$axios.get(url, this.config).then((response) => {
      this.room.region = response.data.data.region
      this.room.building = response.data.data.building
      this.room.floor = response.data.data.floor
    })
        .catch(error => {
          console.error("查询房间位置失败:", error);
        });
    url = "https://api.cxpcn.site/rooms/favorite/" + this.room.roomId
    this.$axios.get(url, this.config).then((response) => {
      this.room.isFavoured = response.data.data.length;
    })
        .catch(error => {
          console.error("查询房间被收藏失败:", error);
        });

    let isS = localStorage.getItem("isStudent1") === '1'
    if (!isS) {
      this.isTeacher = true;
      this.isStudent = false;
    } else {
      this.isTeacher = false;
      this.isStudent = true;
    }
  },
  methods: {
    fetchComment(){
      console.log(111)
      let url = "https://api.cxpcn.site/rooms/" + this.room.roomId + "/comments"
      this.$axios.get(url, this.config).then((response) => {
        this.room.comments = response.data.data
        this.commentUsers = []
        // for (let i in this.room.comments) {
        //   if (this.room.comments[i].postId == 0) {
        //     this.room.commentBaseId = this.room.comments[i].commentId
        //     break
        //   }
        // }
        for (let i in this.room.comments) {
          if (this.room.comments[i].disabled == true) continue;
          if (this.room.comments[i].postId == this.isReply) {
            this.room.comments[i].showSecondLevelComments = false;
            // if (this.room.comments[i].postId == 0) {
            //   continue
            // }
            this.firstLevelComments.push(this.room.comments[i])

          }
          if (this.room.comments[i].postId == 0) continue;
          let url = "https://api.cxpcn.site/users?id=" + this.room.comments[i].userId

          this.$axios.get(url, this.config).then((response) => {
              this.room.comments[i].title = response.data.data.name
          }).catch(error => {
                console.error("查询评论用户失败:", error);
          });

        }
        for (let i in this.firstLevelComments){
          this.firstLevelComments[i].secondLevelComments = []
        }
        for (let i in this.firstLevelComments) {
          for(let j in this.room.comments){
            if (this.room.comments[j].postId == this.firstLevelComments[i].commentId) {
              this.firstLevelComments[i].secondLevelComments.push(this.room.comments[j])
            }
          }
        }
      })
    .catch(error => {
      console.error("查询房间评论失败:", error);
    });
    },
    addToFavorites() {
      let url = "https://api.cxpcn.site/teams/" + localStorage.getItem("teamId") + "/favorites"
      let requestBody = {
        roomId: this.room.roomId,
      };
      this.$axios.post(url, requestBody, this.config)
          .then(response => {
            // 处理请求成功的情况
            console.log(response.data);
          })
          .catch(error => {
            // 处理请求失败的情况
            this.errorType = "添加收藏失败";
            this.showErrorModal = true;
            console.error(error);
          });
    },
    openEditForm() {
      this.editRoom = {...this.room};
      this.isEditing = true;
    },
    closeEditForm() {
      this.isEditing = false;
    },
    updateRoom() {
      // TODO: Implement logic to update room information
      let url = "https://api.cxpcn.site/rooms/" + this.room.roomId
      let requestBody = {
        name: this.editRoom.name,
        type: this.editRoom.type,
        intro: this.editRoom.intro,
        status: this.editRoom.status,
        floorId: this.room.floorId,
        imgURL: this.editRoom.imgUrl,
      }
      this.$axios.put(url, requestBody, this.config)
          .then(response => {
            // 处理请求成功的情况
            console.log(response.data);
          })
          .catch(error => {
            // 处理请求失败的情况
            this.errorType = "修改房间失败";
            this.showErrorModal = true;
            console.error(error);
          });
      this.room = {...this.editRoom};
      this.isEditing = false;
    },


    uploadImage() {
      // 创建一个<input>元素
      var fileInput = document.createElement('input');

      // 设置input类型为文件
      fileInput.type = 'file';

      // 设置文件选择对话框只接受JPG、PNG格式的文件
      fileInput.accept = '.jpg,.png';

      // 设置文件选择对话框可以选择多个文件
      fileInput.multiple = false;

      // 添加change事件监听器，以便在用户选择文件后触发
      fileInput.addEventListener('change', this.handleFileSelection);

      // 模拟点击文件选择对话框
      fileInput.click();
    },
    handleFileSelection(event) {
      // 获取选定的文件
      var file = event.target.files[0];
      this.getOssSignature().then(signatureInfo => {
        console.log('获取签名信息成功', signatureInfo);
        let formData = new FormData();
        console.log(file.name)
        // const extension = file.name.split('.').pop();
        const extension = file.name.split('.').pop();
        const uniqueFilename = uuidv4() + '.' + extension;
        console.log('uniqueFilename', uniqueFilename);
        if (extension !== 'JPG' && extension !== 'PNG' && extension !== 'jpg' && extension !== 'png') {
          this.errorType = "只能上传jpg/png文件";
          this.showErrorModal = true;
          return;
        }
        formData.append('key', signatureInfo.dir + uniqueFilename);
        formData.append('policy', signatureInfo.policy);
        formData.append('OSSAccessKeyId', signatureInfo.accessid);
        formData.append('signature', signatureInfo.signature);
        formData.append('file', file);

        this.$axios.post(signatureInfo.host, formData, {
          headers: {'Content-Type': 'multipart/form-data'}
        }).then(response => {
          console.log('上传成功', response.data);
          // 处理上传成功的逻辑
          this.editRoom.imgUrl = signatureInfo.host + '/' + uniqueFilename;
          this.errorType = "上传成功";
          this.showErrorModal = true;
          this.updateRoom()
        }).catch(error => {
          console.error('上传失败', error);
          // 处理上传失败的逻辑
          this.errorType = "上传失败";
          this.showErrorModal = true;
        });
      }).catch(error => {
        console.error('获取签名信息失败', error);
        // 处理获取签名信息失败的逻辑
        this.errorType = "获取签名信息失败";
        this.showErrorModal = true;
      });
    },
    // handleUpload(file) {


    // },
    getOssSignature() {
      // 实现获取OSS签名信息的逻辑，返回一个Promise
      // 示例中省略了具体实现
      return new Promise((resolve, reject) => {
        // 假设这是您的服务器端API端点，用于获取OSS签名信息

        this.$axios.get('https://api.cxpcn.site/oss', this.config).then(response => {
          if (response.data) {
            resolve(response.data);
          } else {
            reject('No signature data received');
          }
        }).catch(error => {
          reject(error);
        });
      });
    },
    replyToComment(commentId) {

      this.replyTo = commentId;
      this.showCommentModal = true;
    },
    addComment() {
      this.replyTo = this.isReply;
      this.showCommentModal = true;
    },
    submitReply() {
      let url = "https://api.cxpcn.site/rooms/comments"
      const replyContent = document.getElementById('replyContent').value;
      console.log(this.replyTo)
      let requestBody = {
        body: replyContent,
        // userid: localStorage.getItem('userId'),
        postId: this.replyTo,
        disabled: false,
      }
      this.$axios.post(url, requestBody, this.config)
          .then(response => {
            // 处理请求成功的情况
            console.log(response.data);
          })
          .catch(error => {
            // 处理请求失败的情况
            this.errorType = "添加评论失败";
            this.showErrorModal = true;
            console.error(error);
          });
      this.showCommentModal = false;
      this.firstLevelComments = [];
      this.secondLevelComments = [];
      this.fetchComment();
    //   url = url + "/comments"
    //   this.$axios.get(url, this.config).then((response) => {
    //     this.room.comments = response.data.data
    //     this.commentUsers = []
    //     // for (let i in this.room.comments) {
    //     //   if (this.room.comments[i].postId == 0) {
    //     //     this.room.commentBaseId = this.room.comments[i].commentId
    //     //     break
    //     //   }
    //     // }
    //     for (let i in this.room.comments) {
    //       if (this.room.comments[i].disabled == true) continue;
    //       if (this.room.comments[i].postId == this.isReply) {
    //         this.room.comments[i].showSecondLevelComments = false;
    //         // if (this.room.comments[i].postId == 0) {
    //         //   continue
    //         // }
    //         this.firstLevelComments.push(this.room.comments[i])

    //       }
    //       if (this.room.comments[i].postId == 0) continue;
    //       let url = "https://api.cxpcn.site/rooms/users?id=" + this.room.comments[i].userId

    //       this.$axios.get(url, this.config).then((response) => {
    //           this.room.comments[i].name = response.data.data.name
    //       }).catch(error => {
    //             console.error("查询评论用户失败:", error);
    //       });

    //     }
    //     for (let i in this.firstLevelComments){
    //       this.firstLevelComments[i].secondLevelComments = []
    //     }
    //     for (let i in this.firstLevelComments) {
    //       for(let j in this.room.comments){
    //         if (this.room.comments[j].postId == this.firstLevelComments[i].commentId) {
    //           this.firstLevelComments[i].secondLevelComments.push(this.room.comments[j])
    //         }
    //       }
    //     }
    //   })
    // .catch(error => {
    //   console.error("查询房间评论失败:", error);
    // });
    },
    deleteComment(id) {
      let url = "https://api.cxpcn.site/rooms/comments/" + id
      this.$axios.delete(url, this.config)
          .then(response => {
            // 处理请求成功的情况
            console.log(response.data);
          })
          .catch(error => {
            // 处理请求失败的情况
            this.errorType = "删除评论失败";
            this.showErrorModal = true;
            console.error(error);
          });
      this.showCommentModal = false;
      this.firstLevelComments = [];
      this.secondLevelComments = [];
      this.fetchComment();
    },

    getReplyContent(replyID) {
      // Assuming room.comments is an array containing all comments
      const repliedComment = this.room.comments.find(comment => comment.comment_id == replyID);

      // Return the content if the comment is found, otherwise return a default message
      return repliedComment ? repliedComment.body : '回复的评论不存在';
    },
    closeErrorModal() {
      this.showErrorModal = false;
    },
    closeCommentModal() {
      this.showCommentModal = false;
    }
  },
};
</script>

<style>
.room-info {
  float: left;
  width: 50%;
  margin-left: 5rem;
  margin-right: 2rem;
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 10px;
}

.room-image {
  float: right;
  margin-top: 2rem;
  margin-right: 10rem;
  margin-bottom: 5rem;
  width: 300px; /* 设置图片宽度 */
  height: 200px; /* 设置图片高度 */
  object-fit: contain; /* 控制图片如何填充容器 */
  border: 1px solid #ccc; /* 可选：添加边框样式 */
}

.comments-section {
  clear: both;
  margin-top: 5rem;
  margin-left: 5rem;
  margin-right: 5rem;
  margin-bottom: 5rem;
}

.comment-item {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 10px;
}

.comment-content {
  flex: 0.8;
  text-align: left;
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

.form-group {
  margin-bottom: 1rem;
}

.sender-avatar{
  float: right;
  width: 50px; /* 设置图片宽度 */
  height: 50px; /* 设置图片高度 */
  object-fit: contain; /* 控制图片如何填充容器 */
  border: 1px solid #ccc; /* 可选：添加边框样式 */
}
.comment-container {
  display: flex;
  flex-direction: column; /* 将子元素垂直排列 */
}

.comment-content {
  margin-top: 10px; /* 控制标题和 body 之间的间距，可根据需要调整 */
}

.comment-title {
  font-weight: bold; /* 使标题加粗，根据需要调整其他样式 */
}


/* 输入框和按钮样式 */
textarea {
  width: 100%;
  height: 100px;
  margin-bottom: 10px;
  resize: none; /* 禁止文本框调整大小 */
}
</style>