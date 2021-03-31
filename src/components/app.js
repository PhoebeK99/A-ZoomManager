const app = new Vue({
    el:'#app',
    data:{
      errors:[],
      addCategory:null,
   },
    methods:{
      checkAddCategoryForm:function(e) {
        if(!this.addCategory) this.errors.push("Category name required.");
        e.preventDefault();
      }
    }
  })
  