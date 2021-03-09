<template>
  <div class="app-container calendar-list-container">
    <basic-container>
      <section class="madp-article-container">
        <div class="madp-article-title">{{article.title}}</div>
        <div class="madp-article-author">
          <span>{{article.author}}</span>|
          <span>{{article.updateTime}}</span>
        </div>
        <div class="madp-article-summary">{{article.summary}}</div>
        <div v-if="article.image" class="madp-article-image">
          <!-- /mfs/madp/328052bca4934582a672d8cf642bd8d3.jpg -->
          <!-- 'https://dev.madp.xyz'+ -->
          <!-- +article.avatar -->
          <img :src="'https://dev.madp.xyz'+article.avatar"/>
          <!-- <img src="https://dev.madp.xyz/mfs/madp/328052bca4934582a672d8cf642bd8d3.jpg" /> -->
        </div>
        <div v-html="article.content"></div>
        <div class="madp-article-tag">
          <span v-for="tag in article.tagList" :key="tag.atId">{{tag.name}}</span>
        </div>
      </section>
    </basic-container>
  </div>
</template>

<script>
// tag文章标签
import { getObj } from "@/api/cms/article";
import { handleMfsPath } from "@/util/tag";
export default {
  name: "articledetail",
  data() {
    return {
      article: {
        title: undefined,
        author: undefined,
        updateTime: undefined,
        summary: undefined,
        image: undefined,
        avatar: undefined, // 图片真实地址
        content: undefined,
        tagList: []
      }
    };
  },
  created() {
      // console.log(this.$route.query.articleId)
    getObj(this.$route.params.articleId).then(response => {
      console.log("++++++++++++++++++++++++++");
      console.log(response.data.data);
      this.article = response.data.data;
      this.article.avatar = handleMfsPath(this.article.image);
    });
  }
};
</script>

<style lang="scss" scoped>
.madp-article-container {
  .madp-article-title {
    padding: 20px 20px 10px 20px;
    font-size: 24px;
    text-align: center;
  }
  .madp-article-author {
    padding: 0 20px 20px 20px;
    font-size: 12px;
    text-align: center;
    span {
      padding: 0 10px;
    }
  }
  .madp-article-summary {
    padding: 10px;
    border: 1px dotted;
    color: #8c8c8c;
  }
  .madp-article-image {
    text-align: center;
    padding: 10px;
    img {
      border: 1px dotted #409eff;
    }
  }
  .madp-article-tag {
    span {
      padding: 2px 5px;
      border: 1px solid #409eff;
      border-radius: 2px;
      font-size: 12px;
      margin-right: 5px;
    }
  }
}
</style>
