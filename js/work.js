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
  // else句を削除 → fadeOutしない
});
console.log("aaaaa");

// ハンバーガーメニューをクリックした際に、
// ハンバーガーメニューを開閉する処理を追加する。
$(".hamburger").on("click", function () {
  console.log("Hamburger clicked!");

  $(".global_menu").toggleClass("open");
  $(this).toggleClass("open");
});

// メインビジュアル画像のスクロール連動拡大・縮小
$(window).on("scroll", function () {
  const scrollTop = $(this).scrollTop();

  // PC表示（900px以上）: スクロールで拡大
  if (window.innerWidth >= 900) {
    // 初期33% → スクロール500pxで40%まで拡大
    const newWidth = 33 + (scrollTop / 500) * 7; // 最大40%
    const maxWidth = 40;
    $(".mainvisual_img").css("width", Math.min(newWidth, maxWidth) + "%");
  }
  // SP表示（900px未満）: スクロールで縮小
  else {
    // 初期100% → スクロール300pxで70%まで縮小
    const newWidth = 100 - (scrollTop / 300) * 30; // 最小70%
    const minWidth = 70;
    $(".mainvisual_img").css("width", Math.max(newWidth, minWidth) + "%");
  }
});

// メインビジュアル画像のスクロール連動拡大・縮小
$(window).on("scroll", function () {
  const scrollTop = $(this).scrollTop();

  // PC表示（900px以上）: スクロールで拡大
  if (window.innerWidth >= 900) {
    // 初期33% → スクロール500pxで40%まで拡大
    const newWidth = 33 + (scrollTop / 500) * 30; // 最大40%
    const maxWidth = 70;
    $(".mainvisual_img").css("width", Math.min(newWidth, maxWidth) + "%");
  }
  // SP表示（900px未満）: スクロールで縮小
  else {
    // 初期100% → スクロール300pxで70%まで縮小
    const newWidth = 100 - (scrollTop / 300) * 30; // 最小70%
    const minWidth = 70;
    $(".mainvisual_img").css("width", Math.max(newWidth, minWidth) + "%");
  }
});

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
