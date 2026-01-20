// ハンバーガーメニューを表示するために、
// スクロール位置が **520px** に達した際に、
// jQueryの `fadeIn` を使ってふわっと表示させる。
$(window).on("scroll", function () {
  if ($(this).scrollTop() > 520) {
    // #headerはロゴのハンバーガーの親要素
    $("#header").fadeIn();
  } else {
    $("#header").fadeOut();
  }
});

// ハンバーガーメニューをクリックした際に、
// ハンバーガーメニューを開閉する処理を追加する。
$(".hamburger").on("click", function () {
  $(this).toggleClass("open");
});
