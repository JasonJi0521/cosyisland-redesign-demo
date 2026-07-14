"use client";

import { useRef, useState } from "react";

type Mode = "before" | "after";

const products = [
  { name: "GraceLithe Mule", note: "Best seller · Regular + Wide", price: "$109", image: "./shoe-1.jpg" },
  { name: "AirWeave Slingback", note: "New · All-day cushioning", price: "$119", image: "./shoe-5.jpg" },
  { name: "MousseFit Pointed Heel", note: "Work-to-dinner favorite", price: "$109", image: "./shoe-6.jpg" },
];

export default function Home() {
  const [mode, setMode] = useState<Mode>("after");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [fitOpen, setFitOpen] = useState(false);
  const [fitStep, setFitStep] = useState(0);
  const [size, setSize] = useState("7");
  const [width, setWidth] = useState("Regular");
  const [added, setAdded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);

  function switchMode(next: Mode) {
    const y = window.scrollY;
    setMode(next);
    requestAnimationFrame(() => window.scrollTo({ top: y }));
  }

  function openProduct() {
    setDrawerOpen(true);
    setMenuOpen(false);
  }

  return (
    <div className={"site-demo " + mode} ref={pageRef}>
      <DemoBar mode={mode} onChange={switchMode} />
      {mode === "after" ? (
        <AfterSite
          openProduct={openProduct}
          openFit={() => { setFitStep(0); setFitOpen(true); }}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
      ) : (
        <BeforeSite openProduct={openProduct} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      )}
      {drawerOpen && (
        <ProductDrawer
          close={() => setDrawerOpen(false)}
          openFit={() => { setFitStep(0); setFitOpen(true); }}
          size={size}
          setSize={setSize}
          width={width}
          setWidth={setWidth}
          added={added}
          add={() => {
            setAdded(true);
            setTimeout(() => setAdded(false), 1800);
          }}
        />
      )}
      {fitOpen && (
        <FitAssistant
          step={fitStep}
          setStep={setFitStep}
          close={() => setFitOpen(false)}
          choose={() => {
            setSize("7");
            setWidth("Wide");
            setFitOpen(false);
            setDrawerOpen(true);
          }}
        />
      )}
    </div>
  );
}

function DemoBar({ mode, onChange }: { mode: Mode; onChange: (mode: Mode) => void }) {
  return (
    <div className="demo-bar">
      <div className="demo-message">
        <span>网站对比</span>
        <strong>{mode === "after" ? "优化后：一打开就知道为什么值得买" : "之前：一打开先看到打折"}</strong>
      </div>
      <div className="mode-switch" role="group" aria-label="切换优化前后网站">
        <button className={mode === "before" ? "active" : ""} onClick={() => onChange("before")}>之前</button>
        <button className={mode === "after" ? "active" : ""} onClick={() => onChange("after")}>优化后</button>
      </div>
    </div>
  );
}

function Header(props: {
  before?: boolean;
  openProduct: () => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}) {
  return (
    <>
      <div className={"announcement " + (props.before ? "old" : "")}>
        {props.before ? "SPRING SALE · UP TO 50% OFF · SHOP NOW" : "COMPLIMENTARY SHIPPING & EASY 30-DAY RETURNS"}
      </div>
      <header className={"brand-header " + (props.before ? "old" : "")}>
        <button className="menu-trigger" onClick={() => props.setMenuOpen(!props.menuOpen)} aria-label="Open menu">
          <i /><i />
        </button>
        <a className="brand-mark" href="#top" aria-label="Cosy Island home">
          <span className="brand-monogram">ci</span>
          <b>COSY ISLAND</b>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          <a href="#shop">Shop</a>
          <a href="#comfort">Comfort</a>
          <a href="#reviews">Reviews</a>
          <a href="#story">Our story</a>
        </nav>
        <div className="header-actions">
          <button aria-label="Search">⌕</button>
          <button aria-label="Account">○</button>
          <button className="bag-action" onClick={props.openProduct} aria-label="Shopping bag">Bag <sup>0</sup></button>
        </div>
      </header>
      {props.menuOpen && (
        <div className="mobile-menu">
          <a href="#shop" onClick={() => props.setMenuOpen(false)}>Shop the collection <span>↗</span></a>
          <a href="#comfort" onClick={() => props.setMenuOpen(false)}>Why they feel different <span>↗</span></a>
          <a href="#reviews" onClick={() => props.setMenuOpen(false)}>Real women, real days <span>↗</span></a>
          <button onClick={props.openProduct}>Find my perfect fit</button>
        </div>
      )}
    </>
  );
}

function AfterSite(props: {
  openProduct: () => void;
  openFit: () => void;
  menuOpen: boolean;
  setMenuOpen: (open: boolean) => void;
}) {
  return (
    <main id="top" className="after-site">
      <Header openProduct={props.openProduct} menuOpen={props.menuOpen} setMenuOpen={props.setMenuOpen} />

      <section className="hero">
        <div className="hero-copy">
          <p className="micro-label"><i /> APMA ACCEPTED COMFORT</p>
          <h1>The heel<br />you won’t<br /><em>kick off.</em></h1>
          <p className="hero-intro">Elegant enough for every plan. Cushioned, flexible and available in wide fits—so your day never ends because your shoes do.</p>
          <div className="hero-cta-row">
            <button className="dark-cta" onClick={props.openProduct}>Shop GraceLithe <span>↗</span></button>
            <button className="fit-link" onClick={props.openFit}>✦ Find my fit in 60 sec</button>
          </div>
          <div className="hero-rating">
            <span>★★★★★</span>
            <b>4.9</b>
            <small>from 4,500+ happy feet</small>
          </div>
        </div>
        <div className="hero-image">
          <img src="./hero.jpg" alt="Cosy Island comfort shoes" />
          <div className="hero-product">
            <img src="./shoe-1.jpg" alt="GraceLithe Mule" />
            <div><span>THE GRACELITHE</span><b>$109</b></div>
            <button onClick={props.openProduct} aria-label="View GraceLithe">+</button>
          </div>
          <p className="vertical-note">BEAUTIFUL BY DESIGN · COMFORTABLE BY NATURE</p>
        </div>
      </section>

      <div className="feature-marquee" aria-label="Product features">
        <span>ARCH SUPPORT</span><i>✦</i><span>FLEXIBLE KNIT</span><i>✦</i><span>REGULAR + WIDE</span><i>✦</i><span>STABLE 2.8″ HEEL</span><i>✦</i><span>30-DAY RETURNS</span>
      </div>

      <section className="comfort-editorial" id="comfort">
        <div className="section-number">01 — WHY THEY FEEL DIFFERENT</div>
        <div className="comfort-headline">
          <h2>Comfort,<br /><em>engineered</em><br />beautifully.</h2>
          <p>We rebuilt the classic heel around the foot—not the other way around. Every layer flexes, cushions and supports.</p>
        </div>
        <div className="comfort-stage">
          <div className="material-word">AIRWEAVE</div>
          <img src="./shoe-4.jpg" alt="GraceLithe side profile" />
          <div className="feature-point point-one"><b>01</b><span><strong>Moves with you</strong>Stretch knit releases pressure at the toe.</span></div>
          <div className="feature-point point-two"><b>02</b><span><strong>Soft where it matters</strong>Layered cushioning absorbs every step.</span></div>
          <div className="feature-point point-three"><b>03</b><span><strong>Steady, not stiff</strong>Balanced heel geometry keeps you grounded.</span></div>
        </div>
      </section>

      <section className="best-sellers" id="shop">
        <div className="section-topline">
          <div><span>02 — THE EDIT</span><h2>Most loved,<br /><em>most lived in.</em></h2></div>
          <button onClick={props.openProduct}>Shop all styles <span>↗</span></button>
        </div>
        <div className="product-grid">
          {products.map((item, index) => (
            <article className={"product-card card-" + (index + 1)} key={item.name}>
              <button className="product-image-button" onClick={props.openProduct} aria-label={"View " + item.name}>
                <img src={item.image} alt={item.name} />
                {index === 0 && <span className="best-pill">BEST SELLER</span>}
                <span className="quick-add">Quick add</span>
              </button>
              <div className="product-meta">
                <div><h3>{item.name}</h3><p>{item.note}</p></div><strong>{item.price}</strong>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="review-editorial" id="reviews">
        <div className="review-photo"><img src="./shoe-2.jpg" alt="GraceLithe top view" /><span>WORN FOR 11 HOURS</span></div>
        <div className="review-copy">
          <p className="micro-label light"><i /> VERIFIED BUYER</p>
          <blockquote>“From the office to dinner—and I never once thought about my feet.”</blockquote>
          <div className="review-person"><span>JM</span><div><b>Jessica M.</b><small>New York · Wide fit</small></div><strong>★★★★★</strong></div>
          <div className="review-stats"><div><b>94%</b><span>say true to size</span></div><div><b>4.9/5</b><span>average rating</span></div><div><b>362</b><span>verified reviews</span></div></div>
        </div>
      </section>

      <section className="wide-story" id="story">
        <div className="wide-copy">
          <span>03 — FIT IS PERSONAL</span>
          <h2>More room.<br />Less guessing.</h2>
          <p>Feet aren’t one-width-fits-all. Selected styles come in Regular A–C and Wide D–E, while our AI Fit assistant learns from real customer feedback to recommend yours.</p>
          <button className="outline-cta" onClick={props.openFit}>✦ Find my fit</button>
        </div>
        <div className="wide-image">
          <img src="./shoe-3.jpg" alt="GraceLithe flexible fit" />
          <div className="fit-scale"><span>A</span><span>B</span><span>C</span><span>D</span><span>E</span><i /></div>
          <p>REGULAR <b>← YOUR FOOT →</b> WIDE</p>
        </div>
      </section>

      <section className="social-section">
        <div className="social-heading"><span>@COSYISLAND_OFFICIAL</span><h2>Real days.<br />Real outfits.<br /><em>Real comfort.</em></h2></div>
        <div className="social-grid">
          <div><img src="./shoe-5.jpg" alt="Cosy Island social style one" /><span>18K SAVES</span></div>
          <div><img src="./shoe-1.jpg" alt="Cosy Island social style two" /><span>1.2M VIEWS</span></div>
          <div><img src="./shoe-6.jpg" alt="Cosy Island social style three" /><span>SHOP THE LOOK</span></div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-wordmark">COSY ISLAND</div>
        <div className="footer-grid">
          <div><span>STAY IN STEP</span><h3>New drops, fit advice,<br />and very good shoes.</h3><div className="email-field"><input aria-label="Email address" placeholder="Email address" /><button>Join →</button></div></div>
          <div><span>SHOP</span><a href="#shop">Best sellers</a><a href="#shop">Heels</a><a href="#shop">Flats</a><a href="#shop">Wide fit</a></div>
          <div><span>ABOUT</span><a href="#comfort">Our comfort</a><a href="#story">Our story</a><a href="#reviews">Reviews</a><a href="#top">Fit guide</a></div>
          <div><span>FOLLOW</span><a href="#top">Instagram</a><a href="#top">TikTok</a><a href="#top">Pinterest</a></div>
        </div>
        <div className="footer-bottom"><span>© 2026 COSY ISLAND</span><span>NEW YORK · SHANGHAI · EVERYWHERE YOU GO</span><span>Privacy · Terms</span></div>
      </footer>
    </main>
  );
}

function BeforeSite(props: { openProduct: () => void; menuOpen: boolean; setMenuOpen: (open: boolean) => void }) {
  return (
    <main id="top" className="before-site">
      <Header before openProduct={props.openProduct} menuOpen={props.menuOpen} setMenuOpen={props.setMenuOpen} />
      <section className="old-hero">
        <img src="./hero.jpg" alt="Cosy Island campaign" />
        <div className="old-hero-shade" />
        <div className="old-hero-copy"><span>SPRING EDIT</span><h1>In Summer&apos;s Wake,<br />Savings Gently Arrive</h1><p>UP TO 50% OFF</p><button onClick={props.openProduct}>DISCOVER NOW</button></div>
      </section>
      <div className="old-benefits"><span>FREE SHIPPING</span><span>30-DAY RETURNS</span><span>SECURE PAYMENTS</span><span>ONLINE SUPPORT</span></div>
      <section className="old-shop" id="shop">
        <p>OUR PICKS</p><h2>Best Sellers</h2>
        <div className="old-grid">
          {products.map(item => <article key={item.name}><button onClick={props.openProduct}><img src={item.image} alt={item.name} /><span>♡</span></button><h3>{item.name}</h3><p>★★★★★ 4.9</p><b>{item.price}</b></article>)}
        </div>
      </section>
      <section className="old-promo"><p>NEW SEASON</p><h2>Find Your<br />Perfect Pair</h2><span>Explore new arrivals designed for every moment.</span><button onClick={props.openProduct}>SHOP ALL</button></section>
      <section className="old-newsletter"><h2>Join our world</h2><p>Sign up for exclusive offers and new arrivals.</p><div><input placeholder="Your email" aria-label="Your email" /><button>SUBSCRIBE</button></div></section>
      <footer className="old-footer"><b>COSY ISLAND</b><p>SHOP · ABOUT · CONTACT · RETURNS</p><small>© 2026 COSY ISLAND. ALL RIGHTS RESERVED.</small></footer>
    </main>
  );
}

function ProductDrawer(props: {
  close: () => void;
  openFit: () => void;
  size: string;
  setSize: (size: string) => void;
  width: string;
  setWidth: (width: string) => void;
  added: boolean;
  add: () => void;
}) {
  return (
    <div className="drawer-backdrop" role="dialog" aria-modal="true" aria-label="GraceLithe product">
      <button className="drawer-dismiss" onClick={props.close} aria-label="Close product" />
      <aside className="product-drawer">
        <div className="drawer-top"><span>THE GRACELITHE</span><button onClick={props.close}>×</button></div>
        <div className="drawer-product-image"><img src="./shoe-1.jpg" alt="GraceLithe Pointed Toe Heeled Mule" /><span>BEST SELLER</span></div>
        <div className="drawer-content">
          <p className="drawer-rating"><span>★★★★★</span> 4.9 · <u>362 reviews</u></p>
          <h2>GraceLithe Pointed Toe Heeled Mule</h2>
          <div className="drawer-price"><b>$109</b><span>or 4 payments of $27.25</span></div>
          <div className="drawer-proof"><span>✓ APMA Accepted</span><span>✓ All-day cushioning</span><span>✓ Wide fit</span></div>
          <button className="ai-fit-callout" onClick={props.openFit}><span>✦</span><div><b>Not sure about your size?</b><small>Get your AI fit in 60 seconds.</small></div><i>→</i></button>
          <div className="option-row"><div><b>Color</b><span>Leopard Knit</span></div><div className="drawer-swatches"><button className="leopard active" aria-label="Leopard" /><button className="black" aria-label="Black" /><button className="sand" aria-label="Sand" /></div></div>
          <div className="option-row"><div><b>Width</b><button onClick={props.openFit}>Which width am I?</button></div><div className="width-grid">{["Regular", "Wide"].map(item => <button key={item} className={props.width === item ? "active" : ""} onClick={() => props.setWidth(item)}>{item}<small>{item === "Regular" ? "A–C" : "D–E"}</small></button>)}</div></div>
          <div className="option-row"><div><b>US Size</b><button>Size guide</button></div><div className="size-grid">{["6", "6.5", "7", "7.5", "8", "8.5", "9"].map(item => <button key={item} className={props.size === item ? "active" : ""} onClick={() => props.setSize(item)}>{item}</button>)}</div></div>
          <button className={"add-bag " + (props.added ? "added" : "")} onClick={props.add}>{props.added ? "✓ Added to bag" : "Add to bag · $109"}</button>
          <p className="drawer-return">Free shipping · Free size exchange · 30-day returns</p>
        </div>
      </aside>
    </div>
  );
}

function FitAssistant(props: { step: number; setStep: (step: number) => void; close: () => void; choose: () => void }) {
  return (
    <div className="fit-backdrop" role="dialog" aria-modal="true" aria-label="AI Fit assistant">
      <div className="fit-modal">
        <button className="fit-close" onClick={props.close}>×</button>
        <div className="fit-brand"><span>✦</span>COSY AI FIT</div>
        {props.step < 2 && <div className="fit-progress"><i className="active" /><i className={props.step >= 1 ? "active" : ""} /><i /></div>}
        {props.step === 0 && <>
          <p>QUESTION 1 OF 2</p><h2>How do most shoes feel across your toes?</h2><span className="fit-helper">No measuring tape needed. Just think about your usual pair.</span>
          <div className="fit-answers"><button onClick={() => props.setStep(1)}>Usually comfortable <i>→</i></button><button onClick={() => props.setStep(1)}>Often a little tight <i>→</i></button><button onClick={() => props.setStep(1)}>I usually buy wide <i>→</i></button></div>
        </>}
        {props.step === 1 && <>
          <p>QUESTION 2 OF 2</p><h2>What size do you wear most often?</h2><span className="fit-helper">We compare your answer with thousands of real fit reviews.</span>
          <div className="fit-sizes">{["6.5", "7", "7.5", "8", "8.5", "9"].map(item => <button key={item} onClick={() => props.setStep(2)}>{item}</button>)}</div>
          <button className="fit-back" onClick={() => props.setStep(0)}>← Back</button>
        </>}
        {props.step === 2 && <>
          <div className="fit-score">91%<small>FIT MATCH</small></div><p>YOUR BEST MATCH</p><h2>US 7 · Wide</h2>
          <div className="fit-reasons"><span>More room across the toe</span><span>Stay with your usual length</span><span>Flexible knit adapts during wear</span></div>
          <button className="use-fit" onClick={props.choose}>Use this fit</button><small className="fit-note">Free size exchange if it’s not perfect.</small>
        </>}
      </div>
    </div>
  );
}
