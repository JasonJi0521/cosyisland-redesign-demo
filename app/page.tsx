"use client";

import { useMemo, useRef, useState } from "react";

type View = "home" | "product" | "social";
type Mode = "before" | "after";
type Source = "TikTok" | "Instagram" | "Pinterest";

const product = {
  name: "GraceLithe Pointed Toe Heeled Mule",
  price: "$109",
  rating: "4.9",
  reviews: "362 reviews",
};

const notes = {
  home: {
    before: "原来：先看到活动，品牌为什么好不清楚",
    after: "优化后：3 秒讲清“好看，也能舒服走一天”",
  },
  product: {
    before: "原来：选项太多，手机上容易选乱、退出",
    after: "优化后：先帮客人选对尺码，再下单",
  },
  social: {
    before: "原来：社媒点进来还是普通首页，内容接不上",
    after: "优化后：看到什么广告，点进来就接着看什么",
  },
};

export default function Home() {
  const [view, setView] = useState<View>("home");
  const [mode, setMode] = useState<Mode>("after");
  const [fitOpen, setFitOpen] = useState(false);
  const [fitStep, setFitStep] = useState(0);
  const [size, setSize] = useState("7");
  const [width, setWidth] = useState("Regular");
  const [source, setSource] = useState<Source>("TikTok");
  const [added, setAdded] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  function switchMode(next: Mode) {
    const y = scrollRef.current?.scrollTop || 0;
    setMode(next);
    requestAnimationFrame(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = y;
    });
  }

  function go(next: View) {
    setView(next);
    requestAnimationFrame(() => scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" }));
  }

  return (
    <main className="demo-shell">
      <aside className="pitch-panel">
        <p className="pitch-kicker">COSY ISLAND · 独立站优化演示</p>
        <h1>不是换个颜色，<br />是让客人更愿意买。</h1>
        <p className="pitch-intro">用手机点下面三个页面，再切换“现在 / 优化后”，可以直接看到差别。</p>
        <div className="pitch-steps">
          <PitchStep no="01" title="首页" copy="先把品牌讲明白" active={view === "home"} onClick={() => go("home")} />
          <PitchStep no="02" title="商品页" copy="少犹豫，选对尺码" active={view === "product"} onClick={() => go("product")} />
          <PitchStep no="03" title="社媒落地页" copy="让广告流量不浪费" active={view === "social"} onClick={() => go("social")} />
        </div>
        <div className="pitch-proof">
          <span>这个 Demo 能看见：</span>
          <b>品牌更清楚</b><b>手机更好用</b><b>社媒接得住</b><b>AI 能帮成交</b>
        </div>
      </aside>

      <section className="phone-wrap">
        <div className="compare-bar">
          <div className="compare-title">一键看前后差别</div>
          <div className="compare-switch">
            <button className={mode === "before" ? "selected" : ""} onClick={() => switchMode("before")}>现在的网站</button>
            <button className={mode === "after" ? "selected" : ""} onClick={() => switchMode("after")}>优化后</button>
          </div>
          <div className={"change-note " + mode}>{notes[view][mode]}</div>
        </div>

        <div className={"phone " + mode}>
          <div className="device-status"><span>9:41</span><span>● ◔ ▰</span></div>
          <div className="site-scroll" ref={scrollRef}>
            <SiteHeader mode={mode} go={go} />
            {view === "home" && (mode === "before" ? <BeforeHome go={go} /> : <AfterHome go={go} />)}
            {view === "product" && (mode === "before" ? <BeforeProduct /> :
              <AfterProduct size={size} setSize={setSize} width={width} setWidth={setWidth}
                openFit={() => { setFitStep(0); setFitOpen(true); }}
                added={added} add={() => { setAdded(true); setTimeout(() => setAdded(false), 2200); }} />)}
            {view === "social" && (mode === "before" ? <BeforeSocial /> :
              <AfterSocial source={source} setSource={setSource} go={go} />)}
          </div>
          <BottomNav view={view} go={go} mode={mode} />
        </div>
      </section>

      {fitOpen && <FitAssistant step={fitStep} setStep={setFitStep} close={() => setFitOpen(false)}
        choose={() => { setSize("7"); setWidth("Wide"); setFitOpen(false); }} />}
    </main>
  );
}

function PitchStep(props: { no: string; title: string; copy: string; active: boolean; onClick: () => void }) {
  return <button className={props.active ? "active" : ""} onClick={props.onClick}>
    <span>{props.no}</span><b>{props.title}</b><small>{props.copy}</small>
  </button>;
}

function SiteHeader({ mode, go }: { mode: Mode; go: (view: View) => void }) {
  return <>
    <div className="promo-strip">{mode === "before" ? "SPRING SALE · UP TO 50% OFF" : "FREE SHIPPING & EASY RETURNS"}</div>
    <header className="site-header">
      <button className="icon-button" aria-label="菜单">☰</button>
      <button className="wordmark" onClick={() => go("home")}>COSY ISLAND</button>
      <button className="icon-button bag" aria-label="购物袋">♢<i>0</i></button>
    </header>
  </>;
}

function BeforeHome({ go }: { go: (view: View) => void }) {
  return <div className="before-page">
    <section className="before-hero">
      <img src="/hero.jpg" alt="Cosy Island campaign" />
      <div className="before-hero-copy">
        <p>SPRING EDIT</p>
        <h2>In Summer&apos;s Wake,<br />Savings Gently Arrive</h2>
        <button onClick={() => go("product")}>DISCOVER NOW</button>
      </div>
      <Problem className="tag-hero">先讲促销，没讲清为什么值得买</Problem>
    </section>
    <div className="old-trust-row"><span>FREE SHIPPING</span><span>30-DAY RETURNS</span><span>SECURE PAYMENTS</span></div>
    <section className="old-products">
      <p className="eyebrow">OUR PICKS</p><h3>Best Sellers</h3>
      <div className="old-product-grid">
        <ProductTile image="/shoe-1.jpg" name="GraceLithe Mule" />
        <ProductTile image="/shoe-5.jpg" name="Pointed Toe Heel" />
      </div>
      <Problem>手机上信息挤，关键卖点要翻很久才看到</Problem>
    </section>
    <section className="old-copy-block"><h3>Find Your Perfect Pair</h3><p>Explore new arrivals designed for every moment.</p><button>SHOP ALL</button></section>
    <div className="floating-gift">🎁</div><div className="floating-chat">⌁</div>
  </div>;
}

function AfterHome({ go }: { go: (view: View) => void }) {
  return <div className="after-page">
    <section className="new-hero">
      <img src="/hero.jpg" alt="Woman holding comfortable Cosy Island shoes" />
      <div className="hero-shade" />
      <div className="new-hero-copy">
        <span className="proof-chip">APMA Accepted · Comfort-led design</span>
        <h2>Beautiful shoes.<br /><em>Built for real comfort.</em></h2>
        <p>Flexible knit. Cushioned support. Regular and wide fits—made for workdays, weddings and everything after.</p>
        <div className="hero-actions"><button className="primary" onClick={() => go("product")}>Find my perfect fit</button><button className="text-link" onClick={() => go("product")}>Shop best sellers →</button></div>
      </div>
      <Improve className="tag-hero-new">第一屏就把“好看 + 舒服”讲明白</Improve>
    </section>
    <div className="proof-band">
      <div><b>4.9 ★</b><span>4,500+ happy feet</span></div>
      <div><b>Wide fit</b><span>A–E widths</span></div>
      <div><b>30 days</b><span>Easy returns</span></div>
    </div>
    <section className="comfort-story">
      <span className="section-kicker">WHY THEY FEEL DIFFERENT</span><h3>Comfort you can see.</h3>
      <div className="comfort-visual">
        <img src="/shoe-4.jpg" alt="GraceLithe heel" />
        <span className="hotspot h1"><i>1</i><b>Stretch knit</b></span>
        <span className="hotspot h2"><i>2</i><b>Cloud-soft insole</b></span>
        <span className="hotspot h3"><i>3</i><b>Stable 2.8″ heel</b></span>
      </div>
      <p>Less pressure at the toe. More support underfoot. A heel made to keep going when your day does.</p>
      <button className="outline" onClick={() => go("product")}>See the GraceLithe</button>
    </section>
    <section className="review-story">
      <div className="quote-mark">“</div><blockquote>I wore them from the office straight to dinner—no backup flats needed.</blockquote>
      <div className="reviewer"><span className="avatar">JM</span><p><b>Jessica M.</b><small>Verified buyer · Wide fit</small></p><span className="stars">★★★★★</span></div>
      <Improve>真实的人怎么穿，比一句“我们很舒服”更可信</Improve>
    </section>
    <section className="social-proof">
      <div className="social-title"><div><span className="section-kicker">@COSYISLAND_OFFICIAL</span><h3>Seen on real women</h3></div><span>→</span></div>
      <div className="ugc-grid"><div className="ugc-card"><img src="/shoe-2.jpg" alt="Shoe styling" /><span>Work to dinner</span></div><div className="ugc-card"><img src="/shoe-6.jpg" alt="Shoe detail" /><span>12k saves</span></div></div>
    </section>
    <section className="ai-readable">
      <span>FOR GOOGLE & AI ANSWERS</span><h3>One clear answer to every buying question.</h3>
      <details><summary>Are Cosy Island heels good for wide feet?</summary><p>Yes. Selected styles are made in Regular A–C and Wide D–E fits, with flexible knit that adapts without pinching.</p></details>
      <details><summary>Can I wear them all day?</summary><p>GraceLithe combines arch support, a padded insole and a stable heel for extended wear.</p></details>
      <Improve>说得清楚，Google 和 ChatGPT 才知道该推荐谁</Improve>
    </section>
  </div>;
}

function BeforeProduct() {
  return <div className="before-product">
    <div className="old-gallery"><img src="/shoe-1.jpg" alt={product.name} /><span>1 / 12</span></div>
    <div className="old-pdp-copy">
      <div className="old-badges"><b>BEST SELLER</b><b>ALL-DAY COMFORT</b><b>WIDE FIT</b></div>
      <h2>{product.name}</h2><p className="rating">★★★★★ {product.rating} ({product.reviews})</p><strong>{product.price}</strong>
      <Picker label="Version" items={["Standard", "Low Heeled", "Bow ED", "Denim ED"]} />
      <Picker label="Color" items={["Leopard", "Black", "Brown", "Oat", "Red", "Navy", "Denim"]} />
      <Picker label="Fit" items={["Regular (A-C)", "Wide (D-E)"]} />
      <Picker label="Size" items={["5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10", "11", "12"]} />
      <Problem>一口气让客人选 4 组，手机上很容易放弃</Problem>
      <button className="old-add">ADD TO CART</button>
      <div className="accordions"><span>DESCRIPTION ＋</span><span>SHIPPING ＋</span><span>SIZE GUIDE ＋</span></div>
    </div>
  </div>;
}

function Picker({ label, items }: { label: string; items: string[] }) {
  return <div className="old-picker"><b>{label}</b><div>{items.map((item, i) => <button className={i === 0 ? "chosen" : ""} key={item}>{item}</button>)}</div></div>;
}

function AfterProduct(props: {
  size: string; setSize: (v: string) => void; width: string; setWidth: (v: string) => void;
  openFit: () => void; added: boolean; add: () => void;
}) {
  return <div className="new-product">
    <div className="new-gallery"><img src="/shoe-1.jpg" alt={product.name} /><span className="gallery-badge">BEST SELLER</span><button aria-label="收藏">♡</button><div className="gallery-dots"><i className="active" /><i /><i /><i /></div></div>
    <div className="new-pdp-copy">
      <p className="rating"><span>★★★★★</span> {product.rating} · <u>{product.reviews}</u></p>
      <h2>{product.name}</h2><div className="price-line"><strong>{product.price}</strong><span>or 4 payments of $27.25</span></div>
      <div className="pdp-proof"><b>✓ APMA Accepted</b><b>✓ All-day cushioning</b><b>✓ Regular + wide</b></div>
      <div className="fit-callout"><div className="fit-icon">✦</div><div><b>Not sure about your size?</b><p>Answer 3 quick questions. We’ll recommend your best fit.</p></div><button onClick={props.openFit}>Ask AI Fit →</button></div>
      <Improve>把最容易卡住的“选码”变成有人帮</Improve>
      <div className="clean-picker"><div className="picker-heading"><b>Color</b><span>Leopard Knit</span></div><div className="swatches"><button className="leopard selected" aria-label="Leopard" /><button className="black" aria-label="Black" /><button className="oat" aria-label="Oat" /></div></div>
      <div className="clean-picker">
        <div className="picker-heading"><b>Width</b><button onClick={props.openFit}>Which width am I?</button></div>
        <div className="wide-options">{["Regular", "Wide"].map(v => <button key={v} onClick={() => props.setWidth(v)} className={props.width === v ? "selected" : ""}>{v}<small>{v === "Regular" ? "A–C" : "D–E"}</small></button>)}</div>
      </div>
      <div className="clean-picker">
        <div className="picker-heading"><b>US Size</b><button>Size guide</button></div>
        <div className="size-options">{["6", "6.5", "7", "7.5", "8", "8.5", "9"].map(v => <button key={v} onClick={() => props.setSize(v)} className={props.size === v ? "selected" : ""}>{v}</button>)}</div>
      </div>
      <div className="fit-summary"><span>Recommended for you</span><b>US {props.size} · {props.width}</b><small>Free exchange if the fit isn’t right.</small></div>
      <button className={"sticky-add " + (props.added ? "added" : "")} onClick={props.add}>{props.added ? "✓ Added to bag" : "Add to bag · " + product.price}</button>
      <section className="detail-proof"><h3>Why your feet will notice.</h3><div><img src="/shoe-3.jpg" alt="Flexible upper" /><p><b>Moves with you</b><span>Breathable Airweave knit flexes where feet usually pinch.</span></p></div><div><img src="/shoe-2.jpg" alt="Cushioned insole" /><p><b>Soft landing, every step</b><span>Layered cushioning and arch support spread pressure evenly.</span></p></div></section>
    </div>
  </div>;
}

function BeforeSocial() {
  return <div className="before-social">
    <div className="social-ad-mock"><span>TikTok ad</span><b>“The heels I wore for 9 hours…”</b><small>Tap to shop</small></div>
    <div className="disconnect">↓ 点进去 ↓</div><BeforeHome go={() => undefined} />
    <Problem>广告讲“走一天不累”，落地页却先讲打折——客人会觉得点错了</Problem>
  </div>;
}

function AfterSocial({ source, setSource, go }: { source: Source; setSource: (v: Source) => void; go: (v: View) => void }) {
  const content = useMemo(() => ({
    TikTok: { label: "9-hour heel test", metric: "1.2M views", quote: "The first heel I didn’t kick off under the table." },
    Instagram: { label: "Desk-to-dinner edit", metric: "18k saves", quote: "One pair. Three looks. Zero backup flats." },
    Pinterest: { label: "Wedding guest comfort", metric: "42k monthly saves", quote: "Elegant enough for photos, comfortable enough for dancing." },
  }[source]), [source]);
  return <div className="new-social">
    <div className="source-tabs">{(["TikTok", "Instagram", "Pinterest"] as Source[]).map(item => <button key={item} onClick={() => setSource(item)} className={source === item ? "selected" : ""}>{item}</button>)}</div>
    <section className="social-landing-hero">
      <div className="creator-video"><img src="/shoe-4.jpg" alt="GraceLithe heel from social video" /><span className="play">▶</span><b>{content.label}</b><small>{content.metric}</small></div>
      <div className="continuity-copy"><span>YOU SAW IT. HERE IT IS.</span><h2>{content.quote}</h2><p>Meet GraceLithe: the flexible, cushioned heel made for long days and late nights.</p></div>
      <Improve>广告讲什么，落地页第一屏就接着讲什么</Improve>
    </section>
    <section className="social-product-card"><img src="/shoe-1.jpg" alt={product.name} /><div><p className="rating"><span>★★★★★</span> {product.rating}</p><h3>GraceLithe Mule</h3><span>{product.price}</span><b>Regular + Wide Fit</b></div></section>
    <div className="micro-proof"><span>✓ 362 verified reviews</span><span>✓ 30-day returns</span><span>✓ Free shipping</span></div>
    <section className="creator-proof"><span>WHY SHE KEPT THEM ON</span><Reason no="01" title="No toe squeeze" copy="Stretch knit adapts as feet swell through the day." /><Reason no="02" title="No wobble" copy="A balanced 2.8″ heel feels steady from commute to cocktails." /><Reason no="03" title="No size guesswork" copy="AI Fit helps choose regular or wide in under a minute." /></section>
    <button className="social-cta" onClick={() => go("product")}>Find my fit · Shop GraceLithe</button>
    <Improve>同一套内容还能按 TikTok / Instagram / Pinterest 分开接流量</Improve>
  </div>;
}

function Reason({ no, title, copy }: { no: string; title: string; copy: string }) {
  return <div className="reason"><b>{no}</b><p><strong>{title}</strong><small>{copy}</small></p></div>;
}

function FitAssistant({ step, setStep, close, choose }: { step: number; setStep: (v: number) => void; close: () => void; choose: () => void }) {
  return <div className="modal-backdrop" role="dialog" aria-modal="true">
    <div className="fit-sheet">
      <div className="sheet-handle" /><button className="sheet-close" onClick={close}>×</button><span className="ai-label">✦ COSY AI FIT</span>
      {step === 0 && <><h2>Let’s find your best fit.</h2><p>Three quick answers. No measuring tape needed.</p><Progress step={1} /><h3>How do most shoes feel across your toes?</h3><div className="answer-list"><button onClick={() => setStep(1)}>Usually comfortable <span>→</span></button><button onClick={() => setStep(1)}>Often a little tight <span>→</span></button><button onClick={() => setStep(1)}>I usually buy wide <span>→</span></button></div></>}
      {step === 1 && <><h2>Almost there.</h2><p>We use this to compare real fit feedback.</p><Progress step={2} /><h3>What size do you wear most often?</h3><div className="size-answer">{["6.5", "7", "7.5", "8", "8.5", "9"].map(s => <button onClick={() => setStep(2)} key={s}>{s}</button>)}</div><button className="back" onClick={() => setStep(0)}>← Back</button></>}
      {step === 2 && <><div className="fit-result-mark">91%</div><h2>Your best match</h2><div className="result-size"><span>GraceLithe Mule</span><b>US 7 · Wide (D–E)</b></div><ul><li>Wide fit gives your toes more room.</li><li>Most similar shoppers kept their usual size.</li><li>Flexible knit adapts during longer wear.</li></ul><button className="use-fit" onClick={choose}>Use this size</button><small className="fit-disclaimer">Fit recommendation for demo purposes. Free exchange still applies.</small></>}
    </div>
  </div>;
}

function Progress({ step }: { step: number }) {
  return <div className="fit-progress"><i className={step >= 1 ? "active" : ""} /><i className={step >= 2 ? "active" : ""} /><i className={step >= 3 ? "active" : ""} /></div>;
}

function BottomNav({ view, go, mode }: { view: View; go: (v: View) => void; mode: Mode }) {
  return <nav className={"bottom-nav " + mode}>
    <button onClick={() => go("home")} className={view === "home" ? "active" : ""}><span>⌂</span>首页</button>
    <button onClick={() => go("product")} className={view === "product" ? "active" : ""}><span>♢</span>商品页</button>
    <button onClick={() => go("social")} className={view === "social" ? "active" : ""}><span>◎</span>社媒页</button>
  </nav>;
}

function ProductTile({ image, name }: { image: string; name: string }) {
  return <div><img src={image} alt={name} /><span>♡</span><p>{name}</p><b>$109</b></div>;
}

function Problem({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={"problem-tag " + className}><span>问题</span>{children}</div>;
}

function Improve({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={"improve-tag " + className}><span>变化</span>{children}</div>;
}
