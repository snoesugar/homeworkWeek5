
console.log('Hello world');

//GSAP

gsap.registerPlugin(SplitText);
gsap.registerPlugin(ScrollTrigger);

//index

//翻轉
const flips = document.querySelectorAll(".flip");

flips.forEach(el => {
  gsap.fromTo(el,
    { opacity: 0 }, // 初始透明
    { 
      duration: 0.8,
      opacity: 1,            // 淡入
      rotationY: 360,        // 翻轉
      transformOrigin: "center center",
      perspective: 400,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        toggleActions: "play none none none"
      }
    }
  );
});

//文字split動畫
const segmenter = new Intl.Segmenter("zh", { granularity: "word" });

document.fonts.ready.then(() => {
  gsap.set(".split", { opacity: 1 });

  // 選出所有 .split
  document.querySelectorAll(".split").forEach(el => {
    SplitText.create(el, {
      type: "words",
      wordsClass: "word",
      prepareText: (text) => {
        return [...segmenter.segment(text)]
          .map(s => s.segment)
          .join(String.fromCharCode(8204));
      },
      wordDelimiter: { delimiter: /\u200c/, replaceWith: " " },
      autoSplit: true,
      onSplit: (self) => {
        return gsap.from(self.words, {
          y: 50,
          opacity: 0,
          stagger: 0.05,
          ease: "back",
          scrollTrigger: {
            trigger: el,          // ✅ 每個元素自己觸發
            toggleActions: "play none none none" // 播放一次
          }
        });
      }
    });
  });
});

//文字splitup動畫
document.querySelectorAll(".splitup").forEach(el => {
  SplitText.create(el, {
    type: "words,lines",
    autoSplit: true,
    onSplit(self) {
      return gsap.from(self.lines, {
        rotationX: -100,
        transformOrigin: "50% 50% -160px",
        opacity: 0,
        duration: 0.5,
        ease: "power3",
        stagger: 0.25,
        scrollTrigger: {
          trigger: el,          // ✅ 每個 .splitup 各自觸發
          toggleActions: "play none none none" 
        }
      });
    }
  });
});

//從左邊到原位
gsap.utils.toArray(".left-right").forEach(el => {
  gsap.from(el, {
    duration: 1,
    x: -100,
    opacity: 0,
    ease: "power2.out",
    scrollTrigger: {
      trigger: el,          // ✅ 每個元素自己觸發
      toggleActions: "play none none none"
    }
  });
});

//從右邊到原位
gsap.utils.toArray(".right-left").forEach((el, i) => {
  gsap.from(el, {
    duration: 1,
    x: 100,             // 從右邊進來
    opacity: 0,
    ease: "power2.out",
    scrollTrigger: {
      trigger: el,      // ✅ 每個元素自己觸發
      start: "top 80%", // 當元素頂部進入視窗 80% 高度時開始
      toggleActions: "play none none none"
    },
    delay: i * 0.05  // 延遲依序出現
  });
});

//從下面到上面
gsap.utils.toArray(".down-top").forEach(el => {
  gsap.from(el, {
    duration: 1,
    y: 100,             // 從右邊進來
    opacity: 0,
    ease: "power2.out",
    scrollTrigger: {
      trigger: el,      // ✅ 每個元素自己觸發
      start: "top 80%", // 當元素頂部進入視窗 80% 高度時開始
      toggleActions: "play none none none"
    }
  });
});

//淡入
gsap.utils.toArray(".fade-in").forEach(el => {
  gsap.from(el, {
    duration: 1.5,
    opacity: 0,          // 從透明開始
    ease: "power2.out",
    scrollTrigger: {
      trigger: el,
      start: "top 80%",  // 當元素頂部進入視窗 80% 高度時開始
      toggleActions: "play none none none"
    }
  });
});

//上面進入跳動
gsap.utils.toArray(".right-bounce").forEach(el => {
  gsap.from(el, {
    duration: 1,
    y: -100,             // 從右邊進來
    opacity: 0,
    ease: "bounce.out",
    scrollTrigger: {
      trigger: el,      // ✅ 每個元素自己觸發
      start: "top 80%", // 當元素頂部進入視窗 80% 高度時開始
      toggleActions: "play none none none"
    }
  });
});