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

// スクロールした段階で「Hello Flower! FA EXHIBITION 2021の文字をしたからうかす

// ...existing code...
// スクロールした段階で「Hello Flower! FA EXHIBITION 2021の文字をしたからうかす

$(window).on("scroll", function () {
  // thisはwindow(ブラウザの表示そのもの)、ージ全体の一番上から、
  // 「今どれくらい下にスクロールしたか」という距離（ピクセル数） です。
  const scrollTop = $(this).scrollTop();
  if (scrollTop > 200) {
    $("#site_title .site_title_text").addClass("is-show");
  } else {
    $("#site_title .site_title_text").removeClass("is-show");
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
$("#gallery").on("inview", function (e, isInView) {
  // 画面に入った時だけ実行したい処理
  if (isInView) {
    $("#side_btn").addClass("is-show");
  }
});

$(".access_title").on("inview", function (e, isInView) {
  if (isInView) {
    $("#side_btn").removeClass("is-show");
  }
});

//access_area
//ACCESSタイトル**が来たら背景をフェードイン表示、
$("#access_area, #contact").on("inview", function (e, isInView) {
  if (isInView) {
    if ($(this).attr("id") === "access_area") {
      // ACCESSエリアが画面に入ったら、is-showクラスをつけてフェードイン
      $(this).addClass("is-show");
    } else if ($(this).attr("id") === "contact") {
      // CONTACTエリアが見えたら、ACCESSの背景を消す
      $("#access_area").removeClass("is-show");
    }
  }
});