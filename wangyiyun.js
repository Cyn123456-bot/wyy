var app=new Vue({
				el:"#app",
				data:{
					//搜索歌曲
					query:"",
					// 歌曲列表
					musiclist:[],
					//歌曲url
					musicurl:"",
					//歌曲封面
					musiccover:"",
					//热门评论
					hotcomment:[],
					// name:""
					isshow:false,
					mvurl:""
				},
				methods:{
					//通过搜索框查找歌曲
					searchmusic:function(){
						var that=this;
						axios.get('https://autumnfish.cn/search?keywords='+this.query)	//调用接口
						.then(function(response){
							// console.log(response);
							that.musiclist=response.data.result.songs;
							
						})
						.catch(function(err){
							
						})
					},
					//点击播放歌曲播放/获取歌曲的id
					playmusic:function(musicid){	//参数为歌曲id
						// console.log(musicid);
						var that=this;
						axios.get("https://autumnfish.cn/song/url?id="+musicid)
						.then(function(response){
							// console.log(response);
							that.musicurl=response.data.data[0].url;
						})
						.catch(function(err){
							
						})
						//获取歌曲的封面
						axios.get("https://autumnfish.cn/song/detail?ids="+musicid)
						.then(function(response){
							that.musiccover=response.data.songs[0].al.picUrl;
						},function(err){
							
						})
						//获取热门评论
						axios.get("https://autumnfish.cn/comment/hot?type=0&id="+musicid)
						.then(function(response){
							// console.log(response);
							that.hotcomment=response.data.hotComments;
						},function(err){
							
						})
						//获取名称
						// axios.get("https://autumnfish.cn/song/name?id="+musicid)
						// .then(function(response){
						// 	console.log(response);
						// },function(err){
							
						// })
					},
					playmv:function(mvid){
						var that=this;
						axios.get("https://autumnfish.cn/mv/url?id="+mvid)
						.then(function(response){
							that.isshow=true;
							that.mvurl=response.data.data.url;
						},function(err){
							
						})
					},
					hide:function(){
						this.isshow=false;
					}
					
				}
			})