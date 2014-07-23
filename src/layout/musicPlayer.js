define(function(require, exports, module) {

	function musicPlayer(options) {
		this.ct = options.container;
		this.render();
	}

	musicPlayer.prototype = {

		render: function() {
			var ct = this.ct;

			var tpl = this.getMusicPlayerTmpl();

			this.el = $(tpl).appendTo(ct);

			this.playerEl = this.el;

			this.foldBtn = this.el.find('.folded_bt'); 
			this.audioEl = this.el.find('.audio_td'); 

			this.audioPlayer = this.audioEl[0];
			
			this.showSongListBtn = this.el.find('.open_list'); 
			this.playBtn = this.el.find('.play_bt'); 
			this.playPreBtn = this.el.find('.prev_bt');
			this.playNextBtn = this.el.find('.next_bt'); 

			this.playListEl = this.el.find('.play_list_frame'); 
			
			this.singleListEl = this.el.find('.single_list>ul'); 

			this.init();
		},

		init : function() {
			this.playerEl.css('left', -541);
			this.bindEvents();

			this.initMusicCallback();
			this.getSongList();
		}, 

		bindEvents : function() {
			var self = this; 

			this.foldBtn.bind('click', function(e) {

				var etar = $(e.target); 

				if (etar.hasClass('fold')) {
					etar.removeClass('fold'); 
					etar.addClass('unfold'); 
					self.playerEl.animate({
						left : 1
					}, 1000)

				} else if (etar.hasClass('unfold')) {
					etar.removeClass('unfold'); 
					etar.addClass('fold'); 
					self.playerEl.animate({
						left : -541
					}, 1000)

				}
			}); 

			this.showSongListBtn.bind('click', function() {
				if (self.playListEl.is(':visible')) {
					self.playListEl.hide(); 
				} else {
					self.playListEl.show();
				}
			})

			this.playBtn.bind('click', function() {
				console.log('play');
			})

			this.playPreBtn.bind('click', function() {
				self.playPreSong(); 
			})

			this.playNextBtn.bind('click', function() {
				self.playNextSong();
			})

		}, 

		getSongList : function() {

			$.ajax({  
		        type : "get",  
		        async: true,  
		        url : "https://api.github.com/repos/pingpingxyz/pingpingxyz.github.com/contents/music?callback=window.music.getSongList",  
		        dataType : "jsonp", 
		        jsonp: "window.music.getSongList", 
		        success : function(data){  
		        	console.log(data);
		        }
		    });  
		    
		}, 

		initMusicCallback : function() {
			var self = this; 

			window.music = {}; 
			window.music.getSongList = function(data) {
		    	// console.log(JSON.stringify(data)); 
		    	self.parseSongList(data.data);
		    }
		}, 

		parseSongList : function(songArr) {
			this.songList = []; 
			this.song = {}; 

			var song_item; 
			for (var i = 0; i < songArr.length; ++i) {
				song_item = songArr[i]; 
				var name = song_item.name; 

				var author = name.split('-')[0], 
					songName = name.split('-')[1].split('.')[0]; 

				var o = {
					author : author, 
					name : songName.replace(/\_/g, ' '), 
					key : name
				}; 
				this.songList.push(o); 
				this.song[name] = o;
			}

			// console.log(JSON.stringify(this.songList)); 
			// console.log(JSON.stringify(this.song)); 
			this.autoplay();

			this.addPlayList();
		}, 

		autoplay : function() {
			this.currentSongIndex = 0; 
			this.playSongByCurrentIndex(); 
		}, 

		playSongByKey : function(key) {
			this.audioPlayer.src = './music/' + key;
		},

		getSongKeyByIndex : function(index) {
			return this.songList[index].key;
		}, 

		playSongByCurrentIndex : function() {
			var index = this.currentSongIndex; 
			var key = this.getSongKeyByIndex(index); 
			return this.playSongByKey(key); 
		}, 

		playNextSong : function() {
			var len = this.songList.length; 
			this.currentSongIndex = (this.currentSongIndex + 1) % len; 
			this.playSongByCurrentIndex(); 
		}, 

		playPreSong : function() {
			var len = this.songList.length; 
			this.currentSongIndex = (this.currentSongIndex - 1 < 0 ? this.currentSongIndex + 19 : this.currentSongIndex - 1) % len; 
			this.playSongByCurrentIndex(); 
		}, 
		
		getSongItemTmpl : function(name, author, key) {
			return String.format('<li class="play_item {2}"><strong class="music_name" title="{0}">{0}</strong><strong class="singer_name" title="{1}">{1}</strong><strong class="play_time"></strong><div class="list_cp"><span class="data"></span><strong class="btn_like" title="喜欢" name="myfav_001Wt8jA3jSXyi" mid="001Wt8jA3jSXyi"><span>我喜欢</span></strong><strong class="btn_share" title="分享"><span>分享</span></strong><strong class="btn_fav" title="收藏到歌单"><span>收藏</span></strong><strong class="btn_del" title="从列表中删除"><span>删除</span></strong></div></li>', name, author, key); 
		}, 

		addPlayList : function() {
			var singleListEl = this.singleListEl;

			var songList = this.songList, 
				singleTmpl = '',
				song_item; 
			for (var i = 0; i < songList.length; ++i) {
				song_item = songList[i]; 
				singleTmpl = this.getSongItemTmpl(song_item.name, song_item.author, song_item.key);

				singleListEl.append(singleTmpl); 
			}
		}, 

		getMusicPlayerTmpl : function() {
			return [
						'<div class="m_player mini_version" id="divplayer" role="application" style="left: 0px;">',
							'<div class="m_player_dock" id="divsongframe">',
								'<div class="music_info" id="divsonginfo"><a target="contentFrame" class="album_pic" title=""><img src="./style/images/cover_mine_130.jpg" alt="" ></a><div class="music_info_main"><p class="music_name" title="音乐你的生活"><span>音乐你的生活</span></p><p class="singer_name" title="音乐">音乐</p><p class="play_date" id="ptime"></p><p class="music_op" style="display:none;"><strong class="btn_like_n" title="暂不提供此歌曲服务" onclick="MUSIC.event.cancelBubble();" name="myfav_" mid=""><span>我喜欢</span></strong><strong class="btn_share_n" title="暂不提供此歌曲服务" onclick="MUSIC.event.cancelBubble();"><span>分享</span></strong></p></div></div>',
								'<div class="bar_op">',
									'<strong title="上一首( [ )" class="prev_bt" ><span>上一首</span></strong>',
									'<strong title="播放(P)" class="play_bt" id="btnplay" onclick="g_topPlayer.play();"><span>播放</span></strong>',
									'<strong title="下一首( ] )" class="next_bt" ><span>下一首</span></strong>',
									'<strong title="随机播放" class="unordered_bt" id="btnPlayway" onclick="g_topPlayer.setPlayWay();"><span>随机播放</span></strong>',
									'<p class="volume" title="音量调节">',
										'<span class="volume_icon" id="spanmute" title="点击设为静音(M)"></span>',
										'<span class="volume_regulate" id="spanvolume">',
											'<span class="volume_bar" style="width:0%;" id="spanvolumebar"></span>',
											'<span class="volume_op" style="left:0%;" id="spanvolumeop"></span>',
										'</span>',
									'</p>',
								'</div>',
								'<p class="playbar_cp_select" id="divselect" style="display: none;"><strong title="单曲循环" class="cycle_single_bt" onclick="g_topPlayer.realSetPlayWay(1);"><span>单曲循环</span></strong><strong title="列表循环" class="cycle_bt" onclick="g_topPlayer.realSetPlayWay(3);"><span>列表循环</span></strong><strong title="顺序播放" class="ordered_bt" onclick="g_topPlayer.realSetPlayWay(2);"><span>顺序播放</span></strong><strong title="随机播放" class="unordered_bt" onclick="g_topPlayer.realSetPlayWay(4);"><span>随机播放</span></strong></p>',
								'<p class="player_bar">',
									'<span class="player_bg_bar" id="spanplayer_bgbar"></span>',
									'<span class="download_bar" id="downloadbar" style="width: 0%;"></span>',
									'<span class="play_current_bar" style="width: 0%;" id="spanplaybar"></span>',
									'<span class="progress_op" style="left: 0%;" id="spanprogress_op"></span>',
								'</p>',
								'<div class="time_show" style="left:240px;bottom:8px;display:none;">',
									'<p id="time_show"></p>',
									'<span class="icon_arrow_foot"><i class="foot_border"></i><i class="foot_arrow"></i></span>',
								'</div>',
							'</div>',
							'<span class="active_tip" id="spanaddtips" style="top:0px;display:none;"></span>',
							'<span title="展开播放列表" class="open_list" id="spansongnum1" style="display: block;"><span>0</span></span>',
							'<span title="显示歌词(L)" class="btn_lyrics_disabled" id="btnlrc">歌词(L)</span>',
							'<button type="button" class="folded_bt fold" title="点击收起" id="btnfold"><span>点击收起/展开</span></button>',
							
							'<div class="play_list_frame" id="divplayframe" style="display: none; opacity: 1; -webkit-transition: all; transition: all;">',
								'<div class="play_list_title">',
									'<ul id="tab_container" style="width:270px;">',
						                    '<li id="playlist_tab" class="current"><a href="javascript:;">播放列表</a><i></i></li>',
						                    '<li id="fm_tab" style="display:none"><a href="javascript:;">单曲电台列表</a><i></i></li>',
						            '</ul>',
									'<span id="clear_list" class="clear_list" onclick="g_topPlayer.clearList();">清空列表</span>',
									'<strong title="收起播放列表" class="close_list" id="btnclose"></strong>',
								'</div>',
								'<div class="play_list" id="divlistmain">',
									'<div class="play_list_point" id="divnulllist" style="display: block;">',
										'<div>',
											'<h4>您当前还未添加任何歌曲</h4>',
											'<p>您可以：</p>',
											'<p>在<a href="/y/static/index.html?pgv_ref=qqmusic.y.player" target="contentFrame">首页</a>选择试听我们推荐的歌曲。</p>',
											'<p>在<a href="/y/static/singer/index/all_hot_1.html?pgv_ref=qqmusic.y.player" target="contentFrame">乐库</a>中查找您想听的歌曲。</p>',
										'</div>',
									'</div>',
									'<div class="play_list_point" id="divnullFMlist" style="display:none;">',
										'<div>',
											'<h4>哎呀，这首歌和其他歌曲还不熟</h4>',
											'<p>你可以：</p>',
											'<p>换 另一首歌曲<span style="color:#9ae40a"> 重新发起单曲电台</span>。',
											'</p><p>什么是单曲电台？</p>',
											'<p>当你听到一首喜欢的歌曲，我们会针对这首歌曲，为你生成一批<span style="color:#9ae40a"> 你可能也喜欢的歌曲列表</span>,',
												'并且根据你的反馈，不断优化——所以听得越多，为你推荐得越准噢！</p>',
											'<p></p>',
										'</div>',
									'</div>',
									'<div class="play_list_main" id="divplaylist" style="display: none; left: 0px; top: 0px;">',
										'<div class="single_list" id="divsonglist" dirid="0"><ul></ul></div>',
										'<div id="divalbumlist" style="display:none;">',
										'</div>',
									'</div>',
									'<div class="play_list_scroll" style="top: 0px; display: none;"><span id="spanbar" class="play_list_scrolling" style="height: 338px; left: 3px; top: 0px; display: none;"></span></div>',
						            '<div class="single_radio_cont" id="FM_container" style="display:none;">',
						                '<div class="single_radio_top">',
						                    '<p>您正在收听以“<strong id="FM_songname">好久不见-陈奕迅</strong>”生成的单曲电台。</p>',
						                '</div>',
						                '<div class="single_radio_list">',
						                    '<ul id="single_radio_list" style="margin-left:-150px;">',
						                        '<li class="first"></li>',
						                    '</ul>',
						                '</div>',
						                '<div class="single_radio_info" id="single_radio_info">',
						                    '<a href="javascript:;" class="single_radio_like" title="喜欢"></a>',
						                    '<a href="javascript:;" class="single_radio_delete" title="删除"></a>',
						                    '<h3></h3>',
						                    '<p></p>',
						                '</div>',
						            '</div>',
								'</div>',
							'</div>',
							'<div class="y_player_lyrics" id="player_lyrics_pannel" style="display: none;">',
								'<div class="lyrics_text" id="qrc_ctn"></div>',
								'<div class="lyrics_bg"></div>',
								'<span class="close_lyrics" id="closelrcpannel"></span>',
							'</div>',
							'<div class="single_radio_tip" id="single_radio_tip" style="display:none;">',
						        '<a href="javascript:;" class="close_tips"></a>',
						    '</div>',
						    '<audio class="audio_td" autoplay="autoplay" >', 
						    '</audio>',
						'</div>'
			].join('');
		}
	}

	module.exports = musicPlayer;
})
