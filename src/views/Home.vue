<template>
<div>
  <div class="row">
      <!-- form -->
      <div class="col s6">
        <PostForm @postCreated="addPost" :editingPost="editingPost" />
      </div>
      <div class="col s3" style="margin: 50px">
      <p>limit number of posts</p>
      <input type="number" v-model="postLimit">
      <button v-on:click="setLimit()" class="waves-effect waves-light btn">
        set limit
      </button>
    </div>
  </div>
  <div class="row">
    <div class="col s6" v-for="(post, index) in posts" 
    :key="post.id"
    v-bind:item="post"
    :index="index"
    >
      <div class="card">
        <div class="card-content">
          <p class="card-title">
            {{post.title}}
          </p>
          <p class="timeStamp">
            {{post.createdAt | formatDate }}
          </p>
          <p>
            {{post.body}}
          </p>
        </div>
        <div class="card-action">
          <a href="#" @click="editPost(post)">Edit</a>
          <a href="#" @click="deletePost(post.id)" class="delete-btn">Delete</a>
        </div>
      </div>
    </div>
    
  </div>

</div>

</template>

<script>
// @ is an alias to /src
import PostService from '@/PostService';
import PostForm from '@/components/PostForm.vue';

const postService = new PostService();

export default {
  name: 'home',
  components: {
    PostForm
  },
  data() {
    return {
      posts : [],
      postLimit:5,
      editingPost: null
    }
  },
  methods: {
    addPost(post) {
      if(this.posts.find(p => p.id === post.id) ){
        const index = this.posts.findIndex(p => p.id === post.id);
        this.posts.splice(index, 1, post);
      }else{
        this.posts.unshift(post);
      }
    },
    editPost(post) {
      this.editingPost = post;
    },
    deletePost(id){
      postService.dltPost(id)
        .then(() => {
          this.posts = this.posts.filter(p => p.id !== id);
      })
      .catch(err => console.error(err));
    },
    setLimit() {
      postService.getPost(this.postLimit)
        .then(res => {
          this.posts = res.data
        })
        .catch(err => console.error(err));
    }
  },

  created(){
    postService.getAllPosts()
      .then(res => {
        this.posts = res.data;
        console.log(this.posts);
      })
      .catch(err => console.error(err));
  },
  filters: {
    formatDate(date) {
      date = new Date(date);
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;

    }
  } 
 
}
</script>

<style lang="scss" scoped>
.card-content .card-title {
  margin-bottom: 0;
}

.card-content p.timeStamp {
  color: #999;
  margin-bottom: 10px;
}
  .delete-btn {
    color: red !important;
  }  
</style>
