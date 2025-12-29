let spriteSheet;
let runSheet;
let jumpSheet;
let tomBoomSheet; // 宣告 Tom 爆炸圖片變數
let boomImage; // 宣告炸彈圖片變數
let dioSheet; // 宣告 DIO 圖片變數
let totalFrames = 11; // 總共有 11 張圖
let currentFrame = 0;
let frameWidth;
let frameHeight;
let animationSpeed = 0.15; // 控制動畫速度
let counter = 0;
let characterScale = 3; // 設定角色放大倍率，你可以調整這個數值
let characterX, characterY;
let moveSpeed = 10;
let isFacingLeft = false;
let gravity = 0.8;
let velocityY = 0;
let groundY;

// Tom 爆炸狀態變數
let isHit = false;
let tomBoomCounter = 0;
let tomQuestionCount = 0;
let isTomInteracting = false;

// 炸彈動畫相關變數
let boomTotalFrames = 5;
let bombs = []; // 用來存放所有炸彈物件的陣列
let lastBombTime = 0; // 上次產生炸彈的時間

// DIO 動畫變數
let dioCounter = 0;
let dioTotalFrames = 18;
let dioX, dioY; // 宣告 DIO 座標變數
let dioInteractSheet; // DIO 互動動畫
const dioInteractTotalFrames = 12;
let isDioInteracting = false;
// DIO 操控變數
let dioRunSheet, dioJumpSheet, dioSutandoSheet;
let dioVelocityY = 0;
let dioIsFacingLeft = false;
let dioAction = 'standby'; // 'standby', 'run', 'jump', 'sutando'
let dioSutandoCounter = 0;

// Joseph 動畫變數
let josephSheet;
let josephCounter = 0;
let josephTotalFrames = 6;
let josephX, josephY;
let josephInteractSheet; // Joseph 互動動畫
const josephInteractTotalFrames = 12;
let isJosephInteracting = false;

// Jotaro 動畫變數
let jotaroSheet;
let jotaroCounter = 0;
let jotaroTotalFrames = 32;
let jotaroX, jotaroY;
let jotaroInteractSheet; // Jotaro 互動動畫
const jotaroInteractTotalFrames = 15;
let isJotaroInteracting = false;
// Jotaro 操控變數
let jotaroRunSheet, jotaroJumpSheet, jotaroSutandoSheet;
let jotaroVelocityY = 0;
let jotaroIsFacingLeft = false;
let jotaroAction = 'standby'; // 'standby', 'run', 'jump', 'sutando'
let jotaroSutandoCounter = 0;
// Jerry 變數
let jerryStandbySheet, jerryJumpSheet, jerryRunSheet;
let jerryState = 'hidden'; // 狀態: hidden, jumping, showing, running
let jerryX, jerryY;
let jerryCounter = 0;
let jerryTimer = 0;
let jerryAnswer = "";
// 背景變數
let bgImage;
let bgX = 0;
// 問答系統變數
let questionTable; // 儲存 CSV 資料
let currentQ = ""; // 目前題目
let currentA = ""; // 目前答案
let inputField; // 輸入框物件
let feedbackMsg = ""; // 回饋訊息 (恭喜答對/錯)
let quizTimer = 0; // 控制訊息顯示時間
// 計分與遊戲狀態變數
let correctCount = 0;
let incorrectCount = 0;
let totalQuestionsAnswered = 0;
let dioQuestionCount = 0;
let josephQuestionCount = 0;
let jotaroQuestionCount = 0;
let currentQuizCharacter = ""; // 記錄目前是誰在出題 ('dio', 'joseph', 'jotaro')
let gameWon = false;
let gameOver = false;
let endTextX = 0;
let gameStarted = false;
let startButton, restartButton;
let currentPlayer = 'tom'; // 當前操控角色: 'tom' 或 'jotaro'

function preload() {
  spriteSheet = loadImage('tom/standby/31440ALL.png');
  runSheet = loadImage('tom/run/55640ALL.png');
  jumpSheet = loadImage('tom/jump/27543ALL.png');
  tomBoomSheet = loadImage('tom/boom/19840ALL.png', null, () => {
    console.error("錯誤：找不到圖片 'tom/boom/19840ALL.png'，請檢查資料夾與檔名是否正確。");
  }); // 載入 Tom 爆炸圖片
  boomImage = loadImage('bomb/boom.png'); // 載入炸彈圖片精靈
  dioSheet = loadImage('DIO/DIO standby/1363119ALL.png'); // 載入 DIO 圖片
  dioInteractSheet = loadImage('DIO/DIO interact/1939110.png'); // 載入 DIO 互動圖片
  dioRunSheet = loadImage('DIO/DIO run/2683116.png'); // 載入 DIO 跑步圖片
  dioJumpSheet = loadImage('DIO/DIO jump/727112.png'); // 載入 DIO 跳躍圖片
  dioSutandoSheet = loadImage('DIO/DIO sutando/3883141.png'); // 載入 DIO 替身攻擊圖片
  josephSheet = loadImage('Joseph/Joseph standby/529114.png'); // 載入 Joseph 圖片
  josephInteractSheet = loadImage('Joseph/Joseph interact/907117.png'); // 載入 Joseph 互動圖片
  jotaroSheet = loadImage('Jotaro/Jotaro standby/3643117.png'); // 載入 Jotaro 圖片
  jotaroInteractSheet = loadImage('Jotaro/Jotaro interact/1300117.png'); // 載入 Jotaro 互動圖片
  jotaroRunSheet = loadImage('Jotaro/Jotaro run/2619115.png'); // 載入 Jotaro 跑步圖片
  jotaroJumpSheet = loadImage('Jotaro/Jotaro jump/1685151.png'); // 載入 Jotaro 跳躍圖片
  jotaroSutandoSheet = loadImage('Jotaro/Jotaro sutando/1939134.png'); // 載入 Jotaro 替身攻擊圖片
  jerryStandbySheet = loadImage('jerry/jerry standby/20524ALL.png'); // 載入 Jerry 待機圖片
  jerryJumpSheet = loadImage('jerry/jerry jump/23524ALL.png'); // 載入 Jerry 跳躍圖片
  jerryRunSheet = loadImage('jerry/jerry run/19324ALL.png'); // 載入 Jerry 跑步圖片
  bgImage = loadImage('Isolated Island Intro Level 0  1 Day Foreground.png'); // 載入背景圖片
  questionTable = loadTable('questions.csv', 'csv', 'header'); // 載入 CSV 題庫
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER); // 設定圖片繪製模式為中心
  characterX = width / 2;
  characterY = height / 2;
  groundY = height / 2; // 設定地面高度為初始 Y 座標
  dioX = width / 2 - 400; // 設定 DIO 初始 X 座標 (固定位置)
  dioY = height / 2;      // 設定 DIO 初始 Y 座標 (地面高度)
  josephX = width / 2 - 150; // 設定 Joseph 初始 X 座標 (在 Tom 左邊)
  josephY = height / 2;      // 設定 Joseph 初始 Y 座標
  jotaroX = width / 2 + 200; // 設定 Jotaro 初始 X 座標 (在 Tom 右邊)
  jotaroY = height / 2;      // 設定 Jotaro 初始 Y 座標
  bgX = width / 2;           // 設定背景初始 X 座標
  jerryX = 0;                // 初始化 Jerry X 座標

  // 建立開始按鈕
  startButton = createButton('開始遊戲');
  startButton.position(width / 2 - 50, height / 2);
  startButton.size(100, 50);
  startButton.style('font-size', '20px');
  startButton.style('background-color', '#4CAF50'); // 改成綠色
  startButton.style('border-radius', '10px');
  startButton.style('border', '2px solid #000000');
  startButton.style('cursor', 'pointer');
  startButton.style('transition', 'all 0.2s'); // 加入平滑過渡效果
  startButton.mouseOver(() => {
    startButton.style('background-color', '#45a049'); // 懸停變深綠色
    startButton.style('transform', 'scale(1.1)');     // 懸停放大
  });
  startButton.mouseOut(() => {
    startButton.style('background-color', '#4CAF50');
    startButton.style('transform', 'scale(1.0)');
  });
  startButton.mousePressed(startGame);

  // 建立重新開始按鈕
  restartButton = createButton('再來一次');
  restartButton.position(width / 2 - 50, height / 2 + 100);
  restartButton.size(100, 50);
  restartButton.style('font-size', '20px');
  restartButton.style('background-color', '#4CAF50'); // 改成綠色
  restartButton.style('border-radius', '10px');
  restartButton.style('border', '2px solid #000000');
  restartButton.style('cursor', 'pointer');
  restartButton.style('transition', 'all 0.2s');
  restartButton.mouseOver(() => {
    restartButton.style('background-color', '#45a049');
    restartButton.style('transform', 'scale(1.1)');
  });
  restartButton.mouseOut(() => {
    restartButton.style('background-color', '#4CAF50');
    restartButton.style('transform', 'scale(1.0)');
  });
  restartButton.mousePressed(resetGame);
  restartButton.hide();

  // 自動計算單張影格的寬度 (假設圖片是水平排列)
  frameWidth = spriteSheet.width / totalFrames;
  frameHeight = spriteSheet.height;
}

function draw() {
  // background('#e6ccb2'); // 設定背景顏色

  // 繪製背景 (三張串接)
  tint(180); // 調暗背景亮度 (0-255，數值越小越暗，您可以自行調整這個數字)
  image(bgImage, bgX, height / 2);
  image(bgImage, bgX - bgImage.width, height / 2);
  image(bgImage, bgX + bgImage.width, height / 2);
  noTint(); // 恢復正常亮度，以免影響後續圖片繪製

  // 更新按鈕位置 (讓按鈕跟隨場景移動，而不是固定在視窗上)
  // 只有在遊戲未開始且操控角色為 Tom 時才顯示開始按鈕
  // 修改：任何角色都可以開始遊戲
  if (!gameStarted) startButton.show();
  startButton.position(bgX - 50, height / 2);
  if (gameWon || gameOver) {
    restartButton.position(endTextX - 50, height / 2 + 100);
  }

  // --- 繪製計分板 ---
  push();
  fill(255, 255, 255, 150); // 半透明白色背景
  noStroke();
  rectMode(CORNER);
  rect(10, 10, 180, 110, 10); // 繪製圓角矩形背景框

  fill(255, 0, 0);
  textSize(24);
  textAlign(LEFT, TOP);
  text(`答對: ${correctCount}`, 20, 20);
  text(`答錯: ${incorrectCount}`, 20, 50);
  text(`進度: ${totalQuestionsAnswered}/9`, 20, 80);

  if (gameWon) {
    textSize(60);
    textAlign(CENTER, CENTER);
    fill(0, 200, 0);
    stroke(255);
    strokeWeight(4);
    text("恭喜獲勝!", endTextX, height / 2);
  } else if (gameOver) {
    textSize(60);
    textAlign(CENTER, CENTER);
    fill(255, 0, 0);
    stroke(255);
    strokeWeight(4);
    text("遊戲結束", endTextX, height / 2);
  }
  pop();

  // --- 物理模擬 ---
  velocityY += gravity; // 重力作用
  characterY += velocityY; // 更新垂直位置

  // 地面碰撞偵測
  if (characterY >= groundY) {
    characterY = groundY;
    velocityY = 0;
  }

  // --- 炸彈生成與管理 ---
  // 每 5 秒 (5000 毫秒) 產生一顆新炸彈
  if (millis() - lastBombTime > 5000) {
    bombs.push({
      x: random(50, width - 50), // 隨機 X 座標
      y: -50,                    // 從視窗上方掉落
      vy: 0,                     // 初始垂直速度
      state: 'falling',          // 狀態：掉落中 (falling) 或 爆炸中 (exploding)
      counter: 0                 // 動畫計數器
    });
    lastBombTime = millis();
  }

  // 更新所有炸彈的狀態並檢查碰撞
  for (let b of bombs) {
    // 炸彈物理模擬 (如果是掉落狀態)
    if (b.state === 'falling') {
      b.vy += 0.2; // 炸彈重力
      b.y += b.vy;
      
      // 撞到地面
      if (b.y >= groundY) {
        b.y = groundY;
        b.state = 'exploding'; // 切換為爆炸狀態
      }
    }

    // 檢查 Tom 是否撞到這顆炸彈
    // 只有在炸彈爆炸且播放到最後一張圖 (索引 4) 時，才算被炸到
    // 修改：只有當操控角色是 Tom 時，才會被炸到
    if (currentPlayer === 'tom' && !isHit && b.state === 'exploding' && Math.floor(b.counter) === 4 && dist(characterX, characterY, b.x, b.y) < 150) {
      isHit = true;       // Tom 進入被炸狀態
      tomBoomCounter = 5; // 從第 6 張圖開始播放 (索引 5)

      // 被炸到計為答錯 1 題，且進度 + 1
      if (gameStarted && !gameWon && !gameOver) {
        incorrectCount++;
        totalQuestionsAnswered++;

        // 檢查遊戲結束條件
        if (totalQuestionsAnswered >= 9) {
          if (correctCount >= 8) {
            gameWon = true;
          } else {
            gameOver = true;
          }
          endTextX = width / 2;
          restartButton.show();
        }
      }
    }
  }

  // --- 輸入控制 ---
  let currentSprite = spriteSheet; // 預設顯示待機圖片精靈
  totalFrames = 11; // 預設影格數

  // 只有當操控角色是 Tom 時，才處理 Tom 的輸入與狀態
  if (currentPlayer === 'tom') {
    // 如果處於爆炸狀態 (isHit)，鎖定操作並播放爆炸動畫
    if (isHit) {
      currentSprite = tomBoomSheet;
      totalFrames = 7; // 爆炸動畫有 7 張圖
    } else {
      // --- 正常移動控制 (只有沒被炸到時才能移動) ---
      // 當按下上鍵且角色位於地面時，進行跳躍
      if (keyIsDown(UP_ARROW) && characterY === groundY) {
        velocityY = -25; // 跳躍力道 (負值代表向上)
      }

      // 當按下右鍵時，切換為跑步圖片精靈並向右移動
      if (keyIsDown(RIGHT_ARROW)) {
        currentSprite = runSheet;
        // characterX += moveSpeed; // 角色不移動
        bgX -= moveSpeed; // 背景往左移
        dioX -= moveSpeed;
        josephX -= moveSpeed;
        jotaroX -= moveSpeed;
        for (let b of bombs) { b.x -= moveSpeed; }
        jerryX -= moveSpeed; // Jerry 跟隨場景移動 (不跟隨 Tom)
        if (gameWon || gameOver) endTextX -= moveSpeed;
        isFacingLeft = false;
      } else if (keyIsDown(LEFT_ARROW)) {
        // 當按下左鍵時，切換為跑步圖片精靈、向左移動並翻轉圖片
        currentSprite = runSheet;
        // characterX -= moveSpeed; // 角色不移動
        bgX += moveSpeed; // 背景往右移
        dioX += moveSpeed;
        josephX += moveSpeed;
        jotaroX += moveSpeed;
        for (let b of bombs) { b.x += moveSpeed; }
        jerryX += moveSpeed; // Jerry 跟隨場景移動 (不跟隨 Tom)
        if (gameWon || gameOver) endTextX += moveSpeed;
        isFacingLeft = true;
      }
    }
  }

  // 如果角色在空中 (Y 座標小於地面)，切換為跳躍圖片
  if (characterY < groundY) {
    currentSprite = jumpSheet;
    totalFrames = 8; // 跳躍圖片只有 8 張影格
  }

  // 根據當前要顯示的圖片，重新計算單張影格的寬高
  frameWidth = currentSprite.width / totalFrames;
  frameHeight = currentSprite.height;

  // 計算動畫播放進度
  if (isHit) {
    // 讓被炸到的動畫 (第 6, 7 張圖) 播放慢一點，總共持續約 2 秒
    // 2 張圖 / 2 秒 / 60 FPS ≈ 0.016
    tomBoomCounter += 0.016;
    currentFrame = Math.floor(tomBoomCounter);
    // 如果爆炸動畫播放完畢 (超過 7 張)
    if (currentFrame >= totalFrames) {
      isHit = false; // 恢復正常狀態
      currentFrame = 0; // 重置影格
    }
  } else {
    counter += animationSpeed;
    currentFrame = Math.floor(counter) % totalFrames;
  }

  // 計算當前要顯示的圖片在原圖中的 x 座標
  let sx = currentFrame * frameWidth;

  // 決定當前操控角色的座標，供 NPC 互動判斷使用
  let activePlayerX = characterX;
  let activePlayerY = characterY;
  if (currentPlayer === 'jotaro') {
    activePlayerX = jotaroX;
    activePlayerY = jotaroY;
  } else if (currentPlayer === 'dio') {
    activePlayerX = dioX;
    activePlayerY = dioY;
  }

  // --- 繪製 DIO ---
  if (currentPlayer === 'dio') {
    // === DIO 玩家操控模式 ===
    
    // 物理模擬
    dioVelocityY += gravity;
    dioY += dioVelocityY;
    if (dioY >= groundY) {
      dioY = groundY;
      dioVelocityY = 0;
    }

    // 輸入控制
    let currentDioSprite = dioSheet; // 預設待機
    let dTotalFrames = 18;
    
    // F 鍵攻擊 (Sutando)
    if (keyIsDown(70) && dioAction !== 'sutando') { // 70 is 'F'
      dioAction = 'sutando';
      dioSutandoCounter = 0;
    }

    if (dioAction === 'sutando') {
      currentDioSprite = dioSutandoSheet;
      dTotalFrames = 24;
      dioSutandoCounter += 0.2;
      if (Math.floor(dioSutandoCounter) >= dTotalFrames) {
        dioAction = 'standby'; // 動作結束
        dioSutandoCounter = 0;
      }
    } else {
      // 移動與跳躍
      if (keyIsDown(UP_ARROW) && dioY === groundY) {
        dioVelocityY = -25;
      }
      
      if (keyIsDown(RIGHT_ARROW)) {
        // dioX += moveSpeed; // DIO 不移動，改為背景移動
        bgX -= moveSpeed;
        characterX -= moveSpeed;
        josephX -= moveSpeed;
        jotaroX -= moveSpeed;
        for (let b of bombs) { b.x -= moveSpeed; }
        jerryX -= moveSpeed;
        if (gameWon || gameOver) endTextX -= moveSpeed;
        dioIsFacingLeft = false;
        currentDioSprite = dioRunSheet;
        dTotalFrames = 32;
      } else if (keyIsDown(LEFT_ARROW)) {
        // dioX -= moveSpeed; // DIO 不移動，改為背景移動
        bgX += moveSpeed;
        characterX += moveSpeed;
        josephX += moveSpeed;
        jotaroX += moveSpeed;
        for (let b of bombs) { b.x += moveSpeed; }
        jerryX += moveSpeed;
        if (gameWon || gameOver) endTextX += moveSpeed;
        dioIsFacingLeft = true;
        currentDioSprite = dioRunSheet;
        dTotalFrames = 32;
      }

      if (dioY < groundY) {
        currentDioSprite = dioJumpSheet;
        dTotalFrames = 6;
      }
    }

    // 繪製 DIO (玩家)
    let dFrameW = currentDioSprite.width / dTotalFrames;
    let dFrameH = currentDioSprite.height;
    
    // 計算動畫影格
    let dFrame;
    if (dioAction === 'sutando') {
      dFrame = Math.floor(dioSutandoCounter);
    } else {
      dioCounter += 0.2;
      dFrame = Math.floor(dioCounter) % dTotalFrames;
    }
    let dSx = dFrame * dFrameW;

    push();
    translate(dioX, dioY);
    if (dioIsFacingLeft) scale(-1, 1);
    image(currentDioSprite, 0, 0, dFrameW, dFrameH, dSx, 0, dFrameW, dFrameH);
    pop();

  } else {
    // === DIO NPC 模式 (原有邏輯) ===

    // 檢查是否觸發互動
    if (gameStarted && !gameWon && !gameOver && !isDioInteracting && dist(activePlayerX, activePlayerY, dioX, dioY) < 150) {
      if (dioQuestionCount < 3) { // 檢查是否還有出題額度
        isDioInteracting = true;
        dioCounter = 0;
        currentQuizCharacter = 'dio'; // 設定當前出題角色
        startQuiz(); // 開始問答
      }
    }

    // 遠離結束
    if (isDioInteracting && dist(activePlayerX, activePlayerY, dioX, dioY) > 200) {
      isDioInteracting = false;
      if (inputField) {
        inputField.remove();
        inputField = null;
      }
      feedbackMsg = "";
    }

    if (isDioInteracting) {
      let frameW = dioInteractSheet.width / dioInteractTotalFrames;
      let frameH = dioInteractSheet.height;
      dioCounter += 0.1; // 互動動畫速度
      let currentF = Math.floor(dioCounter);

      // 如果正在問答或顯示結果，循環播放動畫
      if (inputField || feedbackMsg !== "") {
        if (currentF >= dioInteractTotalFrames) {
          dioCounter = 0;
          currentF = 0;
        }
      } else if (currentF >= dioInteractTotalFrames) {
        isDioInteracting = false;
        dioCounter = 0;
      }

      if (isDioInteracting) {
        let sx = Math.floor(dioCounter) * frameW;
        push();
        translate(dioX, dioY);
        image(dioInteractSheet, 0, 0, frameW, frameH, sx, 0, frameW, frameH);
        
        // 顯示問答 UI
        if (inputField) {
          fill(255); stroke(0); rectMode(CENTER);
          rect(0, -100, 200, 50, 10); // 題目框
          fill(0); noStroke(); textAlign(CENTER, CENTER); textSize(16);
          text(currentQ, 0, -100);
          inputField.position(activePlayerX - 40, activePlayerY - 100); // 輸入框跟隨當前角色
        }
        // 顯示結果
        if (feedbackMsg !== "") {
          fill(255); stroke(0); rectMode(CENTER);
          rect(0, -100, 200, 50, 10);
          fill(feedbackMsg === "恭喜答對" ? 'green' : 'red');
          noStroke(); textAlign(CENTER, CENTER); textSize(16);
          text(feedbackMsg, 0, -100);
          if (millis() > quizTimer) feedbackMsg = "";
        }
        pop();
      }
    } else {
      // 待機動畫
      let dioFrameWidth = dioSheet.width / dioTotalFrames;
      let dioFrameHeight = dioSheet.height;
      dioCounter += 0.15; // 更新動畫進度
      let dioCurrentFrame = Math.floor(dioCounter) % dioTotalFrames;
      let dioSx = dioCurrentFrame * dioFrameWidth;

      push();
      translate(dioX, dioY); // 將 DIO 放置在獨立座標位置
      image(dioSheet, 0, 0, dioFrameWidth, dioFrameHeight, dioSx, 0, dioFrameWidth, dioFrameHeight);
      pop();
    }
  }

  // --- 繪製 Joseph (包含互動邏輯) ---
  // 檢查是否觸發互動
  if (gameStarted && !gameWon && !gameOver && !isJosephInteracting && dist(activePlayerX, activePlayerY, josephX, josephY) < 150) {
    if (josephQuestionCount < 3) { // 檢查是否還有出題額度
      isJosephInteracting = true;
      josephCounter = 0;
      currentQuizCharacter = 'joseph'; // 設定當前出題角色
      startQuiz(); // 開始問答
    }
  }

  // 遠離結束
  if (isJosephInteracting && dist(activePlayerX, activePlayerY, josephX, josephY) > 200) {
    isJosephInteracting = false;
    if (inputField) {
      inputField.remove();
      inputField = null;
    }
    feedbackMsg = "";
  }

  if (isJosephInteracting) {
    let frameW = josephInteractSheet.width / josephInteractTotalFrames;
    let frameH = josephInteractSheet.height;
    josephCounter += 0.1; // 互動動畫速度
    let currentF = Math.floor(josephCounter);

    // 如果正在問答或顯示結果，循環播放動畫
    if (inputField || feedbackMsg !== "") {
      if (currentF >= josephInteractTotalFrames) {
        josephCounter = 0;
        currentF = 0;
      }
    } else if (currentF >= josephInteractTotalFrames) {
      isJosephInteracting = false;
      josephCounter = 0;
    }

    if (isJosephInteracting) {
      let sx = Math.floor(josephCounter) * frameW;
      push();
      translate(josephX, josephY);
      image(josephInteractSheet, 0, 0, frameW, frameH, sx, 0, frameW, frameH);
      
      // 顯示問答 UI
      if (inputField) {
        fill(255); stroke(0); rectMode(CENTER);
        rect(0, -100, 200, 50, 10); // 題目框
        fill(0); noStroke(); textAlign(CENTER, CENTER); textSize(16);
        text(currentQ, 0, -100);
        inputField.position(activePlayerX - 40, activePlayerY - 100); // 輸入框跟隨當前角色
      }
      // 顯示結果
      if (feedbackMsg !== "") {
        fill(255); stroke(0); rectMode(CENTER);
        rect(0, -100, 200, 50, 10);
        fill(feedbackMsg === "恭喜答對" ? 'green' : 'red');
        noStroke(); textAlign(CENTER, CENTER); textSize(16);
        text(feedbackMsg, 0, -100);
        if (millis() > quizTimer) feedbackMsg = "";
      }
      pop();
    }
  } else {
    // 待機動畫
    let josephFrameWidth = josephSheet.width / josephTotalFrames;
    let josephFrameHeight = josephSheet.height;
    josephCounter += 0.15;
    let josephCurrentFrame = Math.floor(josephCounter) % josephTotalFrames;
    let josephSx = josephCurrentFrame * josephFrameWidth;
    push();
    translate(josephX, josephY);
    image(josephSheet, 0, 0, josephFrameWidth, josephFrameHeight, josephSx, 0, josephFrameWidth, josephFrameHeight);
    pop();
  }

  // --- 繪製 Jotaro ---
  if (currentPlayer === 'jotaro') {
    // === Jotaro 玩家操控模式 ===
    
    // 物理模擬
    jotaroVelocityY += gravity;
    jotaroY += jotaroVelocityY;
    if (jotaroY >= groundY) {
      jotaroY = groundY;
      jotaroVelocityY = 0;
    }

    // 輸入控制
    let currentJotaroSprite = jotaroSheet; // 預設待機
    let jTotalFrames = 32;
    
    // F 鍵攻擊 (Sutando)
    if (keyIsDown(70) && jotaroAction !== 'sutando') { // 70 is 'F'
      jotaroAction = 'sutando';
      jotaroSutandoCounter = 0;
    }

    if (jotaroAction === 'sutando') {
      currentJotaroSprite = jotaroSutandoSheet;
      jTotalFrames = 12;
      jotaroSutandoCounter += 0.2;
      if (Math.floor(jotaroSutandoCounter) >= jTotalFrames) {
        jotaroAction = 'standby'; // 動作結束
        jotaroSutandoCounter = 0;
      }
    } else {
      // 移動與跳躍
      if (keyIsDown(UP_ARROW) && jotaroY === groundY) {
        jotaroVelocityY = -25;
      }
      
      if (keyIsDown(RIGHT_ARROW)) {
        // jotaroX += moveSpeed; // Jotaro 不移動，改為背景移動
        bgX -= moveSpeed;
        characterX -= moveSpeed;
        dioX -= moveSpeed;
        josephX -= moveSpeed;
        for (let b of bombs) { b.x -= moveSpeed; }
        jerryX -= moveSpeed;
        if (gameWon || gameOver) endTextX -= moveSpeed;
        jotaroIsFacingLeft = false;
        currentJotaroSprite = jotaroRunSheet;
        jTotalFrames = 32;
      } else if (keyIsDown(LEFT_ARROW)) {
        // jotaroX -= moveSpeed; // Jotaro 不移動，改為背景移動
        bgX += moveSpeed;
        characterX += moveSpeed;
        dioX += moveSpeed;
        josephX += moveSpeed;
        for (let b of bombs) { b.x += moveSpeed; }
        jerryX += moveSpeed;
        if (gameWon || gameOver) endTextX += moveSpeed;
        jotaroIsFacingLeft = true;
        currentJotaroSprite = jotaroRunSheet;
        jTotalFrames = 32;
      }

      if (jotaroY < groundY) {
        currentJotaroSprite = jotaroJumpSheet;
        jTotalFrames = 13;
      }
    }

    // 繪製 Jotaro (玩家)
    let jFrameW = currentJotaroSprite.width / jTotalFrames;
    let jFrameH = currentJotaroSprite.height;
    
    // 計算動畫影格
    let jFrame;
    if (jotaroAction === 'sutando') {
      jFrame = Math.floor(jotaroSutandoCounter);
    } else {
      jotaroCounter += 0.2;
      jFrame = Math.floor(jotaroCounter) % jTotalFrames;
    }
    let jSx = jFrame * jFrameW;

    push();
    translate(jotaroX, jotaroY);
    if (jotaroIsFacingLeft) scale(-1, 1);
    image(currentJotaroSprite, 0, 0, jFrameW, jFrameH, jSx, 0, jFrameW, jFrameH);
    pop();

  } else {
    // === Jotaro NPC 模式 (原有邏輯) ===
    
    // 檢查是否觸發互動 (只有在待機狀態下才能觸發)
    if (gameStarted && !gameWon && !gameOver && !isJotaroInteracting && dist(activePlayerX, activePlayerY, jotaroX, jotaroY) < 150) {
      if (jotaroQuestionCount < 3) { // 檢查是否還有出題額度
        isJotaroInteracting = true;
        jotaroCounter = 0; // 重置計數器以播放互動動畫
        currentQuizCharacter = 'jotaro'; // 設定當前出題角色
        startQuiz(); // 開始問答
      }
    }

    // 如果已經在互動中，但角色遠離了 Jotaro，則強制結束對話
    if (isJotaroInteracting && dist(activePlayerX, activePlayerY, jotaroX, jotaroY) > 200) {
      isJotaroInteracting = false;
      if (inputField) {
        inputField.remove(); // 移除輸入框
        inputField = null;
      }
      feedbackMsg = ""; // 清除訊息
    }

    if (isJotaroInteracting) {
      // --- 播放互動動畫 ---
      let frameW = jotaroInteractSheet.width / jotaroInteractTotalFrames;
      let frameH = jotaroInteractSheet.height;
      jotaroCounter += 0.1; // 減慢互動動畫的速度
      let currentF = Math.floor(jotaroCounter);

      // 如果正在問答 (有輸入框) 或正在顯示結果 (feedbackMsg 不為空)，則循環播放動畫
      if (inputField || feedbackMsg !== "") {
        if (currentF >= jotaroInteractTotalFrames) {
          jotaroCounter = 0; // 重播動畫
          currentF = 0;
        }
      } else if (currentF >= jotaroInteractTotalFrames) {
        // 否則動畫播放完畢後，恢復待機狀態
        isJotaroInteracting = false;
        jotaroCounter = 0; 
      }

      if (isJotaroInteracting) {
        let sx = Math.floor(jotaroCounter) * frameW;
        push();
        translate(jotaroX, jotaroY);
        image(jotaroInteractSheet, 0, 0, frameW, frameH, sx, 0, frameW, frameH);
        pop();
      }

      // --- 顯示問答 UI ---
      push();
      translate(jotaroX, jotaroY); // 以 Jotaro 為中心
      
      // 1. 顯示題目 (如果有輸入框存在)
      if (inputField) {
        fill(255); stroke(0); rectMode(CENTER);
        rect(0, -100, 200, 50, 10); // 題目框背景
        fill(0); noStroke(); textAlign(CENTER, CENTER); textSize(16);
        text(currentQ, 0, -100); // 顯示題目文字
        inputField.position(activePlayerX - 40, activePlayerY - 100);
      }
      
      // 2. 顯示結果 (恭喜答對/錯)
      if (feedbackMsg !== "") {
        fill(255); stroke(0); rectMode(CENTER);
        rect(0, -100, 200, 50, 10);
        fill(feedbackMsg === "恭喜答對" ? 'green' : 'red');
        noStroke(); textAlign(CENTER, CENTER); textSize(16);
        text(feedbackMsg, 0, -100);
        if (millis() > quizTimer) feedbackMsg = "";
      }
      pop();
    } else {
      // --- 播放原本的待機動畫 ---
      let jotaroFrameWidth = jotaroSheet.width / jotaroTotalFrames;
      let jotaroFrameHeight = jotaroSheet.height;
      jotaroCounter += 0.15;
      let jotaroCurrentFrame = Math.floor(jotaroCounter) % jotaroTotalFrames;
      let jotaroSx = jotaroCurrentFrame * jotaroFrameWidth;

      push();
      translate(jotaroX, jotaroY);
      image(jotaroSheet, 0, 0, jotaroFrameWidth, jotaroFrameHeight, jotaroSx, 0, jotaroFrameWidth, jotaroFrameHeight);
      pop();
    }
  }

  // 繪製角色
  push(); // 儲存當前的繪圖設定
  translate(characterX, characterY); // 將畫布原點移動到角色的位置
  // 只有當 Tom 是操控角色時，才根據 isFacingLeft 翻轉，否則保持預設 (或根據需求調整)
  if (currentPlayer === 'tom' && isFacingLeft) {
    scale(-1, 1); // 如果角色朝左，則水平翻轉畫布
  }
  // 繪製圖片 (因為已經 translate，所以繪製在 (0, 0))
  image(currentSprite, 0, 0, frameWidth * characterScale, frameHeight * characterScale, sx, 0, frameWidth, frameHeight);
  pop(); // 恢復原本的繪圖設定

  // --- Tom NPC 互動邏輯 (當操控角色不是 Tom 時) ---
  if (currentPlayer !== 'tom') {
    let playerX, playerY;
    if (currentPlayer === 'jotaro') {
      playerX = jotaroX;
      playerY = jotaroY;
    } else if (currentPlayer === 'dio') {
      playerX = dioX;
      playerY = dioY;
    }

    // 檢查是否觸發互動
    if (gameStarted && !gameWon && !gameOver && !isTomInteracting && dist(playerX, playerY, characterX, characterY) < 150) {
      if (tomQuestionCount < 3) {
        isTomInteracting = true;
        currentQuizCharacter = 'tom';
        startQuiz();
      }
    }

    // 遠離結束互動
    if (isTomInteracting && dist(playerX, playerY, characterX, characterY) > 200) {
      isTomInteracting = false;
      if (inputField) { inputField.remove(); inputField = null; }
      feedbackMsg = "";
    }

    // 顯示問答 UI
    if (isTomInteracting) {
      // 檢查問答是否結束
      if (!inputField && feedbackMsg === "") {
        isTomInteracting = false;
      } else {
        push();
        translate(characterX, characterY);
        if (inputField) {
          fill(255); stroke(0); rectMode(CENTER);
          rect(0, -100, 200, 50, 10);
          fill(0); noStroke(); textAlign(CENTER, CENTER); textSize(16);
          text(currentQ, 0, -100);
          // 輸入框位置設在玩家頭上
          inputField.position(playerX - 40, playerY - 100);
        }
        // 顯示結果訊息 (沿用之前的邏輯，這裡不需要額外繪製結果，因為 checkAnswer 會處理 feedbackMsg)
        // 但為了讓結果顯示在 Tom 頭上，我們可以在這裡畫
        pop();
      }
    }
  }

  // --- 繪製 P1 標示 ---
  push();
  // 根據當前操控角色決定 P1 標示的位置
  let targetX, targetY, targetHeight;
  if (currentPlayer === 'tom') {
    targetX = characterX;
    targetY = characterY;
    targetHeight = frameHeight * characterScale;
  } else if (currentPlayer === 'jotaro') {
    targetX = jotaroX;
    targetY = jotaroY;
    targetHeight = jotaroSheet.height;
  } else if (currentPlayer === 'dio') {
    targetX = dioX;
    targetY = dioY;
    targetHeight = dioSheet.height;
  }

  let floatOffset = sin(frameCount * 0.15) * 5; // 輕微的上下浮動動畫
  let p1Y = targetY - (targetHeight / 2) - 20 + floatOffset; // 計算標示顯示的高度 (在角色頭頂上方)
  fill(255, 0, 0); // 紅色
  stroke(255);     // 白色邊框
  strokeWeight(2);
  textSize(20);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  
  let p1Text = (currentPlayer === 'tom' && isHit) ? "!" : "P1"; // 當 Tom 被炸到時，顯示驚嘆號
  text(p1Text, targetX, p1Y); // 顯示 P1 或 !
  noStroke();
  triangle(targetX - 6, p1Y + 10, targetX + 6, p1Y + 10, targetX, p1Y + 18); // 繪製紅色倒三角形
  pop();

  // --- 繪製所有炸彈 ---
  // 計算炸彈單張影格寬度 (2615 / 5 = 523)
  let boomFrameWidth = boomImage.width / boomTotalFrames;
  let boomFrameHeight = boomImage.height;
  
  // 遍歷並繪製炸彈 (使用倒序迴圈以便在迴圈中刪除元素)
  for (let i = bombs.length - 1; i >= 0; i--) {
    let b = bombs[i];
    
    if (b.state === 'falling') {
      // 掉落中：顯示第一張圖 (索引 0)
      push();
      translate(b.x, b.y);
      image(boomImage, 0, 0, boomFrameWidth * 0.3, boomFrameHeight * 0.3, 0, 0, boomFrameWidth, boomFrameHeight);
      pop();
    } else if (b.state === 'exploding') {
      // 爆炸中：播放動畫
      if (Math.floor(b.counter) < boomTotalFrames) {
        let currentFrame = Math.floor(b.counter);
        let sx = currentFrame * boomFrameWidth;
        
        // 第五張圖 (索引 4) 放大效果
        let scale = (currentFrame === 4) ? 0.6 : 0.3;

        push();
        translate(b.x, b.y);
        image(boomImage, 0, 0, boomFrameWidth * scale, boomFrameHeight * scale, sx, 0, boomFrameWidth, boomFrameHeight);
        pop();
        
        b.counter += 0.05; // 更新這顆炸彈的動畫進度
      } else {
        // 動畫播放完畢，從陣列中移除這顆炸彈
        bombs.splice(i, 1);
      }
    }
  }

  // --- Jerry 邏輯 (答錯時出現) ---
  if (jerryState !== 'hidden') {
    let jSheet, jTotalFrames;
    
    // 狀態機控制
    if (jerryState === 'jumping') {
      jSheet = jerryJumpSheet;
      jTotalFrames = 10;
      jerryY -= 15; // 往上跳的速度
      if (jerryY <= height / 2) {
        jerryY = height / 2;
        jerryState = 'showing';
        jerryTimer = millis(); // 開始計時
      }
    } else if (jerryState === 'showing') {
      jSheet = jerryStandbySheet;
      jTotalFrames = 10;
      // 停留 2 秒
      if (millis() - jerryTimer > 1000) {
        jerryState = 'running';
      }
    } else if (jerryState === 'running') {
      jSheet = jerryRunSheet;
      jTotalFrames = 6;
      jerryX += 15; // 往右跑的速度
      if (jerryX > width + 100) {
        jerryState = 'hidden';
      }
    }

    // 繪製 Jerry
    if (jSheet) {
      let jW = jSheet.width / jTotalFrames;
      let jH = jSheet.height;
      jerryCounter += 0.2;
      let jFrame = Math.floor(jerryCounter) % jTotalFrames;
      let jSx = jFrame * jW;

      push();
      translate(jerryX, jerryY);
      scale(4); // Jerry 原圖較小 (24px)，放大顯示
      image(jSheet, 0, 0, jW, jH, jSx, 0, jW, jH);
      
      // 如果是顯示答案狀態，畫出對話框
      if (jerryState === 'showing') {
        scale(0.25); // 還原縮放以繪製文字框
        fill(255); stroke(0); rectMode(CENTER);
        rect(0, -120, 300, 80, 10); // 對話框位置 (加大)
        fill(0); noStroke(); textAlign(CENTER, CENTER); textSize(32); // 加大字體
        text("正確答案: " + jerryAnswer, 0, -120);
      }
      pop();
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function keyPressed() {
  // 按下 @ 鍵 (Shift + 2) 且遊戲未開始或結束時，切換為 Jotaro
  if (key === '@' && (!gameStarted || gameWon || gameOver)) {
    currentPlayer = 'jotaro';
  }
  // 按下 ! 鍵 (Shift + 1) 且遊戲未開始或結束時，切換為 Tom
  if (key === '!' && (!gameStarted || gameWon || gameOver)) {
    currentPlayer = 'tom';
  }
  // 按下 # 鍵 (Shift + 3) 且遊戲未開始或結束時，切換為 DIO
  if (key === '#' && (!gameStarted || gameWon || gameOver)) {
    currentPlayer = 'dio';
  }
}

function startGame() {
  gameStarted = true;
  startButton.hide();
}

function resetGame() {
  correctCount = 0;
  incorrectCount = 0;
  totalQuestionsAnswered = 0;
  dioQuestionCount = 0;
  josephQuestionCount = 0;
  jotaroQuestionCount = 0;
  gameWon = false;
  gameOver = false;
  jerryState = 'hidden';
  restartButton.hide();
}

// --- 問答系統函式 ---
function startQuiz() {
  // 從 CSV 表格中隨機選取一列
  let rowIndex = floor(random(questionTable.getRowCount()));
  let row = questionTable.getRow(rowIndex);
  
  currentQ = row.getString('question');
  currentA = row.getString('answer');
  feedbackMsg = "";
  
  // 建立輸入框
  if (inputField) inputField.remove(); // 確保舊的被移除
  inputField = createInput('');
  inputField.size(80);
  inputField.attribute('placeholder', '輸入答案');
  inputField.changed(checkAnswer); // 按下 Enter 觸發檢查
}

function checkAnswer() {
  // 檢查答案 (this 代表 inputField)
  if (this.value() === currentA) {
    feedbackMsg = "恭喜答對";
    correctCount++;
  } else {
    feedbackMsg = "恭喜答錯";
    incorrectCount++;
    // 觸發 Jerry 出現
    jerryState = 'jumping';
    jerryX = width / 2;
    jerryY = height; // 從畫面下方開始
    jerryAnswer = currentA; // 記錄正確答案
    jerryCounter = 0;
  }

  // 更新該角色的出題數
  if (currentQuizCharacter === 'dio') dioQuestionCount++;
  else if (currentQuizCharacter === 'joseph') josephQuestionCount++;
  else if (currentQuizCharacter === 'jotaro') jotaroQuestionCount++;
  else if (currentQuizCharacter === 'tom') tomQuestionCount++;

  totalQuestionsAnswered++;

  // 檢查勝負條件
  if (totalQuestionsAnswered >= 9) {
    if (correctCount >= 8) {
      gameWon = true;
    } else {
      gameOver = true;
    }
    endTextX = width / 2;
    restartButton.show();
  }
  
  // 移除輸入框並設定結果顯示時間
  this.remove();
  inputField = null;
  quizTimer = millis() + 1000; // 顯示 1 秒
}
