console.log($);

// ハンバーガーメニューを表示するために、
// スクロール位置が **520px** に達した際に、
// jQueryの `fadeIn` を使ってふわっと表示させる。
$(window).on("scroll", function () {
  if ($(this).scrollTop() > 520) {
    $("#header").fadeIn();
  } else {
    $("#header").fadeOut();
  }
});

// ハンバーガーメニューをクリックした際に、
// ハンバーガーメニューを開閉する処理を追加する。
$(".hamburger").on("click", function () {
  console.log("Hamburger clicked!");

  $(".global_menu").toggleClass("open");
  $(this).toggleClass("open");
});

// ========================================
// メインビジュアルの拡大・縮小処理
// ========================================
let ticking = false;

// スクロールした瞬間に「今から描画予約するから、他のスクロールイベントは入ってこないで！」
$(window).on("scroll resize load", function () {
  if (ticking) return;
  ticking = true;

  // ここからここまでは、requestAnimationFrame によって予約された、後で実行される処理ですよ」（組み込み命令）
  // 次の描画の更新のタイミングで実行してくださいね！！
  requestAnimationFrame(() => {
    const scrollTop = $(window).scrollTop();
    const vh = window.innerHeight; // 100vh
    const progress = Math.min(scrollTop / vh, 1); // 0〜1

    if (window.innerWidth >= 900) {
      // ========== PC: 33% → 100% (左右は0%に) ==========
      // 左画像: 33% → 0%
      const leftWidth = 33.333 * (1 - progress);
      // 中央画像: 33% → 100%
      const centerWidth = 33.333 + (100 - 33.333) * progress;
      // 右画像: 33% → 0%
      const rightWidth = 33.333 * (1 - progress);

      $(".mainvisual_img:nth-child(1)").css("width", leftWidth + "%");
      $(".mainvisual_img:nth-child(2)").css("width", centerWidth + "%");
      $(".mainvisual_img:nth-child(3)").css("width", rightWidth + "%");
    } else {
      // ========== SP: 100% → 33% (左右は0%→33%) ==========
      // 左画像: 0% → 33%
      const leftWidth = 33.333 * progress;
      // 中央画像: 100% → 33%
      const centerWidth = 100 - (100 - 33.333) * progress;
      // 右画像: 0% → 33%
      const rightWidth = 33.333 * progress;

      $(".mainvisual_img:nth-child(1)").css("width", leftWidth + "%");
      $(".mainvisual_img:nth-child(2)").css("width", centerWidth + "%");
      $(".mainvisual_img:nth-child(3)").css("width", rightWidth + "%");
    }

    ticking = false;
  });
});

// ------------------------------------------------------
// サイトタイトルを表示する　下から上に移動したときにフェードインする
$(window).on("scroll load", function () {
  if ($(this).scrollTop() > 100) {
    $("#site_title .site_title_text").addClass("is-show");
  } else {
    $("#site_title .site_title_text").removeClass("is-show");
  }
});

// --------------------------------------------------------

// inviewプラグインを読み込んでいる場合
$(".move_title").on("inview", function () {
  // 入っても出ても、とにかくクラスをつけてしまう
  $(this).addClass("is-show");
});

//- `出現`: **GALLERYタイトル**が画面に入ったタイミングで、右からスライドして表示。
// - `消失`: **ACCESSタイトル**が画面に入ったタイミングで、スライドして消える。

// GALLERYが見えたら表示
// $("#gallery").on("inview", function (e, isInView) {
//   if (isInView) {
//     $("#side_btn").addClass("is-show");
//   } else {
//     // 画面から外れた（上にスクロールして戻った）ら非表示にする
//     $("#side_btn").removeClass("is-show");
//   }
// });
function updateSideBtn() {
  const st = $(window).scrollTop();
  const gTop = $("#gallery").offset().top;
  const aTop = $("#access_area").offset().top;
  const p = st + 100; // 100px余裕

  if (p >= gTop && p < aTop) $("#side_btn").addClass("is-show");
  else $("#side_btn").removeClass("is-show");
}
$(window).on("load scroll resize", updateSideBtn);

// ーーーーーーーーーーーーーーーーーーーーーーーーーーーーー

// ACCESS inview → 表示/非表示制御
$(".access_content .section_title").on("inview", function (e, isInView) {
  if (isInView) {
    $(".bg").fadeIn(500);
  } else {
    $(".bg").fadeOut(500);
  }
});

//お問い合わせボタンをホバー時に矢印を動かす
$(".contact_msg").hover(
  function () {
    // マウスが乗ったとき
    $(this).addClass("hover");
  },
  function () {
    // マウスが離れたとき
    $(this).removeClass("hover");
  },
);
