import React from "react";

const slides = [
  {
    title: "",
    subtitle: "",
    description: "",
    image:
      "https://res.cloudinary.com/hagiangnguyen/image/upload/v1667363452/PurpleChu/carousel1_eumzzj.jpg",
  },
  {
    title: "Shopee",
    subtitle: "",
    description: "https://shopee.vn/chichunhaque",
    image:
      "https://res.cloudinary.com/hagiangnguyen/image/upload/v1667363475/PurpleChu/shopee_n8lp0f.png",
  },
  {
    title: "Facebook",
    subtitle: "",
    description: "https://www.facebook.com/purplechuorder",
    image:
      "https://res.cloudinary.com/hagiangnguyen/image/upload/v1667363474/PurpleChu/fb_ex0wsy.png",
  },
  {
    title: "Tik Tok Shop",
    subtitle: "",
    description: "https://www.tiktok.com/@purplechu_kpoporder",
    image:
      "https://res.cloudinary.com/hagiangnguyen/image/upload/v1667363474/PurpleChu/tiktok_f0xuuw.png",
  },
];

function useTilt(active) {
  const ref = React.useRef(null);

  React.useEffect(() => {
    if (!ref.current || !active) {
      return;
    }

    const state = {
      rect: undefined,
      mouseX: undefined,
      mouseY: undefined,
    };

    let el = ref.current;

    const handleMouseMove = (e) => {
      if (!el) {
        return;
      }
      if (!state.rect) {
        state.rect = el.getBoundingClientRect();
      }
      state.mouseX = e.clientX;
      state.mouseY = e.clientY;
      const px = (state.mouseX - state.rect.left) / state.rect.width;
      const py = (state.mouseY - state.rect.top) / state.rect.height;

      el.style.setProperty("--px", px);
      el.style.setProperty("--py", py);
    };

    el.addEventListener("mousemove", handleMouseMove);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
    };
  }, [active]);

  return ref;
}

const initialState = {
  slideIndex: 0,
};

const slidesReducer = (state, event) => {
  if (event.type === "NEXT") {
    return {
      ...state,
      slideIndex: (state.slideIndex - 1) % event.slides.length,
    };
  }
  if (event.type === "PREV") {
    return {
      ...state,
      slideIndex:
        state.slideIndex === 0 ? event.slides.length - 1 : state.slideIndex + 1,
    };
  }
};

function Slide({ slide, offset }) {
  const active = offset === 0 ? true : null;
  const ref = useTilt(active);

  return (
    <div
      ref={ref}
      className="slide"
      data-active={active}
      style={{
        "--offset": offset,
        "--dir": offset === 0 ? 0 : offset > 0 ? 1 : -1,
      }}
    >
      <div
        className="slideBackground"
        style={{
          backgroundImage: `url('${slide.image}')`,
        }}
      />
      <div
        className="slideContent"
        style={{
          backgroundImage: `url('${slide.image}')`,
        }}
      >
        <div className="slideContentInner">
          <h2 className="slideTitle">{slide.title}</h2>
          <h3 className="slideSubtitle">{slide.subtitle}</h3>
          {
            slide.description !== "" ? <a href={slide.description} className="slideDescription" target="_blank"  rel="noreferrer">{slide.description}</a> : null
          }
        </div>
      </div>
    </div>
  );
}

const Carousel = () => {
  const [state, dispatch] = React.useReducer(slidesReducer, initialState);

  return (
    <div className="carousel">
      <div className="slides">
        <button onClick={() => dispatch({ type: "PREV", slides: slides })}>
          ‹
        </button>

        {[...slides, ...slides, ...slides].map((slide, i) => {
          let offset = slides.length + (state.slideIndex - i);
          return <Slide slide={slide} offset={offset} key={i} />;
        })}
        <button onClick={() => dispatch({ type: "NEXT", slides: slides })}>
          ›
        </button>
      </div>
    </div>
  );
};

export default Carousel;
