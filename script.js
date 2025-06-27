let game;
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const box = 20; // 每格方塊的大小（蛇&食物都是 20x20）
let snake = [{ x: 200, y: 200 }]; // 蛇的開始位置：canvas正中間
let direction = "RIGHT"; //蛇的開始移動方向：往右
let score = 0; // 初始分數0分

let highScore = sessionStorage.getItem("highScore") || 0;
document.getElementById("highScore").textContent = `Highest Score: ${highScore}`;

// SEVENTEEN 歌單
const seventeenSongs = [
    { name: "Darl+ing", file: "SVT Songs/Darl+ing.mp3", start: 50.5 },
    { name: "HOT", file: "SVT Songs/HOT.mp3", start: 58 },
    { name: "DON QUIXOTE", file: "SVT Songs/DON QUIXOTE.mp3", start: 56 },
    { name: "March", file: "SVT Songs/March.mp3", start: 48 },
    { name: "Domino", file: "SVT Songs/Domino.mp3", start: 53.8 },
    { name: "Shadow", file: "SVT Songs/Shadow.mp3", start: 49.5 },
    { name: "'Bout You", file: "SVT Songs/'Bout You.mp3", start: 40.8 },
    { name: "IF you leave me", file: "SVT Songs/IF you leave me.mp3", start: 73.5 },
    { name: "Ash", file: "SVT Songs/Ash.mp3", start: 42 },
    { name: "To You", file: "SVT Songs/To You.mp3", start: 47.1 },
    { name: "Rock with you", file: "SVT Songs/Rock with you.mp3", start: 46.9 },
    { name: "SOS (Prod. Marshmello)", file: "SVT Songs/SOS.mp3", start: 49.6 },
    { name: "God of Music", file: "SVT Songs/God of Music.mp3", start: 65.24 },
    { name: "Back 2 Back", file: "SVT Songs/Back 2 Back.mp3", start: 43.3 },
    { name: "Yawn", file: "SVT Songs/Yawn.mp3", start: 67 },
    { name: "Headliner", file: "SVT Songs/Headliner.mp3", start: 75.7 },
    { name: "Together", file: "SVT Songs/Together.mp3", start: 61.3 },
    { name: "Fearless", file: "SVT Songs/Fearless.mp3", start: 49.2 },
    { name: "My My", file: "SVT Songs/My My.mp3", start: 66.1 },
    { name: "I Wish", file: "SVT Songs/I Wish.mp3", start: 53.5 },
    { name: "Kidult", file: "SVT Songs/Kidult.mp3", start: 49.5 },
    { name: "Dust", file: "SVT Songs/Dust.mp3", start: 58 },
    { name: "I Don't Understand But I Luv U", file: "SVT Songs/I Don't Understand But I Luv U.mp3", start: 70.5 },
    { name: "F*ck My Life", file: "SVT Songs/Fck My Life.mp3", start: 77 },
    { name: "Super", file: "SVT Songs/Super.mp3", start: 54.7 },
    { name: "April Shower", file: "SVT Songs/April Shower.mp3", start: 45.5 },
    { name: "Adore U", file: "SVT Songs/Adore U.mp3", start: 46.8 },
    { name: "Shining Diamond", file: "SVT Songs/Shining Diamond.mp3", start: 52.7 },
    { name: "Mansae", file: "SVT Songs/Mansae.mp3", start: 57.3 },
    { name: "VERY NICE", file: "SVT Songs/VERY NICE.mp3", start: 33.7 },
    { name: "BEAUTIFUL", file: "SVT Songs/BEAUTIFUL.mp3", start: 61.8 },
    { name: "BOOMBOOM", file: "SVT Songs/BOOMBOOM.mp3", start: 51.5 },
    { name: "Smile Flower", file: "SVT Songs/Smile Flower.mp3", start: 55.6 },
    { name: "Don't Wanna Cry", file: "SVT Songs/Don't Wanna Cry.mp3", start: 58.3 },
    { name: "Habit", file: "SVT Songs/Habit.mp3", start: 60 },
    { name: "CLAP", file: "SVT Songs/CLAP.mp3", start: 79.6 },
    { name: "Lilili Yabbay", file: "SVT Songs/Lilili Yabbay.mp3", start: 72.2 },
    { name: "Campfire", file: "SVT Songs/Campfire.mp3", start: 47 },
    { name: "Thinkin' about you", file: "SVT Songs/Thinkin' about you.mp3", start: 49.5 },
    { name: "Oh My!", file: "SVT Songs/Oh My!.mp3", start: 52.6 },
    { name: "Holiday", file: "SVT Songs/Holiday.mp3", start: 49.7 },
    { name: "Our dawn is hotter than day", file: "SVT Songs/Our dawn is hotter than day.mp3", start: 54.2 },
    { name: "HIT", file: "SVT Songs/HIT.mp3", start: 57.7 },
    { name: "Lie Again", file: "SVT Songs/Lie Again.mp3", start: 64.2 },
    { name: "Fear", file: "SVT Songs/Fear.mp3", start: 53.3 },
    { name: "Let me hear you say", file: "SVT Songs/Let me hear you say.mp3", start: 53.8 },
    { name: "247", file: "SVT Songs/247.mp3", start: 45.3 },
    { name: "Second Life", file: "SVT Songs/Second Life.mp3", start: 44.3 },
    { name: "Lucky", file: "SVT Songs/Lucky.mp3", start: 51 },
    { name: "Snap Shoot", file: "SVT Songs/Snap Shoot.mp3", start: 46.3 },
    { name: "Happy Ending (Korean Ver.)", file: "SVT Songs/Happy Ending.mp3", start: 60.1 },
    { name: "HOME;RUN", file: "SVT Songs/HOME;RUN.mp3", start: 51.4 },
    { name: "Do Re Mi", file: "SVT Songs/Do Re Mi.mp3", start: 52.2 },
    { name: "HEY BUDDY", file: "SVT Songs/HEY BUDDY.mp3", start: 57.5 },
    { name: "All My Love", file: "SVT Songs/All My Love.mp3", start: 66 },
    { name: "Heaven's Cloud", file: "SVT Songs/Heaven's Cloud.mp3", start: 54 },
    { name: "Ready to love", file: "SVT Songs/Ready to love.mp3", start: 44.8 },
    { name: "GAM3 BO1", file: "SVT Songs/GAM3 BO1.mp3", start: 59 },
    { name: "Same dream, same mind, same night", file: "SVT Songs/Same dream, same mind, same night.mp3", start: 66 },
    { name: "Circles", file: "SVT Songs/Circles.mp3", start: 59 },
    { name: "_WORLD", file: "SVT Songs/_WORLD.mp3", start: 27.95 },
    { name: "Fallin' Flower (Korean Ver.)", file: "SVT Songs/Fallin' Flower.mp3", start: 79.1 },
    { name: "CHEERS", file: "SVT Songs/CHEERS.mp3", start: 41.4 },
    { name: "MAESTRO", file: "SVT Songs/MAESTRO.mp3", start: 60.2 },
    { name: "Cheers to youth", file: "SVT Songs/Cheers to youth.mp3", start: 85 },
    { name: "CALL CALL CALL! (Korean Ver.)", file: "SVT Songs/CALL CALL CALL!.mp3", start: 62.3 },
    { name: "Eyes on you", file: "SVT Songs/Eyes on you.mp3", start: 52.3 },
    { name: "LOVE, MONEY, FAME (feat. DJ Khaled)", file: "SVT Songs/LOVE, MONEY, FAME (feat. DJ Khaled).mp3", start: 50.3 },
    { name: "1 TO 13", file: "SVT Songs/1 TO 13.mp3", start: 36.4 },
    { name: "Pretty U", file: "SVT Songs/Pretty U.mp3", start: 58 },
    { name: "HBD", file: "SVT Songs/HBD.mp3", start: 52.98 },
    { name: "THUNDER", file: "SVT Songs/THUNDER.mp3", start: 52.1 },
    { name: "Bad Influence (Prod.by Pharrell Williams)", file: "SVT Songs/Bad Influence.mp3", start: 48.8 }
];

// TXT 歌單
const txtSongs = [
    { name: "Blue Orangeade", file: "TXT Songs/Blue Orangeade.mp3", start: 39 },
    { name: "CROWN", file: "TXT Songs/CROWN.mp3", start: 73 },
    { name: "Our Summer", file: "TXT Songs/Our Summer.mp3", start: 44 },
    { name: "Cat & Dog", file: "TXT Songs/Cat & Dog.mp3", start: 34 },
    { name: "Nap of a star", file: "TXT Songs/Nap of a star.mp3", start: 68 },
    { name: "New Rules", file: "TXT Songs/New Rules.mp3", start: 57 },
    { name: "Run Away", file: "TXT Songs/Run Away.mp3", start: 53 },
    { name: "Roller Coaster", file: "TXT Songs/Roller Coaster.mp3", start: 63 },
    { name: "Poppin' Star", file: "TXT Songs/Poppin' Star.mp3", start: 36 },
    { name: "Can't We Just Leave the Monster Alive", file: "TXT Songs/Can't We Just Leave the Monster Alive.mp3", start: 63 },
    { name: "20cm", file: "TXT Songs/20cm.mp3", start: 45 },
    { name: "Angel Or Devil", file: "TXT Songs/Angel Or Devil.mp3", start: 67 },
    { name: "DRAMA", file: "TXT Songs/DRAMA.mp3", start: 53 },
    { name: "Can't You See Me", file: "TXT Songs/Can't You See Me.mp3", start: 81 },
    { name: "Maze in the Mirror", file: "TXT Songs/Maze in the Mirror.mp3", start: 49 },
    { name: "PUMA", file: "TXT Songs/PUMA.mp3", start: 56 },
    { name: "Eternally", file: "TXT Songs/Eternally.mp3", start: 53 },
    { name: "Ghosting", file: "TXT Songs/Ghosting.mp3", start: 76 },
    { name: "Blue Hour", file: "TXT Songs/Blue Hour.mp3", start: 48 },
    { name: "We Lost The Summer", file: "TXT Songs/We Lost The Summer.mp3", start: 72 },
    { name: "Wishlist", file: "TXT Songs/Wishlist.mp3", start: 47 },
    { name: "Way Home", file: "TXT Songs/Way Home.mp3", start: 38 },
    { name: "Anti-Romantic", file: "TXT Songs/Anti-Romantic.mp3", start: 39 },
    { name: "0X1=LOVESONG (I Know I Love You) feat. Seori", file: "TXT Songs/0X1=LOVESONG (I Know I Love You) feat. Seori.mp3", start: 48.2 },
    { name: "Magic", file: "TXT Songs/Magic.mp3", start: 27.5 },
    { name: "Ice Cream", file: "TXT Songs/Ice Cream.mp3", start: 49.3 },
    { name: "What if I had been that PUMA", file: "TXT Songs/What if I had been that PUMA.mp3", start: 50.3 },
    { name: "No Rules", file: "TXT Songs/No Rules.mp3", start: 38.3 },
    { name: "Dear Sputnik", file: "TXT Songs/Dear Sputnik.mp3", start: 49.2 },
    { name: "Frost", file: "TXT Songs/Frost.mp3", start: 98.5 },
    { name: "LO$ER=LO♡ER", file: "TXT Songs/LO$ER=LO♡ER.mp3", start: 45.8 },
    { name: "MOA Diary (Dubaddu Wari Wari)", file: "TXT Songs/MOA Diary (Dubaddu Wari Wari).mp3", start: 42.5 },
    { name: "Ito", file: "TXT Songs/Ito.mp3", start: 48 },
    { name: "Opening Sequence", file: "TXT Songs/Opening Sequence.mp3", start: 38 },
    { name: "Good Boy Gone Bad", file: "TXT Songs/Good Boy Gone Bad.mp3", start: 53.5 },
    { name: "Trust Fund Baby", file: "TXT Songs/Trust Fund Baby.mp3", start: 45 },
    { name: "Lonely Boy", file: "TXT Songs/Lonely Boy.mp3", start: 46.5 },
    { name: "Thursday's Child Has Far To Go", file: "TXT Songs/Thursday's Child Has Far To Go.mp3", start: 69.2 },
    { name: "Ring", file: "TXT Songs/Ring.mp3", start: 48.5 },
    { name: "Devil by the Window", file: "TXT Songs/Devil by the Window.mp3", start: 53.3 },
    { name: "Sugar Rush Ride", file: "TXT Songs/Sugar Rush Ride.mp3", start: 75.8 },
    { name: "Happy Fools (feat. Coi Leray)", file: "TXT Songs/Happy Fools (feat. Coi Leray).mp3", start: 72 },
    { name: "Tinnitus", file: "TXT Songs/Tinnitus.mp3", start: 68 },
    { name: "Farewell, Neverland", file: "TXT Songs/Farewell, Neverland.mp3", start: 60.5 },
    { name: "Growing Pain", file: "TXT Songs/Growing Pain.mp3", start: 73 },
    { name: "Chasing That Feeling", file: "TXT Songs/Chasing That Feeling.mp3", start: 43 },
    { name: "Back for More (with Anitta)", file: "TXT Songs/Back for More (with Anitta).mp3", start: 51.5 },
    { name: "Dreamer", file: "TXT Songs/Dreamer.mp3", start: 61.5 },
    { name: "Deep Down", file: "TXT Songs/Deep Down.mp3", start: 48.7 },
    { name: "Skipping Stones", file: "TXT Songs/Skipping Stones.mp3", start: 43.8 },
    { name: "Happily Ever After", file: "TXT Songs/Happily Ever After.mp3", start: 61.8 },
    { name: "Blue Spring", file: "TXT Songs/Blue Spring.mp3", start: 47.3 },
    { name: "Do It Like That (with Jonas Brothers)", file: "TXT Songs/Do It Like That (with Jonas Brothers).mp3", start: 26.2 },
    { name: "I'll See You There Tomorrow", file: "TXT Songs/I'll See You There Tomorrow.mp3", start: 31 },
    { name: "Deja Vu", file: "TXT Songs/Deja Vu.mp3", start: 46.6 },
    { name: "Miracle", file: "TXT Songs/Miracle.mp3", start: 38.5 },
    { name: "The Killa (I Belong to You)", file: "TXT Songs/The Killa (I Belong to You).mp3", start: 56.6 },
    { name: "Quarter Life", file: "TXT Songs/Quarter Life.mp3", start: 37.7 },
    { name: "Open Always Wins", file: "TXT Songs/Open Always Wins.mp3", start: 37.5 },
    { name: "Step by Step", file: "TXT Songs/Step by Step.mp3", start: 70.3 },
    { name: "Surfing in the Moonlight", file: "TXT Songs/Surfing in the Moonlight.mp3", start: 74.7 },
    { name: "When the Day Comes", file: "TXT Songs/When the Day Comes.mp3", start: 49.4 },
    { name: "Love Language", file: "TXT Songs/Love Language.mp3", start: 50.2 },
    { name: "GGUM", file: "TXT Songs/GGUM.mp3", start: 50.7 },
    { name: "Panic", file: "TXT Songs/Panic.mp3", start: 75.3 },
    { name: "Love Sight", file: "TXT Songs/Love Sight.mp3", start: 52.4 },
    { name: "Heaven", file: "TXT Songs/Heaven.mp3", start: 67.5 },
    { name: "Over The Moon", file: "TXT Songs/Over The Moon.mp3", start: 49.3 },
    { name: "Danger", file: "TXT Songs/Danger.mp3", start: 41.5 },
    { name: "Resist (Not Gonna Run Away)", file: "TXT Songs/Resist (Not Gonna Run Away).mp3", start: 42 },
    { name: "Forty One Winks", file: "TXT Songs/Forty One Winks.mp3", start: 54.8 },
    { name: "Higher Than Heaven", file: "TXT Songs/Higher Than Heaven.mp3", start: 37.2 },
];

let currentArtist = ""; // 被選擇的歌手
let songs = []; // 被選擇的歌手的歌單
let playedSongs = []; // 避免在每首歌都播到之前重複播歌

// 食物隨機生成
function generateFood() {
  let newFood;
  do {
    // 在canvas裡隨機選擇食物出現的位置
    newFood = {
      x: Math.floor(Math.random() * 20) * box,
      y: Math.floor(Math.random() * 20) * box
    };
  } while (snake.some(seg => seg.x === newFood.x && seg.y === newFood.y)); // 食物不能出現在蛇身上
  return newFood;
}

// 蛇的移動速度
function updateSpeed() {
  clearInterval(game);
  const newSpeed = Math.max(80, 200 - score * 5); // 隨著分數增加，蛇的速度變快
  game = setInterval(draw, newSpeed); // 設定新的速度開始遊戲
}

// 第一顆生成的食物
let food = generateFood();

// 控制蛇的方向（因為蛇不能碰到自己所以不能180回頭）
document.addEventListener("keydown", changeDirection);
function changeDirection(e) {
  if (e.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
  else if (e.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
  else if (e.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
  else if (e.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
}

// 遊戲內容繪製
function draw() {
  ctx.clearRect(0, 0, 400, 400); // 清除canvas

  // 畫蛇的每一段身體
  for (let i = 0; i < snake.length; i++) {
    if (currentArtist === "TXT") {
      ctx.fillStyle = i === 0 ? "#97EBDF" : "#5E7F7A";
    } else {
      ctx.fillStyle = i === 0 ? "#f7cac9" : "#92a8d1"; // 預設（SEVENTEEN）
    }
    ctx.fillRect(snake[i].x, snake[i].y, box, box); // 畫蛇身
  }

  // 食物
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(food.x, food.y, box, box);

  // 蛇頭（移動）
  let head = { ...snake[0] };
  if (direction === "UP") head.y -= box;
  else if (direction === "DOWN") head.y += box;
  else if (direction === "LEFT") head.x -= box;
  else if (direction === "RIGHT") head.x += box;

  // 偵測碰撞（遊戲結束）
  if (
  head.x < 0 || head.x >= 400 || head.y < 0 || head.y >= 400 || // 撞到牆（canvas邊邊）
  // 或
  snake.some(seg => seg.x === head.x && seg.y === head.y) // 撞到自己
  )
  {
    clearInterval(game); // 停止遊戲

    // 更新最高分紀錄
    if (score > highScore) {
      highScore = score;
      sessionStorage.setItem("highScore", highScore);
    }
    document.getElementById("highScore").textContent = `Highest Score: ${highScore}`;
    document.getElementById("songName").textContent = "Game Over 💔";

    // 動畫：canvas往左滑&播過的歌單出現
    const gameCanvas = document.getElementById("gameCanvas");
    const songListContainer = document.getElementById("playedSongsList");
    gameCanvas.classList.remove("slide-out");
    void gameCanvas.offsetWidth;
    gameCanvas.classList.add("slide-out");
    setTimeout(() => {
      songListContainer.style.display = "block";
      songListContainer.classList.remove("fade-in");
      void songListContainer.offsetWidth;
      songListContainer.classList.add("fade-in");
    }, 100);

    // 顯示重玩or重選歌手的按鈕
    document.getElementById("buttonContainer").style.display = "flex";

    // 停止播放音樂
    const audio = document.getElementById("audioPlayer");
    audio.pause();
    audio.currentTime = 0;
    return;
  }

  
  // 偵測吃到食物（有得分，遊戲繼續進行）
  if (head.x === food.x && head.y === food.y) {
    score++; // 分數+1
    document.getElementById("scoreBoard").textContent = `Score: ${score}`;
    playNextSong(); // 播下一首歌
    food = generateFood(); // 產生新食物
    updateSpeed(); // 根據分數稱加，加快蛇的移動速度
  } else {
      snake.pop(); // 沒吃到就維持原先蛇身長度
  }
  snake.unshift(head); // 更新蛇身
}

// 控制遊戲進行時的歌曲播放
function playNextSong() {
  const audio = document.getElementById("audioPlayer");
  let availableSongs = songs.filter((_, index) => !playedSongs.includes(index)); // 過濾出還沒播過的歌
  // 如果所有歌都播過一次了，就可以重新再隨機播放
  if (availableSongs.length === 0) {
    playedSongs = [];
    availableSongs = [...songs];
  }
  const randomIndex = Math.floor(Math.random() * availableSongs.length); // 隨機挑一首歌
  const song = availableSongs[randomIndex];
  const realIndex = songs.indexOf(song);
  playedSongs.push(realIndex); // 標記為已播放
  updatePlayedSongsList();  // 更新已播放的歌單（遊戲結束時會顯示在右側的那個清單）

  // 遊戲進行的時候上方顯示歌名
  document.getElementById("songName").textContent = `Now Playing: ${song.name}`;
  audio.src = song.file;

  // 開始播放
  audio.addEventListener("loadedmetadata", function setTime() {
    audio.currentTime = song.start || 0; // 歌曲從前面設定好的開始秒數開始播放
    audio.removeEventListener("loadedmetadata", setTime); // 只跑一次
    audio.play();
  });
}

// 遊戲開始（按下 Start 鍵）
function startGame() {
  document.body.classList.add("game-active");

  // 畫面上只出現 標題、Canvas、分數、最高分紀錄、顯示正在播的歌曲，其他東西都隱藏
  document.getElementById("startBtn").style.display = "none";
  document.getElementById("buttonContainer").style.display = "none";
  document.getElementById("songName").style.display = "block";
  document.getElementById("gameCanvas").classList.remove("slide-out");
  document.getElementById("playedSongsList").classList.remove("fade-in");
  document.getElementById("playedSongsList").style.display = "none";

  // 遊戲數據重設
  score = 0;
  snake = [{ x: 200, y: 200 }];
  direction = "RIGHT";
  playedSongs = []; // 清空上一局播過的歌曲清單
  updatePlayedSongsList(); // 遊戲結束後在右側顯示的該局播到的歌單也要清空
  document.getElementById("scoreBoard").textContent = "Score: 0"; // 分數重新設為0分

  // 隨機播放第一首歌
  const startIndex = Math.floor(Math.random() * songs.length);
  const song = songs[startIndex];
  playedSongs.push(startIndex);
  const audio = document.getElementById("audioPlayer");
  document.getElementById("songName").textContent = `Now Playing: ${song.name}`;
  audio.src = song.file;
  // 歌曲從設定好的秒數開始播
  audio.addEventListener("loadedmetadata", function setTime() {
    audio.currentTime = song.start || 0;
    audio.removeEventListener("loadedmetadata", setTime);
    audio.play();
  });

  food = generateFood(); // 產生第一個食物
  updateSpeed(); // 根據分數而設定的蛇的移動速度
}

function resetCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "#111111";
}

// 遊戲結束時的右側歌單：點擊歌曲名稱播放該首歌 30 秒
let songTimeoutId = null;

// 玩家點擊歌曲名稱
document.getElementById("songList").addEventListener("click", (event) => {
    if (event.target.tagName === "LI") {
        const clickedSongName = event.target.textContent;
        const song = songs.find(s => s.name === clickedSongName);

        // 如果玩家點擊歌曲名稱時，上一首點的還在播，先清除 timeout
        if (song) {
            const audio = document.getElementById("audioPlayer");
            if (songTimeoutId) {
                clearTimeout(songTimeoutId);
                songTimeoutId = null;
            }

            audio.src = song.file;

            // 設定在播30秒後就暫停播放
            audio.addEventListener("loadedmetadata", function onMetaLoaded() {
                audio.currentTime = song.start || 0;
                audio.removeEventListener("loadedmetadata", onMetaLoaded);
            });
            audio.addEventListener("playing", function onPlaying() {
                audio.removeEventListener("playing", onPlaying);
                songTimeoutId = setTimeout(() => {
                    audio.pause(); // 自動暫停
                    audio.currentTime = 0;
                    songTimeoutId = null;
                }, 30000);
            });

            audio.play();
        }
    }
});

// 更新右側歌曲清單
function updatePlayedSongsList() {
  const listEl = document.getElementById("songList");
  listEl.innerHTML = "";
  playedSongs.forEach(index => {
    const li = document.createElement("li");
    li.textContent = songs[index].name;
    listEl.appendChild(li);
  });
}

// 根據玩家選擇的歌手切換背景、歌單、文字顯示等設定
// SEVENTEEN
document.getElementById("selectSeventeen").addEventListener("click", () => {
  currentArtist = "SEVENTEEN";
  songs = [...seventeenSongs];
  document.querySelector("h1").textContent = "SEVENTEEN Playlist";
  document.body.className = "seventeen-theme";
  enterGameScene();
});

// TXT
document.getElementById("selectTXT").addEventListener("click", () => {
  currentArtist = "TXT";
  songs = [...txtSongs];
  document.querySelector("h1").textContent = "TOMORROW X TOGETHER Playlist";
  document.body.className = "txt-theme";
  enterGameScene();
});

// 進入遊戲畫面
function enterGameScene() {
  document.getElementById("playlistSelect").style.display = "none";
  document.getElementById("gameUI").style.display = "block";
  document.getElementById("startBtn").style.display = "inline-block";
  document.getElementById("songName").style.display = "block";
  document.getElementById("songName").textContent = "Get ready to play!";
  resetCanvas();
}

// 按鈕功能
// 遊戲開始
document.getElementById("startBtn").addEventListener("click", startGame);

// 再玩一次相同歌手的
document.getElementById("restartBtn").addEventListener("click", () => {
  score = 0;
  document.getElementById("scoreBoard").textContent = "Score: 0";
  document.getElementById("startBtn").style.display = "inline-block";
  document.getElementById("songName").style.display = "block";
  document.getElementById("songName").textContent = "Get ready to play!";
  document.getElementById("buttonContainer").style.display = "none";

  const gameCanvas = document.getElementById("gameCanvas");
  gameCanvas.classList.remove("slide-out");

  const songListContainer = document.getElementById("playedSongsList");
  songListContainer.classList.remove("fade-in");
  songListContainer.style.display = "none";

  resetCanvas();
});

// 重選要玩的歌手
document.getElementById("reselectBtn").addEventListener("click", () => {
  clearInterval(game);
  
  score = 0;
  document.getElementById("scoreBoard").textContent = "Score: 0";

  document.getElementById("playlistSelect").style.display = "flex";
  document.getElementById("gameUI").style.display = "none";
  document.querySelector("h1").textContent = "KPOP Playlist Snake Game";
  document.getElementById("songName").style.display = "none";
  document.getElementById("buttonContainer").style.display = "none";
  document.body.className = "default-theme";

  const audio = document.getElementById("audioPlayer");
  audio.pause();
  audio.currentTime = 0;

  const gameCanvas = document.getElementById("gameCanvas");
  gameCanvas.classList.remove("slide-out");

  const songListContainer = document.getElementById("playedSongsList");
  songListContainer.classList.remove("fade-in");
  songListContainer.style.display = "none";

  resetCanvas();
});

// 選取歌手的 Carousel
const track = document.querySelector(".carousel-track");
const cards = document.querySelectorAll(".artist-card");
const nextButtons = document.querySelectorAll(".nextBtn");
let currentIndex = 0;

nextButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    cards[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % cards.length; // 換下一張
    cards[currentIndex].classList.add("active");
    track.style.transform = `translateX(-${currentIndex * 100}%)`; // 滑動畫面
  });
});